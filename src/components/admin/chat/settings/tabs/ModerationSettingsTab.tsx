import SettingsCard from "../SettingsCard";
import SettingsSwitchRow from "../SettingsSwitchRow";
import { ModerationSettings } from "@/types/chatSettings";

interface ModerationSettingsTabProps {
  settings: ModerationSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function ModerationSettingsTab({
  settings,
  onUpdate,
}: ModerationSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Модерация"
        description="Настройки безопасности и модерации"
        icon="Shield"
      >
        <SettingsSwitchRow
          label="Фильтр нецензурной лексики"
          description="Автоматически блокировать нецензурные слова"
          checked={settings.profanityFilter}
          onCheckedChange={(checked) =>
            onUpdate("moderation.profanityFilter", checked)
          }
        />

        <SettingsSwitchRow
          label="Блокировка спама"
          description="Автоматически блокировать спам-сообщения"
          checked={settings.autoBlockSpam}
          onCheckedChange={(checked) =>
            onUpdate("moderation.autoBlockSpam", checked)
          }
        />

        <SettingsSwitchRow
          label="Требовать подтверждение"
          description="Требовать подтверждения перед началом чата"
          checked={settings.requireApproval}
          onCheckedChange={(checked) =>
            onUpdate("moderation.requireApproval", checked)
          }
        />
      </SettingsCard>
    </div>
  );
}
