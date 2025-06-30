import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: "deposit" | "purchase" | "refund";
  amount: number;
  description: string;
  date: string;
}

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const [transactions] = useState<Transaction[]>([]);

  const paymentMethods = [
    { id: "card", name: "Банковская карта", icon: "CreditCard" },
    { id: "sbp", name: "СБП", icon: "Smartphone" },
    { id: "yandex", name: "ЮMoney", icon: "Wallet" },
    { id: "qiwi", name: "QIWI", icon: "Banknote" },
  ];

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount > 0) {
      setBalance((prev) => prev + amount);
      setTopUpAmount("");
      setShowTopUp(false);
      // Здесь будет реальная интеграция с платежными системами
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "ArrowDownToLine";
      case "purchase":
        return "ShoppingCart";
      case "refund":
        return "RotateCcw";
      default:
        return "Circle";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-600";
      case "purchase":
        return "text-red-600";
      case "refund":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Баланс кошелька */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon name="Wallet" size={24} className="mr-3" />
            <h3 className="text-lg font-semibold">Мой кошелек</h3>
          </div>
          <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
            <Icon
              name={isBalanceVisible ? "Eye" : "EyeOff"}
              size={20}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm opacity-80 mb-1">Доступный баланс</p>
          {balance === 0 ? (
            <div className="text-center py-4">
              <p className="text-lg opacity-70 mb-2">Кошелёк пуст</p>
              <p className="text-sm opacity-60">
                Пополните баланс для совершения покупок
              </p>
            </div>
          ) : (
            <p className="text-3xl font-bold">
              {balance.toLocaleString("ru-RU")} ₽
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowTopUp(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            variant="outline"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Пополнить
          </Button>
        </div>
      </div>

      {/* Модальное окно пополнения */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Пополнить кошелек</h3>
              <Button
                onClick={() => setShowTopUp(false)}
                variant="ghost"
                size="sm"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сумма пополнения
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₽
                  </span>
                </div>

                {/* Быстрые суммы */}
                <div className="flex gap-2 mt-3">
                  {[500, 1000, 2000, 5000].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => setTopUpAmount(amount.toString())}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {amount}₽
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Способ оплаты
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPaymentMethod === method.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="sr-only"
                      />
                      <Icon
                        name={method.icon as any}
                        size={20}
                        className="mr-3 text-gray-600"
                      />
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowTopUp(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleTopUp}
                  disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Пополнить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* История операций */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">История операций</h3>
          </div>

          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full bg-gray-100 mr-4`}>
                      <Icon
                        name={getTransactionIcon(transaction.type) as any}
                        size={16}
                        className={getTransactionColor(transaction.type)}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
