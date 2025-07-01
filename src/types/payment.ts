export type PaymentMethod = "wallet" | "yukassa";

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  available: boolean;
  discount?: number;
}

export interface PaymentInfo {
  method: PaymentMethod;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  discount?: number;
}

export interface WalletInfo {
  balance: number;
  currency: string;
  isActive: boolean;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  hasDiscount: boolean;
}
