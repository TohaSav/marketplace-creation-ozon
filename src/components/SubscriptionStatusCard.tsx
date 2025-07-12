import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

export default function SubscriptionStatusCard() {
  const { subscriptionStatus, getCurrentPlan, subscription } =
    useSubscription();
  const navigate = useNavigate();

  if (!subscriptionStatus || !subscriptionStatus.isActive) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            Подписка неактивна
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 mb-4">
            Для добавления товаров необходимо активировать тарифный план
          </p>
          <Button
            onClick={() => navigate("/seller/tariffs")}
            className="bg-red-600 hover:bg-red-700"
          >
            <Icon name="CreditCard" size={16} className="mr-2" />
            Выбрать тариф
          </Button>
        </CardContent>
      </Card>
    );
  }

  const plan = getCurrentPlan();
  const getStatusColor = () => {
    if (subscriptionStatus.daysRemaining <= 3)
      return "bg-red-100 text-red-800 border-red-200";
    if (subscriptionStatus.daysRemaining <= 7)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getProductsColor = () => {
    const usage =
      subscriptionStatus.maxProducts === -1
        ? 0
        : (subscriptionStatus.productsUsed / subscriptionStatus.maxProducts) *
          100;

    if (usage >= 90) return "bg-red-100 text-red-800 border-red-200";
    if (usage >= 75) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  return (
    <Card className={getStatusColor()}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="Crown" size={20} className="mr-2" />
            Тариф "{subscriptionStatus.planName}"
          </div>
          <Badge variant="outline" className="text-xs">
            Активен
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Остаток дней */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {subscriptionStatus.daysRemaining}
            </div>
            <div className="text-sm text-gray-600">
              {subscriptionStatus.daysRemaining === 1
                ? "день"
                : subscriptionStatus.daysRemaining <= 4
                  ? "дня"
                  : "дней"}{" "}
              осталось
            </div>
          </div>

          {/* Использование товаров */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {subscriptionStatus.productsUsed}
              <span className="text-lg text-gray-600">
                /
                {subscriptionStatus.maxProducts === -1
                  ? "∞"
                  : subscriptionStatus.maxProducts}
              </span>
            </div>
            <div className="text-sm text-gray-600">товаров</div>
          </div>

          {/* Цена тарифа */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {plan?.price.toLocaleString()} ₽
            </div>
            <div className="text-sm text-gray-600">
              /{plan?.duration === "month" ? "мес" : "год"}
            </div>
          </div>
        </div>

        {/* Прогресс использования товаров */}
        {subscriptionStatus.maxProducts !== -1 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Использовано товаров</span>
              <span>
                {Math.round(
                  (subscriptionStatus.productsUsed /
                    subscriptionStatus.maxProducts) *
                    100,
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  subscriptionStatus.productsUsed /
                    subscriptionStatus.maxProducts >=
                  0.9
                    ? "bg-red-500"
                    : subscriptionStatus.productsUsed /
                          subscriptionStatus.maxProducts >=
                        0.75
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
                style={{
                  width: `${Math.min((subscriptionStatus.productsUsed / subscriptionStatus.maxProducts) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Предупреждения */}
        {subscriptionStatus.daysRemaining <= 7 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">
                Подписка истекает через {subscriptionStatus.daysRemaining}{" "}
                {subscriptionStatus.daysRemaining === 1
                  ? "день"
                  : subscriptionStatus.daysRemaining <= 4
                    ? "дня"
                    : "дней"}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
              onClick={() => navigate("/seller/tariffs")}
            >
              Продлить подписку
            </Button>
          </div>
        )}

        {!subscriptionStatus.canAddProducts &&
          subscriptionStatus.maxProducts !== -1 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">
                  Достигнут лимит товаров
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Обновите тарифный план для добавления новых товаров
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 text-red-700 border-red-300 hover:bg-red-100"
                onClick={() => navigate("/seller/tariffs")}
              >
                Улучшить тариф
              </Button>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
