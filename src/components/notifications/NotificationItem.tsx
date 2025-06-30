import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Notification } from "@/types/notifications";
import { NOTIFICATION_TYPES } from "@/constants/notifications";
import { formatNotificationTime } from "@/utils/notifications";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onAction?: (actionUrl: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
}: NotificationItemProps) {
  const type = NOTIFICATION_TYPES[notification.type];

  const handleActionClick = () => {
    if (notification.actionUrl && onAction) {
      onAction(notification.actionUrl);
    }
  };

  return (
    <div
      className={`p-4 hover:bg-gray-50 transition-colors ${
        !notification.read ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${type.color}`}>
          <Icon name={type.icon as any} size={16} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{notification.title}</h3>
            <div className="flex items-center gap-2">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(notification.id)}
                className="p-1 h-auto"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500">
              {formatNotificationTime(notification.timestamp)}
            </span>

            <div className="flex gap-2">
              {!notification.read && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs"
                >
                  Прочитано
                </Button>
              )}
              {notification.actionUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleActionClick}
                  className="text-xs"
                >
                  Перейти
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
