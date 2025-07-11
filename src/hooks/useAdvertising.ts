import { useState, useEffect, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import {
  AdvertisingBanner,
  BannerStats,
  BannerFilters,
} from "@/types/advertising";

export function useAdvertising() {
  const [banners, setBanners] = useState<AdvertisingBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<BannerFilters>({
    searchTerm: "",
    statusFilter: "all",
  });

  // Загрузка баннеров из localStorage
  const loadBanners = () => {
    try {
      const allAdverts = JSON.parse(
        localStorage.getItem("advertising-requests") || "[]",
      );
      setBanners(allAdverts);
    } catch (error) {
      console.error("Error loading banners:", error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  // Сохранение баннеров в localStorage
  const saveBanners = (updatedBanners: AdvertisingBanner[]) => {
    try {
      localStorage.setItem(
        "advertising-requests",
        JSON.stringify(updatedBanners),
      );
      setBanners(updatedBanners);
    } catch (error) {
      console.error("Error saving banners:", error);
    }
  };

  // Проверка истекших баннеров
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  // Приостановка баннера
  const pauseBanner = (id: number) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === id ? { ...banner, status: "paused" as const } : banner,
    );
    saveBanners(updatedBanners);
    toast({
      title: "Реклама приостановлена",
      description: "Баннер больше не показывается на главной странице",
    });
  };

  // Возобновление баннера
  const resumeBanner = (id: number) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === id ? { ...banner, status: "active" as const } : banner,
    );
    saveBanners(updatedBanners);
    toast({
      title: "Реклама возобновлена",
      description: "Баннер снова показывается на главной странице",
    });
  };

  // Удаление баннера
  const deleteBanner = (id: number) => {
    const updatedBanners = banners.filter((banner) => banner.id !== id);
    saveBanners(updatedBanners);
    toast({
      title: "Реклама удалена",
      description: "Баннер был удален из системы",
      variant: "destructive",
    });
  };

  // Автоматическое обновление истекших баннеров
  const checkExpiredBanners = () => {
    const updatedBanners = banners.map((banner) => {
      if (banner.status === "active" && isExpired(banner.expiresAt)) {
        return { ...banner, status: "expired" as const };
      }
      return banner;
    });

    const hasExpired = updatedBanners.some(
      (banner, index) =>
        banner.status === "expired" && banners[index].status !== "expired",
    );

    if (hasExpired) {
      saveBanners(updatedBanners);
    }
  };

  // Фильтрация баннеров
  const filteredBanners = useMemo(() => {
    return banners.filter((banner) => {
      const matchesSearch =
        banner.shopName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        banner.sellerName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
      const matchesStatus =
        filters.statusFilter === "all" ||
        banner.status === filters.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [banners, filters]);

  // Статистика
  const stats: BannerStats = useMemo(() => {
    return {
      total: banners.length,
      active: banners.filter((b) => b.status === "active").length,
      paused: banners.filter((b) => b.status === "paused").length,
      expired: banners.filter((b) => b.status === "expired").length,
      pending: banners.filter((b) => b.status === "pending_payment").length,
      totalRevenue: banners.reduce((sum, b) => sum + b.price, 0),
    };
  }, [banners]);

  // Обновление фильтров
  const updateFilters = (newFilters: Partial<BannerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    loadBanners();
  }, []);

  // Проверка истекших баннеров каждую минуту
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(checkExpiredBanners, 60000);
    return () => clearInterval(interval);
  }, [banners]);

  return {
    // Данные
    banners: filteredBanners,
    stats,
    loading,
    filters,

    // Действия
    pauseBanner,
    resumeBanner,
    deleteBanner,
    updateFilters,
    loadBanners,

    // Утилиты
    isExpired,
  };
}
