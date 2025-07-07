import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import { StoryPlan, CreateStoryData } from "@/types/stories";
import { Product } from "@/types/product";

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storyData: CreateStoryData) => void;
}

const storyPlans: StoryPlan[] = [
  {
    id: "week",
    name: "Неделя",
    duration: 7,
    price: 100,
    walletPrice: 97,
    discount: 3,
  },
  {
    id: "month",
    name: "Месяц",
    duration: 30,
    price: 500,
    walletPrice: 485,
    discount: 3,
  },
];

export default function CreateStoryModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateStoryModalProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    productId: "",
    planId: "week" as StoryPlan["id"],
    paymentMethod: "wallet" as "wallet" | "yookassa",
    image: null as File | null,
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Загрузка товаров продавца
  useEffect(() => {
    if (isOpen && user) {
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const sellerProducts = allProducts.filter(
        (p: Product) => p.sellerId === user.id,
      );
      setProducts(sellerProducts);

      // Загрузка баланса кошелька
      const walletData = JSON.parse(
        localStorage.getItem(`wallet_${user.id}`) || "{}",
      );
      setWalletBalance(walletData.balance || 0);
    }
  }, [isOpen, user]);

  // Обновление выбранного товара
  useEffect(() => {
    if (formData.productId) {
      const product = products.find((p) => p.id === formData.productId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [formData.productId, products]);

  const selectedPlan = storyPlans.find((p) => p.id === formData.planId);
  const finalPrice =
    formData.paymentMethod === "wallet"
      ? selectedPlan?.walletPrice
      : selectedPlan?.price;
  const canPayWithWallet = walletBalance >= (selectedPlan?.walletPrice || 0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const storyData: CreateStoryData = {
      title: selectedProduct.name,
      description:
        formData.description ||
        `${selectedProduct.name} - ${selectedProduct.price.toLocaleString()}₽`,
      image: formData.image || selectedProduct.images[0],
      productId: selectedProduct.id,
      planId: formData.planId,
      paymentMethod: formData.paymentMethod,
    };

    onSubmit(storyData);

    // Сброс формы
    setFormData({
      productId: "",
      planId: "week",
      paymentMethod: "wallet",
      image: null,
      description: "",
    });
    setImagePreview(null);
    setSelectedProduct(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Создать Story
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Выберите товар</Label>
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icon
                  name="Package"
                  size={48}
                  className="mx-auto mb-4 text-gray-300"
                />
                <p>У вас пока нет товаров</p>
                <p className="text-sm mt-2">
                  Добавьте товары, чтобы создавать Stories
                </p>
              </div>
            ) : (
              <Select
                value={formData.productId}
                onValueChange={(value) =>
                  setFormData({ ...formData, productId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите товар для Story" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-3 w-full">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="truncate font-medium">
                            {product.name}
                          </span>
                          <div className="text-sm text-gray-500">
                            ₽{product.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Selected Product Preview */}
          {selectedProduct && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.images[0] || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedProduct.name}</h4>
                    <p className="text-lg font-bold text-primary">
                      ₽{selectedProduct.price.toLocaleString()}
                    </p>
                    <Badge className="mt-1">{selectedProduct.category}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Plan Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Выберите тариф</Label>
            <RadioGroup
              value={formData.planId}
              onValueChange={(value) =>
                setFormData({ ...formData, planId: value as StoryPlan["id"] })
              }
            >
              <div className="grid gap-3">
                {storyPlans.map((plan) => (
                  <div key={plan.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                      <Card className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">
                              {plan.name} ({plan.duration} дней)
                            </div>
                            <div className="text-sm text-gray-600">
                              Обычная цена: ₽{plan.price}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-bold">
                              ₽{plan.walletPrice} с кошелька
                            </div>
                            <div className="text-xs text-gray-500">
                              -{plan.discount}% скидка
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Способ оплаты</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  paymentMethod: value as "wallet" | "yookassa",
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="wallet"
                  id="wallet"
                  disabled={!canPayWithWallet}
                />
                <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" size={16} />
                    <span>Кошелёк продавца</span>
                    <Badge variant="secondary">
                      Баланс: ₽{walletBalance.toLocaleString()}
                    </Badge>
                    {!canPayWithWallet && (
                      <Badge variant="destructive">Недостаточно средств</Badge>
                    )}
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yookassa" id="yookassa" />
                <Label htmlFor="yookassa" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="CreditCard" size={16} />
                    <span>Банковская карта</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Итого к оплате:</span>
                <span className="text-xl font-bold text-primary">
                  ₽{finalPrice?.toLocaleString()}
                </span>
              </div>
              {formData.paymentMethod === "wallet" && selectedPlan && (
                <div className="text-sm text-green-600 mt-2">
                  Экономия ₽
                  {(
                    selectedPlan.price - selectedPlan.walletPrice
                  ).toLocaleString()}{" "}
                  при оплате с кошелька
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Image Upload (Optional) */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Изображение для Story (необязательно)
            </Label>
            <p className="text-sm text-gray-600">
              Если не загружено, будет использована обложка товара
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <Icon
                    name="Upload"
                    size={32}
                    className="mx-auto text-gray-400 mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Нажмите для загрузки изображения
                  </p>
                  <p className="text-xs text-gray-400">
                    Рекомендуемый размер: 1080x1920 (9:16)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Дополнительное описание (необязательно)
            </Label>
            <Textarea
              id="description"
              placeholder="Расскажите о товаре подробнее..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={
              !formData.productId ||
              (formData.paymentMethod === "wallet" && !canPayWithWallet)
            }
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать Story за ₽{finalPrice?.toLocaleString()}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
