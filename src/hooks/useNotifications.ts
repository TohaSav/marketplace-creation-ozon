import { useState, useEffect } from "react";
import {
  Notification,
  NotificationSettings,
  NotificationType,
} from "@/types/notifications";
import {
  SAMPLE_NOTIFICATIONS,
  DEFAULT_NOTIFICATION_SETTINGS,
} from "@/constants/notifications";
import { getUnreadCount } from "@/utils/notifications";

const STORAGE_KEYS = {
  NOTIFICATIONS: "notifications",
  SETTINGS: "notificationSettings",
} as const;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(
    DEFAULT_NOTIFICATION_SETTINGS,
  );

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(SAMPLE_NOTIFICATIONS);
      localStorage.setItem(
        STORAGE_KEYS.NOTIFICATIONS,
        JSON.stringify(SAMPLE_NOTIFICATIONS),
      );
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Сохранение уведомлений в localStorage
  const saveNotifications = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(newNotifications),
    );
  };

  // Сохранение настроек в localStorage
  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  };

  // Отметить уведомление как прочитанное
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    saveNotifications(updatedNotifications);
  };

  // Отметить все уведомления как прочитанные
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    saveNotifications(updatedNotifications);
  };

  // Удалить уведомление
  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id,
    );
    saveNotifications(updatedNotifications);
  };

  // Очистить все уведомления
  const clearAll = () => {
    saveNotifications([]);
  };

  // Фильтрация уведомлений по типу
  const getFilteredNotifications = (filter: string) => {
    if (filter === "all") return notifications;
    return notifications.filter((notification) => notification.type === filter);
  };

  // Получить количество непрочитанных уведомлений
  const getUnreadCountForType = (type?: NotificationType) => {
    return getUnreadCount(notifications, type);
  };

  // Обновить настройку
  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  // Добавить новое уведомление (для системных нужд)
  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
  };

  return {
    notifications,
    settings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getFilteredNotifications,
    getUnreadCountForType,
    updateSetting,
    addNotification,
  };
};
