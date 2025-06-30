import {
  TransactionType,
  TransactionStatus,
  WithdrawalMethod,
} from "@/types/seller-wallet.types";
import {
  TRANSACTION_ICONS,
  TRANSACTION_COLORS,
  STATUS_COLORS,
  STATUS_TEXT,
} from "@/constants/seller-wallet.constants";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("ru-RU");
};

export const getTransactionIcon = (type: TransactionType): string => {
  return TRANSACTION_ICONS[type] || "Circle";
};

export const getTransactionColor = (type: TransactionType): string => {
  return TRANSACTION_COLORS[type] || "text-gray-600";
};

export const getStatusColor = (status: TransactionStatus): string => {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
};

export const getStatusText = (status: TransactionStatus): string => {
  return STATUS_TEXT[status] || status;
};

export const calculateWithdrawalFee = (
  amount: number,
  method: WithdrawalMethod,
): number => {
  return (amount * method.fee) / 100;
};

export const calculateNetWithdrawal = (
  amount: number,
  method: WithdrawalMethod,
): number => {
  return amount - calculateWithdrawalFee(amount, method);
};
