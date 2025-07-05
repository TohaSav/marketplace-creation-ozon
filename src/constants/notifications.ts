import { NotificationTypeInfo, Notification } from "@/types/notifications";

export const NOTIFICATION_TYPES: Record<string, NotificationTypeInfo> = {
  order: {
    name: "Заказы",
    icon: "ShoppingCart",
    color: "bg-blue-100 text-blue-800",
  },
  support: {
    name: "Поддержка",
    icon: "MessageCircle",
    color: "bg-green-100 text-green-800",
  },
  system: {
    name: "Система",
    icon: "Settings",
    color: "bg-gray-100 text-gray-800",
  },
  promo: {
    name: "Акции",
    icon: "Gift",
    color: "bg-purple-100 text-purple-800",
  },
  delivery: {
    name: "Доставка",
    icon: "Truck",
    color: "bg-orange-100 text-orange-800",
  },
  payment: {
    name: "Оплата",
    icon: "CreditCard",
    color: "bg-red-100 text-red-800",
  },
};

export const SAMPLE_NOTIFICATIONS: Notification[] = [];

export const DEFAULT_NOTIFICATION_SETTINGS = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  orderUpdates: true,
  promotions: true,
  supportMessages: true,
  deliveryUpdates: true,
  paymentNotifications: true,
};
