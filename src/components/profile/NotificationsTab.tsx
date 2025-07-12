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
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    Заказ доставлен
                  </p>
                  <p className="text-xs text-blue-700">
                    Ваш заказ #12345 был успешно доставлен
                  </p>
                  <p className="text-xs text-blue-600 mt-1">2 часа назад</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Star" size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    Новые бонусы
                  </p>
                  <p className="text-xs text-green-700">
                    Вам начислено 150 бонусных рублей
                  </p>
                  <p className="text-xs text-green-600 mt-1">1 день назад</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Percent" size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900">
                    Персональная скидка
                  </p>
                  <p className="text-xs text-orange-700">
                    Скидка 15% на смартфоны до конца недели
                  </p>
                  <p className="text-xs text-orange-600 mt-1">3 дня назад</p>
                </div>
              </div>
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
