import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "support" | "system" | "promo" | "delivery" | "payment";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const notificationTypes = {
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

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | keyof typeof notificationTypes
  >("all");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    supportMessages: true,
    deliveryUpdates: true,
    paymentNotifications: true,
  });

  useEffect(() => {
    // Загружаем уведомления из localStorage
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      // Добавляем примеры уведомлений
      const sampleNotifications: Notification[] = [
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
      setNotifications(sampleNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(sampleNotifications),
      );
    }
  }, []);

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id,
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications;
    return notifications.filter(
      (notification) => notification.type === activeTab,
    );
  };

  const getUnreadCount = (type?: keyof typeof notificationTypes) => {
    if (!type) return notifications.filter((n) => !n.read).length;
    return notifications.filter((n) => n.type === type && !n.read).length;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`;

    const diffDays = Math.floor(diffMinutes / 1440);
    if (diffDays === 1) return "вчера";
    if (diffDays < 7) return `${diffDays} дн назад`;

    return date.toLocaleDateString("ru-RU");
  };

  const updateSettings = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Уведомления</h1>
            <p className="text-gray-600 mt-1">
              Управляйте своими уведомлениями и настройками
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Icon name="CheckCheck" size={16} className="mr-2" />
              Прочитать все
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Icon name="Trash2" size={16} className="mr-2" />
              Очистить все
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="all" className="flex items-center gap-2">
              Все
              {getUnreadCount() > 0 && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                  {getUnreadCount()}
                </Badge>
              )}
            </TabsTrigger>
            {Object.entries(notificationTypes).map(([key, type]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2"
              >
                <Icon
                  name={type.icon as any}
                  size={16}
                  className="hidden sm:block"
                />
                <span className="hidden lg:inline">{type.name}</span>
                <span className="lg:hidden">{type.name.slice(0, 3)}</span>
                {getUnreadCount(key as keyof typeof notificationTypes) > 0 && (
                  <Badge
                    variant="destructive"
                    className="text-xs px-1.5 py-0.5"
                  >
                    {getUnreadCount(key as keyof typeof notificationTypes)}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notifications List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm">
                  {getFilteredNotifications().length === 0 ? (
                    <div className="p-8 text-center">
                      <Icon
                        name="Bell"
                        size={48}
                        className="mx-auto mb-4 text-gray-400"
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Нет уведомлений
                      </h3>
                      <p className="text-gray-500">
                        Здесь будут показаны ваши уведомления
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px]">
                      <div className="divide-y">
                        {getFilteredNotifications().map((notification) => {
                          const type = notificationTypes[notification.type];
                          return (
                            <div
                              key={notification.id}
                              className={`p-4 hover:bg-gray-50 transition-colors ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`p-2 rounded-full ${type.color}`}
                                >
                                  <Icon name={type.icon as any} size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-gray-900">
                                      {notification.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                      )}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          deleteNotification(notification.id)
                                        }
                                        className="p-1 h-auto"
                                      >
                                        <Icon name="X" size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex justify-between items-center mt-3">
                                    <span className="text-xs text-gray-500">
                                      {formatTime(notification.timestamp)}
                                    </span>
                                    <div className="flex gap-2">
                                      {!notification.read && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            markAsRead(notification.id)
                                          }
                                          className="text-xs"
                                        >
                                          Прочитано
                                        </Button>
                                      )}
                                      {notification.actionUrl && (
                                        <Button
                                          variant="outline"
                                          size="sm"
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
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Настройки уведомлений
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="email-notifications"
                        className="text-sm font-medium"
                      >
                        Email уведомления
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          updateSettings("emailNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="push-notifications"
                        className="text-sm font-medium"
                      >
                        Push уведомления
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) =>
                          updateSettings("pushNotifications", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="sms-notifications"
                        className="text-sm font-medium"
                      >
                        SMS уведомления
                      </Label>
                      <Switch
                        id="sms-notifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) =>
                          updateSettings("smsNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Типы уведомлений</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="order-updates"
                        className="text-sm font-medium"
                      >
                        Обновления заказов
                      </Label>
                      <Switch
                        id="order-updates"
                        checked={settings.orderUpdates}
                        onCheckedChange={(checked) =>
                          updateSettings("orderUpdates", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="promotions"
                        className="text-sm font-medium"
                      >
                        Акции и скидки
                      </Label>
                      <Switch
                        id="promotions"
                        checked={settings.promotions}
                        onCheckedChange={(checked) =>
                          updateSettings("promotions", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="support-messages"
                        className="text-sm font-medium"
                      >
                        Сообщения поддержки
                      </Label>
                      <Switch
                        id="support-messages"
                        checked={settings.supportMessages}
                        onCheckedChange={(checked) =>
                          updateSettings("supportMessages", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="delivery-updates"
                        className="text-sm font-medium"
                      >
                        Статус доставки
                      </Label>
                      <Switch
                        id="delivery-updates"
                        checked={settings.deliveryUpdates}
                        onCheckedChange={(checked) =>
                          updateSettings("deliveryUpdates", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="payment-notifications"
                        className="text-sm font-medium"
                      >
                        Уведомления об оплате
                      </Label>
                      <Switch
                        id="payment-notifications"
                        checked={settings.paymentNotifications}
                        onCheckedChange={(checked) =>
                          updateSettings("paymentNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      name="Info"
                      className="text-blue-600 mt-0.5"
                      size={16}
                    />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Важно!</p>
                      <p>
                        Отключение уведомлений может привести к пропуску важной
                        информации о ваших заказах.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
