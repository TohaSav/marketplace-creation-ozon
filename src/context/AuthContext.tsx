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
  updateSellerStats: (stats: SellerStats) => void;
  updateSellerStatus: (
    sellerId: number,
    status: string,
    comment?: string,
  ) => Promise<void>;
  deleteSeller: (sellerId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Дефолтные зарегистрированные продавцы
const defaultSellers: User[] = [
  {
    id: 1001,
    name: "Андрей Иванов",
    email: "ivanov@paseka.ru",
    phone: "+7 (916) 123-45-67",
    userType: "seller",
    shopName: "Пасека Иванова",
    status: "active",
    joinDate: "2024-11-15",
    isSeller: true,
    sellerStats: {
      totalOrders: 127,
      totalRevenue: 113030,
      averageRating: 4.9,
      totalProducts: 8,
      pendingOrders: 3,
      completedOrders: 124,
    },
  },
  {
    id: 1002,
    name: "Елена Петрова",
    email: "elena@master.ru",
    phone: "+7 (925) 234-56-78",
    userType: "seller",
    shopName: "Мастерская Елены",
    status: "active",
    joinDate: "2024-12-01",
    isSeller: true,
    sellerStats: {
      totalOrders: 89,
      totalRevenue: 106800,
      averageRating: 4.8,
      totalProducts: 15,
      pendingOrders: 2,
      completedOrders: 87,
    },
  },
  {
    id: 1003,
    name: "Мария Сидорова",
    email: "maria@zagatovki.ru",
    phone: "+7 (903) 345-67-89",
    userType: "seller",
    shopName: "Бабушкины заготовки",
    status: "active",
    joinDate: "2024-10-20",
    isSeller: true,
    sellerStats: {
      totalOrders: 203,
      totalRevenue: 487200,
      averageRating: 4.7,
      totalProducts: 25,
      pendingOrders: 8,
      completedOrders: 195,
    },
  },
  {
    id: 1004,
    name: "Дмитрий Козлов",
    email: "kozlov@stoljar.ru",
    phone: "+7 (964) 456-78-90",
    userType: "seller",
    shopName: "Столярная мастерская",
    status: "active",
    joinDate: "2024-12-10",
    isSeller: true,
    sellerStats: {
      totalOrders: 156,
      totalRevenue: 546000,
      averageRating: 4.9,
      totalProducts: 12,
      pendingOrders: 4,
      completedOrders: 152,
    },
  },
  {
    id: 1005,
    name: "Ольга Романова",
    email: "olga@gonchar.ru",
    phone: "+7 (915) 567-89-01",
    userType: "seller",
    shopName: "Гончарная студия",
    status: "pending",
    joinDate: "2024-12-25",
    isSeller: true,
    sellerStats: {
      totalOrders: 12,
      totalRevenue: 54000,
      averageRating: 4.6,
      totalProducts: 6,
      pendingOrders: 1,
      completedOrders: 11,
    },
  },
  {
    id: 1006,
    name: "Александр Новиков",
    email: "alex@jewelry.ru",
    phone: "+7 (926) 678-90-12",
    userType: "seller",
    shopName: "Ювелирная мастерская",
    status: "active",
    joinDate: "2024-11-28",
    isSeller: true,
    sellerStats: {
      totalOrders: 67,
      totalRevenue: 596300,
      averageRating: 4.8,
      totalProducts: 18,
      pendingOrders: 2,
      completedOrders: 65,
    },
  },
];

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
      // Если нет сохраненных продавцов, используем дефолтных и сохраняем их
      localStorage.setItem("sellers", JSON.stringify(defaultSellers));
      users.push(...defaultSellers);
    }

    return users;
  } catch (error) {
    console.error("Ошибка загрузки пользователей из localStorage:", error);
    // В случае ошибки возвращаем дефолтных продавцов
    localStorage.setItem("sellers", JSON.stringify(defaultSellers));
    return [...defaultSellers];
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
        updateSellerStats,
        updateSellerStatus,
        deleteSeller,
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
