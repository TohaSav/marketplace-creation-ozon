import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { PlatformSettings } from "@/types/admin-settings";
import { useAdminSettings } from "@/hooks/useAdminSettings";

interface GeneralSettingsTabProps {
  onSettingsChange?: (settings: PlatformSettings) => void;
}

export default function GeneralSettingsTab({
  onSettingsChange,
}: GeneralSettingsTabProps) {
  const { loadPlatformSettings, savePlatformSettings, isLoading } =
    useAdminSettings();
  const [settings, setSettings] =
    useState<PlatformSettings>(loadPlatformSettings);

  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleSave = async () => {
    await savePlatformSettings(settings);
  };

  const updateSetting = <K extends keyof PlatformSettings>(
    key: K,
    value: PlatformSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Основные настройки платформы</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="siteName">Название сайта</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSetting("siteName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="adminEmail">Email администратора</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => updateSetting("adminEmail", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="siteDescription">Описание сайта</Label>
          <Textarea
            id="siteDescription"
            value={settings.siteDescription}
            onChange={(e) => updateSetting("siteDescription", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="supportEmail">Email службы поддержки</Label>
          <Input
            id="supportEmail"
            type="email"
            value={settings.supportEmail}
            onChange={(e) => updateSetting("supportEmail", e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Функциональность</h3>

          <div className="flex items-center justify-between">
            <div>
              <Label>Режим обслуживания</Label>
              <p className="text-sm text-gray-500">
                Временно отключить сайт для пользователей
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                updateSetting("maintenanceMode", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Регистрация пользователей</Label>
              <p className="text-sm text-gray-500">
                Разрешить новым пользователям регистрироваться
              </p>
            </div>
            <Switch
              checked={settings.registrationEnabled}
              onCheckedChange={(checked) =>
                updateSetting("registrationEnabled", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Подтверждение email</Label>
              <p className="text-sm text-gray-500">
                Требовать подтверждение email при регистрации
              </p>
            </div>
            <Switch
              checked={settings.emailVerificationRequired}
              onCheckedChange={(checked) =>
                updateSetting("emailVerificationRequired", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Модерация контента</Label>
              <p className="text-sm text-gray-500">
                Требовать проверку контента перед публикацией
              </p>
            </div>
            <Switch
              checked={settings.moderationRequired}
              onCheckedChange={(checked) =>
                updateSetting("moderationRequired", checked)
              }
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxFileUploadSize">
              Максимальный размер файла (МБ)
            </Label>
            <Input
              id="maxFileUploadSize"
              type="number"
              min="1"
              max="100"
              value={settings.maxFileUploadSize}
              onChange={(e) =>
                updateSetting("maxFileUploadSize", parseInt(e.target.value))
              }
            />
          </div>
          <div>
            <Label htmlFor="sessionTimeout">Тайм-аут сессии (минуты)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              min="15"
              max="480"
              value={settings.sessionTimeout}
              onChange={(e) =>
                updateSetting("sessionTimeout", parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
          ) : (
            <Icon name="Save" size={16} className="mr-2" />
          )}
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  );
}
