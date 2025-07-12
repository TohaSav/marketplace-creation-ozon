import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  supportEmail: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerificationRequired: boolean;
  moderationRequired: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
}

interface SecuritySettings {
  twoFactorRequired: boolean;
  passwordMinLength: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  ipWhitelist: string[];
  apiRateLimit: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  newUserRegistration: boolean;
  newSellerApplication: boolean;
  systemAlerts: boolean;
  backupNotifications: boolean;
  errorReports: boolean;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  // Загружаем настройки из localStorage
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(
    () => {
      const saved = localStorage.getItem("admin-platform-settings");
      return saved
        ? JSON.parse(saved)
        : {
            siteName: "CalibreStore",
            siteDescription: "Ваша универсальная торговая платформа",
            adminEmail: "admin@calibrestore.ru",
            supportEmail: "support@calibrestore.ru",
            maintenanceMode: false,
            registrationEnabled: true,
            emailVerificationRequired: true,
            moderationRequired: false,
            maxFileUploadSize: 10,
            sessionTimeout: 60,
          };
    },
  );

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    () => {
      const saved = localStorage.getItem("admin-security-settings");
      return saved
        ? JSON.parse(saved)
        : {
            twoFactorRequired: false,
            passwordMinLength: 8,
            maxLoginAttempts: 5,
            lockoutDuration: 15,
            ipWhitelist: [],
            apiRateLimit: 100,
          };
    },
  );

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(() => {
      const saved = localStorage.getItem("admin-notification-settings");
      return saved
        ? JSON.parse(saved)
        : {
            emailNotifications: true,
            newUserRegistration: true,
            newSellerApplication: true,
            systemAlerts: true,
            backupNotifications: true,
            errorReports: true,
          };
    });

  const [newIpAddress, setNewIpAddress] = useState("");

  const savePlatformSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem(
        "admin-platform-settings",
        JSON.stringify(platformSettings),
      );
      toast({
        title: "Настройки сохранены",
        description: "Настройки платформы успешно обновлены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSecuritySettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem(
        "admin-security-settings",
        JSON.stringify(securitySettings),
      );
      toast({
        title: "Настройки безопасности сохранены",
        description: "Настройки безопасности успешно обновлены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки безопасности",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem(
        "admin-notification-settings",
        JSON.stringify(notificationSettings),
      );
      toast({
        title: "Настройки уведомлений сохранены",
        description: "Настройки уведомлений успешно обновлены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки уведомлений",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addIpToWhitelist = () => {
    if (newIpAddress && !securitySettings.ipWhitelist.includes(newIpAddress)) {
      setSecuritySettings({
        ...securitySettings,
        ipWhitelist: [...securitySettings.ipWhitelist, newIpAddress],
      });
      setNewIpAddress("");
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: securitySettings.ipWhitelist.filter((item) => item !== ip),
    });
  };

  const resetToDefaults = () => {
    if (
      confirm(
        "Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?",
      )
    ) {
      localStorage.removeItem("admin-platform-settings");
      localStorage.removeItem("admin-security-settings");
      localStorage.removeItem("admin-notification-settings");
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
                <Icon name="Settings" size={28} className="text-white" />
              </div>
              Настройки администратора
            </h1>
            <p className="text-gray-600 mt-2">
              Управление конфигурацией платформы, безопасностью и уведомлениями
            </p>
          </div>
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="text-red-600 hover:text-red-700"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сброс к умолчанию
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Icon name="Globe" size={16} className="mr-2" />
              Общие
            </TabsTrigger>
            <TabsTrigger value="security">
              <Icon name="Shield" size={16} className="mr-2" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="system">
              <Icon name="Database" size={16} className="mr-2" />
              Система
            </TabsTrigger>
          </TabsList>

          {/* Общие настройки */}
          <TabsContent value="general" className="space-y-6">
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
                      value={platformSettings.siteName}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          siteName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Email администратора</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={platformSettings.adminEmail}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          adminEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="siteDescription">Описание сайта</Label>
                  <Textarea
                    id="siteDescription"
                    value={platformSettings.siteDescription}
                    onChange={(e) =>
                      setPlatformSettings({
                        ...platformSettings,
                        siteDescription: e.target.value,
                      })
                    }
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
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({
                          ...platformSettings,
                          maintenanceMode: checked,
                        })
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
                      checked={platformSettings.registrationEnabled}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({
                          ...platformSettings,
                          registrationEnabled: checked,
                        })
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
                      checked={platformSettings.emailVerificationRequired}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({
                          ...platformSettings,
                          emailVerificationRequired: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={savePlatformSettings} disabled={isLoading}>
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                  ) : (
                    <Icon name="Save" size={16} className="mr-2" />
                  )}
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки безопасности */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки безопасности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passwordMinLength">
                      Минимальная длина пароля
                    </Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="32"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">
                      Максимум попыток входа
                    </Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="1"
                      max="10"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(e.target.value),
                        })
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
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorRequired: checked,
                      })
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
                    />
                    <Button onClick={addIpToWhitelist} variant="outline">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {securitySettings.ipWhitelist.map((ip) => (
                      <Badge
                        key={ip}
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        {ip}
                        <button
                          onClick={() => removeIpFromWhitelist(ip)}
                          className="ml-1 hover:text-red-600"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={saveSecuritySettings} disabled={isLoading}>
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                  ) : (
                    <Icon name="Shield" size={16} className="mr-2" />
                  )}
                  Сохранить настройки безопасности
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки уведомлений */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email уведомления</Label>
                      <p className="text-sm text-gray-500">
                        Получать уведомления на email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Новая регистрация пользователя</Label>
                      <p className="text-sm text-gray-500">
                        Уведомления о регистрации новых пользователей
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newUserRegistration}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newUserRegistration: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Заявка на становление продавцом</Label>
                      <p className="text-sm text-gray-500">
                        Уведомления о новых заявках продавцов
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newSellerApplication}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newSellerApplication: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Системные предупреждения</Label>
                      <p className="text-sm text-gray-500">
                        Критические системные уведомления
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          systemAlerts: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Отчеты об ошибках</Label>
                      <p className="text-sm text-gray-500">
                        Автоматические отчеты об ошибках системы
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.errorReports}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          errorReports: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={saveNotificationSettings} disabled={isLoading}>
                  {isLoading ? (
                    <Icon
                      name="Loader2"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                  ) : (
                    <Icon name="Bell" size={16} className="mr-2" />
                  )}
                  Сохранить настройки уведомлений
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Системные настройки */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Системная информация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Статистика платформы</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Версия:</span>
                        <span className="font-mono">1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Запущено:</span>
                        <span>{new Date().toLocaleDateString("ru-RU")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Пользователей:</span>
                        <span>
                          {
                            JSON.parse(localStorage.getItem("users") || "[]")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Продавцов:</span>
                        <span>
                          {
                            JSON.parse(localStorage.getItem("sellers") || "[]")
                              .length
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Системные действия</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт данных
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icon name="RefreshCw" size={16} className="mr-2" />
                        Очистить кэш
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Скачать логи
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Опасная зона</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-800 mb-2">
                      Сброс всех данных
                    </h3>
                    <p className="text-sm text-red-600 mb-3">
                      Это действие удалит все данные пользователей, продавцов и
                      настройки. Данное действие нельзя отменить.
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (
                          confirm(
                            "ВНИМАНИЕ! Это удалит ВСЕ данные платформы. Вы уверены?",
                          )
                        ) {
                          localStorage.clear();
                          window.location.href = "/";
                        }
                      }}
                    >
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить все данные
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
