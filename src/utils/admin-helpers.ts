import { Shop, ShopStatus } from "@/types/admin";

export const getStatusColor = (status: ShopStatus): string => {
  const statusColors = {
    active: "bg-green-500",
    expired: "bg-red-500",
    inactive: "bg-yellow-500",
  } as const;

  return statusColors[status] || "bg-gray-500";
};

export const getStatusText = (status: ShopStatus): string => {
  const statusTexts = {
    active: "Активен",
    expired: "Истёк",
    inactive: "Неактивен",
  } as const;

  return statusTexts[status] || "Неизвестен";
};

export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.max(0, Math.min(100, (current / total) * 100));
};

export const formatDate = (dateString: string): string => {
  if (dateString === "Не оплачено") return dateString;

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  } catch {
    return dateString;
  }
};

export const validateActivationDays = (days: string): number | null => {
  const parsed = parseInt(days, 10);
  return parsed > 0 ? parsed : null;
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};
