import { PaymentMethod, PaymentInfo, OrderSummary } from "@/types/payment";

export const WALLET_DISCOUNT_PERCENT = 3;

export const calculateDiscount = (
  amount: number,
  paymentMethod: PaymentMethod,
): number => {
  if (paymentMethod === "wallet") {
    return amount * (WALLET_DISCOUNT_PERCENT / 100);
  }
  return 0;
};

export const calculateFinalAmount = (
  originalAmount: number,
  paymentMethod: PaymentMethod,
): number => {
  const discount = calculateDiscount(originalAmount, paymentMethod);
  return originalAmount - discount;
};

export const getPaymentInfo = (
  originalAmount: number,
  paymentMethod: PaymentMethod,
): PaymentInfo => {
  const discountAmount = calculateDiscount(originalAmount, paymentMethod);
  const finalAmount = originalAmount - discountAmount;

  return {
    method: paymentMethod,
    originalAmount,
    discountAmount,
    finalAmount,
    discount: paymentMethod === "wallet" ? WALLET_DISCOUNT_PERCENT : undefined,
  };
};

export const getOrderSummary = (
  subtotal: number,
  paymentMethod: PaymentMethod,
): OrderSummary => {
  const discount = calculateDiscount(subtotal, paymentMethod);
  const total = subtotal - discount;

  return {
    subtotal,
    discount,
    total,
    paymentMethod,
    hasDiscount: discount > 0,
  };
};

export const formatCurrency = (
  amount: number,
  currency: string = "₽",
): string => {
  return `${amount.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
};

export const formatDiscount = (discount: number): string => {
  return `${discount}%`;
};
