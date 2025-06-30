import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { WithdrawalMethod } from "@/types/seller-wallet.types";
import {
  WITHDRAWAL_METHODS,
  MIN_WITHDRAWAL_AMOUNT,
} from "@/constants/seller-wallet.constants";
import {
  formatCurrency,
  calculateWithdrawalFee,
  calculateNetWithdrawal,
} from "@/utils/seller-wallet.utils";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onWithdraw: (amount: number, method: WithdrawalMethod) => void;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
  availableBalance,
  onWithdraw,
}: WithdrawalModalProps) {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState("bank");

  if (!isOpen) return null;

  const selectedMethod = WITHDRAWAL_METHODS.find(
    (m) => m.id === selectedMethodId,
  );
  const amount = parseFloat(withdrawalAmount) || 0;
  const fee = selectedMethod
    ? calculateWithdrawalFee(amount, selectedMethod)
    : 0;
  const netAmount = selectedMethod
    ? calculateNetWithdrawal(amount, selectedMethod)
    : 0;

  const handleWithdraw = () => {
    if (
      selectedMethod &&
      amount >= MIN_WITHDRAWAL_AMOUNT &&
      amount <= availableBalance
    ) {
      onWithdraw(amount, selectedMethod);
      setWithdrawalAmount("");
      onClose();
    }
  };

  const isValidAmount =
    amount >= MIN_WITHDRAWAL_AMOUNT && amount <= availableBalance;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Вывод средств</h3>
          <Button onClick={onClose} variant="ghost" size="sm">
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Сумма вывода */}
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
                max={availableBalance}
                min={MIN_WITHDRAWAL_AMOUNT}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₽
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Доступно: {formatCurrency(availableBalance)} ₽</span>
              <Button
                onClick={() => setWithdrawalAmount(availableBalance.toString())}
                variant="ghost"
                size="sm"
                className="text-xs h-auto p-1 text-green-600"
              >
                Весь баланс
              </Button>
            </div>
          </div>

          {/* Способы вывода */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Способ вывода
            </label>
            <div className="space-y-2">
              {WITHDRAWAL_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMethodId === method.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="withdrawalMethod"
                    value={method.id}
                    checked={selectedMethodId === method.id}
                    onChange={(e) => setSelectedMethodId(e.target.value)}
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
          {amount > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Сумма вывода:</span>
                <span>{formatCurrency(amount)} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Комиссия ({selectedMethod?.fee}%):</span>
                <span>-{formatCurrency(fee)} ₽</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>К получению:</span>
                <span>{formatCurrency(netAmount)} ₽</span>
              </div>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Отмена
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!isValidAmount}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Вывести
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
