import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  ADVERTISING_PLANS,
  CreateAdvertisementData,
} from "@/types/advertising";
import { generateImage } from "@/utils/imageUtils";
import Icon from "@/components/ui/icon";

export default function AdvertisingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CreateAdvertisementData>({
    title: "",
    description: "",
    image: "",
    targetUrl: "",
    duration: 1,
  });

  const [selectedPlan, setSelectedPlan] = useState(ADVERTISING_PLANS[0]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateImage = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название рекламы для генерации изображения",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateImage(
        `Рекламное изображение для: ${formData.title}. ${formData.description}`,
        512,
        512,
      );
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast({
        title: "Изображение создано",
        description: "Изображение успешно сгенерировано",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать изображение",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите в аккаунт для размещения рекламы",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.image
    ) {
      toast({
        title: "Заполните все поля",
        description: "Все поля обязательны для заполнения",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Создаем рекламу
      const newAd = {
        id: Date.now().toString(),
        ...formData,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        status: "pending" as const,
        paymentStatus: "pending" as const,
        price: selectedPlan.price,
        expiresAt: new Date(
          Date.now() + selectedPlan.duration * 24 * 60 * 60 * 1000,
        ).toISOString(),
        clicks: 0,
        views: 0,
      };

      // Сохраняем в localStorage
      const existingAds = JSON.parse(
        localStorage.getItem("advertisements") || "[]",
      );
      localStorage.setItem(
        "advertisements",
        JSON.stringify([...existingAds, newAd]),
      );

      // Перенаправляем на оплату
      navigate(`/payment`, {
        state: {
          type: "advertising",
          adId: newAd.id,
          amount: selectedPlan.price,
          description: `Реклама: ${formData.title}`,
          duration: selectedPlan.duration,
        },
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать рекламу",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Размещение рекламы
          </h1>
          <p className="text-gray-600">
            Создайте рекламу, которая будет показываться среди товаров на
            главной странице
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма создания рекламы */}
          <Card>
            <CardHeader>
              <CardTitle>Создание рекламы</CardTitle>
              <CardDescription>
                Заполните данные для вашей рекламы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Название рекламы</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Введите название..."
                    maxLength={selectedPlan.maxTitleLength}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/{selectedPlan.maxTitleLength}
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Опишите вашу рекламу..."
                    maxLength={selectedPlan.maxDescriptionLength}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/
                    {selectedPlan.maxDescriptionLength}
                  </p>
                </div>

                <div>
                  <Label htmlFor="targetUrl">Ссылка (необязательно)</Label>
                  <Input
                    id="targetUrl"
                    value={formData.targetUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        targetUrl: e.target.value,
                      }))
                    }
                    placeholder="https://..."
                    type="url"
                  />
                </div>

                <div>
                  <Label>Изображение</Label>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage}
                      className="w-full"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Icon
                            name="Loader2"
                            className="mr-2 h-4 w-4 animate-spin"
                          />
                          Генерация изображения...
                        </>
                      ) : (
                        <>
                          <Icon name="Image" className="mr-2 h-4 w-4" />
                          Сгенерировать изображение
                        </>
                      )}
                    </Button>

                    {formData.image && (
                      <div className="border rounded-lg p-2">
                        <img
                          src={formData.image}
                          alt="Превью рекламы"
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Выбор тарифа */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Выберите тариф</CardTitle>
                <CardDescription>
                  Выберите продолжительность показа рекламы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPlan.id}
                  onValueChange={(value) => {
                    const plan = ADVERTISING_PLANS.find((p) => p.id === value);
                    if (plan) {
                      setSelectedPlan(plan);
                      setFormData((prev) => ({
                        ...prev,
                        duration: plan.duration,
                      }));
                    }
                  }}
                >
                  {ADVERTISING_PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center space-x-2 p-3 border rounded-lg"
                    >
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <Label
                        htmlFor={plan.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{plan.name}</div>
                            <div className="text-sm text-gray-500">
                              {plan.description}
                            </div>
                          </div>
                          <Badge variant="secondary">{plan.price} ₽</Badge>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Превью рекламы */}
            {formData.title && (
              <Card>
                <CardHeader>
                  <CardTitle>Превью рекламы</CardTitle>
                  <CardDescription>
                    Так будет выглядеть ваша реклама
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-white relative">
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                      Реклама
                    </Badge>
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt={formData.title}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">
                      {formData.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {formData.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Кнопка оплаты */}
            <Card>
              <CardHeader>
                <CardTitle>Итого к оплате</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center mb-4">
                  {selectedPlan.price} ₽
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !formData.title.trim() ||
                    !formData.description.trim() ||
                    !formData.image
                  }
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Icon
                        name="Loader2"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      Создание рекламы...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" className="mr-2 h-4 w-4" />
                      Перейти к оплате
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
