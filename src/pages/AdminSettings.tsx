import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { AdminSettingsTab } from "@/types/admin-settings";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import GeneralSettingsTab from "@/components/admin-settings/GeneralSettingsTab";
import SecuritySettingsTab from "@/components/admin-settings/SecuritySettingsTab";
import NotificationSettingsTab from "@/components/admin-settings/NotificationSettingsTab";
import SystemSettingsTab from "@/components/admin-settings/SystemSettingsTab";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<AdminSettingsTab>("general");
  const { resetToDefaults } = useAdminSettings();

  const tabsConfig = [
    { value: "general" as const, label: "Общие", icon: "Globe" },
    { value: "security" as const, label: "Безопасность", icon: "Shield" },
    { value: "notifications" as const, label: "Уведомления", icon: "Bell" },
    { value: "system" as const, label: "Система", icon: "Database" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
                <Icon name="Settings" size={28} className="text-white" />
              </div>
              Настройки администратора
            </h1>
            <p className="text-gray-600 mt-2">
              Управление конфигурацией платформы, безопасностью и уведомлениями
            </p>
          </div>
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="text-red-600 hover:text-red-700"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сброс к умолчанию
          </Button>
        </div>

        {/* Вкладки настроек */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as AdminSettingsTab)}
        >
          <TabsList className="grid w-full grid-cols-4">
            {tabsConfig.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <Icon name={tab.icon as any} size={16} className="mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Общие настройки */}
          <TabsContent value="general" className="space-y-6">
            <GeneralSettingsTab />
          </TabsContent>

          {/* Настройки безопасности */}
          <TabsContent value="security" className="space-y-6">
            <SecuritySettingsTab />
          </TabsContent>

          {/* Настройки уведомлений */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettingsTab />
          </TabsContent>

          {/* Системные настройки */}
          <TabsContent value="system" className="space-y-6">
            <SystemSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
