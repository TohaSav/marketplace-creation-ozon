export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  userType: "user" | "seller";
  shopName?: string;
  status?: "active" | "pending" | "blocked";
  joinDate?: string;
  birthDate?: string;
  city?: string;
  address?: string;
}

export interface UserStats {
  ordersCount: number;
  bonusPoints: number;
  totalSpent: number;
  memberSince: string;
  level: string;
}

export interface ProfileTab {
  id: string;
  label: string;
  icon: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  address: string;
}
