import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Notification } from "@/types/notifications";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onAction?: (actionUrl: string) => void;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
  onAction,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <Icon name="Bell" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет уведомлений
          </h3>
          <p className="text-gray-500">Здесь будут показаны ваши уведомления</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ScrollArea className="h-[600px]">
        <div className="divide-y">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              onAction={onAction}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
