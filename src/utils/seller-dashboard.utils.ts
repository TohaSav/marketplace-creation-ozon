import { OrderStatus, ProductStatus } from "@/types/seller-dashboard.types";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_TEXT,
  PRODUCT_STATUS_COLORS,
  PRODUCT_STATUS_TEXT,
} from "@/constants/seller-dashboard.constants";

export const formatCurrency = (amount: number): string => {
  return `₽${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU");
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  return ORDER_STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
};

export const getOrderStatusText = (status: OrderStatus): string => {
  return ORDER_STATUS_TEXT[status] || status;
};

export const getProductStatusColor = (status: ProductStatus): string => {
  return PRODUCT_STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
};

export const getProductStatusText = (status: ProductStatus): string => {
  return PRODUCT_STATUS_TEXT[status] || status;
};

export const calculateConversionRate = (
  orders: number,
  views: number,
): number => {
  return views > 0 ? (orders / views) * 100 : 0;
};

export const calculateAverageOrderValue = (
  totalSales: number,
  ordersCount: number,
): number => {
  return ordersCount > 0 ? totalSales / ordersCount : 0;
};

export const formatStatValue = (value: number, format: string): string => {
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "rating":
      return value.toFixed(1);
    case "number":
    default:
      return value.toString();
  }
};
