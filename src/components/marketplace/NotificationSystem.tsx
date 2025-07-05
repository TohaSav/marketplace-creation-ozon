import React, { useState, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  AlertCircle,
  ShoppingCart,
  CreditCard,
  Package,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return <Package size={16} className="text-blue-500" />;
    case "payment":
      return <CreditCard size={16} className="text-green-500" />;
    case "product":
      return <ShoppingCart size={16} className="text-purple-500" />;
    case "promotion":
      return <Megaphone size={16} className="text-orange-500" />;
    default:
      return <AlertCircle size={16} className="text-gray-500" />;
  }
};

export const NotificationSystem: React.FC = () => {
  const { state, markNotificationAsRead } = useMarketplace();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const unreadCount = state.notifications.filter((n) => !n.isRead).length;
  const displayedNotifications = showAll
    ? state.notifications
    : state.notifications.slice(0, 5);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    state.notifications.forEach((notification) => {
      if (!notification.isRead) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  // Auto-close notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && unreadCount === 0) {
        setIsOpen(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, unreadCount]);

  return (
    <>
      {/* Floating notification indicator */}
      {unreadCount > 0 && !isOpen && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="rounded-full shadow-lg"
          >
            <Bell size={16} className="mr-2" />
            {unreadCount}
          </Button>
        </div>
      )}

      {/* Notification Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Уведомления</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs h-auto p-1"
                >
                  Прочитать все
                </Button>
              )}
            </SheetTitle>
            <SheetDescription>
              {unreadCount > 0
                ? `У вас ${unreadCount} непрочитанных уведомлений`
                : "Все уведомления прочитаны"}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
            <div className="space-y-3">
              {displayedNotifications.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-gray-500">
                      <Bell size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Уведомлений пока нет</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                displayedNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer transition-all ${
                      notification.isRead
                        ? "bg-gray-50 opacity-75"
                        : "bg-white shadow-sm border-l-4 border-l-blue-500"
                    }`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          <CardTitle className="text-sm font-medium">
                            {notification.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(notification.createdAt, {
                              addSuffix: true,
                              locale: ru,
                            })}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}

              {state.notifications.length > 5 && !showAll && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowAll(true)}
                >
                  Показать все ({state.notifications.length})
                </Button>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
