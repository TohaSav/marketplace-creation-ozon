import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import {
  createPayment,
  getTariffPlans,
  activateSubscription,
  isYookassaActive,
} from "@/utils/yookassaApi";

// Импорт компонентов
import PricingHeader from "@/components/seller-pricing/PricingHeader";
import PaymentMethodSelector from "@/components/seller-pricing/PaymentMethodSelector";
import TariffPlanCard from "@/components/seller-pricing/TariffPlanCard";
import SecurityInfo from "@/components/seller-pricing/SecurityInfo";

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
        {/* Заголовок и статусы */}
        <PricingHeader 
          isFromApproval={isFromApproval} 
          yookassaActive={yookassaActive} 
        />

        {/* Выбор способа оплаты */}
        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          walletBalance={walletBalance}
        />

        {/* Тарифные планы */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {tariffPlans.map((tariff) => (
            <TariffPlanCard
              key={tariff.id}
              tariff={tariff}
              loading={loading}
              selectedTariff={selectedTariff}
              paymentMethod={paymentMethod}
              yookassaActive={yookassaActive}
              walletBalance={walletBalance}
              onPayment={handlePayment}
            />
          ))}
        </div>

        {/* Информация о безопасности и кнопка возврата */}
        <SecurityInfo />
      </div>
    </div>
  );
}