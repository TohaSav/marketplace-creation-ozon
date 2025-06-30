import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/seller-wallet.utils";
import { MIN_WITHDRAWAL_AMOUNT } from "@/constants/seller-wallet.constants";

interface BalanceCardProps {
  type: "available" | "pending";
  amount: number;
  onWithdraw?: () => void;
}

export default function BalanceCard({
  type,
  amount,
  onWithdraw,
}: BalanceCardProps) {
  const isAvailable = type === "available";

  const config = {
    available: {
      title: "Доступно для вывода",
      subtitle: "Чистая прибыль от продаж",
      gradient: "from-green-600 to-emerald-600",
      icon: "Wallet",
      secondaryIcon: "TrendingUp",
    },
    pending: {
      title: "В обработке",
      subtitle: "Ожидает подтверждения доставки",
      gradient: "from-orange-500 to-yellow-500",
      icon: "Clock",
      secondaryIcon: "RefreshCw",
    },
  };

  const cardConfig = config[type];

  return (
    <Card className={`bg-gradient-to-r ${cardConfig.gradient} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon name={cardConfig.icon as any} size={24} className="mr-3" />
            <h3 className="text-lg font-semibold">{cardConfig.title}</h3>
          </div>
          <Icon
            name={cardConfig.secondaryIcon as any}
            size={20}
            className="opacity-70"
          />
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold">{formatCurrency(amount)} ₽</p>
          <p className="text-sm opacity-80 mt-1">{cardConfig.subtitle}</p>
        </div>

        {isAvailable && (
          <>
            <Button
              onClick={onWithdraw}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
              disabled={amount < MIN_WITHDRAWAL_AMOUNT}
            >
              <Icon name="ArrowUpFromLine" size={16} className="mr-2" />
              Вывести средства
            </Button>
            {amount < MIN_WITHDRAWAL_AMOUNT && (
              <p className="text-xs opacity-70 mt-2">
                Минимальная сумма для вывода:{" "}
                {formatCurrency(MIN_WITHDRAWAL_AMOUNT)} ₽
              </p>
            )}
          </>
        )}

        {!isAvailable && (
          <div className="text-xs opacity-70">
            Средства будут доступны после подтверждения получения товаров
            покупателями
          </div>
        )}
      </CardContent>
    </Card>
  );
}
