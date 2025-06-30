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

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Заказ в пути",
    message: "Ваш заказ #12345 передан в службу доставки",
    type: "delivery",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: "/orders",
  },
  {
    id: "2",
    title: "Ответ службы поддержки",
    message: "Получен ответ на ваш запрос о возврате товара",
    type: "support",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: "/support",
  },
  {
    id: "3",
    title: "Скидка 20% на электронику",
    message: "Специальное предложение действует до конца недели",
    type: "promo",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "4",
    title: "Оплата получена",
    message: "Платеж за заказ #12344 успешно обработан",
    type: "payment",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: "/orders",
  },
  {
    id: "5",
    title: "Обновление системы",
    message: "Проведены технические работы для улучшения сервиса",
    type: "system",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

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
