interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  userType: "user" | "seller";
  shopName?: string;
  status?: "active" | "pending" | "blocked";
  joinDate?: string;
  isSeller?: boolean;
  balance?: number;
}
import type { AdminUser } from "@/types/admin-user.types";

export const transformAuthUserToAdminUser = (user: User): AdminUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone || "",
  registrationDate: user.joinDate || new Date().toISOString().split("T")[0],
  lastActivity: user.joinDate || new Date().toISOString().split("T")[0],
  totalOrders: 0,
  totalSpent: 0,
  status: user.status === "active" ? "active" : "blocked",
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`,
});

export const transformAuthUsersToAdminUsers = (users: User[]): AdminUser[] =>
  users.map(transformAuthUserToAdminUser);

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getStatusColor = (status: string): string => {
  return status === "active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

export const getStatusText = (status: string): string => {
  return status === "active" ? "Активный" : "Заблокирован";
};
