export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export type NotificationType =
  | "order"
  | "support"
  | "system"
  | "promo"
  | "delivery"
  | "payment";

export interface NotificationTypeInfo {
  name: string;
  icon: string;
  color: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  supportMessages: boolean;
  deliveryUpdates: boolean;
  paymentNotifications: boolean;
}

export type NotificationFilter = "all" | NotificationType;
