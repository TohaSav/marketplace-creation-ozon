import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { usePayment } from "@/hooks/usePayment";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const { checkPaymentStatus, getPendingPayment, clearPendingPayment } =
    usePayment({
      onSuccess: (paymentId) => {
        console.log("Платеж успешно создан:", paymentId);
      },
      onError: (error) => {
        console.error("Ошибка платежа:", error);
      },
      onStatusChange: (status) => {
        console.log("Статус платежа изменился:", status);
        if (status.status === "succeeded") {
          setPaymentConfirmed(true);
          setPaymentDetails(status);
          clearPendingPayment();

          toast({
            title: "Оплата прошла успешно!",
            description: "Ваш платеж был успешно обработан.",
          });
        }
      },
    });

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Получаем paymentId из URL или из pending payment
        let paymentId = searchParams.get("payment_id");

        if (!paymentId) {
          const pendingPayment = getPendingPayment();
          paymentId = pendingPayment?.id || null;
        }

        if (!paymentId) {
          throw new Error("ID платежа не найден");
        }

        // Проверяем статус платежа через наш сервис
        const paymentStatus = await checkPaymentStatus(paymentId);

        if (paymentStatus?.status === "succeeded") {
          setPaymentConfirmed(true);
          setPaymentDetails(paymentStatus);
          clearPendingPayment();
        } else if (
          paymentStatus?.status === "pending" ||
          paymentStatus?.status === "waiting_for_capture"
        ) {
          // Платеж еще обрабатывается
          setPaymentConfirmed(false);
          setPaymentDetails(paymentStatus);

          toast({
            title: "Платеж обрабатывается",
            description: "Пожалуйста, подождите. Платеж находится в обработке.",
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
            "Не удалось проверить статус платежа. Обратитесь в поддержку.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    processPayment();
  }, [
    searchParams,
    checkPaymentStatus,
    getPendingPayment,
    clearPendingPayment,
  ]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon name="AlertTriangle" size={64} className="text-red-500" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                {paymentDetails?.status === "pending" ||
                paymentDetails?.status === "waiting_for_capture"
                  ? "Платеж обрабатывается"
                  : "Ошибка оплаты"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                {paymentDetails?.status === "pending" ||
                paymentDetails?.status === "waiting_for_capture"
                  ? "Ваш платеж находится в обработке. Пожалуйста, подождите или обновите страницу."
                  : "Не удалось подтвердить оплату. Если деньги были списаны, свяжитесь с поддержкой."}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Обновить статус
                </Button>
                <br />
                <Button
                  onClick={() => navigate("/")}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  На главную
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
              Платеж успешно завершен!
            </CardTitle>
            <p className="text-lg text-gray-600">
              Спасибо за оплату! Ваш платеж был успешно обработан.
            </p>
          </CardHeader>
        </Card>

        {/* Детали платежа */}
        {paymentDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Receipt" size={24} className="mr-2 text-blue-500" />
                Детали платежа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Сумма</h3>
                  <p className="text-gray-600">
                    {paymentDetails.amount.value}{" "}
                    {paymentDetails.amount.currency}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Статус</h3>
                  <Badge className="bg-green-500 text-white">
                    <Icon name="Check" size={14} className="mr-1" />
                    Успешно
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
                  <p className="text-gray-600">{paymentDetails.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ID платежа
                  </h3>
                  <p className="text-gray-600 font-mono text-sm">
                    {paymentDetails.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Информация о следующих шагах */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Info" size={24} className="mr-2 text-blue-500" />
              Что дальше?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Icon
                  name="Mail"
                  size={20}
                  className="text-green-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Подтверждение на email</h3>
                  <p className="text-sm text-gray-600">
                    Квитанция об оплате будет отправлена на ваш email
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon
                  name="Clock"
                  size={20}
                  className="text-blue-500 mr-3 mt-1"
                />
                <div>
                  <h3 className="font-semibold">Обработка заказа</h3>
                  <p className="text-sm text-gray-600">
                    Если это был заказ, мы начнем его обработку в ближайшее
                    время
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
                  <h3 className="font-semibold">Поддержка</h3>
                  <p className="text-sm text-gray-600">
                    При возникновении вопросов обращайтесь в службу поддержки
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Действия */}
        <div className="text-center space-y-4">
          <Button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            size="lg"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Вернуться на главную
          </Button>

          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/orders")}>
              <Icon name="Package" size={16} className="mr-2" />
              Мои заказы
            </Button>

            <Button variant="outline" onClick={() => navigate("/support")}>
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Поддержка
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
