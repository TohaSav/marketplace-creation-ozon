import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

interface SettingsTabProps {
  onEditProfile?: () => void;
}

export default function SettingsTab({ onEditProfile }: SettingsTabProps) {
  const { user } = useAuth();

  // Показываем заглушку, если пользователь не авторизован
  if (!user || user.userType !== "seller") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Icon
            name="Settings"
            size={48}
            className="text-gray-400 mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет доступа к настройкам
          </h3>
          <p className="text-gray-500">Настройки доступны только продавцам</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = () => {
    switch (user.status) {
      case "active":
        return {
          text: "Подтверждён",
          className: "bg-green-100 text-green-800",
          icon: "CheckCircle",
          iconColor: "text-green-500",
        };
      case "pending":
        return {
          text: "На модерации",
          className: "bg-yellow-100 text-yellow-800",
          icon: "Clock",
          iconColor: "text-yellow-500",
        };
      case "blocked":
        return {
          text: "Заблокирован",
          className: "bg-red-100 text-red-800",
          icon: "XCircle",
          iconColor: "text-red-500",
        };
      default:
        return {
          text: "Неизвестно",
          className: "bg-gray-100 text-gray-800",
          icon: "AlertCircle",
          iconColor: "text-gray-500",
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки магазина</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Название магазина
              </label>
              <p className="text-gray-900 font-medium">
                {user.shopName || "Не указано"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Статус
              </label>
              <div className="flex items-center mt-1">
                <Badge className={`${statusInfo.className} mr-2`}>
                  {statusInfo.text}
                </Badge>
                <Icon
                  name={statusInfo.icon as any}
                  className={statusInfo.iconColor}
                  size={16}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Имя продавца
              </label>
              <p className="text-gray-900 font-medium">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Дата регистрации
              </label>
              <p className="text-gray-900 font-medium">
                {user.joinDate
                  ? new Date(user.joinDate).toLocaleDateString("ru-RU")
                  : "Недавно"}
              </p>
            </div>
          </div>
          <div className="pt-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Контактная информация
              </label>
              <div className="mt-2 space-y-1">
                <p className="text-gray-900">
                  Ð­Ð»ÐµÐºÑÑÐ¾Ð½Ð½ð¾ò Ð¿Ð¾ñòðð: {user.email}
                </p>
                {user.phone && (
                  <p className="text-gray-900">Ð¢ÐµÐ»Ðµð¾Ý: {user.phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" onClick={onEditProfile}>
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
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
