import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { statusSyncManager, NotificationData } from "@/utils/statusSync";
import { useAuth } from "@/context/AuthContext";

export default function SellerNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.id) return;

    // Загружаем уведомления
    const loadNotifications = () => {
      const userNotifications = statusSyncManager.getNotifications(user.id);
      setNotifications(userNotifications);
      setUnreadCount(userNotifications.filter((n) => !n.read).length);
    };

    loadNotifications();

    // Подписываемся на новые уведомления
    const unsubscribe = statusSyncManager.subscribe((event) => {
      if (event.sellerId === user.id) {
        loadNotifications();
      }
    });

    return unsubscribe;
  }, [user?.id]);

  const handleMarkAsRead = (notificationId: string) => {
    statusSyncManager.markAsRead(notificationId);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "CheckCircle";
      case "warning":
        return "AlertTriangle";
      case "error":
        return "XCircle";
      default:
        return "Info";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Только что";
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} дн назад`;
    return date.toLocaleDateString();
  };

  if (!user || user.userType !== "seller") return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Icon name="Bell" size={16} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Icon name="Bell" size={16} />
              Уведомления
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Icon
                    name="Bell"
                    size={32}
                    className="mx-auto mb-2 text-gray-300"
                  />
                  <p>У вас пока нет уведомлений</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b transition-colors ${
                        notification.read
                          ? "bg-white"
                          : "bg-blue-50 hover:bg-blue-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          name={getNotificationIcon(notification.type) as any}
                          size={16}
                          className={`mt-1 ${getNotificationColor(notification.type)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                                className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-100"
                              >
                                <Icon name="Check" size={12} />
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
