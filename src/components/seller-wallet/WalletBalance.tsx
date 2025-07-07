import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { quickAmounts } from "@/utils/sellerWalletUtils";

interface WalletBalanceProps {
  balance: number;
  loading: boolean;
  onDeposit: (amount: string) => void;
}

export const WalletBalance = ({
  balance,
  loading,
  onDeposit,
}: WalletBalanceProps) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [showDepositForm, setShowDepositForm] = useState(false);

  const handleDeposit = () => {
    onDeposit(depositAmount);
    setDepositAmount("");
    setShowDepositForm(false);
  };

  return (
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
                      <Icon name="CreditCard" size={16} className="mr-2" />
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
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setDepositAmount(amount.toString())}
              >
                {amount} ₽
              </Button>
            ))}
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
  );
};
