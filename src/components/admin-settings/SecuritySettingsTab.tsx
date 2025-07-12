import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { SecuritySettings } from "@/types/admin-settings";
import { useAdminSettings } from "@/hooks/useAdminSettings";

interface SecuritySettingsTabProps {
  onSettingsChange?: (settings: SecuritySettings) => void;
}

export default function SecuritySettingsTab({
  onSettingsChange,
}: SecuritySettingsTabProps) {
  const { loadSecuritySettings, saveSecuritySettings, isLoading } =
    useAdminSettings();
  const [settings, setSettings] =
    useState<SecuritySettings>(loadSecuritySettings);
  const [newIpAddress, setNewIpAddress] = useState("");

  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleSave = async () => {
    await saveSecuritySettings(settings);
  };

  const updateSetting = <K extends keyof SecuritySettings>(
    key: K,
    value: SecuritySettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const addIpToWhitelist = () => {
    if (newIpAddress && !settings.ipWhitelist.includes(newIpAddress)) {
      updateSetting("ipWhitelist", [...settings.ipWhitelist, newIpAddress]);
      setNewIpAddress("");
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    updateSetting(
      "ipWhitelist",
      settings.ipWhitelist.filter((item) => item !== ip),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки безопасности</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="passwordMinLength">Минимальная длина пароля</Label>
            <Input
              id="passwordMinLength"
              type="number"
              min="6"
              max="32"
              value={settings.passwordMinLength}
              onChange={(e) =>
                updateSetting("passwordMinLength", parseInt(e.target.value))
              }
            />
          </div>
          <div>
            <Label htmlFor="maxLoginAttempts">Максимум попыток входа</Label>
            <Input
              id="maxLoginAttempts"
              type="number"
              min="1"
              max="10"
              value={settings.maxLoginAttempts}
              onChange={(e) =>
                updateSetting("maxLoginAttempts", parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lockoutDuration">Время блокировки (минуты)</Label>
            <Input
              id="lockoutDuration"
              type="number"
              min="5"
              max="60"
              value={settings.lockoutDuration}
              onChange={(e) =>
                updateSetting("lockoutDuration", parseInt(e.target.value))
              }
            />
          </div>
          <div>
            <Label htmlFor="apiRateLimit">Лимит API запросов в минуту</Label>
            <Input
              id="apiRateLimit"
              type="number"
              min="10"
              max="1000"
              value={settings.apiRateLimit}
              onChange={(e) =>
                updateSetting("apiRateLimit", parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Двухфакторная аутентификация</Label>
            <p className="text-sm text-gray-500">
              Обязательная 2FA для всех администраторов
            </p>
          </div>
          <Switch
            checked={settings.twoFactorRequired}
            onCheckedChange={(checked) =>
              updateSetting("twoFactorRequired", checked)
            }
          />
        </div>

        <Separator />

        <div>
          <Label>Белый список IP-адресов</Label>
          <p className="text-sm text-gray-500 mb-3">
            Администраторы смогут входить только с этих IP-адресов
          </p>

          <div className="flex gap-2 mb-3">
            <Input
              placeholder="192.168.1.1"
              value={newIpAddress}
              onChange={(e) => setNewIpAddress(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addIpToWhitelist();
                }
              }}
            />
            <Button onClick={addIpToWhitelist} variant="outline">
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.ipWhitelist.map((ip) => (
              <Badge
                key={ip}
                variant="secondary"
                className="flex items-center gap-2"
              >
                {ip}
                <button
                  onClick={() => removeIpFromWhitelist(ip)}
                  className="ml-1 hover:text-red-600 transition-colors"
                >
                  <Icon name="X" size={12} />
                </button>
              </Badge>
            ))}
            {settings.ipWhitelist.length === 0 && (
              <p className="text-sm text-gray-500">
                Белый список пуст - доступ разрешен с любых IP-адресов
              </p>
            )}
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
          ) : (
            <Icon name="Shield" size={16} className="mr-2" />
          )}
          Сохранить настройки безопасности
        </Button>
      </CardContent>
    </Card>
  );
}
