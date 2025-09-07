import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import AccessDenied from "@/components/seller-tariffs/AccessDenied";
import PaymentStatusCards from "@/components/seller-tariffs/PaymentStatusCards";
import PaymentMethodSelector from "@/components/seller-tariffs/PaymentMethodSelector";
import TariffCard from "@/components/seller-tariffs/TariffCard";
import PaymentSecurityInfo from "@/components/seller-tariffs/PaymentSecurityInfo";

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
    return <AccessDenied />;
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
        <PaymentStatusCards yookassaActive={yookassaActive} />

        {/* Выбор способа оплаты */}
        <PaymentMethodSelector
          walletBalance={walletBalance}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {/* Тарифные планы */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {tariffPlans.map((tariff) => (
            <TariffCard
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

        {/* Информация об оплате */}
        <PaymentSecurityInfo />

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