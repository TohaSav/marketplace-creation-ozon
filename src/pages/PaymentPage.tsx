import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import { createPayment } from "@/utils/yookassaApi";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [creating, setCreating] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handlePayment = async () => {
    if (!user || !paymentData) {
      toast({
        title: "Ошибка",
        description: "Недостаточно данных для оплаты",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      const paymentUrl = await createPayment({
        amount: paymentData.amount,
        description: paymentData.description,
        metadata: {
          type: paymentData.type,
          adId: paymentData.adId,
          duration: paymentData.duration,
          userId: user.id,
        },
      });

      // Перенаправляем пользователя на ЮKassa
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Ошибка создания платежа:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <Icon name="CreditCard" size={64} />
            </div>
            <CardTitle className="text-2xl text-center">
              Оплата рекламы
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Услуга:</span>
                <span className="font-medium">{paymentData.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Период:</span>
                <span className="font-medium">{paymentData.duration} дней</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Стоимость:</span>
                <span className="text-2xl font-bold text-purple-600">
                  {paymentData.amount} ₽
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Что входит в рекламу:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Показ среди товаров на главной странице</li>
                <li>• Автоматическая ротация объявлений</li>
                <li>• Статистика просмотров и кликов</li>
                <li>• Возможность добавления целевой ссылки</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handlePayment}
                disabled={creating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
              >
                {creating ? (
                  <>
                    <Icon
                      name="Loader2"
                      className="mr-2 h-5 w-5 animate-spin"
                    />
                    Создание платежа...
                  </>
                ) : (
                  <>
                    <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                    Оплатить {paymentData.amount} ₽
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full"
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                Назад
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Безопасная оплата через ЮKassa</p>
              <p>Мы не храним данные ваших карт</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
