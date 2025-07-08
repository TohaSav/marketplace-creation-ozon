export interface SellerCard {
  id: string;
  cardNumber: string;
  sellerId: number;
  balance: number;
  issuedDate: string;
  cardType: "premium" | "standard" | "elite";
  status: "active" | "blocked" | "expired";
  transactions: CardTransaction[];
  monthlyEarnings: number;
  totalEarnings: number;
  subscriptionEndDate: string;
}

export interface CardTransaction {
  id: string;
  amount: number;
  type: "purchase" | "withdrawal" | "bonus" | "refund";
  productId?: number;
  orderId?: string;
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

export interface CardDesign {
  gradient: string;
  textColor: string;
  accentColor: string;
  pattern: "waves" | "geometric" | "minimal" | "premium";
}

export const CARD_DESIGNS: Record<SellerCard["cardType"], CardDesign> = {
  standard: {
    gradient: "from-blue-600 to-blue-800",
    textColor: "text-white",
    accentColor: "text-blue-200",
    pattern: "minimal",
  },
  premium: {
    gradient: "from-purple-600 to-purple-900",
    textColor: "text-white",
    accentColor: "text-purple-200",
    pattern: "waves",
  },
  elite: {
    gradient: "from-yellow-500 via-yellow-600 to-yellow-800",
    textColor: "text-black",
    accentColor: "text-yellow-900",
    pattern: "geometric",
  },
};
