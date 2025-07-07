import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { SellerWalletTransaction } from "@/types/sellerWallet";
import {
  getTransactionIcon,
  getTransactionIconColor,
  getTransactionColor,
  getStatusBadgeProps,
  formatTransactionAmount,
} from "@/utils/sellerWalletUtils";

interface TransactionHistoryProps {
  transactions: SellerWalletTransaction[];
}

export const TransactionHistory = ({
  transactions,
}: TransactionHistoryProps) => {
  const TransactionItem = ({
    transaction,
  }: {
    transaction: SellerWalletTransaction;
  }) => {
    const statusProps = getStatusBadgeProps(transaction.status);

    return (
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <Icon
            name={getTransactionIcon(transaction.type)}
            size={16}
            className={getTransactionIconColor(transaction.type)}
          />
          <div>
            <p className="font-medium text-gray-900">
              {transaction.description}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p
              className={`font-semibold ${getTransactionColor(transaction.type)}`}
            >
              {formatTransactionAmount(transaction)}
            </p>
            <Badge className={statusProps.className}>{statusProps.text}</Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="History" size={20} />
          История операций
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="FileText"
                size={64}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Нет операций
              </h3>
              <p className="text-gray-600">
                Здесь будут отображаться все ваши транзакции
              </p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
