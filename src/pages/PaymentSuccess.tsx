import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { activateSubscription, verifyPayment } from "@/utils/yookassaApi";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        const paymentId = searchParams.get("payment_id");
        const tariffId = searchParams.get("tariff_id");

        if (!paymentId || !tariffId || !user) {
          throw new Error("Недостаточно данных для обработки платежа");
        }

        // Проверяем статус платежа
        const paymentStatus = await verifyPayment(paymentId);

        if (paymentStatus.status === "succeeded") {
          // Активируем подписку
          const planType =
            tariffId === "monthly"
              ? "monthly"
              : tariffId === "yearly"
                ? "yearly"
                : "trial";
          const subscription = activateSubscription(user.id, planType);

          // Обновляем данные пользователя
          updateUser({ ...user, subscription });

          setPaymentConfirmed(true);
          setSubscriptionDetails(subscription);

          toast({
            title: "Оплата прошла успешно!",
            description:
              "Ваша подписка активирована. Теперь вы можете добавлять товары.",
          });
        } else {
          throw new Error("Платеж не был успешно завершен");
        }
      } catch (error) {
        console.error("Ошибка обработки платежа:", error);
        setPaymentConfirmed(false);
        toast({
          title: "Ошибка обработки платежа",
          description:
            "Не удалось активировать подписку. Обратитесь в поддержку.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    processPayment();
  }, [searchParams, user, updateUser]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon
                  name="Loader2"
                  size={64}
                  className="text-purple-500 animate-spin"
                />
              </div>
              <CardTitle className="text-2xl">Проверяем оплату...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Пожалуйста, подождите. Мы проверяем статус вашего платежа.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!paymentConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon name="AlertTriangle" size={64} className="text-red-500" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Ошибка оплаты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Не удалось подтвердить оплату. Если деньги были списаны,
                свяжитесь с поддержкой.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/seller/tariffs")}
                  variant="outline"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Попробовать снова
                </Button>
                <br />
                <Button
                  onClick={() => navigate("/seller/dashboard")}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  <Icon name="Home" size={16} className="mr-2" />В кабинет
                  продавца
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Успешная оплата */}
        <Card className="text-center mb-8">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={48} className="text-green-500" />
              </div>
            </div>
            <CardTitle className="text-3xl text-green-600 mb-2">
              Оплата прошла успешно!
            </CardTitle>
            <p className="text-lg text-gray-600">
              Ваша подписка активирована. Теперь вы можете добавлять товары на
              Calibre Store.
            </p>
          </CardHeader>
        </Card>

        {/* Детали подписки */}
        {subscriptionDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Crown" size={24} className="mr-2 text-yellow-500" />
                Детали подписки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Тарифный план
                  </h3>
                  <p className="text-gray-600">
                    {subscriptionDetails.planName}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Статус</h3>
                  <Badge className="bg-green-500 text-white">
                    <Icon name="Check" size={14} className="mr-1" />
                    Активна
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Дата начала
                  </h3>
                  <p className="text-gray-600">
                    {new Date(subscriptionDetails.startDate).toLocaleDateString(
                      "ru-RU",
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Действует до
                  </h3>
                  <p className="text-gray-600">
                    {new Date(subscriptionDetails.endDate).toLocaleDateString(
                      "ru-RU",
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Возможности */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Star" size={24} className="mr-2 text-purple-500" />
              Доступные возможности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Icon
                  name="Plus"
                  size={20}
                  className="text-green-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Добавление товаров</h3>
                  <p className="text-sm text-gray-600">
                    Неограниченное количество товаров
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon
                  name="BarChart3"
                  size={20}
                  className="text-blue-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Аналитика продаж</h3>
                  <p className="text-sm text-gray-600">
                    Детальная статистика заказов
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon
                  name="HeadphonesIcon"
                  size={20}
                  className="text-purple-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Техническая поддержка</h3>
                  <p className="text-sm text-gray-600">
                    Помощь в работе с платформой
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon
                  name="TrendingUp"
                  size={20}
                  className="text-orange-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Продвижение товаров</h3>
                  <p className="text-sm text-gray-600">
                    Увеличение видимости в каталоге
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Действия */}
        <div className="text-center space-y-4">
          <Button
            onClick={() => navigate("/seller/add-product")}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            size="lg"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Добавить первый товар
          </Button>

          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/seller/dashboard")}
            >
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Кабинет продавца
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/seller/products")}
            >
              <Icon name="Package" size={16} className="mr-2" />
              Мои товары
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
