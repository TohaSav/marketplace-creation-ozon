export interface Shop {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: "active" | "inactive" | "expired";
  verified: boolean;
  daysRemaining: number;
  totalDays: number;
  createdAt: string;
  lastPayment: string;
}

export interface ShopStats {
  total: number;
  active: number;
  verified: number;
  expired: number;
}

export interface AdminState {
  shops: Shop[];
  selectedShop: Shop | null;
  activationDays: string;
}

export type ShopStatus = Shop["status"];
