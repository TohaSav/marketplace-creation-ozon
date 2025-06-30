import { Product, Order, SellerStats } from "@/types/seller-dashboard.types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 119999,
    stock: 15,
    sold: 23,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "AirPods Pro 2-го поколения",
    price: 24999,
    stock: 8,
    sold: 45,
    status: "active",
    image: "/placeholder.svg",
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "12345",
    customerName: "Иван Петров",
    product: "iPhone 15 Pro Max",
    amount: 119999,
    status: "new",
    date: "2024-06-30",
  },
  {
    id: "12346",
    customerName: "Мария Сидорова",
    product: "AirPods Pro",
    amount: 24999,
    status: "shipped",
    date: "2024-06-29",
  },
];

export const MOCK_STATS: SellerStats = {
  totalSales: 2450000,
  ordersCount: 156,
  productsCount: 23,
  rating: 4.8,
  balance: 850000,
};

export const ORDER_STATUS_COLORS = {
  new: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

export const ORDER_STATUS_TEXT = {
  new: "Новый",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
} as const;

export const PRODUCT_STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  draft: "bg-yellow-100 text-yellow-800",
} as const;

export const PRODUCT_STATUS_TEXT = {
  active: "Активный",
  inactive: "Неактивный",
  draft: "Черновик",
} as const;

export const STATS_CARDS_CONFIG = [
  {
    key: "totalSales",
    title: "Общие продажи",
    icon: "TrendingUp",
    color: "text-green-500",
    format: "currency",
  },
  {
    key: "ordersCount",
    title: "Заказы",
    icon: "Package",
    color: "text-blue-500",
    format: "number",
  },
  {
    key: "productsCount",
    title: "Товары",
    icon: "Box",
    color: "text-purple-500",
    format: "number",
  },
  {
    key: "rating",
    title: "Рейтинг",
    icon: "Award",
    color: "text-yellow-500",
    format: "rating",
  },
  {
    key: "balance",
    title: "Баланс",
    icon: "Wallet",
    color: "text-green-500",
    format: "currency",
  },
] as const;
