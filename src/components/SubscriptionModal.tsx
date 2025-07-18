import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  SUBSCRIPTION_PLANS,
  type SubscriptionPlan,
} from "@/types/subscription";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubscribe,
}: SubscriptionModalProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      await onSubscribe(planId);
      onClose();
    } catch (error) {
      console.error("Ошибка подписки:", error);
      toast({
        title: "Ошибка подписки",
        description: "Не удалось оформить подписку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const getPlanBadgeColor = (plan: SubscriptionPlan) => {
    switch (plan.id) {
      case "mini":
        return "bg-green-500 text-white";
      case "maxi":
        return "bg-blue-500 text-white";
      case "vip":
        return "bg-purple-500 text-white";
      case "premium":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "mini":
        return "Zap";
      case "maxi":
        return "Rocket";
      case "vip":
        return "Crown";
      case "premium":
        return "Star";
      default:
        return "Package";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
        <div className="p-6 overflow-y-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            🚀 Добро пожаловать в ваш магазин!
          </DialogTitle>
          <p className="text-center text-gray-600 text-lg mt-2">
            Для начала продаж выберите подходящий тарифный план
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информационный блок */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Info" size={24} className="text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">
                  Почему нужен тарифный план?
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Icon
                    name="Shield"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-gray-700">
                    Качественная модерация и безопасность сделок
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon
                    name="Headphones"
                    size={16}
                    className="text-blue-600 mt-0.5"
                  />
                  <span className="text-gray-700">
                    Техническая поддержка и помощь в развитии
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon
                    name="TrendingUp"
                    size={16}
                    className="text-purple-600 mt-0.5"
                  />
                  <span className="text-gray-700">
                    Инструменты продвижения и аналитики
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Тарифные планы */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Card
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`relative transition-all duration-200 hover:shadow-lg cursor-pointer ${
                  activePlan === plan.id 
                    ? "ring-2 ring-green-500 shadow-xl scale-105 bg-green-50" 
                    : plan.isPopular 
                      ? "ring-2 ring-blue-500 scale-105" 
                      : "hover:scale-102"
                } ${plan.id === "premium" && activePlan !== plan.id ? "bg-gradient-to-br from-yellow-50 to-orange-50" : ""}`}
              >
                {activePlan === plan.id && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-3 py-1">
                      <Icon name="Check" size={14} className="mr-1" />
                      Выбран
                    </Badge>
                  </div>
                )}
                {plan.isPopular && activePlan !== plan.id && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">
                      Популярный
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div
                      className={`p-3 rounded-full ${getPlanBadgeColor(plan)}`}
                    >
                      <Icon name={getPlanIcon(plan.id)} size={24} />
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>

                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price.toLocaleString()} ₽
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      /{plan.duration === "month" ? "мес" : "год"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {plan.description}
                  </p>

                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {plan.maxProducts === -1
                        ? "∞ товаров"
                        : `до ${plan.maxProducts.toLocaleString()} товаров`}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6 text-xs">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          size={14}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-xs text-gray-500 italic">
                        +{plan.features.length - 4} дополнительных возможностей
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id);
                    }}
                    disabled={loading}
                    className={`w-full transition-all duration-200 ${
                      activePlan === plan.id
                        ? "bg-green-600 hover:bg-green-700"
                        : plan.id === "premium"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                          : plan.isPopular
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-800 hover:bg-gray-900"
                    }`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <>
                        <Icon
                          name="Loader2"
                          size={16}
                          className="mr-2 animate-spin"
                        />
                        Подключение...
                      </>
                    ) : activePlan === plan.id ? (
                      <>
                        <Icon name="CreditCard" size={16} className="mr-2" />
                        Оплатить план
                      </>
                    ) : (
                      <>
                        <Icon name="Mouse" size={16} className="mr-2" />
                        Выбрать план
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Дополнительная информация */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <Icon
                    name="Shield"
                    size={32}
                    className="mx-auto mb-2 text-green-600"
                  />
                  <h4 className="font-semibold mb-1">Безопасность</h4>
                  <p className="text-xs text-gray-600">
                    Все платежи защищены SSL-шифрованием
                  </p>
                </div>
                <div>
                  <Icon
                    name="RefreshCw"
                    size={32}
                    className="mx-auto mb-2 text-blue-600"
                  />
                  <h4 className="font-semibold mb-1">Гибкость</h4>
                  <p className="text-xs text-gray-600">
                    Возможность смены тарифа в любое время
                  </p>
                </div>
                <div>
                  <Icon
                    name="Award"
                    size={32}
                    className="mx-auto mb-2 text-purple-600"
                  />
                  <h4 className="font-semibold mb-1">Качество</h4>
                  <p className="text-xs text-gray-600">
                    Проверенная платформа с тысячами продавцов
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            Выбрав план, вы сможете сразу же начать добавлять товары и принимать
            заказы
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}