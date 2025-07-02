import SettingsCard from "../SettingsCard";
import SettingsInputField from "../SettingsInputField";
import SettingsSwitchRow from "../SettingsSwitchRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { WorkingHoursSettings } from "@/types/chatSettings";

interface WorkingHoursSettingsTabProps {
  settings: WorkingHoursSettings;
  onUpdate: (path: string, value: any) => void;
}

const timezones = [
  { value: "Europe/Moscow", label: "Москва (UTC+3)" },
  { value: "Europe/Kiev", label: "Киев (UTC+2)" },
  { value: "Asia/Almaty", label: "Алматы (UTC+6)" },
  { value: "Europe/London", label: "Лондон (UTC+0)" },
  { value: "America/New_York", label: "Нью-Йорк (UTC-5)" },
];

export default function WorkingHoursSettingsTab({
  settings,
  onUpdate,
}: WorkingHoursSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Рабочие часы"
        description="Установите часы работы поддержки"
        icon="Clock"
      >
        <SettingsSwitchRow
          label="Ограничить рабочими часами"
          description="Показывать статус недоступен вне рабочих часов"
          checked={settings.enabled}
          onCheckedChange={(checked) =>
            onUpdate("workingHours.enabled", checked)
          }
        />

        {settings.enabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <SettingsInputField
                label="Начало работы"
                type="time"
                value={settings.startTime}
                onChange={(value) => onUpdate("workingHours.startTime", value)}
              />
              <SettingsInputField
                label="Конец работы"
                type="time"
                value={settings.endTime}
                onChange={(value) => onUpdate("workingHours.endTime", value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Часовой пояс</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) =>
                  onUpdate("workingHours.timezone", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((timezone) => (
                    <SelectItem key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </SettingsCard>
    </div>
  );
}
