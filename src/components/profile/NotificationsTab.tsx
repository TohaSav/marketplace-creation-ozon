import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NOTIFICATION_SETTINGS } from "@/constants/profile.constants";

export default function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Bell" size={20} />
          Уведомления
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Последние уведомления */}
          <div>
            <h3 className="font-medium mb-4">Последние уведомления</h3>
            <div className="text-center py-8">
              <Icon
                name="Bell"
                size={48}
                className="text-gray-400 mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Пока нет уведомлений
              </h3>
              <p className="text-gray-500 mb-4">
                Здесь будут отображаться важные уведомления о ваших заказах и
                акциях
              </p>
            </div>
          </div>

          {/* Настройки уведомлений */}
          <div>
            <h3 className="font-medium mb-4">Настройки уведомлений</h3>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Уведомления о заказах",
                  description: "Информация о статусе ваших заказов",
                  enabled: true,
                },
                {
                  id: 2,
                  title: "Персональные предложения",
                  description: "Скидки и акции специально для вас",
                  enabled: true,
                },
                {
                  id: 3,
                  title: "Новости и обновления",
                  description: "Информация о новых товарах и функциях",
                  enabled: false,
                },
                {
                  id: 4,
                  title: "SMS уведомления",
                  description: "Важные уведомления на ваш телефон",
                  enabled: false,
                },
                {
                  id: 5,
                  title: "Email рассылка",
                  description: "Еженедельные подборки и предложения",
                  enabled: true,
                },
              ].map((setting, index) => (
                <div
                  key={setting.id}
                  className={`flex items-center justify-between py-3 ${
                    index < 4 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium">{setting.title}</div>
                    <div className="text-sm text-gray-500">
                      {setting.description}
                    </div>
                  </div>
                  <Button
                    variant={setting.enabled ? "default" : "outline"}
                    size="sm"
                    className={
                      setting.enabled ? "bg-green-600 hover:bg-green-700" : ""
                    }
                  >
                    {setting.enabled ? "Включено" : "Выключено"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
