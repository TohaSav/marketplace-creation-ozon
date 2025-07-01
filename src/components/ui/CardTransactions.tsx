import { CardTransaction } from "@/types/card.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { formatCardBalance } from "@/utils/cardGenerator";

interface CardTransactionsProps {
  transactions: CardTransaction[];
  className?: string;
}

export function CardTransactions({
  transactions,
  className = "",
}: CardTransactionsProps) {
  const getTransactionIcon = (type: CardTransaction["type"]) => {
    const icons = {
      purchase: "ShoppingCart",
      withdrawal: "ArrowDown",
      bonus: "Gift",
      refund: "RotateCcw",
    };
    return icons[type] || "DollarSign";
  };

  const getTransactionColor = (type: CardTransaction["type"]) => {
    const colors = {
      purchase: "text-green-600",
      withdrawal: "text-red-600",
      bonus: "text-purple-600",
      refund: "text-orange-600",
    };
    return colors[type] || "text-gray-600";
  };

  const getStatusBadge = (status: CardTransaction["status"]) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };

    const labels = {
      completed: "Выполнено",
      pending: "В обработке",
      failed: "Ошибка",
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="CreditCard" size={20} />
          История операций
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon
              name="Receipt"
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />
            <p>Пока нет операций</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 10).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full bg-white ${getTransactionColor(transaction.type)}`}
                  >
                    <Icon
                      name={getTransactionIcon(transaction.type) as any}
                      size={16}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "purchase" ||
                      transaction.type === "bonus"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "purchase" ||
                    transaction.type === "bonus"
                      ? "+"
                      : "-"}
                    {formatCardBalance(transaction.amount)}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}

            {transactions.length > 10 && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Показано 10 из {transactions.length} операций
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
