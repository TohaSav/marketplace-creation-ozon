import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import {
  generateUniqueArticle,
  generateUniqueBarcode,
  formatBarcode,
  generateProductQRCode,
} from "@/utils/productGenerators";

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canAddProduct, subscriptionStatus, refreshSubscription } =
    useSubscription();
  const [loading, setLoading] = useState(false);

  // Проверяем подписку
  const productCheck = canAddProduct();
  if (!productCheck.allowed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Icon name="AlertTriangle" size={64} className="text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Невозможно добавить товар
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 text-lg mb-6">{productCheck.reason}</p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/seller/tariffs")}
                className="bg-red-600 hover:bg-red-700"
              >
                <Icon name="CreditCard" size={16} className="mr-2" />
                Выбрать тариф
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/seller/dashboard")}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться в кабинет
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Проверяем статус продавца - разрешаем доступ только подтвержденным
  if (user?.userType === "seller" && user?.status !== "active") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Icon name="Lock" size={64} className="text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Доступ ограничен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-lg mb-6">
              Добавление товаров доступно только после подтверждения вашего
              профиля администрацией.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/seller/dashboard")}
                variant="outline"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться к кабинету
              </Button>
              <br />
              <Button
                onClick={() => navigate("/notifications")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Icon name="Bell" size={16} className="mr-2" />
                Проверить уведомления
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null,
    stock: "",
    article: "",
    barcode: "",
  });

  // Автоматическая генерация артикула и штрих-кода при изменении названия и категории
  useEffect(() => {
    if (product.title && product.category) {
      const newArticle = generateUniqueArticle(product.title, product.category);
      const newBarcode = generateUniqueBarcode();

      setProduct((prev) => ({
        ...prev,
        article: newArticle,
        barcode: newBarcode,
      }));
    }
  }, [product.title, product.category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const seller = JSON.parse(localStorage.getItem("seller-token") || "{}");
      if (!seller.id) {
        throw new Error("Не авторизован");
      }

      const newProduct = {
        id: Date.now(),
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        image: product.image
          ? URL.createObjectURL(product.image)
          : "/placeholder.svg",
        rating: { rate: 0, count: 0 },
        sellerId: seller.id,
        sellerName: seller.name,
        stock: parseInt(product.stock),
        sold: 0,
        createdAt: new Date().toISOString(),
        article: product.article,
        barcode: product.barcode,
        qrCode: generateProductQRCode(product.article, product.title),
      };

      // Добавляем к глобальным товарам
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]",
      );
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      // Обновляем данные о продавце
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      const updatedSellers = sellers.map((s: any) =>
        s.id === seller.id
          ? { ...s, products: [...(s.products || []), newProduct] }
          : s,
      );
      localStorage.setItem("sellers", JSON.stringify(updatedSellers));

      const updatedSeller = updatedSellers.find((s: any) => s.id === seller.id);
      localStorage.setItem("seller-token", JSON.stringify(updatedSeller));

      // Обновляем статистику подписки
      refreshSubscription();

      toast({
        title: "Товар добавлен",
        description: "Ваш товар успешно добавлен в каталог",
      });

      navigate("/seller/dashboard");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/seller/dashboard")}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к кабинету
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Добавить товар</h1>
        <p className="text-gray-600 mt-2">
          Заполните информацию о вашем товаре
        </p>
      </div>

      {/* Информация о подписке */}
      {subscriptionStatus && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Info" size={20} className="text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Тариф "{subscriptionStatus.planName}"
                  </h3>
                  <p className="text-sm text-blue-700">
                    Использовано товаров: {subscriptionStatus.productsUsed} /{" "}
                    {subscriptionStatus.maxProducts === -1
                      ? "∞"
                      : subscriptionStatus.maxProducts}
                  </p>
                </div>
              </div>
              {subscriptionStatus.maxProducts !== -1 && (
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-900">
                    {subscriptionStatus.maxProducts -
                      subscriptionStatus.productsUsed}
                  </div>
                  <div className="text-sm text-blue-700">товаров осталось</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Информация о товаре</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название товара *</Label>
                <Input
                  id="title"
                  type="text"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                  placeholder="Введите название товара"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Цена *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select
                  value={product.category}
                  onValueChange={(value) =>
                    setProduct({ ...product, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Электроника</SelectItem>
                    <SelectItem value="clothing">Одежда</SelectItem>
                    <SelectItem value="home">Дом и сад</SelectItem>
                    <SelectItem value="sport">Спорт</SelectItem>
                    <SelectItem value="beauty">Красота</SelectItem>
                    <SelectItem value="auto">Авто</SelectItem>
                    <SelectItem value="books">Книги</SelectItem>
                    <SelectItem value="toys">Игрушки</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Количество на складе *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Автоматически сгенерированные поля */}
            {product.article && product.barcode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Zap" size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-blue-900">
                    Автоматически сгенерировано
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="article">Артикул товара</Label>
                    <div className="flex gap-2">
                      <Input
                        id="article"
                        type="text"
                        value={product.article}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newArticle = generateUniqueArticle(
                            product.title,
                            product.category,
                          );
                          setProduct({ ...product, article: newArticle });
                        }}
                        title="Сгенерировать новый артикул"
                      >
                        <Icon name="RefreshCcw" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">Штрих-код (EAN-13)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="barcode"
                        type="text"
                        value={formatBarcode(product.barcode)}
                        readOnly
                        className="bg-gray-50 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newBarcode = generateUniqueBarcode();
                          setProduct({ ...product, barcode: newBarcode });
                        }}
                        title="Сгенерировать новый штрих-код"
                      >
                        <Icon name="RefreshCcw" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Icon name="QrCode" size={24} className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium">
                      QR-код будет создан автоматически
                    </p>
                    <p className="text-xs text-gray-500">
                      Содержит артикул и ссылку на товар
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Описание товара *</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                placeholder="Опишите ваш товар подробно..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Изображение товара</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {product.image ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-600">
                      {product.image.name}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setProduct({ ...product, image: null })}
                    >
                      Удалить изображение
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Icon
                      name="Upload"
                      size={48}
                      className="mx-auto text-gray-400"
                    />
                    <div>
                      <label htmlFor="image" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Нажмите для загрузки
                        </span>
                        <span className="text-gray-600">
                          {" "}
                          или перетащите файл сюда
                        </span>
                      </label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF до 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/seller/dashboard")}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Добавление...
                  </>
                ) : (
                  <>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить товар
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
