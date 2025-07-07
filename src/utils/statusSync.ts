export interface StatusSyncEvent {
  type: "seller_status_change";
  sellerId: number;
  newStatus: "active" | "pending" | "blocked" | "revision" | "resubmitted";
  moderationComment?: string;
  timestamp: number;
}

export interface NotificationData {
  id: string;
  sellerId: number;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  timestamp: number;
  read: boolean;
}

class StatusSyncManager {
  private static instance: StatusSyncManager;
  private listeners: ((event: StatusSyncEvent) => void)[] = [];

  private constructor() {}

  static getInstance(): StatusSyncManager {
    if (!StatusSyncManager.instance) {
      StatusSyncManager.instance = new StatusSyncManager();
    }
    return StatusSyncManager.instance;
  }

  // Подписка на изменения статуса
  subscribe(listener: (event: StatusSyncEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Уведомление об изменении статуса
  notifyStatusChange(event: StatusSyncEvent) {
    // Сохраняем событие в localStorage для межвкладочной синхронизации
    localStorage.setItem("seller_status_event", JSON.stringify(event));

    // Уведомляем всех слушателей
    this.listeners.forEach((listener) => listener(event));

    // Создаем push-уведомление
    this.createNotification(event);
  }

  // Создание уведомления для продавца
  private createNotification(event: StatusSyncEvent) {
    const notification: NotificationData = {
      id: `${event.sellerId}-${event.timestamp}`,
      sellerId: event.sellerId,
      title: this.getNotificationTitle(event.newStatus),
      message: this.getNotificationMessage(
        event.newStatus,
        event.moderationComment,
      ),
      type: this.getNotificationType(event.newStatus),
      timestamp: event.timestamp,
      read: false,
    };

    // Сохраняем уведомление в localStorage
    const notifications = this.getNotifications();
    notifications.unshift(notification);

    // Ограничиваем количество уведомлений до 50
    if (notifications.length > 50) {
      notifications.splice(50);
    }

    localStorage.setItem("seller_notifications", JSON.stringify(notifications));
  }

  // Получение уведомлений для продавца
  getNotifications(sellerId?: number): NotificationData[] {
    try {
      const notifications = JSON.parse(
        localStorage.getItem("seller_notifications") || "[]",
      );
      return sellerId
        ? notifications.filter((n: NotificationData) => n.sellerId === sellerId)
        : notifications;
    } catch {
      return [];
    }
  }

  // Отметка уведомления как прочитанное
  markAsRead(notificationId: string) {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n,
    );
    localStorage.setItem("seller_notifications", JSON.stringify(updated));
  }

  // Получение заголовка уведомления
  private getNotificationTitle(status: string): string {
    switch (status) {
      case "active":
        return "🎉 Поздравляем! Ваш профиль одобрен";
      case "revision":
        return "📝 Требуется доработка профиля";
      case "resubmitted":
        return "🔄 Заявка отправлена на повторную проверку";
      case "blocked":
        return "🚫 Профиль заблокирован";
      default:
        return "📋 Изменение статуса профиля";
    }
  }

  // Получение сообщения уведомления
  private getNotificationMessage(status: string, comment?: string): string {
    switch (status) {
      case "active":
        return "Ваш профиль продавца успешно одобрен! Теперь вы можете полноценно пользоваться платформой.";
      case "revision":
        return (
          comment ||
          "Администратор запросил доработку вашего профиля. Проверьте детали в личном кабинете."
        );
      case "resubmitted":
        return "Ваша заявка отправлена на повторную проверку администратором. Ожидайте результат.";
      case "blocked":
        return (
          comment ||
          "Ваш профиль заблокирован. Обратитесь в службу поддержки для получения дополнительной информации."
        );
      default:
        return "Статус вашего профиля изменен. Проверьте актуальную информацию в личном кабинете.";
    }
  }

  // Получение типа уведомления
  private getNotificationType(
    status: string,
  ): "success" | "info" | "warning" | "error" {
    switch (status) {
      case "active":
        return "success";
      case "revision":
        return "warning";
      case "resubmitted":
        return "info";
      case "blocked":
        return "error";
      default:
        return "info";
    }
  }

  // Обновление статуса продавца
  updateStatus(data: {
    sellerId: number;
    newStatus: "active" | "pending" | "blocked" | "revision" | "resubmitted";
    moderationComment?: string;
  }) {
    const event: StatusSyncEvent = {
      type: "seller_status_change",
      sellerId: data.sellerId,
      newStatus: data.newStatus,
      moderationComment: data.moderationComment,
      timestamp: Date.now(),
    };

    this.notifyStatusChange(event);
  }

  // Очистка старых уведомлений (старше 30 дней)
  cleanupOldNotifications() {
    const notifications = this.getNotifications();
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const filtered = notifications.filter((n) => n.timestamp > thirtyDaysAgo);
    localStorage.setItem("seller_notifications", JSON.stringify(filtered));
  }
}

export const statusSyncManager = StatusSyncManager.getInstance();

// Слушатель для межвкладочной синхронизации
window.addEventListener("storage", (e) => {
  if (e.key === "seller_status_event" && e.newValue) {
    try {
      const event: StatusSyncEvent = JSON.parse(e.newValue);
      statusSyncManager.notifyStatusChange(event);
    } catch (error) {
      console.error("Ошибка парсинга события статуса:", error);
    }
  }
});
