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

// Инициализация с тестовыми данными
const initialUsers: User[] = [
  {
    id: 1,
    name: "Алексей Смирнов",
    email: "aleksey@example.com",
    phone: "+7 (999) 111-22-33",
    userType: "user",
    status: "active",
    joinDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Мария Козлова",
    email: "maria@example.com",
    phone: "+7 (999) 222-33-44",
    userType: "user",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Анна Петрова",
    email: "anna@example.com",
    phone: "+7 (999) 333-44-55",
    userType: "seller",
    shopName: "Магазин Анны",
    status: "active",
    joinDate: "2024-01-20",
    isSeller: true,
  },
  {
    id: 4,
    name: "Сергей Иванов",
    email: "sergey@example.com",
    phone: "+7 (999) 444-55-66",
    userType: "seller",
    shopName: "СИ Электроника",
    status: "pending",
    joinDate: "2024-02-01",
    isSeller: true,
  },
];

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
