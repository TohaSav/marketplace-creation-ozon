export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  lastActivity: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "blocked";
  avatar: string;
}

export interface UserStats {
  total: number;
  active: number;
  blocked: number;
  totalRevenue: number;
}

export interface UserFilters {
  searchTerm: string;
  statusFilter: "all" | "active" | "blocked";
}
