import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { Advertisement } from "@/types/advertising";

export const useAdvertisingActions = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdvertisements = useCallback(async () => {
    try {
      const storedAds = localStorage.getItem("advertisements");
      if (storedAds) {
        const ads = JSON.parse(storedAds);
        setAdvertisements(ads);
      }
    } catch (error) {
      console.error("Error loading advertisements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback(
    (adId: string, newStatus: "active" | "paused" | "rejected") => {
      setAdvertisements((prev) => {
        const updatedAds = prev.map((ad) =>
          ad.id === adId ? { ...ad, status: newStatus } : ad,
        );
        localStorage.setItem("advertisements", JSON.stringify(updatedAds));
        return updatedAds;
      });

      toast({
        title: "Статус обновлен",
        description: `Реклама ${newStatus === "active" ? "активирована" : newStatus === "paused" ? "приостановлена" : "отклонена"}`,
      });
    },
    [],
  );

  const handleDelete = useCallback((adId: string) => {
    setAdvertisements((prev) => {
      const updatedAds = prev.filter((ad) => ad.id !== adId);
      localStorage.setItem("advertisements", JSON.stringify(updatedAds));
      return updatedAds;
    });

    toast({
      title: "Реклама удалена",
      description: "Рекламное объявление было удалено",
    });
  }, []);

  return {
    advertisements,
    loading,
    loadAdvertisements,
    handleStatusChange,
    handleDelete,
  };
};
