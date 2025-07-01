import React from "react";
import { PaymentMethod, PaymentOption } from "@/types/payment";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  walletBalance: number;
  requiredAmount: number;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
  walletBalance,
  requiredAmount,
}) => {
  const paymentOptions: PaymentOption[] = [
    {
      id: "wallet",
      name: "Личный счёт",
      description: `Баланс: ${walletBalance.toLocaleString("ru-RU")} ₽`,
      icon: "Wallet",
      available: walletBalance >= requiredAmount,
      discount: 3,
    },
    {
      id: "yukassa",
      name: "ЮКасса",
      description: "Банковская карта, СБП, Apple Pay",
      icon: "CreditCard",
      available: true,
    },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900">Способ оплаты</h4>
      <div className="space-y-2">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`
              relative flex items-center p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedMethod === option.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:bg-gray-50"
              }
              ${!option.available ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={selectedMethod === option.id}
              onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
              disabled={!option.available}
              className="sr-only"
            />

            {/* Иконка */}
            <div
              className={`
              p-2 rounded-lg mr-3 flex-shrink-0
              ${option.id === "wallet" ? "bg-green-100" : "bg-blue-100"}
            `}
            >
              <Icon
                name={option.icon}
                size={20}
                className={
                  option.id === "wallet" ? "text-green-600" : "text-blue-600"
                }
              />
            </div>

            {/* Информация */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-900">{option.name}</div>
                {option.discount && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    -{option.discount}%
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {option.description}
              </div>
            </div>

            {/* Индикатор выбора */}
            <div
              className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
              ${
                selectedMethod === option.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }
            `}
            >
              {selectedMethod === option.id && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>

            {/* Предупреждение о недостатке средств */}
            {option.id === "wallet" && !option.available && (
              <div className="absolute -bottom-1 -right-1">
                <Icon
                  name="AlertCircle"
                  size={16}
                  className="text-red-500 bg-white rounded-full"
                />
              </div>
            )}
          </label>
        ))}
      </div>

      {/* Предупреждение о недостатке средств */}
      {selectedMethod === "wallet" && walletBalance < requiredAmount && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Icon
              name="AlertCircle"
              size={16}
              className="text-red-500 flex-shrink-0"
            />
            <div className="text-sm">
              <div className="font-medium text-red-800">
                Недостаточно средств
              </div>
              <div className="text-red-700">
                Нужно пополнить на{" "}
                {(requiredAmount - walletBalance).toLocaleString("ru-RU")} ₽
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
