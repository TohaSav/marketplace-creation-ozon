import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SaleTransaction {
  id: string;
  type: "sale" | "withdrawal" | "commission" | "refund";
  orderId: string;
  productName: string;
  customerName: string;
  amount: number;
  commission: number;
  netAmount: number;
  status: "pending" | "completed" | "processing";
  date: string;
}

interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  fee: number;
  processingTime: string;
}

export default function SellerWallet() {
  const [balance, setBalance] = useState(850000);
  const [pendingBalance] = useState(125000);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] =
    useState("bank");

  const [transactions] = useState<SaleTransaction[]>([
    {
      id: "1",
      type: "sale",
      orderId: "12345",
      productName: "iPhone 15 Pro Max 256GB",
      customerName: "Иван Петров",
      amount: 119999,
      commission: 7199,
      netAmount: 112800,
      status: "completed",
      date: "2025-06-30T10:30:00",
    },
    {
      id: "2",
      type: "sale",
      orderId: "12346",
      productName: "AirPods Pro 2-го поколения",
      customerName: "Мария Сидорова",
      amount: 24999,
      commission: 1499,
      netAmount: 23500,
      status: "pending",
      date: "2025-06-29T15:20:00",
    },
    {
      id: "3",
      type: "withdrawal",
      orderId: "",
      productName: "",
      customerName: "",
      amount: -50000,
      commission: 250,
      netAmount: -50250,
      status: "completed",
      date: "2025-06-28T12:15:00",
    },
    {
      id: "4",
      type: "refund",
      orderId: "12340",
      productName: "MacBook Air M2",
      customerName: "Петр Иванов",
      amount: -89999,
      commission: 5399,
      netAmount: -84600,
      status: "processing",
      date: "2025-06-27T09:45:00",
    },
  ]);

  const withdrawalMethods: WithdrawalMethod[] = [
    {
      id: "bank",
      name: "Банковская карта",
      icon: "CreditCard",
      fee: 0.5,
      processingTime: "1-3 рабочих дня",
    },
    {
      id: "sbp",
      name: "СБП",
      icon: "Smartphone",
      fee: 0,
      processingTime: "Мгновенно",
    },
    {
      id: "yandex",
      name: "ЮMoney",
      icon: "Wallet",
      fee: 0.3,
      processingTime: "До 1 часа",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "DollarSign",
      fee: 1.2,
      processingTime: "3-5 рабочих дней",
    },
  ];

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    const method = withdrawalMethods.find(
      (m) => m.id === selectedWithdrawalMethod,
    );
    const fee = method ? (amount * method.fee) / 100 : 0;

    if (amount > 0 && amount <= balance) {
      setBalance((prev) => prev - amount - fee);
      setWithdrawalAmount("");
      setShowWithdrawal(false);
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
      case "sale":
        return "ShoppingCart";
      case "withdrawal":
        return "ArrowUpFromLine";
      case "commission":
        return "Percent";
      case "refund":
        return "RotateCcw";
      default:
        return "Circle";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-green-600";
      case "withdrawal":
        return "text-blue-600";
      case "commission":
        return "text-orange-600";
      case "refund":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "pending":
        return "Ожидает";
      case "processing":
        return "Обработка";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Балансы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Доступный баланс */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Icon name="Wallet" size={24} className="mr-3" />
                <h3 className="text-lg font-semibold">Доступно для вывода</h3>
              </div>
              <Icon name="TrendingUp" size={20} className="opacity-70" />
            </div>

            <div className="mb-4">
              <p className="text-3xl font-bold">
                {balance.toLocaleString("ru-RU")} ₽
              </p>
              <p className="text-sm opacity-80 mt-1">
                Чистая прибыль от продаж
              </p>
            </div>

            <Button
              onClick={() => setShowWithdrawal(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
              disabled={balance < 1000}
            >
              <Icon name="ArrowUpFromLine" size={16} className="mr-2" />
              Вывести средства
            </Button>
            {balance < 1000 && (
              <p className="text-xs opacity-70 mt-2">
                Минимальная сумма для вывода: 1,000 ₽
              </p>
            )}
          </CardContent>
        </Card>

        {/* Баланс в обработке */}
        <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Icon name="Clock" size={24} className="mr-3" />
                <h3 className="text-lg font-semibold">В обработке</h3>
              </div>
              <Icon name="RefreshCw" size={20} className="opacity-70" />
            </div>

            <div className="mb-4">
              <p className="text-3xl font-bold">
                {pendingBalance.toLocaleString("ru-RU")} ₽
              </p>
              <p className="text-sm opacity-80 mt-1">
                Ожидает подтверждения доставки
              </p>
            </div>

            <div className="text-xs opacity-70">
              Средства будут доступны после подтверждения получения товаров
              покупателями
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Модальное окно вывода средств */}
      {showWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Вывод средств</h3>
              <Button
                onClick={() => setShowWithdrawal(false)}
                variant="ghost"
                size="sm"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сумма вывода
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder="Введите сумму"
                    max={balance}
                    min={1000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₽
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Доступно: {balance.toLocaleString("ru-RU")} ₽</span>
                  <Button
                    onClick={() => setWithdrawalAmount(balance.toString())}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-auto p-1 text-green-600"
                  >
                    Весь баланс
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Способ вывода
                </label>
                <div className="space-y-2">
                  {withdrawalMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWithdrawalMethod === method.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="withdrawalMethod"
                        value={method.id}
                        checked={selectedWithdrawalMethod === method.id}
                        onChange={(e) =>
                          setSelectedWithdrawalMethod(e.target.value)
                        }
                        className="sr-only"
                      />
                      <Icon
                        name={method.icon as any}
                        size={20}
                        className="mr-3 text-gray-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">
                          Комиссия: {method.fee}% • {method.processingTime}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Расчет комиссии */}
              {withdrawalAmount && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Сумма вывода:</span>
                    <span>
                      {parseFloat(withdrawalAmount).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      Комиссия (
                      {
                        withdrawalMethods.find(
                          (m) => m.id === selectedWithdrawalMethod,
                        )?.fee
                      }
                      %):
                    </span>
                    <span>
                      -
                      {(
                        ((parseFloat(withdrawalAmount) || 0) *
                          (withdrawalMethods.find(
                            (m) => m.id === selectedWithdrawalMethod,
                          )?.fee || 0)) /
                        100
                      ).toLocaleString("ru-RU")}{" "}
                      ₽
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>К получению:</span>
                    <span>
                      {(
                        (parseFloat(withdrawalAmount) || 0) -
                        ((parseFloat(withdrawalAmount) || 0) *
                          (withdrawalMethods.find(
                            (m) => m.id === selectedWithdrawalMethod,
                          )?.fee || 0)) /
                          100
                      ).toLocaleString("ru-RU")}{" "}
                      ₽
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowWithdrawal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleWithdrawal}
                  disabled={
                    !withdrawalAmount ||
                    parseFloat(withdrawalAmount) < 1000 ||
                    parseFloat(withdrawalAmount) > balance
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Вывести
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* История транзакций */}
      <Card>
        <CardHeader>
          <CardTitle>История операций</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Заказ/Товар</TableHead>
                <TableHead>Покупатель</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Комиссия</TableHead>
                <TableHead>К получению</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full bg-gray-100 mr-3`}>
                        <Icon
                          name={getTransactionIcon(transaction.type) as any}
                          size={16}
                          className={getTransactionColor(transaction.type)}
                        />
                      </div>
                      <div className="text-sm">
                        {transaction.type === "sale" && "Продажа"}
                        {transaction.type === "withdrawal" && "Вывод"}
                        {transaction.type === "commission" && "Комиссия"}
                        {transaction.type === "refund" && "Возврат"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {transaction.orderId && (
                        <div className="font-medium text-sm">
                          #{transaction.orderId}
                        </div>
                      )}
                      {transaction.productName && (
                        <div className="text-xs text-gray-600 truncate max-w-[150px]">
                          {transaction.productName}
                        </div>
                      )}
                      {transaction.type === "withdrawal" && (
                        <div className="text-sm font-medium">Вывод средств</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {transaction.customerName || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString("ru-RU")} ₽
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-orange-600">
                      -{transaction.commission.toLocaleString("ru-RU")} ₽
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`font-semibold ${
                        transaction.netAmount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.netAmount > 0 ? "+" : ""}
                      {transaction.netAmount.toLocaleString("ru-RU")} ₽
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusText(transaction.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {formatDate(transaction.date)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
