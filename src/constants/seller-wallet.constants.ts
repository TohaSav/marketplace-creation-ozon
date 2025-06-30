import { WithdrawalMethod, SaleTransaction } from "@/types/seller-wallet.types";

export const WITHDRAWAL_METHODS: WithdrawalMethod[] = [
  {
    id: "bank",
    name: "Банковская карта",
    icon: "CreditCard",
    fee: 0.5,
    processingTime: "1-3 рабочих дня",
  },
  {
    id: "sbp",
    name: "СБП",
    icon: "Smartphone",
    fee: 0,
    processingTime: "Мгновенно",
  },
  {
    id: "yandex",
    name: "ЮMoney",
    icon: "Wallet",
    fee: 0.3,
    processingTime: "До 1 часа",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "DollarSign",
    fee: 1.2,
    processingTime: "3-5 рабочих дней",
  },
];

export const MOCK_TRANSACTIONS: SaleTransaction[] = [
  {
    id: "1",
    type: "sale",
    orderId: "12345",
    productName: "iPhone 15 Pro Max 256GB",
    customerName: "Иван Петров",
    amount: 119999,
    commission: 7199,
    netAmount: 112800,
    status: "completed",
    date: "2025-06-30T10:30:00",
  },
  {
    id: "2",
    type: "sale",
    orderId: "12346",
    productName: "AirPods Pro 2-го поколения",
    customerName: "Мария Сидорова",
    amount: 24999,
    commission: 1499,
    netAmount: 23500,
    status: "pending",
    date: "2025-06-29T15:20:00",
  },
  {
    id: "3",
    type: "withdrawal",
    orderId: "",
    productName: "",
    customerName: "",
    amount: -50000,
    commission: 250,
    netAmount: -50250,
    status: "completed",
    date: "2025-06-28T12:15:00",
  },
  {
    id: "4",
    type: "refund",
    orderId: "12340",
    productName: "MacBook Air M2",
    customerName: "Петр Иванов",
    amount: -89999,
    commission: 5399,
    netAmount: -84600,
    status: "processing",
    date: "2025-06-27T09:45:00",
  },
];

export const MIN_WITHDRAWAL_AMOUNT = 1000;

export const TRANSACTION_ICONS = {
  sale: "ShoppingCart",
  withdrawal: "ArrowUpFromLine",
  commission: "Percent",
  refund: "RotateCcw",
} as const;

export const TRANSACTION_COLORS = {
  sale: "text-green-600",
  withdrawal: "text-blue-600",
  commission: "text-orange-600",
  refund: "text-red-600",
} as const;

export const STATUS_COLORS = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
} as const;

export const STATUS_TEXT = {
  completed: "Завершено",
  pending: "Ожидает",
  processing: "Обработка",
} as const;
