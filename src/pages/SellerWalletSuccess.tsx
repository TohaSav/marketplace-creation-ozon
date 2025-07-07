import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

interface SellerWalletTransaction {
  id: string;
  sellerId: string;
  type:
    | "deposit"
    | "withdrawal"
    | "tariff"
    | "advertising"
    | "commission"
    | "game_prize";
  amount: number;
  description: string;
  createdAt: string;
  status: "pending" | "completed" | "failed";
}

export default function SellerWalletSuccess() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] =
    useState<SellerWalletTransaction | null>(null);

  useEffect(() => {
    if (!user || user.userType !== "seller") {
      navigate("/seller");
      return;
    }

    const transactionId = searchParams.get("transaction");
    if (transactionId) {
      processSuccessfulPayment(transactionId);
    } else {
      setLoading(false);
    }
  }, [user, searchParams, navigate]);

  const processSuccessfulPayment = (transactionId: string) => {
    try {
      // Находим транзакцию
      const allTransactions = JSON.parse(
        localStorage.getItem("seller-wallet-transactions") || "[]",
      );
      const transactionIndex = allTransactions.findIndex(
        (t: SellerWalletTransaction) => t.id === transactionId,
      );

      if (transactionIndex === -1) {
        throw new Error("Транзакция не найдена");
      }

      const foundTransaction = allTransactions[transactionIndex];

      if (foundTransaction.status === "completed") {
        setTransaction(foundTransaction);
        setLoading(false);
        return;
      }

      // Обновляем статус транзакции
      foundTransaction.status = "completed";
      allTransactions[transactionIndex] = foundTransaction;
      localStorage.setItem(
        "seller-wallet-transactions",
        JSON.stringify(allTransactions),
      );

      // Пополняем баланс продавца
      if (user && foundTransaction.type === "deposit") {
        const sellerData = JSON.parse(
          localStorage.getItem("seller-token") || "{}",
        );
        const currentBalance = parseFloat(sellerData.balance || "0");
        const newBalance = currentBalance + foundTransaction.amount;

        sellerData.balance = newBalance.toString();
        localStorage.setItem("seller-token", JSON.stringify(sellerData));

        toast({
          title: "Кошелек пополнен! 💰",
          description: `На ваш баланс зачислено ${foundTransaction.amount} ₽`,
        });
      }

      setTransaction(foundTransaction);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать платеж",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Обработка платежа...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Icon name="CheckCircle" size={64} className="text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Кошелек успешно пополнен!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transaction && (
            <div className="space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  Детали пополнения:
                </h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p>
                    <strong>Сумма:</strong> {transaction.amount} ₽
                  </p>
                  <p>
                    <strong>Дата:</strong>{" "}
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Статус:</strong> Успешно зачислено
                  </p>
                  <p>
                    <strong>ID транзакции:</strong> {transaction.id}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Что можно делать теперь:
                </h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>👑 Покупать тарифы для магазина</li>
                  <li>📢 Заказывать рекламу товаров</li>
                  <li>🎯 Быстро оплачивать услуги</li>
                  <li>🔒 Безопасно хранить деньги</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/seller/wallet")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Wallet" size={16} className="mr-2" />
                  Перейти в кошелек
                </Button>
                <Button
                  onClick={() => navigate("/seller/tariffs")}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Crown" size={16} className="mr-2" />
                  Купить тариф
                </Button>
                <Button
                  onClick={() => navigate("/seller/advertising")}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Megaphone" size={16} className="mr-2" />
                  Заказать рекламу
                </Button>
                <Button
                  onClick={() => navigate("/seller/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Home" size={16} className="mr-2" />В кабинет
                  продавца
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
