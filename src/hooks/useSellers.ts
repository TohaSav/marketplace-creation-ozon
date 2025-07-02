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

  const approveSeller = (sellerId: string) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (!seller) return;

    const updatedSeller = { ...seller, status: "active" as const };
    setSellers(sellers.map((s) => (s.id === sellerId ? updatedSeller : s)));

    toast({
      title: "Продавец подтверждён",
      description: `${seller.name} успешно прошёл модерацию и может начать работу`,
      variant: "default",
    });
  };

  const sendForRevision = (sellerId: string, reason: string) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (!seller) return;

    const updatedSeller = {
      ...seller,
      status: "revision" as const,
      rejectionReason: reason,
    };
    setSellers(sellers.map((s) => (s.id === sellerId ? updatedSeller : s)));

    toast({
      title: "Продавец отправлен на доработку",
      description: `${seller.name} получит уведомление о необходимых изменениях`,
      variant: "default",
    });
  };

  const rejectSeller = (sellerId: string) => {
    const seller = sellers.find((s) => s.id === sellerId);
    if (!seller) return;

    setSellers(sellers.filter((s) => s.id !== sellerId));

    toast({
      title: "Продавец отклонён",
      description: `Заявка от ${seller.name} была отклонена и удалена`,
      variant: "destructive",
    });
  };

  const getSellerById = (sellerId: string): Seller | undefined => {
    return sellers.find((s) => s.id === sellerId);
  };

  return {
    sellers,
    updateSeller,
    toggleSellerStatus,
    approveSeller,
    sendForRevision,
    rejectSeller,
    getSellerById,
  };
};
