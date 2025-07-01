import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { STORY_PLANS } from "@/data/stories";
import { CreateStoryData, StoryPlan } from "@/types/stories";
import Icon from "@/components/ui/icon";

export default function CreateStory() {
  const [formData, setFormData] = useState<Partial<CreateStoryData>>({
    title: "",
    description: "",
    paymentMethod: "wallet",
    planId: "week",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedPlan = STORY_PLANS.find((plan) => plan.id === formData.planId);
  const walletBalance = 1250; // Пример баланса кошелька

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB лимит
        toast({
          title: "Ошибка",
          description: "Размер файла не должен превышать 5MB",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !imageFile) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPlan) {
      toast({
        title: "Ошибка",
        description: "Выберите тарифный план",
        variant: "destructive",
      });
      return;
    }

    const requiredAmount =
      formData.paymentMethod === "wallet"
        ? selectedPlan.walletPrice
        : selectedPlan.price;

    if (formData.paymentMethod === "wallet" && walletBalance < requiredAmount) {
      toast({
        title: "Недостаточно средств",
        description: `На кошельке недостаточно средств. Нужно ${requiredAmount}₽, доступно ${walletBalance}₽`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Симуляция создания Stories
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (formData.paymentMethod === "yookassa") {
        // Редирект на ЮKassa
        toast({
          title: "Перенаправление на оплату",
          description:
            "Сейчас вы будете перенаправлены на страницу оплаты ЮKassa",
        });
        // window.location.href = `https://yookassa.ru/pay/...`;
      } else {
        toast({
          title: "Stories создана!",
          description: `Ваша Stories активна на ${selectedPlan.duration} дней. Списано ${requiredAmount}₽ с кошелька`,
        });
      }

      // Сброс формы
      setFormData({
        title: "",
        description: "",
        paymentMethod: "wallet",
        planId: "week",
      });
      setImageFile(null);
    } catch (error) {
      toast({
        title: "Ошибка создания",
        description: "Не удалось создать Stories. Попробуйте снова",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriceDisplay = (plan: StoryPlan) => {
    return formData.paymentMethod === "wallet"
      ? `${plan.walletPrice}₽ (-${plan.discount}%)`
      : `${plan.price}₽`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Создать Stories
            </h1>
            <p className="text-gray-600">
              Продвигайте свои товары через Stories на главной странице
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Image" size={20} />
                  Содержание Stories
                </CardTitle>
                <CardDescription>
                  Добавьте привлекательное изображение и описание
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Например: Скидка 50% на все товары"
                    maxLength={50}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.title?.length || 0}/50 символов
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Описание *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Расскажите подробнее о предложении..."
                    maxLength={200}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description?.length || 0}/200 символов
                  </p>
                </div>

                <div>
                  <Label htmlFor="image">Изображение * (до 5MB)</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {imageFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <Icon name="Check" size={16} />
                      {imageFile.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="product">Связанный товар (опционально)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите товар для продвижения" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product1">
                        iPhone 15 Pro - 120,000₽
                      </SelectItem>
                      <SelectItem value="product2">
                        MacBook Air - 85,000₽
                      </SelectItem>
                      <SelectItem value="product3">
                        AirPods Pro - 25,000₽
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Тарифный план
                </CardTitle>
                <CardDescription>
                  Выберите период размещения Stories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.planId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      planId: value as StoryPlan["id"],
                    }))
                  }
                  className="space-y-4"
                >
                  {STORY_PLANS.map((plan) => (
                    <div key={plan.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <Label
                        htmlFor={plan.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-gray-500">
                              {plan.duration} дней размещения
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {getPriceDisplay(plan)}
                            </div>
                            {formData.paymentMethod === "wallet" && (
                              <Badge variant="secondary" className="text-xs">
                                Экономия {plan.price - plan.walletPrice}₽
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Способ оплаты
                </CardTitle>
                <CardDescription>
                  Выберите удобный способ оплаты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: value as "wallet" | "yookassa",
                    }))
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="Wallet" size={16} />
                          <div>
                            <div className="font-medium">Личный кошелёк</div>
                            <div className="text-sm text-gray-500">
                              Баланс: {walletBalance}₽
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">-3% скидка</Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yookassa" id="yookassa" />
                    <Label htmlFor="yookassa" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Icon name="CreditCard" size={16} />
                        <div>
                          <div className="font-medium">ЮKassa</div>
                          <div className="text-sm text-gray-500">
                            Карты, СБП, электронные кошельки
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {selectedPlan && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-blue-900">
                      Итого к оплате
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-900">
                        {formData.paymentMethod === "wallet"
                          ? selectedPlan.walletPrice
                          : selectedPlan.price}
                        ₽
                      </div>
                      {formData.paymentMethod === "wallet" && (
                        <div className="text-sm text-blue-600">
                          Обычная цена: {selectedPlan.price}₽
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Период размещения:</span>
                      <span>{selectedPlan.duration} дней</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Способ оплаты:</span>
                      <span>
                        {formData.paymentMethod === "wallet"
                          ? "Личный кошелёк"
                          : "ЮKassa"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Размещение:</span>
                      <span>Главная страница</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={
                isLoading ||
                !formData.title ||
                !formData.description ||
                !imageFile
              }
            >
              {isLoading ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Создание Stories...
                </>
              ) : (
                <>
                  <Icon name="Zap" size={16} className="mr-2" />
                  Создать Stories
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
