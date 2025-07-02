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
import { Input } from "@/components/ui/input";
import { AppearanceSettings } from "@/types/chatSettings";

interface AppearanceSettingsTabProps {
  settings: AppearanceSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function AppearanceSettingsTab({
  settings,
  onUpdate,
}: AppearanceSettingsTabProps) {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Внешний вид"
        description="Настройки отображения чата"
        icon="Palette"
      >
        <div className="space-y-2">
          <Label>Тема оформления</Label>
          <Select
            value={settings.theme}
            onValueChange={(value: "light" | "dark" | "auto") =>
              onUpdate("appearance.theme", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Светлая</SelectItem>
              <SelectItem value="dark">Темная</SelectItem>
              <SelectItem value="auto">Автоматически</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Цвет сообщений</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={settings.chatBubbleColor}
              onChange={(e) =>
                onUpdate("appearance.chatBubbleColor", e.target.value)
              }
              className="w-20 h-10"
            />
            <Input
              value={settings.chatBubbleColor}
              onChange={(e) =>
                onUpdate("appearance.chatBubbleColor", e.target.value)
              }
              placeholder="#3B82F6"
            />
          </div>
        </div>

        <SettingsSwitchRow
          label="Индикатор печати"
          description="Показывать когда пользователь печатает"
          checked={settings.showTypingIndicator}
          onCheckedChange={(checked) =>
            onUpdate("appearance.showTypingIndicator", checked)
          }
        />
      </SettingsCard>
    </div>
  );
}
