import { SellerCard as SellerCardType, CARD_DESIGNS } from "@/types/card.types";
import { formatCardBalance } from "@/utils/cardGenerator";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SellerCardProps {
  card: SellerCardType;
  showFullNumber?: boolean;
  className?: string;
}

export function SellerCard({
  card,
  showFullNumber = false,
  className = "",
}: SellerCardProps) {
  const design = CARD_DESIGNS[card.cardType];

  const formatCardNumber = (number: string) => {
    if (showFullNumber) {
      return number;
    }
    const cleaned = number.replace(/\s/g, "");
    const firstFour = cleaned.slice(0, 4);
    const lastFour = cleaned.slice(-4);
    return `${firstFour} •••• •••• ${lastFour}`;
  };

  const getCardTypeLabel = (type: SellerCardType["cardType"]) => {
    const labels = {
      standard: "Standard",
      premium: "Premium",
      elite: "Elite",
    };
    return labels[type];
  };

  const getStatusColor = (status: SellerCardType["status"]) => {
    const colors = {
      active: "text-green-400",
      blocked: "text-red-400",
      suspended: "text-yellow-400",
    };
    return colors[status];
  };

  return (
    <Card
      className={`relative w-full max-w-md h-56 overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient}`}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          {design.pattern === "waves" && (
            <svg
              className="w-full h-full"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 C100,50 200,150 400,100 L400,200 L0,200 Z"
                fill="currentColor"
              />
            </svg>
          )}
          {design.pattern === "geometric" && (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-current rotate-45" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-current rotate-12" />
              <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-current rotate-45" />
            </div>
          )}
        </div>
      </div>

      {/* Card content */}
      <div
        className={`relative z-10 p-6 h-full flex flex-col justify-between ${design.textColor}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">Calibre Store</h3>
            <p className={`text-sm ${design.accentColor}`}>
              {getCardTypeLabel(card.cardType)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CreditCard" size={24} className={design.accentColor} />
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(card.status)}`}
            />
          </div>
        </div>

        {/* Card number */}
        <div className="flex-1 flex items-center">
          <div className="font-mono text-lg tracking-wider">
            {formatCardNumber(card.cardNumber)}
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex justify-between items-end">
          <div>
            <p className={`text-xs ${design.accentColor} mb-1`}>Баланс</p>
            <p className="text-2xl font-bold">
              {formatCardBalance(card.balance)}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs ${design.accentColor} mb-1`}>Выдана</p>
            <p className="text-sm">
              {new Date(card.issuedDate).toLocaleDateString("ru-RU", {
                month: "2-digit",
                year: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Chip */}
      <div className="absolute top-20 left-6 w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md opacity-90">
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm">
          <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-800 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}

// Компонент для отображения мини-карты в списке
export function SellerCardMini({ card, className = "" }: SellerCardProps) {
  const design = CARD_DESIGNS[card.cardType];

  return (
    <Card className={`relative w-full h-20 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${design.gradient}`} />
      <div
        className={`relative z-10 p-4 h-full flex items-center justify-between ${design.textColor}`}
      >
        <div>
          <p className="text-sm font-medium">Calibre Store</p>
          <p className={`text-xs ${design.accentColor}`}>
            •••• {card.cardNumber.slice(-4)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">{formatCardBalance(card.balance)}</p>
          <p className={`text-xs ${design.accentColor}`}>
            {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)}
          </p>
        </div>
      </div>
    </Card>
  );
}
