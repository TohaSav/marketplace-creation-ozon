import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

export default function SellerAdvertising() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [bannerData, setBannerData] = useState({
    shopName: "",
    bannerFile: null as File | null,
    description: "",
    duration: "7", // дни
    contactInfo: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Проверяем размер файла (макс 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер файла 5MB",
          variant: "destructive",
        });
        return;
      }

      // Проверяем тип файла
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Неверный тип файла",
          description: "Можно загружать только изображения",
          variant: "destructive",
        });
        return;
      }

      setBannerData({ ...bannerData, bannerFile: file });
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

      const advertisingRequest = {
        id: Date.now(),
        sellerId: seller.id,
        sellerName: seller.name,
        shopName: bannerData.shopName,
        bannerUrl: bannerData.bannerFile
          ? URL.createObjectURL(bannerData.bannerFile)
          : null,
        description: bannerData.description,
        duration: parseInt(bannerData.duration),
        contactInfo: bannerData.contactInfo,
        status: "pending", // pending, approved, rejected
        createdAt: new Date().toISOString(),
        price: parseInt(bannerData.duration) * 100, // 100 руб за день
      };

      // Сохраняем заявку на рекламу
      const existingRequests = JSON.parse(
        localStorage.getItem("advertising-requests") || "[]",
      );
      existingRequests.push(advertisingRequest);
      localStorage.setItem(
        "advertising-requests",
        JSON.stringify(existingRequests),
      );

      toast({
        title: "Заявка отправлена",
        description: "Ваша заявка на размещение рекламы принята к рассмотрению",
      });

      navigate("/seller/dashboard");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку на рекламу",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Проверяем статус продавца
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
              Размещение рекламы доступно только после подтверждения вашего
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
        <h1 className="text-3xl font-bold text-gray-900">Заказать рекламу</h1>
        <p className="text-gray-600 mt-2">
          Разместите баннер вашего магазина на главной странице
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Megaphone" size={20} />
                Информация о рекламе
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shopName">Имя магазина *</Label>
                  <Input
                    id="shopName"
                    type="text"
                    value={bannerData.shopName}
                    onChange={(e) =>
                      setBannerData({ ...bannerData, shopName: e.target.value })
                    }
                    placeholder="Введите название вашего магазина"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bannerFile">Баннер рекламы *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {bannerData.bannerFile ? (
                      <div className="space-y-4">
                        <img
                          src={URL.createObjectURL(bannerData.bannerFile)}
                          alt="Preview"
                          className="mx-auto h-32 w-auto object-cover rounded-lg"
                        />
                        <p className="text-sm text-gray-600">
                          {bannerData.bannerFile.name}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            setBannerData({ ...bannerData, bannerFile: null })
                          }
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
                          <label
                            htmlFor="bannerFile"
                            className="cursor-pointer"
                          >
                            <span className="text-blue-600 hover:text-blue-700 font-medium">
                              Нажмите для загрузки
                            </span>
                            <span className="text-gray-600">
                              {" "}
                              или перетащите файл сюда
                            </span>
                          </label>
                          <input
                            id="bannerFile"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>Рекомендуемый размер: 1200x300px</p>
                          <p>Формат: PNG, JPG, GIF до 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание рекламы</Label>
                  <Textarea
                    id="description"
                    value={bannerData.description}
                    onChange={(e) =>
                      setBannerData({
                        ...bannerData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Опишите что рекламируете, какие акции..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Длительность размещения *</Label>
                  <select
                    id="duration"
                    value={bannerData.duration}
                    onChange={(e) =>
                      setBannerData({ ...bannerData, duration: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1">1 день - 100 ₽</option>
                    <option value="3">3 дня - 270 ₽ (скидка 10%)</option>
                    <option value="7">7 дней - 560 ₽ (скидка 20%)</option>
                    <option value="14">14 дней - 980 ₽ (скидка 30%)</option>
                    <option value="30">30 дней - 1800 ₽ (скидка 40%)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Контактная информация</Label>
                  <Input
                    id="contactInfo"
                    type="text"
                    value={bannerData.contactInfo}
                    onChange={(e) =>
                      setBannerData({
                        ...bannerData,
                        contactInfo: e.target.value,
                      })
                    }
                    placeholder="Email или телефон для связи"
                  />
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
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Информация о размещении</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-blue-600" />
                <span className="text-sm">Размещение на главной странице</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Eye" size={16} className="text-green-600" />
                <span className="text-sm">Высокая видимость</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-orange-600" />
                <span className="text-sm">Ротация каждые 3 секунды</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Monitor" size={16} className="text-purple-600" />
                <span className="text-sm">Размер: 1200x300px</span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Процесс размещения:
                </h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Подача заявки</li>
                  <li>2. Модерация (до 24 часов)</li>
                  <li>3. Оплата после одобрения</li>
                  <li>4. Размещение рекламы</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Преимущества:
                </h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Увеличение продаж</li>
                  <li>• Узнаваемость бренда</li>
                  <li>• Привлечение новых клиентов</li>
                  <li>• Скидки при длительном размещении</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
