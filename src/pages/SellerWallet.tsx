import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

export default function SellerWallet() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<SellerWalletTransaction[]>(
    [],
  );
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);

  useEffect(() => {
    if (!user || user.userType !== "seller") {
      navigate("/seller");
      return;
    }
    loadWalletData();
  }, [user, navigate]);

  const loadWalletData = () => {
    if (!user) return;

    // Загружаем баланс из localStorage (используем seller-token для совместимости)
    const sellerData = JSON.parse(localStorage.getItem("seller-token") || "{}");
    setBalance(parseFloat(sellerData.balance || "0"));

    // Загружаем транзакции
    const allTransactions = JSON.parse(
      localStorage.getItem("seller-wallet-transactions") || "[]",
    );
    const sellerTransactions = allTransactions.filter(
      (t: SellerWalletTransaction) => t.sellerId === user.id,
    );
    setTransactions(
      sellerTransactions.sort(
        (a: SellerWalletTransaction, b: SellerWalletTransaction) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };

  const handleDeposit = async () => {
    if (!user) return;

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму для пополнения",
        variant: "destructive",
      });
      return;
    }

    if (amount < 10) {
      toast({
        title: "Ошибка",
        description: "Минимальная сумма пополнения - 10 рублей",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Создаем транзакцию пополнения
      const transaction: SellerWalletTransaction = {
        id: Date.now().toString(),
        sellerId: user.id,
        type: "deposit",
        amount: amount,
        description: `Пополнение кошелька продавца на ${amount} ₽`,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      // Создаем платеж через Юкассу
      const paymentData = {
        amount: {
          value: amount.toString(),
          currency: "RUB",
        },
        confirmation: {
          type: "redirect",
          return_url: `${window.location.origin}/seller/wallet-success?transaction=${transaction.id}`,
        },
        description: `Пополнение кошелька продавца на ${amount} ₽`,
        metadata: {
          type: "seller_wallet_deposit",
          sellerId: user.id,
          transactionId: transaction.id,
        },
      };

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const payment = await response.json();

      if (payment.confirmation && payment.confirmation.confirmation_url) {
        // Сохраняем транзакцию
        const allTransactions = JSON.parse(
          localStorage.getItem("seller-wallet-transactions") || "[]",
        );
        allTransactions.push(transaction);
        localStorage.setItem(
          "seller-wallet-transactions",
          JSON.stringify(allTransactions),
        );

        // Переходим на страницу оплаты
        window.location.href = payment.confirmation.confirmation_url;
      } else {
        throw new Error("Не удалось создать платеж");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж для пополнения",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <Icon name="Plus" size={16} className="text-green-600" />;
      case "withdrawal":
        return <Icon name="Minus" size={16} className="text-red-600" />;
      case "tariff":
        return <Icon name="Crown" size={16} className="text-purple-600" />;
      case "advertising":
        return <Icon name="Megaphone" size={16} className="text-blue-600" />;
      case "commission":
        return <Icon name="Percent" size={16} className="text-orange-600" />;
      case "game_prize":
        return <Icon name="Gift" size={16} className="text-yellow-600" />;
      default:
        return <Icon name="CreditCard" size={16} className="text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "game_prize":
        return "text-green-600";
      case "withdrawal":
      case "tariff":
      case "advertising":
      case "commission":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Выполнено</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Обработка</Badge>
        );
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Ошибка</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Проверяем статус продавца
  if (user?.userType === "seller" && user?.status !== "active") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Icon name="Lock" size={64} className="text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Кошелек недоступен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-lg mb-6">
              Личный кошелек доступен только для активных продавцов.
            </p>
            <Button
              onClick={() => navigate("/seller/dashboard")}
              variant="outline"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к кабинету
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/seller/dashboard")}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к кабинету
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Личный кошелек 💰
        </h1>
        <p className="text-gray-600">
          Управляйте финансами вашего магазина и оплачивайте тарифы
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Баланс и пополнение */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" size={20} />
                Баланс кошелька
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {balance.toFixed(2)} ₽
                </div>
                <p className="text-sm text-gray-600">Доступно для трат</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowDepositForm(!showDepositForm)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Пополнить кошелек
                </Button>

                {showDepositForm && (
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="depositAmount">Сумма пополнения</Label>
                      <Input
                        id="depositAmount"
                        type="number"
                        placeholder="Введите сумму"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min="10"
                        step="1"
                      />
                      <p className="text-xs text-gray-500">
                        Минимальная сумма: 10 рублей
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleDeposit}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Создание платежа...
                          </>
                        ) : (
                          <>
                            <Icon
                              name="CreditCard"
                              size={16}
                              className="mr-2"
                            />
                            Оплатить
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowDepositForm(false)}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount("500")}
                  >
                    500 ₽
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount("1000")}
                  >
                    1000 ₽
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount("2000")}
                  >
                    2000 ₽
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount("5000")}
                  >
                    5000 ₽
                  </Button>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Возможности кошелька:
                </h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Оплата тарифов магазина</li>
                  <li>• Оплата рекламы</li>
                  <li>• Получение призов из игр</li>
                  <li>• Быстрые платежи</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* История транзакций */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" size={20} />
                История операций
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon
                      name="FileText"
                      size={64}
                      className="mx-auto text-gray-400 mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Нет операций
                    </h3>
                    <p className="text-gray-600">
                      Здесь будут отображаться все ваши транзакции
                    </p>
                  </div>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p
                            className={`font-semibold ${getTransactionColor(transaction.type)}`}
                          >
                            {transaction.type === "deposit" ||
                            transaction.type === "game_prize"
                              ? "+"
                              : "-"}
                            {transaction.amount.toFixed(2)} ₽
                          </p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Zap" size={20} />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/seller/tariffs")}
              >
                <Icon name="Crown" size={24} />
                <span>Купить тариф</span>
                <span className="text-xs text-gray-500">
                  Активация магазина
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/seller/advertising")}
              >
                <Icon name="Megaphone" size={24} />
                <span>Заказать рекламу</span>
                <span className="text-xs text-gray-500">
                  Продвижение товаров
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/seller/luck-game")}
              >
                <Icon name="Ticket" size={24} />
                <span>Игры Удача</span>
                <span className="text-xs text-gray-500">Ежедневные призы</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate("/seller/dashboard")}
              >
                <Icon name="BarChart3" size={24} />
                <span>Аналитика</span>
                <span className="text-xs text-gray-500">Статистика продаж</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
