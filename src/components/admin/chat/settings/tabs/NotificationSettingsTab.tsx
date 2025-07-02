import SettingsCard from "../SettingsCard";
import SettingsSwitchRow from "../SettingsSwitchRow";
import { NotificationSettings } from "@/types/chatSettings";

interface NotificationSettingsTabProps {
  settings: NotificationSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function NotificationSettingsTab({
  settings,
  onUpdate,
}: NotificationSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Уведомления"
        description="Настройки уведомлений о новых сообщениях"
        icon="Bell"
      >
        <SettingsSwitchRow
          label="Звуковые уведомления"
          description="Воспроизводить звук при новом сообщении"
          checked={settings.sound}
          onCheckedChange={(checked) =>
            onUpdate("notifications.sound", checked)
          }
        />

        <SettingsSwitchRow
          label="Уведомления в браузере"
          description="Показывать уведомления в браузере"
          checked={settings.desktop}
          onCheckedChange={(checked) =>
            onUpdate("notifications.desktop", checked)
          }
        />

        <SettingsSwitchRow
          label="Email уведомления"
          description="Отправлять уведомления на email"
          checked={settings.email}
          onCheckedChange={(checked) =>
            onUpdate("notifications.email", checked)
          }
        />
      </SettingsCard>
    </div>
  );
}
