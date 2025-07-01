import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

// Загружаем пользователей из localStorage
const loadUsersFromStorage = (): User[] => {
  try {
    const savedUsers = localStorage.getItem("users");
    const savedSellers = localStorage.getItem("sellers");

    const users: User[] = [];

    // Загружаем обычных пользователей
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      if (Array.isArray(parsedUsers)) {
        users.push(
          ...parsedUsers.map((user: any) => ({
            ...user,
            userType: "user" as const,
            status: user.status || "active",
          })),
        );
      }
    }

    // Загружаем продавцов
    if (savedSellers) {
      const parsedSellers = JSON.parse(savedSellers);
      if (Array.isArray(parsedSellers)) {
        users.push(
          ...parsedSellers.map((seller: any) => ({
            ...seller,
            userType: "seller" as const,
            status: seller.status || "pending",
          })),
        );
      }
    }

    return users;
  } catch (error) {
    console.error("Ошибка загрузки пользователей из localStorage:", error);
    return [];
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(loadUsersFromStorage());

  // Загружаем текущего пользователя при инициализации
  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    const sellerToken = localStorage.getItem("seller-token");

    if (userToken) {
      try {
        const userData = JSON.parse(userToken);
        setUser({ ...userData, userType: "user" });
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
      }
    } else if (sellerToken) {
      try {
        const sellerData = JSON.parse(sellerToken);
        setUser({ ...sellerData, userType: "seller" });
      } catch (error) {
        console.error("Ошибка загрузки данных продавца:", error);
      }
    }
  }, []);

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

    setAllUsers((prev) => {
      const updatedUsers = [...prev, newUser];

      // Сохраняем в localStorage
      const regularUsers = updatedUsers.filter((u) => u.userType === "user");
      const sellers = updatedUsers.filter((u) => u.userType === "seller");

      localStorage.setItem("users", JSON.stringify(regularUsers));
      localStorage.setItem("sellers", JSON.stringify(sellers));

      return updatedUsers;
    });

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
