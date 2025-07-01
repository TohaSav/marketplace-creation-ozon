import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  formatDate,
  getDaysRemaining,
  isSubscriptionActive,
} from "@/utils/yookassaApi";

export default function SubscriptionStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.userType !== "seller") {
    return null;
  }

  const subscription = user.subscription;
  const isActive = isSubscriptionActive(subscription);

  if (!subscription || !isActive) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            Подписка неактивна
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-600 mb-4">
            Для добавления товаров необходимо оплатить тарифный план
          </p>
          <Button
            onClick={() => navigate("/seller/tariffs")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Icon name="Crown" size={16} className="mr-2" />
            Выбрать тариф
          </Button>
        </CardContent>
      </Card>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isExpiringSoon = daysRemaining <= 7;

  return (
    <Card
      className={`${isExpiringSoon ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center ${isExpiringSoon ? "text-yellow-700" : "text-green-700"}`}
        >
          <Icon
            name={isExpiringSoon ? "Clock" : "CheckCircle"}
            size={20}
            className="mr-2"
          />
          Статус подписки
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Тарифный план:</span>
            <Badge
              className={`${isExpiringSoon ? "bg-yellow-500" : "bg-green-500"} text-white`}
            >
              {subscription.planName}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Действует до:</span>
            <span
              className={`text-sm ${isExpiringSoon ? "text-yellow-700" : "text-green-700"}`}
            >
              {formatDate(subscription.endDate)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Осталось дней:</span>
            <span
              className={`text-sm font-bold ${isExpiringSoon ? "text-yellow-700" : "text-green-700"}`}
            >
              {daysRemaining}
            </span>
          </div>

          {isExpiringSoon && (
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
              <p className="text-yellow-800 text-sm mb-2">
                ⚠️ Подписка скоро истекает!
              </p>
              <Button
                size="sm"
                onClick={() => navigate("/seller/tariffs")}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Продлить подписку
              </Button>
            </div>
          )}

          {subscription.autoRenew && (
            <div className="flex items-center text-xs text-gray-600 mt-2">
              <Icon name="RefreshCw" size={12} className="mr-1" />
              Автопродление включено
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
