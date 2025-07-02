import SettingsCard from "../SettingsCard";
import SettingsInputField from "../SettingsInputField";
import { TemplateSettings } from "@/types/chatSettings";

interface TemplateSettingsTabProps {
  settings: TemplateSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function TemplateSettingsTab({
  settings,
  onUpdate,
}: TemplateSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Шаблоны сообщений"
        description="Настройте стандартные сообщения"
        icon="FileText"
      >
        <SettingsInputField
          label="Приветствие"
          value={settings.greeting}
          onChange={(value) => onUpdate("templates.greeting", value)}
          placeholder="Сообщение при начале чата"
          multiline
          rows={3}
        />
        <SettingsInputField
          label="Завершение"
          value={settings.closing}
          onChange={(value) => onUpdate("templates.closing", value)}
          placeholder="Сообщение при завершении чата"
          multiline
          rows={3}
        />
        <SettingsInputField
          label="Недоступность"
          value={settings.unavailable}
          onChange={(value) => onUpdate("templates.unavailable", value)}
          placeholder="Сообщение когда операторы недоступны"
          multiline
          rows={3}
        />
      </SettingsCard>
    </div>
  );
}
