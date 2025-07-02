import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsSwitchRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function SettingsSwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
}: SettingsSwitchRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label>{label}</Label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
