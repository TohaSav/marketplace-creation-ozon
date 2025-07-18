import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

interface TariffPlan {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  features: string[];
  isPopular?: boolean;
  color: string;
}

const tariffPlans: TariffPlan[] = [
  {
    id: "trial",
    name: "Пробный",
    price: 0,
    monthlyPrice: 0,
    features: [
      "Неограниченно товаров",
      "Все функции Premium",
      "7 дней бесплатно",
      "⚠️ Товары скроются после"
    ],
    color: "from-green-400 to-green-600"
  },
  {
    id: "maxi",
    name: "Макси",
    price: 3000,
    monthlyPrice: 300,
    features: [
      "До 500 товаров",
      "Продвинутая аналитика",
      "Приоритетная поддержка",
      "Интеграции с соцсетями",
      "Персональный менеджер"
    ],
    isPopular: true,
    color: "from-green-500 to-green-600"
  },
  {
    id: "vip",
    name: "VIP",
    price: 5000,
    monthlyPrice: 500,
    features: [
      "Безлимитные товары",
      "Полная аналитика",
      "24/7 поддержка",
      "Все интеграции",
      "Персональный менеджер",
      "Реклама и продвижение"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "premium",
    name: "Премиум",
    price: 10000,
    monthlyPrice: 1000,
    features: [
      "Всё из VIP",
      "Белая маркировка",
      "API доступ",
      "Кастомные интеграции",
      "Выделенный сервер",
      "Индивидуальные условия"
    ],
    color: "from-orange-500 to-red-500"
  }
];

interface PaymentRequiredModalProps {
  isOpen: boolean;
}

export default function PaymentRequiredModal({ isOpen }: PaymentRequiredModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("trial");
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "yookassa">("yookassa");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, updateUser } = useAuth();

  if (!isOpen || !user) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Имитация обработки платежа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Обновляем пользователя с активной подпиской
      const selectedTariff = tariffPlans.find(plan => plan.id === selectedPlan);
      if (selectedTariff) {
        const updatedUser = {
          ...user,
          subscription: {
            isActive: true,
            planType: "monthly" as const,
            planName: selectedTariff.name,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            autoRenew: true
          }
        };
        
        updateUser(updatedUser);
      }
    } catch (error) {
      console.error("Ошибка оплаты:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="text-center">
            <Icon name="CreditCard" size={48} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Выберите тарифный план
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Для продолжения работы в личном кабинете необходимо выбрать и оплатить тарифный план. 
              Это даст доступ ко всем функциям платформы.
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Тарифные планы */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tariffPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg",
                  selectedPlan === plan.id
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300",
                  plan.isPopular && "ring-2 ring-green-500 ring-offset-2"
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Популярный
                    </span>
                  </div>
                )}

                <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-r mb-4 flex items-center justify-center", plan.color)}>
                  <Icon name="Star" className="text-white" size={24} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price === 0 ? 'БЕСПЛАТНО' : `₽${plan.price.toLocaleString()}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.price === 0 ? 'на 7 дней' : `₽${plan.monthlyPrice}/месяц`}
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={cn(
                  "w-6 h-6 rounded-full border-2 mx-auto",
                  selectedPlan === plan.id
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                )}>
                  {selectedPlan === plan.id && (
                    <Icon name="Check" size={14} className="text-white m-0.5" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Способ оплаты */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Способ оплаты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
                  paymentMethod === "yookassa"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setPaymentMethod("yookassa")}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2",
                    paymentMethod === "yookassa"
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  )}>
                    {paymentMethod === "yookassa" && (
                      <Icon name="Check" size={12} className="text-white m-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">ЮKassa</div>
                    <div className="text-sm text-gray-500">Банковская карта, СБП, кошельки</div>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
                  paymentMethod === "wallet"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2",
                    paymentMethod === "wallet"
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  )}>
                    {paymentMethod === "wallet" && (
                      <Icon name="Check" size={12} className="text-white m-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Кошелек продавца</div>
                    <div className="text-sm text-gray-500">
                      Баланс: ₽{(user.balance || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Итого и кнопка оплаты */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  Тариф "{tariffPlans.find(p => p.id === selectedPlan)?.name}"
                </div>
                <div className="text-sm text-gray-500">Подписка на 1 месяц</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₽{tariffPlans.find(p => p.id === selectedPlan)?.price.toLocaleString()}
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || (paymentMethod === "wallet" && (user.balance || 0) < (tariffPlans.find(p => p.id === selectedPlan)?.price || 0))}
              className="w-full h-12 text-lg font-medium"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Обработка платежа...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Оплатить ₽{tariffPlans.find(p => p.id === selectedPlan)?.price.toLocaleString()}
                </div>
              )}
            </Button>

            {paymentMethod === "wallet" && (user.balance || 0) < (tariffPlans.find(p => p.id === selectedPlan)?.price || 0) && (
              <p className="text-sm text-red-500 mt-2 text-center">
                Недостаточно средств в кошельке. Пополните баланс или выберите другой способ оплаты.
              </p>
            )}
          </div>
        </div>

        {/* Информация об условиях */}
        <div className="border-t bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Icon name="Shield" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Безопасная оплата</div>
                <div>Все платежи защищены SSL-шифрованием</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="RefreshCw" size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Автопродление</div>
                <div>Подписка продлевается автоматически</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Headphones" size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Поддержка 24/7</div>
                <div>Помощь в любое время суток</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}