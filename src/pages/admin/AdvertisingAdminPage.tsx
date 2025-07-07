import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Advertisement } from "@/types/advertising";
import { useAdvertisingActions } from "@/hooks/useAdvertisingActions";
import { useAdvertisingStats } from "@/hooks/useAdvertisingStats";
import { useAdvertisingFilters } from "@/hooks/useAdvertisingFilters";
import StatisticsSection from "@/components/admin/advertising/StatisticsSection";
import FiltersSection from "@/components/admin/advertising/FiltersSection";
import AdvertisementsTable from "@/components/admin/advertising/AdvertisementsTable";
import AdDetailsModal from "@/components/admin/advertising/AdDetailsModal";

export default function AdvertisingAdminPage() {
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    advertisements,
    loading,
    loadAdvertisements,
    handleStatusChange,
    handleDelete,
  } = useAdvertisingActions();

  const stats = useAdvertisingStats(advertisements);
  const filteredAdvertisements = useAdvertisingFilters(
    advertisements,
    searchTerm,
    statusFilter,
  );

  useEffect(() => {
    loadAdvertisements();
  }, [loadAdvertisements]);

  const handleViewDetails = (ad: Advertisement) => {
    setSelectedAd(ad);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedAd(null);
    setIsDetailsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Управление рекламой
          </h1>
          <p className="text-gray-600">
            Модерация и статистика рекламных объявлений
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={loadAdvertisements} variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <StatisticsSection stats={stats} />

      {/* Filters */}
      <FiltersSection
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />

      {/* Advertisements Table */}
      <AdvertisementsTable
        advertisements={filteredAdvertisements}
        onViewDetails={handleViewDetails}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Details Modal */}
      <AdDetailsModal
        ad={selectedAd}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
}
