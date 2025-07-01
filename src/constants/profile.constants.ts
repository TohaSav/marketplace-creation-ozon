import { ProfileTab } from "@/types/profile.types";

export const PROFILE_TABS: ProfileTab[] = [
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "orders", label: "Заказы", icon: "Package" },
  { id: "favorites", label: "Избранное", icon: "Heart" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export const NOTIFICATION_SETTINGS = [
  {
    id: "email",
    title: "Email уведомления",
    description: "О статусе заказов и акциях",
    enabled: true,
  },
  {
    id: "sms",
    title: "SMS уведомления",
    description: "О доставке заказов",
    enabled: false,
  },
  {
    id: "push",
    title: "Push уведомления",
    description: "В браузере",
    enabled: true,
  },
];

export const SECURITY_ACTIONS = [
  {
    id: "password",
    title: "Изменить пароль",
    icon: "Key",
  },
  {
    id: "2fa",
    title: "Двухфакторная аутентификация",
    icon: "Shield",
  },
];

export const PRIVACY_ACTIONS = [
  {
    id: "download",
    title: "Скачать мои данные",
    icon: "Download",
    variant: "outline" as const,
  },
  {
    id: "delete",
    title: "Удалить аккаунт",
    icon: "Trash2",
    variant: "destructive" as const,
  },
];
