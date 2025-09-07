import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface YooKassaSettings {
  shopId: string;
  secretKey: string;
  enabled: boolean;
  testMode: boolean;
  webhookUrl: string;
  returnUrl: string;
  description: string;
}

const defaultSettings: YooKassaSettings = {
  shopId: "",
  secretKey: "",
  enabled: false,
  testMode: true,
  webhookUrl: "",
  returnUrl: `${window.location.origin}/payment-success`,
  description: "Оплата заказа",
};

export default function PaymentSettings() {
  const [settings, setSettings] = useState<YooKassaSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "unknown" | "success" | "error"
  >("unknown");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const stored = localStorage.getItem("yookassa_settings");
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек:", error);
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);

    try {
      // Валидация
      if (settings.enabled && (!settings.shopId || !settings.secretKey)) {
        toast({
          title: "Ошибка валидации",
          description:
            "Shop ID и Secret Key обязательны для включения платежей",
          variant: "destructive",
        });
        return;
      }

      // Сохраняем настройки
      localStorage.setItem("yookassa_settings", JSON.stringify(settings));

      // Обновляем активность ЮКассы для использования на сайте
      if (settings.enabled && settings.shopId && settings.secretKey) {
        localStorage.setItem(
          "yookassa-active",
          JSON.stringify({
            enabled: true,
            shopId: settings.shopId,
            testMode: settings.testMode,
            webhookUrl: settings.webhookUrl,
            activatedAt: new Date().toISOString(),
          }),
        );
      } else {
        localStorage.removeItem("yookassa-active");
      }

      toast({
        title: "Настройки сохранены",
        description: "Настройки ЮKassa успешно обновлены",
      });

      // Проверяем подключение если включено
      if (settings.enabled) {
        await testConnection();
      }
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    if (!settings.shopId || !settings.secretKey) {
      setConnectionStatus("error");
      return;
    }

    try {
      // Простая проверка подключения (создаем тестовый платеж с минимальной суммой)
      const testPayment = {
        amount: { value: "1.00", currency: "RUB" },
        description: "Тестовый платеж для проверки подключения",
        confirmation: { type: "redirect", return_url: settings.returnUrl },
        test: true,
      };

      const credentials = btoa(`${settings.shopId}:${settings.secretKey}`);
      const response = await fetch("https://api.yookassa.ru/v3/payments", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
          "Idempotence-Key": Date.now().toString(),
        },
        body: JSON.stringify(testPayment),
      });

      if (response.ok) {
        setConnectionStatus("success");
        toast({
          title: "Подключение успешно",
          description: "Соединение с ЮKassa установлено",
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setConnectionStatus("error");
      toast({
        title: "Ошибка подключения",
        description: "Проверьте Shop ID и Secret Key",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    field: keyof YooKassaSettings,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setConnectionStatus("unknown");
  };

  const getStatusBadge = () => {
    if (!settings.enabled) {
      return <Badge variant="secondary">Отключено</Badge>;
    }

    switch (connectionStatus) {
      case "success":
        return <Badge className="bg-green-500">Подключено</Badge>;
      case "error":
        return <Badge variant="destructive">Ошибка</Badge>;
      default:
        return <Badge variant="outline">Не проверено</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Настройки платежей</h1>
          <p className="text-gray-600">Настройка интеграции с ЮKassa</p>
        </div>
        {getStatusBadge()}
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Основные настройки</TabsTrigger>
          <TabsTrigger value="advanced">Дополнительно</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="CreditCard" className="mr-2" size={24} />
                Основные настройки ЮKassa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={settings.enabled}
                  onCheckedChange={(checked) =>
                    handleInputChange("enabled", checked)
                  }
                />
                <Label htmlFor="enabled">
                  Включить прием платежей через ЮKassa
                </Label>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="shopId">Shop ID</Label>
                  <Input
                    id="shopId"
                    placeholder="123456"
                    value={settings.shopId}
                    onChange={(e) =>
                      handleInputChange("shopId", e.target.value)
                    }
                    disabled={!settings.enabled}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Найдите в личном кабинете ЮKassa в разделе "Настройки →
                    Данные магазина"
                  </p>
                </div>

                <div>
                  <Label htmlFor="secretKey">Secret Key</Label>
                  <Input
                    id="secretKey"
                    type="password"
                    placeholder="live_..."
                    value={settings.secretKey}
                    onChange={(e) =>
                      handleInputChange("secretKey", e.target.value)
                    }
                    disabled={!settings.enabled}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Секретный ключ из личного кабинета ЮKassa
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">
                    Описание платежа по умолчанию
                  </Label>
                  <Input
                    id="description"
                    placeholder="Оплата заказа"
                    value={settings.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    disabled={!settings.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Дополнительные настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="testMode"
                  checked={settings.testMode}
                  onCheckedChange={(checked) =>
                    handleInputChange("testMode", checked)
                  }
                  disabled={!settings.enabled}
                />
                <Label htmlFor="testMode">Тестовый режим</Label>
              </div>

              <div>
                <Label htmlFor="returnUrl">URL возврата после оплаты</Label>
                <Input
                  id="returnUrl"
                  placeholder={`${window.location.origin}/payment-success`}
                  value={settings.returnUrl}
                  onChange={(e) =>
                    handleInputChange("returnUrl", e.target.value)
                  }
                  disabled={!settings.enabled}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Страница, на которую будет перенаправлен пользователь после
                  оплаты
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Настройки Webhook</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="webhookUrl">URL для уведомлений</Label>
                <Input
                  id="webhookUrl"
                  placeholder={`${window.location.origin}/api/yookassa/webhook`}
                  value={settings.webhookUrl}
                  onChange={(e) =>
                    handleInputChange("webhookUrl", e.target.value)
                  }
                  disabled={!settings.enabled}
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL для получения уведомлений о статусе платежей
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Настройка в ЮKassa
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Для корректной работы webhook'ов добавьте этот URL в настройки
                  магазина в ЮKassa:
                </p>
                <code className="text-sm bg-blue-100 px-2 py-1 rounded">
                  {settings.webhookUrl ||
                    `${window.location.origin}/api/yookassa/webhook`}
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={testConnection}
          disabled={
            !settings.enabled || !settings.shopId || !settings.secretKey
          }
        >
          <Icon name="Wifi" className="mr-2" size={16} />
          Проверить подключение
        </Button>

        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Icon name="Save" className="mr-2" size={16} />
              Сохранить настройки
            </>
          )}
        </Button>
      </div>
    </div>
  );
}