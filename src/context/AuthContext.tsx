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
  balance?: number;
  sellerStats?: SellerStats;
  subscription?: {
    isActive: boolean;
    planType: "monthly" | "yearly";
    planName: string;
    startDate: string;
    endDate: string;
    autoRenew: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  users: User[];
  sellers: User[];
  login: (userData: User) => void;
  logout: () => void;
  register: (userData: Omit<User, "id" | "joinDate" | "status">) => void;
  updateUser: (userData: User) => void;
  updateUserBalance: (amount: number) => void;
  updateSellerStats: (stats: SellerStats) => void;
  updateSellerStatus: (
    sellerId: number,
    status: string,
    comment?: string,
  ) => Promise<void>;
  deleteSeller: (sellerId: number) => Promise<void>;
  clearAllSellers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Дефолтные зарегистрированные продавцы
const defaultSellers: User[] = [];

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
    } else {
      // Если нет сохраненных продавцов, инициализируем пустым массивом
      localStorage.setItem("sellers", JSON.stringify([]));
    }

    return users;
  } catch (error) {
    console.error("Ошибка загрузки пользователей из localStorage:", error);
    // В случае ошибки возвращаем пустой массив
    localStorage.setItem("sellers", JSON.stringify([]));
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

  const updateUser = (userData: User) => {
    setUser(userData);

    // Обновляем в localStorage
    if (userData.userType === "seller") {
      localStorage.setItem("seller-token", JSON.stringify(userData));
    } else {
      localStorage.setItem("user-token", JSON.stringify(userData));
    }
  };

  const updateUserBalance = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balance: (user.balance || 0) + amount,
      };
      setUser(updatedUser);

      // Обновляем в localStorage
      if (updatedUser.userType === "seller") {
        localStorage.setItem("seller-token", JSON.stringify(updatedUser));
      } else {
        localStorage.setItem("user-token", JSON.stringify(updatedUser));
      }
    }
  };

  const updateSellerStats = (stats: SellerStats) => {
    if (user) {
      setUser({ ...user, sellerStats: stats });
    }
  };

  const updateSellerStatus = async (
    sellerId: number,
    status: string,
    comment?: string,
  ) => {
    setAllUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user.id === sellerId
          ? {
              ...user,
              status: status as "active" | "pending" | "blocked",
              moderationComment: comment,
            }
          : user,
      );

      // Сохраняем в localStorage
      const regularUsers = updatedUsers.filter((u) => u.userType === "user");
      const sellers = updatedUsers.filter((u) => u.userType === "seller");

      localStorage.setItem("users", JSON.stringify(regularUsers));
      localStorage.setItem("sellers", JSON.stringify(sellers));

      return updatedUsers;
    });
  };

  const deleteSeller = async (sellerId: number) => {
    setAllUsers((prev) => {
      const updatedUsers = prev.filter((user) => user.id !== sellerId);

      // Сохраняем в localStorage
      const regularUsers = updatedUsers.filter((u) => u.userType === "user");
      const sellers = updatedUsers.filter((u) => u.userType === "seller");

      localStorage.setItem("users", JSON.stringify(regularUsers));
      localStorage.setItem("sellers", JSON.stringify(sellers));

      return updatedUsers;
    });
  };

  const clearAllSellers = () => {
    setAllUsers((prev) => {
      const updatedUsers = prev.filter((user) => user.userType !== "seller");

      // Очищаем localStorage от продавцов
      localStorage.setItem("sellers", JSON.stringify([]));
      localStorage.removeItem("seller-token");

      return updatedUsers;
    });

    // Если текущий пользователь - продавец, разлогиниваем его
    if (user?.userType === "seller") {
      setUser(null);
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
        updateUser,
        updateUserBalance,
        updateSellerStats,
        updateSellerStatus,
        deleteSeller,
        clearAllSellers,
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
