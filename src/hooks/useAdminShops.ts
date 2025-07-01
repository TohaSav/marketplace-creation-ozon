import { useState, useMemo } from "react";
import { Shop, ShopStats } from "@/types/admin";
import {
  validateActivationDays,
  getTodayDateString,
} from "@/utils/admin-helpers";
import { toast } from "@/hooks/use-toast";

const mockShops: Shop[] = [
  {
    id: "1",
    name: "Магазин электроники TechShop",
    owner: "Иван Петров",
    email: "ivan@techshop.ru",
    status: "active",
    verified: true,
    daysRemaining: 25,
    totalDays: 30,
    createdAt: "2024-06-01",
    lastPayment: "2024-06-15",
  },
  {
    id: "2",
    name: "Одежда и аксессуары StylePoint",
    owner: "Мария Сидорова",
    email: "maria@stylepoint.ru",
    status: "expired",
    verified: false,
    daysRemaining: 0,
    totalDays: 15,
    createdAt: "2024-05-20",
    lastPayment: "2024-05-20",
  },
  {
    id: "3",
    name: "Книжный мир BookWorld",
    owner: "Алексей Козлов",
    email: "alex@bookworld.ru",
    status: "inactive",
    verified: true,
    daysRemaining: 5,
    totalDays: 7,
    createdAt: "2024-06-10",
    lastPayment: "Не оплачено",
  },
];

export const useAdminShops = () => {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [activationDays, setActivationDays] = useState("30");

  const stats: ShopStats = useMemo(
    () => ({
      total: shops.length,
      active: shops.filter((s) => s.status === "active").length,
      verified: shops.filter((s) => s.verified).length,
      expired: shops.filter((s) => s.status === "expired").length,
    }),
    [shops],
  );

  const handleActivateShop = (shopId: string) => {
    const days = validateActivationDays(activationDays);

    if (!days) {
      toast({
        title: "Ошибка",
        description: "Количество дней должно быть больше 0",
        variant: "destructive",
      });
      return;
    }

    setShops((prev) =>
      prev.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              status: "active" as const,
              daysRemaining: days,
              totalDays: days,
              lastPayment: getTodayDateString(),
            }
          : shop,
      ),
    );

    // Обновляем выбранный магазин
    setSelectedShop((prev) =>
      prev?.id === shopId
        ? {
            ...prev,
            status: "active" as const,
            daysRemaining: days,
            totalDays: days,
            lastPayment: getTodayDateString(),
          }
        : prev,
    );

    toast({
      title: "Успешно",
      description: `Магазин активирован на ${days} дней`,
    });
  };

  const handleVerifyShop = (shopId: string, verified: boolean) => {
    setShops((prev) =>
      prev.map((shop) => (shop.id === shopId ? { ...shop, verified } : shop)),
    );

    // Обновляем выбранный магазин
    setSelectedShop((prev) =>
      prev?.id === shopId ? { ...prev, verified } : prev,
    );

    toast({
      title: "Успешно",
      description: verified ? "Магазин верифицирован" : "Верификация снята",
    });
  };

  const handleExtendPeriod = (shopId: string, additionalDays: number) => {
    setShops((prev) =>
      prev.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              daysRemaining: shop.daysRemaining + additionalDays,
              totalDays: shop.totalDays + additionalDays,
            }
          : shop,
      ),
    );

    // Обновляем выбранный магазин
    setSelectedShop((prev) =>
      prev?.id === shopId
        ? {
            ...prev,
            daysRemaining: prev.daysRemaining + additionalDays,
            totalDays: prev.totalDays + additionalDays,
          }
        : prev,
    );

    toast({
      title: "Успешно",
      description: `Период продлён на ${additionalDays} дней`,
    });
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
  };

  return {
    shops,
    selectedShop,
    activationDays,
    stats,
    setActivationDays,
    handleActivateShop,
    handleVerifyShop,
    handleExtendPeriod,
    handleShopSelect,
  };
};
