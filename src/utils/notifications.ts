import { NotificationType } from "@/types/notifications";

export const formatNotificationTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "только что";
  if (diffMinutes < 60) return `${diffMinutes} мин назад`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`;

  const diffDays = Math.floor(diffMinutes / 1440);
  if (diffDays === 1) return "вчера";
  if (diffDays < 7) return `${diffDays} дн назад`;

  return date.toLocaleDateString("ru-RU");
};

export const getUnreadCount = (
  notifications: any[],
  type?: NotificationType,
): number => {
  if (!type) return notifications.filter((n) => !n.read).length;
  return notifications.filter((n) => n.type === type && !n.read).length;
};
