import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useAdminSettings } from "@/hooks/useAdminSettings";

interface SystemAction {
  label: string;
  description: string;
  icon: string;
  action: () => void;
  variant?: "default" | "outline" | "destructive";
}

export default function SystemSettingsTab() {
  const { getSystemInfo, resetToDefaults, clearAllData } = useAdminSettings();
  const systemInfo = getSystemInfo();

  const systemActions: SystemAction[] = [
    {
      label: "Экспорт данных",
      description: "Скачать все данные платформы",
      icon: "Download",
      action: () => {
        const data = {
          users: JSON.parse(localStorage.getItem("users") || "[]"),
          sellers: JSON.parse(localStorage.getItem("sellers") || "[]"),
          settings: {
            platform: localStorage.getItem("admin-platform-settings"),
            security: localStorage.getItem("admin-security-settings"),
            notifications: localStorage.getItem("admin-notification-settings"),
          },
          exportDate: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `calibrestore-export-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      variant: "outline",
    },
    {
      label: "Очистить кэш",
      description: "Очистить временные данные",
      icon: "RefreshCw",
      action: () => {
        if (
          confirm("Очистить кэш? Это может потребовать перезагрузки страницы.")
        ) {
          // Очищаем только кэш, не основные данные
          const keysToKeep = [
            "users",
            "sellers",
            "admin-platform-settings",
            "admin-security-settings",
            "admin-notification-settings",
          ];

          Object.keys(localStorage).forEach((key) => {
            if (!keysToKeep.includes(key)) {
              localStorage.removeItem(key);
            }
          });

          window.location.reload();
        }
      },
      variant: "outline",
    },
    {
      label: "Скачать логи",
      description: "Получить файл с логами системы",
      icon: "FileText",
      action: () => {
        const logs = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          localStorage: { ...localStorage },
          sessionStorage: { ...sessionStorage },
          url: window.location.href,
          referrer: document.referrer,
        };

        const blob = new Blob([JSON.stringify(logs, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `calibrestore-logs-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      variant: "outline",
    },
  ];

  const statisticsItems = [
    { label: "Версия", value: systemInfo.version, icon: "Tag" },
    { label: "Запущено", value: systemInfo.startDate, icon: "Calendar" },
    {
      label: "Пользователей",
      value: systemInfo.usersCount.toString(),
      icon: "Users",
    },
    {
      label: "Продавцов",
      value: systemInfo.sellersCount.toString(),
      icon: "Store",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Системная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Статистика платформы</h3>
              <div className="space-y-3">
                {statisticsItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        name={item.icon as any}
                        size={16}
                        className="text-gray-600"
                      />
                      <span className="text-sm font-medium">{item.label}:</span>
                    </div>
                    <span className="text-sm font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Системные действия</h3>
              <div className="space-y-2">
                {systemActions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    className="w-full justify-start"
                    onClick={action.action}
                  >
                    <Icon
                      name={action.icon as any}
                      size={16}
                      className="mr-2"
                    />
                    <div className="text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-gray-500">
                        {action.description}
                      </div>
                    </div>
                  </Button>
                ))}
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
            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                <Icon name="RotateCcw" size={16} />
                Сброс настроек
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                Сбросить все настройки администратора к значениям по умолчанию.
                Пользовательские данные останутся нетронутыми.
              </p>
              <Button variant="outline" onClick={resetToDefaults}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сброс к умолчанию
              </Button>
            </div>

            <Separator />

            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                <Icon name="Trash2" size={16} />
                Полное удаление данных
              </h3>
              <p className="text-sm text-red-600 mb-3">
                Это действие удалит все данные пользователей, продавцов и
                настройки. Данное действие нельзя отменить.
              </p>
              <Button variant="destructive" onClick={clearAllData}>
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить все данные
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
