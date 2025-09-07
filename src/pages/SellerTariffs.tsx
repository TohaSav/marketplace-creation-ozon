import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import {
  createPayment,
  getTariffPlans,
  activateSubscription,
  isYookassaActive,
} from "@/utils/yookassaApi";

interface TariffPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

const tariffPlans = getTariffPlans();

export default function SellerTariffs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "yukassa">(
    "yukassa",
  );
  const yookassaActive = isYookassaActive();

  // Загружаем баланс кошелька продавца
  useEffect(() => {
    if (user) {
      const sellerData = JSON.parse(
        localStorage.getItem("seller-token") || "{}",
      );
      setWalletBalance(parseFloat(sellerData.balance || "0"));
    }
  }, [user]);

  // Проверяем что пользователь - продавец
  if (user?.userType !== "seller") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">
                Доступ запрещен
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Данная страница доступна только зарегистрированным продавцам.
              </p>
              <Button onClick={() => navigate("/")} variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handlePayment = async (tariffId: string) => {
    setLoading(true);
    setSelectedTariff(tariffId);

    try {
      const tariff = tariffPlans.find((t) => t.id === tariffId);
      if (!tariff) {
        throw new Error("Тариф не найден");
      }

      // Для пробного периода - сразу активируем независимо от способа оплаты
      if (tariff.id === "trial") {
        // Активируем подписку
        activateSubscription(user.id, tariff.id);

        toast({
          title: "Пробный период активирован! 🎉",
          description: `Тариф "${tariff.name}" успешно активирован`,
        });

        navigate("/seller/dashboard");
        return;
      }

      if (paymentMethod === "wallet") {
        // Оплата с кошелька
        if (walletBalance < tariff.price) {
          toast({
            title: "Недостаточно средств",
            description: `На кошельке ${walletBalance.toFixed(2)} ₽, а нужно ${tariff.price} ₽`,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Списываем средства с кошелька продавца
        const newBalance = walletBalance - tariff.price;
        const sellerData = JSON.parse(
          localStorage.getItem("seller-token") || "{}",
        );
        sellerData.balance = newBalance.toString();
        localStorage.setItem("seller-token", JSON.stringify(sellerData));
        setWalletBalance(newBalance);

        // Создаем транзакцию списания
        const transaction = {
          id: Date.now().toString(),
          sellerId: user.id,
          type: "tariff",
          amount: tariff.price,
          description: `Покупка тарифа "${tariff.name}"`,
          createdAt: new Date().toISOString(),
          status: "completed",
        };

        const allTransactions = JSON.parse(
          localStorage.getItem("seller-wallet-transactions") || "[]",
        );
        allTransactions.push(transaction);
        localStorage.setItem(
          "seller-wallet-transactions",
          JSON.stringify(allTransactions),
        );

        // Активируем подписку
        activateSubscription(user.id, tariff.id);

        toast({
          title: "Тариф активирован! 🎉",
          description: `Тариф "${tariff.name}" успешно оплачен с кошелька`,
        });

        navigate("/seller/dashboard");
      } else {
        // Оплата через ЮКассу
        if (!yookassaActive) {
          toast({
            title: "Платежи недоступны",
            description: "ЮКасса не настроена. Обратитесь к администратору.",
            variant: "destructive",
          });
          return;
        }

        const paymentData = await createPayment({
          amount: tariff.price,
          description: `Подписка ${tariff.name} для продавца`,
          tariffId: tariff.id,
          sellerId: user.id,
          returnUrl:
            window.location.origin +
            "/seller/payment-success?tariff_id=" +
            tariff.id,
        });

        // Перенаправляем на страницу оплаты ЮКассы
        window.location.href = paymentData.confirmationUrl;
      }
    } catch (error) {
      console.error("Ошибка оплаты:", error);
      toast({
        title: "Ошибка оплаты",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось создать платеж. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSelectedTariff(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Выберите тарифный план
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Для начала продажи товаров необходимо выбрать и оплатить тарифный
            план. Выберите подходящий вариант и начните зарабатывать на Calibre
            Store.
          </p>
        </div>

        {/* Статус ЮКассы */}
        {!yookassaActive && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <Icon name="AlertTriangle" size={20} className="mr-2" />
                Платежи временно недоступны
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                ЮКасса не настроена администратором. Платежные функции будут
                доступны после настройки платежной системы. Обратитесь к
                администратору для активации платежей.
              </p>
            </CardContent>
          </Card>
        )}

        {yookassaActive && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Платежи активны
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                ЮКасса настроена и готова к приему платежей. Вы можете безопасно
                оплачивать тарифы.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Выбор способа оплаты */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={20} />
              Способ оплаты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "wallet"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Wallet" size={24} className="text-green-600" />
                  <div>
                    <h3 className="font-semibold">Личный кошелек 💳</h3>
                    <p className="text-sm text-gray-600">
                      Баланс: {walletBalance.toFixed(2)} ₽
                    </p>
                  </div>
                </div>
                {paymentMethod === "wallet" && (
                  <div className="mt-2 flex items-center gap-1 text-green-600">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">Выбрано</span>
                  </div>
                )}
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "yukassa"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPaymentMethod("yukassa")}
              >
                <div className="flex items-center gap-3">
                  <Icon name="CreditCard" size={24} className="text-blue-600" />
                  <div>
                    <h3 className="font-semibold">ЮКасса</h3>
                    <p className="text-sm text-gray-600">
                      Карта, СБП, кошельки
                    </p>
                  </div>
                </div>
                {paymentMethod === "yukassa" && (
                  <div className="mt-2 flex items-center gap-1 text-blue-600">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">Выбрано</span>
                  </div>
                )}
              </div>
            </div>

            {walletBalance < 50 && paymentMethod === "wallet" && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Icon name="AlertTriangle" size={16} />
                  <span className="text-sm font-medium">
                    Недостаточно средств на кошельке
                  </span>
                </div>
                <Button
                  onClick={() => navigate("/seller/wallet")}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Пополнить кошелек
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Тарифные планы */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {tariffPlans.map((tariff) => (
            <Card
              key={tariff.id}
              className={`relative ${
                tariff.id === "trial"
                  ? "ring-2 ring-green-500 shadow-lg"
                  : tariff.popular
                    ? "ring-2 ring-purple-500 shadow-lg scale-105"
                    : ""
              }`}
            >
              {tariff.id === "trial" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Бесплатно
                  </Badge>
                </div>
              )}
              {tariff.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">
                    Популярный выбор
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">
                  {tariff.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-600">
                    {tariff.price.toLocaleString()} ₽
                  </span>
                  <span className="text-gray-500 ml-2">
                    / {tariff.duration}
                  </span>
                </div>
                {tariff.savings && (
                  <Badge
                    variant="outline"
                    className="mt-2 text-green-600 border-green-600"
                  >
                    {tariff.savings}
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tariff.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Icon
                        name="Check"
                        size={20}
                        className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePayment(tariff.id)}
                  disabled={
                    loading ||
                    (paymentMethod === "yukassa" && !yookassaActive && tariff.id !== "trial") ||
                    (paymentMethod === "wallet" && walletBalance < tariff.price)
                  }
                  className={`w-full ${
                    (paymentMethod === "yukassa" && !yookassaActive && tariff.id !== "trial") ||
                    (paymentMethod === "wallet" && walletBalance < tariff.price)
                      ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                      : tariff.id === "trial"
                        ? "bg-green-600 hover:bg-green-700"
                        : tariff.popular
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-800 hover:bg-gray-900"
                  }`}
                >
                  {loading && selectedTariff === tariff.id ? (
                    <>
                      <Icon
                        name="Loader2"
                        size={16}
                        className="mr-2 animate-spin"
                      />
                      Обработка...
                    </>
                  ) : paymentMethod === "yukassa" && !yookassaActive && tariff.id !== "trial" ? (
                    <>
                      <Icon name="Lock" size={16} className="mr-2" />
                      Платежи недоступны
                    </>
                  ) : paymentMethod === "wallet" &&
                    walletBalance < tariff.price ? (
                    <>
                      <Icon name="AlertCircle" size={16} className="mr-2" />
                      Недостаточно средств
                    </>
                  ) : tariff.id === "trial" ? (
                    <>
                      <Icon name="Gift" size={16} className="mr-2" />
                      Активировать бесплатно
                    </>
                  ) : paymentMethod === "wallet" ? (
                    <>
                      <Icon name="Wallet" size={16} className="mr-2" />
                      Оплатить с кошелька
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Выбрать и оплатить
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Информация об оплате */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Shield" size={24} className="mr-2 text-green-500" />
              Безопасная оплата
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Icon
                  name="Lock"
                  size={32}
                  className="mx-auto mb-2 text-blue-500"
                />
                <h3 className="font-semibold mb-1">Защищенные платежи</h3>
                <p className="text-sm text-gray-600">
                  Все платежи обрабатываются через ЮКассу с SSL-шифрованием
                </p>
              </div>
              <div>
                <Icon
                  name="RefreshCw"
                  size={32}
                  className="mx-auto mb-2 text-green-500"
                />
                <h3 className="font-semibold mb-1">Автопродление</h3>
                <p className="text-sm text-gray-600">
                  Подписка автоматически продлевается в конце периода
                </p>
              </div>
              <div>
                <Icon
                  name="HeadphonesIcon"
                  size={32}
                  className="mx-auto mb-2 text-purple-500"
                />
                <h3 className="font-semibold mb-1">Поддержка 24/7</h3>
                <p className="text-sm text-gray-600">
                  Техническая поддержка доступна круглосуточно
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка возврата */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/seller/dashboard")}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться в кабинет
          </Button>
        </div>
      </div>
    </div>
  );
}