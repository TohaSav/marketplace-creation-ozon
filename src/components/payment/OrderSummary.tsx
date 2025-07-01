import React from "react";
import { PaymentMethod } from "@/types/payment";
import { getOrderSummary, formatCurrency } from "@/utils/paymentUtils";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface OrderSummaryProps {
  subtotal: number;
  paymentMethod: PaymentMethod;
  itemCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  paymentMethod,
  itemCount,
}) => {
  const orderSummary = getOrderSummary(subtotal, paymentMethod);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Итого по заказу</h3>

      <div className="space-y-3">
        {/* Количество товаров и стоимость */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Товары ({itemCount})</span>
          <span className="font-medium">
            {formatCurrency(orderSummary.subtotal)}
          </span>
        </div>

        {/* Доставка */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Доставка</span>
          <span className="text-green-600 font-medium">Бесплатно</span>
        </div>

        {/* Скидка за оплату личным счётом */}
        {orderSummary.hasDiscount && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Скидка за личный счёт</span>
              <Badge className="bg-green-100 text-green-800 text-xs">-3%</Badge>
            </div>
            <span className="text-green-600 font-medium">
              -{formatCurrency(orderSummary.discount)}
            </span>
          </div>
        )}

        <hr className="border-gray-200" />

        {/* Итого к оплате */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">К оплате</span>
          <div className="text-right">
            {orderSummary.hasDiscount && (
              <div className="text-sm text-gray-500 line-through">
                {formatCurrency(orderSummary.subtotal)}
              </div>
            )}
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(orderSummary.total)}
            </div>
          </div>
        </div>
      </div>

      {/* Информация о способе оплаты */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Icon
            name={paymentMethod === "wallet" ? "Wallet" : "CreditCard"}
            size={16}
            className={
              paymentMethod === "wallet" ? "text-green-600" : "text-blue-600"
            }
          />
          <span className="text-sm font-medium text-gray-700">
            {paymentMethod === "wallet"
              ? "Оплата с личного счёта"
              : "Оплата через ЮКассу"}
          </span>
          {paymentMethod === "wallet" && (
            <Badge className="bg-green-100 text-green-800 text-xs ml-auto">
              Экономия {formatCurrency(orderSummary.discount)}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
