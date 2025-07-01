export interface Story {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  title: string;
  description: string;
  image: string;
  productId?: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  views: number;
  clicks: number;
}

export interface StoryPlan {
  id: "week" | "month";
  name: string;
  duration: number; // в днях
  price: number; // в рублях
  walletPrice: number; // цена с учётом скидки для кошелька
  discount: number; // процент скидки
}

export interface StoryPayment {
  id: string;
  sellerId: string;
  planId: StoryPlan["id"];
  amount: number;
  paymentMethod: "wallet" | "yookassa";
  status: "pending" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
}

export interface CreateStoryData {
  title: string;
  description: string;
  image: File | string;
  productId?: string;
  planId: StoryPlan["id"];
  paymentMethod: "wallet" | "yookassa";
}
