import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useAdvertising } from "@/hooks/useAdvertising";
import { AdvertisingBanner } from "@/types/advertising";

// Компоненты
import AdvertisingStats from "@/components/AdminAdvertising/AdvertisingStats";
import AdvertisingFilters from "@/components/AdminAdvertising/AdvertisingFilters";
import BannerCard from "@/components/AdminAdvertising/BannerCard";
import BannerModal from "@/components/AdminAdvertising/BannerModal";
import EmptyState from "@/components/AdminAdvertising/EmptyState";

export default function AdminAdvertising() {
  const [selectedBanner, setSelectedBanner] =
    useState<AdvertisingBanner | null>(null);

  const {
    banners,
    stats,
    loading,
    filters,
    pauseBanner,
    resumeBanner,
    deleteBanner,
    updateFilters,
    isExpired,
  } = useAdvertising();

  // Обработчики действий для баннеров
  const bannerActions = {
    onPause: pauseBanner,
    onResume: resumeBanner,
    onDelete: deleteBanner,
    onView: setSelectedBanner,
  };

  // Обработчики для фильтров
  const handleSearchChange = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  const handleStatusChange = (statusFilter: string) => {
    updateFilters({ statusFilter });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Управление рекламой
            </h1>
            <p className="text-gray-600 mt-2">
              Управляйте рекламными баннерами продавцов на главной странице
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Icon name="Target" size={20} className="mr-2" />
            {stats.total} баннеров
          </Badge>
        </div>

        {/* Статистика */}
        <AdvertisingStats stats={stats} />

        {/* Фильтры */}
        <AdvertisingFilters
          filters={filters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />

        {/* Список баннеров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.length === 0 && stats.total === 0 ? (
            <EmptyState type="no-banners" />
          ) : banners.length === 0 ? (
            <EmptyState type="no-results" />
          ) : (
            banners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                actions={bannerActions}
              />
            ))
          )}
        </div>

        {/* Модальное окно */}
        <BannerModal
          banner={selectedBanner}
          onClose={() => setSelectedBanner(null)}
        />
      </div>
    </AdminLayout>
  );
}
