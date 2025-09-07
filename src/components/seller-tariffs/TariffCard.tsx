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

interface TariffCardProps {
  tariff: TariffPlan;
  loading: boolean;
  selectedTariff: string | null;
  paymentMethod: "wallet" | "yukassa";
  yookassaActive: boolean;
  walletBalance: number;
  onPayment: (tariffId: string) => void;
}

export default function TariffCard({
  tariff,
  loading,
  selectedTariff,
  paymentMethod,
  yookassaActive,
  walletBalance,
  onPayment,
}: TariffCardProps) {
  const isDisabled = loading ||
    (paymentMethod === "yukassa" && !yookassaActive && tariff.id !== "trial") ||
    (paymentMethod === "wallet" && walletBalance < tariff.price);

  const getButtonContent = () => {
    if (loading && selectedTariff === tariff.id) {
      return (
        <>
          <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
          Обработка...
        </>
      );
    }

    if (paymentMethod === "yukassa" && !yookassaActive && tariff.id !== "trial") {
      return (
        <>
          <Icon name="Lock" size={16} className="mr-2" />
          Платежи недоступны
        </>
      );
    }

    if (paymentMethod === "wallet" && walletBalance < tariff.price) {
      return (
        <>
          <Icon name="AlertCircle" size={16} className="mr-2" />
          Недостаточно средств
        </>
      );
    }

    if (tariff.id === "trial") {
      return (
        <>
          <Icon name="Gift" size={16} className="mr-2" />
          Активировать бесплатно
        </>
      );
    }

    if (paymentMethod === "wallet") {
      return (
        <>
          <Icon name="Wallet" size={16} className="mr-2" />
          Оплатить с кошелька
        </>
      );
    }

    return (
      <>
        <Icon name="CreditCard" size={16} className="mr-2" />
        Выбрать и оплатить
      </>
    );
  };

  const getButtonClass = () => {
    if (isDisabled) {
      return "w-full bg-gray-400 hover:bg-gray-400 cursor-not-allowed";
    }

    if (tariff.id === "trial") {
      return "w-full bg-green-600 hover:bg-green-700";
    }

    if (tariff.popular) {
      return "w-full bg-purple-600 hover:bg-purple-700";
    }

    return "w-full bg-gray-800 hover:bg-gray-900";
  };

  return (
    <Card
      className={`relative ${
        tariff.id === "trial"
          ? "ring-2 ring-green-500 shadow-lg"
          : tariff.popular
            ? "ring-2 ring-purple-500 shadow-lg scale-105"
            : ""
      }`}
    >
      {tariff.id === "trial" && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-green-500 text-white px-4 py-1">
            Бесплатно
          </Badge>
        </div>
      )}
      {tariff.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-purple-500 text-white px-4 py-1">
            Популярный выбор
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">
          {tariff.name}
        </CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-purple-600">
            {tariff.price.toLocaleString()} ₽
          </span>
          <span className="text-gray-500 ml-2">
            / {tariff.duration}
          </span>
        </div>
        {tariff.savings && (
          <Badge
            variant="outline"
            className="mt-2 text-green-600 border-green-600"
          >
            {tariff.savings}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-8">
          {tariff.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Icon
                name="Check"
                size={20}
                className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
              />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onPayment(tariff.id)}
          disabled={isDisabled}
          className={getButtonClass()}
        >
          {getButtonContent()}
        </Button>
      </CardContent>
    </Card>
  );
}