import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { NotificationSettings as NotificationSettingsType } from "@/types/notifications";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onSettingChange: (
    key: keyof NotificationSettingsType,
    value: boolean,
  ) => void;
}

interface SettingItem {
  key: keyof NotificationSettingsType;
  label: string;
  description?: string;
}

const DELIVERY_SETTINGS: SettingItem[] = [
  { key: "emailNotifications", label: "Email уведомления" },
  { key: "pushNotifications", label: "Push уведомления" },
  { key: "smsNotifications", label: "SMS уведомления" },
];

const TYPE_SETTINGS: SettingItem[] = [
  { key: "orderUpdates", label: "Обновления заказов" },
  { key: "promotions", label: "Акции и скидки" },
  { key: "supportMessages", label: "Сообщения поддержки" },
  { key: "deliveryUpdates", label: "Статус доставки" },
  { key: "paymentNotifications", label: "Уведомления об оплате" },
];

export default function NotificationSettings({
  settings,
  onSettingChange,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Delivery Methods */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Настройки уведомлений</h3>

        <div className="space-y-4">
          {DELIVERY_SETTINGS.map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between"
            >
              <Label htmlFor={setting.key} className="text-sm font-medium">
                {setting.label}
              </Label>
              <Switch
                id={setting.key}
                checked={settings[setting.key]}
                onCheckedChange={(checked) =>
                  onSettingChange(setting.key, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Типы уведомлений</h3>

        <div className="space-y-4">
          {TYPE_SETTINGS.map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between"
            >
              <Label htmlFor={setting.key} className="text-sm font-medium">
                {setting.label}
              </Label>
              <Switch
                id={setting.key}
                checked={settings[setting.key]}
                onCheckedChange={(checked) =>
                  onSettingChange(setting.key, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Важно!</p>
            <p>
              Отключение уведомлений может привести к пропуску важной информации
              о ваших заказах.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
