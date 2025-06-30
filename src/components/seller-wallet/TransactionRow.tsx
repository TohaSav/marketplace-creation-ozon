import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { SaleTransaction } from "@/types/seller-wallet.types";
import {
  formatDate,
  formatCurrency,
  getTransactionIcon,
  getTransactionColor,
  getStatusColor,
  getStatusText,
} from "@/utils/seller-wallet.utils";

interface TransactionRowProps {
  transaction: SaleTransaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const getTransactionTypeText = (type: string) => {
    switch (type) {
      case "sale":
        return "Продажа";
      case "withdrawal":
        return "Вывод";
      case "commission":
        return "Комиссия";
      case "refund":
        return "Возврат";
      default:
        return type;
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-gray-100 mr-3">
            <Icon
              name={getTransactionIcon(transaction.type) as any}
              size={16}
              className={getTransactionColor(transaction.type)}
            />
          </div>
          <div className="text-sm">
            {getTransactionTypeText(transaction.type)}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div>
          {transaction.orderId && (
            <div className="font-medium text-sm">#{transaction.orderId}</div>
          )}
          {transaction.productName && (
            <div className="text-xs text-gray-600 truncate max-w-[150px]">
              {transaction.productName}
            </div>
          )}
          {transaction.type === "withdrawal" && (
            <div className="text-sm font-medium">Вывод средств</div>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="text-sm">{transaction.customerName || "-"}</div>
      </TableCell>

      <TableCell>
        <div
          className={`font-semibold ${
            transaction.amount > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.amount > 0 ? "+" : ""}
          {formatCurrency(transaction.amount)} ₽
        </div>
      </TableCell>

      <TableCell>
        <div className="text-sm text-orange-600">
          -{formatCurrency(transaction.commission)} ₽
        </div>
      </TableCell>

      <TableCell>
        <div
          className={`font-semibold ${
            transaction.netAmount > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.netAmount > 0 ? "+" : ""}
          {formatCurrency(transaction.netAmount)} ₽
        </div>
      </TableCell>

      <TableCell>
        <Badge className={getStatusColor(transaction.status)}>
          {getStatusText(transaction.status)}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="text-sm text-gray-600">
          {formatDate(transaction.date)}
        </div>
      </TableCell>
    </TableRow>
  );
}
