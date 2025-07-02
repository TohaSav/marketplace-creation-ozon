import { useState } from "react";
import { Seller } from "@/types/seller";
import { mockSellers } from "@/utils/sellerUtils";
import { toast } from "@/hooks/use-toast";

export const useSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);

  const updateSeller = (updatedSeller: Seller) => {
    setSellers(
      sellers.map((s) => (s.id === updatedSeller.id ? updatedSeller : s)),
    );
    toast({
      title: "Продавец обновлён",
      description: `Данные продавца ${updatedSeller.name} успешно сохранены`,
    });
  };

  const toggleSellerStatus = (sellerId: string) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (!seller) return;

    const newStatus = seller.status === "blocked" ? "active" : "blocked";
    const updatedSeller = { ...seller, status: newStatus };

    setSellers(sellers.map((s) => (s.id === sellerId ? updatedSeller : s)));

    toast({
      title:
        newStatus === "blocked"
          ? "Продавец заблокирован"
          : "Продавец разблокирован",
      description: `${seller.name} теперь ${newStatus === "blocked" ? "заблокирован" : "активен"}`,
      variant: newStatus === "blocked" ? "destructive" : "default",
    });

    return updatedSeller;
  };

  const getSellerById = (sellerId: string): Seller | undefined => {
    return sellers.find((s) => s.id === sellerId);
  };

  return {
    sellers,
    updateSeller,
    toggleSellerStatus,
    getSellerById,
  };
};
