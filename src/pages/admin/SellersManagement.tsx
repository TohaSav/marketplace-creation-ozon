import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AdminLayout from "@/components/AdminLayout";
import { Seller } from "@/types/seller";
import { useSellers } from "@/hooks/useSellers";
import SellersTable from "@/components/sellers/SellersTable";
import ViewSellerModal from "@/components/sellers/ViewSellerModal";
import EditSellerModal from "@/components/sellers/EditSellerModal";
import BlockSellerModal from "@/components/sellers/BlockSellerModal";

const SellersManagement: React.FC = () => {
  const { sellers, updateSeller, toggleSellerStatus } = useSellers();
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  const handleView = (seller: Seller) => {
    setSelectedSeller(seller);
    setViewModalOpen(true);
  };

  const handleEdit = (seller: Seller) => {
    setSelectedSeller(seller);
    setEditModalOpen(true);
  };

  const handleBlock = (seller: Seller) => {
    setSelectedSeller(seller);
    setBlockModalOpen(true);
  };

  const handleSaveEdit = (updatedSeller: Seller) => {
    updateSeller(updatedSeller);
  };

  const handleConfirmBlock = () => {
    if (selectedSeller) {
      toggleSellerStatus(selectedSeller.id);
      setBlockModalOpen(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Icon name="Users" size={28} className="text-white" />
              </div>
              Управление продавцами
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Просмотр, редактирование и модерация продавцов на платформе.
              Управляйте статусами и контролируйте качество сервиса.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
            >
              Всего продавцов: {sellers.length}
            </Badge>
          </div>
        </div>

        <SellersTable
          sellers={sellers}
          onView={handleView}
          onEdit={handleEdit}
          onBlock={handleBlock}
        />

        <ViewSellerModal
          seller={selectedSeller}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />

        <EditSellerModal
          seller={selectedSeller}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />

        <BlockSellerModal
          seller={selectedSeller}
          isOpen={blockModalOpen}
          onClose={() => setBlockModalOpen(false)}
          onConfirm={handleConfirmBlock}
        />
      </div>
    </AdminLayout>
  );
};

export default SellersManagement;
