import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, UserStats } from "@/types/profile.types";

export const useProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const userStats: UserStats = useMemo(() => {
    if (!user) {
      return {
        ordersCount: 0,
        bonusPoints: 0,
        totalSpent: 0,
        memberSince: "Недавно",
        level: "Покупатель",
      };
    }

    return {
      ordersCount: 0, // Заказы будут добавляться при реальных покупках
      bonusPoints: 0, // Бонусы появляются только после покупок
      totalSpent: 0,
      memberSince: user.joinDate
        ? new Date(user.joinDate).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
          })
        : "Недавно",
      level: user.userType === "seller" ? "Продавец" : "Покупатель",
    };
  }, [user]);

  const displayUser: (UserProfile & UserStats) | null = useMemo(() => {
    if (!user) return null;

    return {
      ...user,
      ...userStats,
      birthDate: "", // Пустое поле - будет заполняться пользователем
      city: "", // Пустое поле - будет заполняться пользователем
      address: "", // Пустое поле - будет заполняться пользователем
    };
  }, [user, userStats]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    // Здесь будет логика сохранения данных
    setIsEditing(false);
  };

  return {
    user,
    displayUser,
    userStats,
    isEditing,
    activeTab,
    setActiveTab,
    toggleEdit,
    handleSave,
  };
};
