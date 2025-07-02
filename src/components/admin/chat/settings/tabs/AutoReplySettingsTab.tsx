import SettingsCard from "../SettingsCard";
import SettingsInputField from "../SettingsInputField";
import SettingsSwitchRow from "../SettingsSwitchRow";
import { AutoReplySettings } from "@/types/chatSettings";

interface AutoReplySettingsTabProps {
  settings: AutoReplySettings;
  onUpdate: (path: string, value: any) => void;
}

export default function AutoReplySettingsTab({
  settings,
  onUpdate,
}: AutoReplySettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Автоматические ответы"
        description="Настройка автоматических сообщений"
        icon="MessageSquare"
      >
        <SettingsSwitchRow
          label="Включить автоответы"
          description="Отправлять автоответ при новом сообщении"
          checked={settings.enabled}
          onCheckedChange={(checked) => onUpdate("autoReply.enabled", checked)}
        />

        {settings.enabled && (
          <>
            <SettingsInputField
              label="Сообщение автоответа"
              value={settings.message}
              onChange={(value) => onUpdate("autoReply.message", value)}
              placeholder="Введите сообщение автоответа..."
              multiline
              rows={4}
            />
            <SettingsInputField
              label="Задержка (секунды)"
              type="number"
              value={settings.delay}
              onChange={(value) =>
                onUpdate("autoReply.delay", parseInt(value) || 0)
              }
            />
          </>
        )}
      </SettingsCard>
    </div>
  );
}
