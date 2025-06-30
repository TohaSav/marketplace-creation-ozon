import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsTabProps {
  onEditProfile?: () => void;
}

export default function SettingsTab({ onEditProfile }: SettingsTabProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки магазина</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Название магазина</label>
              <p className="text-gray-900">Apple Store Official</p>
            </div>
            <div>
              <label className="text-sm font-medium">Статус</label>
              <div className="flex items-center">
                <Badge className="bg-blue-100 text-blue-800 mr-2">
                  Подтверждён
                </Badge>
                <Icon name="CheckCircle" className="text-blue-500" size={16} />
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={onEditProfile}>
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>

      {/* Дополнительные настройки */}
      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Новые заказы</p>
              <p className="text-sm text-gray-600">
                Получать уведомления о новых заказах
              </p>
            </div>
            <Button variant="outline" size="sm">
              Включено
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Отзывы</p>
              <p className="text-sm text-gray-600">
                Уведомления о новых отзывах
              </p>
            </div>
            <Button variant="outline" size="sm">
              Включено
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Маркетинг</p>
              <p className="text-sm text-gray-600">
                Советы по продвижению товаров
              </p>
            </div>
            <Button variant="outline" size="sm">
              Отключено
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
