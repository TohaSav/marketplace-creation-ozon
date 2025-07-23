import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function SellerPricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "yukassa">(
    "yukassa",
  );
  const yookassaActive = isYookassaActive();

  // Проверяем, пришел ли пользователь после одобрения
  const isFromApproval = location.state?.fromApproval;

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600 flex items-center justify-center gap-2">
                <Icon name="ShieldX" size={24} />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок с приветствием */}
        <div className="text-center mb-16">
          {isFromApproval && (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Заявка одобрена!</span>
            </div>
          )}
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Выберите тарифный план
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {isFromApproval 
              ? "Поздравляем! Ваша заявка одобрена. Теперь выберите тарифный план для начала продаж на Calibre Store."
              : "Для начала продажи товаров необходимо выбрать и оплатить тарифный план. Выберите подходящий вариант и начните зарабатывать на Calibre Store."
            }
          </p>
        </div>

        {/* Статус ЮКассы */}
        {!yookassaActive && (
          <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Icon name="AlertTriangle" size={20} className="mr-2" />
                Платежи временно недоступны
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700">
                ЮКасса не настроена администратором. Платежные функции будут
                доступны после настройки платежной системы. Обратитесь к
                администратору для активации платежей.
              </p>
            </CardContent>
          </Card>
        )}

        {yookassaActive && (
          <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
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
        <Card className="mb-12 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Icon name="CreditCard" size={24} className="text-purple-600" />
              Способ оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === "wallet"
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Icon name="Wallet" size={28} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Личный кошелек 💳</h3>
                    <p className="text-gray-600">
                      Баланс: <span className="font-semibold">{walletBalance.toFixed(2)} ₽</span>
                    </p>
                  </div>
                </div>
                {paymentMethod === "wallet" && (
                  <div className="mt-4 flex items-center gap-2 text-green-600">
                    <Icon name="CheckCircle" size={20} />
                    <span className="font-semibold">Выбрано</span>
                  </div>
                )}
              </div>

              <div
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === "yukassa"
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => setPaymentMethod("yukassa")}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Icon name="CreditCard" size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">ЮКасса</h3>
                    <p className="text-gray-600">
                      Карта, СБП, кошельки
                    </p>
                  </div>
                </div>
                {paymentMethod === "yukassa" && (
                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <Icon name="CheckCircle" size={20} />
                    <span className="font-semibold">Выбрано</span>
                  </div>
                )}
              </div>
            </div>

            {walletBalance < 50 && paymentMethod === "wallet" && (
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-amber-800 mb-3">
                  <Icon name="AlertTriangle" size={20} />
                  <span className="font-semibold">
                    Недостаточно средств на кошельке
                  </span>
                </div>
                <Button
                  onClick={() => navigate("/seller/wallet")}
                  variant="outline"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Пополнить кошелек
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Тарифные планы */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {tariffPlans.map((tariff) => (
            <Card
              key={tariff.id}
              className={`relative transition-all duration-300 transform hover:scale-105 border-0 shadow-xl ${
                tariff.id === "trial"
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-400"
                  : tariff.popular
                    ? "bg-gradient-to-br from-purple-50 to-indigo-50 ring-2 ring-purple-400 scale-110"
                    : "bg-gradient-to-br from-gray-50 to-blue-50"
              }`}
            >
              {tariff.id === "trial" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
                    🎁 Бесплатно
                  </Badge>
                </div>
              )}
              {tariff.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
                    ⭐ Популярный выбор
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {tariff.name}
                </CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {tariff.price.toLocaleString()} ₽
                  </span>
                  <span className="text-gray-500 ml-2 text-lg">
                    / {tariff.duration}
                  </span>
                </div>
                {tariff.savings && (
                  <Badge
                    variant="outline"
                    className="mt-3 text-green-600 border-green-400 bg-green-50 font-semibold"
                  >
                    💰 {tariff.savings}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <ul className="space-y-4 mb-8">
                  {tariff.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="p-1 bg-green-100 rounded-full mr-3 mt-0.5">
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-600"
                        />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePayment(tariff.id)}
                  disabled={
                    loading ||
                    (paymentMethod === "yukassa" && !yookassaActive) ||
                    (paymentMethod === "wallet" && walletBalance < tariff.price)
                  }
                  className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                    (paymentMethod === "yukassa" && !yookassaActive) ||
                    (paymentMethod === "wallet" && walletBalance < tariff.price)
                      ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                      : tariff.id === "trial"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                        : tariff.popular
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
                          : "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black shadow-lg"
                  }`}
                >
                  {loading && selectedTariff === tariff.id ? (
                    <>
                      <Icon
                        name="Loader2"
                        size={20}
                        className="mr-2 animate-spin"
                      />
                      Обработка...
                    </>
                  ) : paymentMethod === "yukassa" && !yookassaActive ? (
                    <>
                      <Icon name="Lock" size={20} className="mr-2" />
                      Платежи недоступны
                    </>
                  ) : paymentMethod === "wallet" &&
                    walletBalance < tariff.price ? (
                    <>
                      <Icon name="AlertCircle" size={20} className="mr-2" />
                      Недостаточно средств
                    </>
                  ) : paymentMethod === "wallet" ? (
                    <>
                      <Icon name="Wallet" size={20} className="mr-2" />
                      Оплатить с кошелька
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Выбрать и оплатить
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Информация об оплате */}
        <Card className="max-w-5xl mx-auto shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Icon name="Shield" size={28} className="mr-3 text-green-500" />
              Безопасная оплата
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <Icon
                    name="Lock"
                    size={40}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="font-bold text-lg">Защищенные платежи</h3>
                <p className="text-gray-600">
                  Все платежи обрабатываются через ЮКассу с SSL-шифрованием
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <Icon
                    name="RefreshCw"
                    size={40}
                    className="text-green-600"
                  />
                </div>
                <h3 className="font-bold text-lg">Автопродление</h3>
                <p className="text-gray-600">
                  Подписка автоматически продлевается в конце периода
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <Icon
                    name="HeadphonesIcon"
                    size={40}
                    className="text-purple-600"
                  />
                </div>
                <h3 className="font-bold text-lg">Поддержка 24/7</h3>
                <p className="text-gray-600">
                  Техническая поддержка доступна круглосуточно
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка возврата */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => navigate("/seller/dashboard")}
            className="px-8 py-3 text-lg border-2 hover:bg-gray-50"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться в кабинет
          </Button>
        </div>
      </div>
    </div>
  );
}