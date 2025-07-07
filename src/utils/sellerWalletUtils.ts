import { SellerWalletTransaction } from "@/types/sellerWallet";

export const getTransactionIcon = (type: string): string => {
  switch (type) {
    case "deposit":
      return "Plus";
    case "withdrawal":
      return "Minus";
    case "tariff":
      return "Crown";
    case "advertising":
      return "Megaphone";
    case "commission":
      return "Percent";
    case "game_prize":
      return "Gift";
    default:
      return "CreditCard";
  }
};

export const getTransactionIconColor = (type: string): string => {
  switch (type) {
    case "deposit":
      return "text-green-600";
    case "withdrawal":
      return "text-red-600";
    case "tariff":
      return "text-purple-600";
    case "advertising":
      return "text-blue-600";
    case "commission":
      return "text-orange-600";
    case "game_prize":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

export const getTransactionColor = (type: string): string => {
  switch (type) {
    case "deposit":
    case "game_prize":
      return "text-green-600";
    case "withdrawal":
    case "tariff":
    case "advertising":
    case "commission":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export const getStatusBadgeProps = (status: string) => {
  switch (status) {
    case "completed":
      return {
        className: "bg-green-100 text-green-800",
        text: "Выполнено",
      };
    case "pending":
      return {
        className: "bg-yellow-100 text-yellow-800",
        text: "Обработка",
      };
    case "failed":
      return {
        className: "bg-red-100 text-red-800",
        text: "Ошибка",
      };
    default:
      return {
        className: "bg-gray-100 text-gray-800",
        text: status,
      };
  }
};

export const formatTransactionAmount = (
  transaction: SellerWalletTransaction,
): string => {
  const prefix =
    transaction.type === "deposit" || transaction.type === "game_prize"
      ? "+"
      : "-";
  return `${prefix}${transaction.amount.toFixed(2)} ₽`;
};

export const quickAmounts = [500, 1000, 2000, 5000];
