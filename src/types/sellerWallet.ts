export interface SellerWalletTransaction {
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

export interface PaymentData {
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    return_url: string;
  };
  description: string;
  metadata: {
    type: string;
    sellerId: string;
    transactionId: string;
  };
}
