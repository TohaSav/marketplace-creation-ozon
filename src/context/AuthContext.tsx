import { createContext, useContext, useState, ReactNode } from "react";
import { SellerStats } from "@/types/seller-dashboard.types";

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
  sellerStats?: SellerStats;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  sellers: User[];
  login: (userData: User) => void;
  logout: () => void;
  register: (userData: Omit<User, "id" | "joinDate" | "status">) => void;
  updateSellerStats: (stats: SellerStats) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Пустой массив - пользователи будут добавляться только через регистрацию
const initialUsers: User[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);

  const users = allUsers.filter((u) => u.userType === "user");
  const sellers = allUsers.filter((u) => u.userType === "seller");

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData: Omit<User, "id" | "joinDate" | "status">) => {
    const newUser: User = {
      ...userData,
      id: Date.now(),
      joinDate: new Date().toISOString().split("T")[0],
      status: userData.userType === "seller" ? "pending" : "active",
    };

    setAllUsers((prev) => [...prev, newUser]);
    setUser(newUser);
  };

  const updateSellerStats = (stats: SellerStats) => {
    if (user) {
      setUser({ ...user, sellerStats: stats });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        sellers,
        login,
        logout,
        register,
        updateSellerStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
