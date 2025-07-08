import { useState, useEffect } from "react";
import { wsManager } from "@/services/websocket";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export const useRealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Обработчик новых уведомлений
    const handleNewNotification = (data: any) => {
      const notification: Notification = {
        id: data.id || Date.now().toString(),
        type: data.type || "info",
        title: data.title || "Уведомление",
        message: data.message || "",
        timestamp: new Date(data.timestamp || Date.now()),
        isRead: false,
      };

      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Показать браузерное уведомление если разрешено
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
        });
      }
    };

    // Обработчик обновления статуса заказа
    const handleOrderUpdate = (data: any) => {
      handleNewNotification({
        type: "success",
        title: "Обновление заказа",
        message: `Заказ #${data.orderId} ${data.status}`,
        timestamp: Date.now(),
      });
    };

    // Обработчик новых сообщений в чате
    const handleChatMessage = (data: any) => {
      handleNewNotification({
        type: "info",
        title: "Новое сообщение",
        message: `${data.sender}: ${data.message}`,
        timestamp: Date.now(),
      });
    };

    // Обработчик изменения цены товара
    const handlePriceChange = (data: any) => {
      handleNewNotification({
        type: "warning",
        title: "Изменение цены",
        message: `Цена на "${data.productName}" изменилась на ${data.priceChange}`,
        timestamp: Date.now(),
      });
    };

    // Обработчик акций и скидок
    const handlePromotion = (data: any) => {
      handleNewNotification({
        type: "success",
        title: "Новая акция!",
        message: data.message,
        timestamp: Date.now(),
      });
    };

    // Обработчик системных уведомлений
    const handleSystemNotification = (data: any) => {
      handleNewNotification({
        type: data.type || "info",
        title: data.title || "Системное уведомление",
        message: data.message,
        timestamp: Date.now(),
      });
    };

    // Подписываемся на события
    wsManager.on("notification", handleNewNotification);
    wsManager.on("order_update", handleOrderUpdate);
    wsManager.on("chat_message", handleChatMessage);
    wsManager.on("price_change", handlePriceChange);
    wsManager.on("promotion", handlePromotion);
    wsManager.on("system_notification", handleSystemNotification);

    // Запрашиваем разрешение на показ уведомлений
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      wsManager.off("notification", handleNewNotification);
      wsManager.off("order_update", handleOrderUpdate);
      wsManager.off("chat_message", handleChatMessage);
      wsManager.off("price_change", handlePriceChange);
      wsManager.off("promotion", handlePromotion);
      wsManager.off("system_notification", handleSystemNotification);
    };
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
    setUnreadCount(0);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    );
    setUnreadCount((prev) => {
      const removedNotification = notifications.find(
        (n) => n.id === notificationId,
      );
      return removedNotification && !removedNotification.isRead
        ? prev - 1
        : prev;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };
};
