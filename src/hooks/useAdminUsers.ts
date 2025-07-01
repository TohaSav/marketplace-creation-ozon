import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { UserDataManager } from "@/utils/userDataManager";
import { transformAuthUsersToAdminUsers } from "@/utils/user-transform.utils";
import type {
  AdminUser,
  UserStats,
  UserFilters,
} from "@/types/admin-user.types";

export const useAdminUsers = () => {
  const { users: authUsers, sellers } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({
    searchTerm: "",
    statusFilter: "all",
  });

  // Синхронизируем пользователей из AuthContext (только обычных пользователей, не продавцов)
  useEffect(() => {
    if (authUsers) {
      const transformedUsers = transformAuthUsersToAdminUsers(authUsers);
      setUsers(transformedUsers);
    }
  }, [authUsers]);

  // Фильтрация пользователей
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.phone.includes(filters.searchTerm);

      const matchesStatus =
        filters.statusFilter === "all" || user.status === filters.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, filters]);

  // Статистика пользователей
  const userStats = useMemo((): UserStats => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      blocked: users.filter((u) => u.status === "blocked").length,
      totalRevenue: users.reduce((sum, user) => sum + user.totalSpent, 0),
    };
  }, [users]);

  // Переключение статуса пользователя
  const handleToggleUserStatus = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user,
      ),
    );

    const user = users.find((u) => u.id === userId);
    const newStatus =
      user?.status === "active" ? "заблокирован" : "разблокирован";

    toast({
      title: "Статус пользователя изменён",
      description: `Пользователь ${user?.name} был ${newStatus}`,
    });

    // Обновляем выбранного пользователя, если он открыт в модальном окне
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev) =>
        prev
          ? { ...prev, status: prev.status === "active" ? "blocked" : "active" }
          : null,
      );
    }
  };

  // Просмотр пользователя
  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Очистка всех пользователей
  const handleClearAllUsers = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите удалить ВСЕХ пользователей? Это действие необратимо!",
      )
    ) {
      try {
        UserDataManager.clearAllUsers();
        setUsers([]);
        setSelectedUser(null);
        setIsModalOpen(false);

        toast({
          title: "База очищена",
          description: "Все пользователи и продавцы удалены из базы данных",
          variant: "destructive",
        });

        // Перезагружаем страницу для синхронизации с AuthContext
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast({
          title: "Ошибка",
          description:
            error instanceof Error ? error.message : "Не удалось очистить базу",
          variant: "destructive",
        });
      }
    }
  };

  return {
    users: filteredUsers,
    userStats,
    selectedUser,
    isModalOpen,
    filters,
    setFilters,
    handleToggleUserStatus,
    handleViewUser,
    handleCloseModal,
    handleClearAllUsers,
  };
};
