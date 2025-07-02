import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SettingsInputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number" | "time" | "color";
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export default function SettingsInputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline = false,
  rows = 3,
  className,
}: SettingsInputFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
