import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationFilter } from "@/types/notifications";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationSettings from "@/components/notifications/NotificationSettings";
import NotificationTabs from "@/components/notifications/NotificationTabs";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<NotificationFilter>("all");

  const {
    notifications,
    settings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getFilteredNotifications,
    getUnreadCountForType,
    updateSetting,
  } = useNotifications();

  const filteredNotifications = getFilteredNotifications(activeTab);

  const handleAction = (actionUrl: string) => {
    // Здесь можно добавить навигацию или другие действия
    window.location.href = actionUrl;
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
          onValueChange={(value) => setActiveTab(value as NotificationFilter)}
        >
          <NotificationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            getUnreadCount={getUnreadCountForType}
          />

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notifications List */}
              <div className="lg:col-span-2">
                <NotificationList
                  notifications={filteredNotifications}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  onAction={handleAction}
                />
              </div>

              {/* Settings Panel */}
              <NotificationSettings
                settings={settings}
                onSettingChange={updateSetting}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
