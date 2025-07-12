import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { NotificationSettings } from "@/types/admin-settings";
import { useAdminSettings } from "@/hooks/useAdminSettings";

interface NotificationOption {
  key: keyof NotificationSettings;
  label: string;
  description: string;
  icon: string;
}

interface NotificationSettingsTabProps {
  onSettingsChange?: (settings: NotificationSettings) => void;
}

const notificationOptions: NotificationOption[] = [
  {
    key: "emailNotifications",
    label: "Email уведомления",
    description: "Получать уведомления на email",
    icon: "Mail",
  },
  {
    key: "newUserRegistration",
    label: "Новая регистрация пользователя",
    description: "Уведомления о регистрации новых пользователей",
    icon: "UserPlus",
  },
  {
    key: "newSellerApplication",
    label: "Заявка на становление продавцом",
    description: "Уведомления о новых заявках продавцов",
    icon: "Store",
  },
  {
    key: "systemAlerts",
    label: "Системные предупреждения",
    description: "Критические системные уведомления",
    icon: "AlertTriangle",
  },
  {
    key: "backupNotifications",
    label: "Уведомления о резервном копировании",
    description: "Статус создания резервных копий",
    icon: "HardDrive",
  },
  {
    key: "errorReports",
    label: "Отчеты об ошибках",
    description: "Автоматические отчеты об ошибках системы",
    icon: "Bug",
  },
];

export default function NotificationSettingsTab({
  onSettingsChange,
}: NotificationSettingsTabProps) {
  const { loadNotificationSettings, saveNotificationSettings, isLoading } =
    useAdminSettings();
  const [settings, setSettings] = useState<NotificationSettings>(
    loadNotificationSettings,
  );

  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleSave = async () => {
    await saveNotificationSettings(settings);
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAllNotifications = (enabled: boolean) => {
    const updatedSettings = { ...settings };
    notificationOptions.forEach((option) => {
      if (option.key !== "emailNotifications") {
        updatedSettings[option.key] = enabled;
      }
    });
    setSettings(updatedSettings);
  };

  const allNotificationsEnabled = notificationOptions
    .filter((option) => option.key !== "emailNotifications")
    .every((option) => settings[option.key]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Настройки уведомлений
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllNotifications(true)}
            >
              Включить все
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllNotifications(false)}
            >
              Выключить все
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon
                    name={option.icon as any}
                    size={16}
                    className="text-gray-600"
                  />
                </div>
                <div>
                  <Label className="font-medium">{option.label}</Label>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <Switch
                checked={settings[option.key]}
                onCheckedChange={(checked) =>
                  updateSetting(option.key, checked)
                }
                disabled={
                  option.key !== "emailNotifications" &&
                  !settings.emailNotifications
                }
              />
            </div>
          ))}
        </div>

        {!settings.emailNotifications && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon
                name="AlertTriangle"
                size={16}
                className="text-yellow-600"
              />
              <p className="text-sm text-yellow-800">
                Email уведомления отключены. Включите их, чтобы получать
                уведомления по электронной почте.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon name="Info" size={16} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Активных уведомлений:{" "}
                {Object.values(settings).filter(Boolean).length} из{" "}
                {notificationOptions.length}
              </p>
              <p className="text-xs text-blue-700">
                {allNotificationsEnabled
                  ? "Все уведомления включены"
                  : "Некоторые уведомления отключены"}
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
          ) : (
            <Icon name="Bell" size={16} className="mr-2" />
          )}
          Сохранить настройки уведомлений
        </Button>
      </CardContent>
    </Card>
  );
}
