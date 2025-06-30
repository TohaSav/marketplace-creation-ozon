export interface SaleTransaction {
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

export interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  fee: number;
  processingTime: string;
}

export interface WalletBalance {
  available: number;
  pending: number;
}

export type TransactionType = SaleTransaction["type"];
export type TransactionStatus = SaleTransaction["status"];
