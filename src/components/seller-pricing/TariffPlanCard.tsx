import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TariffPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

interface TariffPlanCardProps {
  tariff: TariffPlan;
  loading: boolean;
  selectedTariff: string | null;
  paymentMethod: "wallet" | "yukassa";
  yookassaActive: boolean;
  walletBalance: number;
  onPayment: (tariffId: string) => void;
}

export default function TariffPlanCard({
  tariff,
  loading,
  selectedTariff,
  paymentMethod,
  yookassaActive,
  walletBalance,
  onPayment,
}: TariffPlanCardProps) {
  const isDisabled = 
    loading ||
    (paymentMethod === "yukassa" && !yookassaActive) ||
    (paymentMethod === "wallet" && walletBalance < tariff.price);

  const getButtonVariant = () => {
    if (isDisabled) return "bg-gray-400 hover:bg-gray-400 cursor-not-allowed";
    if (tariff.id === "trial") return "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg";
    if (tariff.popular) return "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg";
    return "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black shadow-lg";
  };

  const getButtonText = () => {
    if (loading && selectedTariff === tariff.id) {
      return (
        <>
          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
          Обработка...
        </>
      );
    }
    if (paymentMethod === "yukassa" && !yookassaActive) {
      return (
        <>
          <Icon name="Lock" size={20} className="mr-2" />
          Платежи недоступны
        </>
      );
    }
    if (paymentMethod === "wallet" && walletBalance < tariff.price) {
      return (
        <>
          <Icon name="AlertCircle" size={20} className="mr-2" />
          Недостаточно средств
        </>
      );
    }
    if (paymentMethod === "wallet") {
      return (
        <>
          <Icon name="Wallet" size={20} className="mr-2" />
          Оплатить с кошелька
        </>
      );
    }
    return (
      <>
        <Icon name="CreditCard" size={20} className="mr-2" />
        Выбрать и оплатить
      </>
    );
  };

  return (
    <Card
      className={`relative transition-all duration-300 transform hover:scale-105 border-0 shadow-xl ${
        tariff.id === "trial"
          ? "bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-400"
          : tariff.popular
            ? "bg-gradient-to-br from-purple-50 to-indigo-50 ring-2 ring-purple-400 scale-110"
            : "bg-gradient-to-br from-gray-50 to-blue-50"
      }`}
    >
      {tariff.id === "trial" && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
            🎁 Бесплатно
          </Badge>
        </div>
      )}
      {tariff.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
            ⭐ Популярный выбор
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-6 pt-8">
        <CardTitle className="text-3xl font-bold text-gray-800">
          {tariff.name}
        </CardTitle>
        <div className="mt-6">
          <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {tariff.price.toLocaleString()} ₽
          </span>
          <span className="text-gray-500 ml-2 text-lg">
            / {tariff.duration}
          </span>
        </div>
        {tariff.savings && (
          <Badge
            variant="outline"
            className="mt-3 text-green-600 border-green-400 bg-green-50 font-semibold"
          >
            💰 {tariff.savings}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="px-6 pb-8">
        <ul className="space-y-4 mb-8">
          {tariff.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="p-1 bg-green-100 rounded-full mr-3 mt-0.5">
                <Icon
                  name="Check"
                  size={16}
                  className="text-green-600"
                />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onPayment(tariff.id)}
          disabled={isDisabled}
          className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${getButtonVariant()}`}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
}