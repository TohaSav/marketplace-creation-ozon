import { createContext, useContext, useState, ReactNode } from "react";
import { SellerStats } from "@/types/seller-dashboard.types";

interface User {
  id: number;
  name: string;
  email: string;
  isSeller?: boolean;
  sellerStats?: SellerStats;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateSellerStats: (stats: SellerStats) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateSellerStats = (stats: SellerStats) => {
    if (user) {
      setUser({ ...user, sellerStats: stats });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateSellerStats }}>
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
