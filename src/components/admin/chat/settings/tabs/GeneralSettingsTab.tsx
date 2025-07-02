import SettingsCard from "../SettingsCard";
import SettingsInputField from "../SettingsInputField";
import { ChatLimitSettings } from "@/types/chatSettings";

interface GeneralSettingsTabProps {
  settings: ChatLimitSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function GeneralSettingsTab({
  settings,
  onUpdate,
}: GeneralSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Основные настройки"
        description="Базовые параметры работы чата"
        icon="Settings"
      >
        <div className="grid grid-cols-2 gap-4">
          <SettingsInputField
            label="Максимум одновременных чатов"
            type="number"
            value={settings.maxConcurrentChats}
            onChange={(value) =>
              onUpdate("chatLimits.maxConcurrentChats", parseInt(value) || 1)
            }
          />
          <SettingsInputField
            label="Таймаут ответа (сек)"
            type="number"
            value={settings.responseTimeout}
            onChange={(value) =>
              onUpdate("chatLimits.responseTimeout", parseInt(value) || 30)
            }
          />
        </div>
      </SettingsCard>
    </div>
  );
}
