import { useState, useEffect } from "react";

export interface PlatformStats {
  totalProducts: number;
  totalSellers: number;
  totalBuyers: number;
  satisfactionRate: number;
}

export const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
    satisfactionRate: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Функция для загрузки статистики
  const loadStats = () => {
    try {
      // Получаем данные из localStorage
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      const buyers = JSON.parse(localStorage.getItem("buyers") || "[]");
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

      // Подсчитываем активных продавцов
      const activeSellers = sellers.filter(
        (seller: any) => seller.status === "active",
      ).length;

      // Подсчитываем продукты
      const totalProducts = products.length;

      // Подсчитываем покупателей
      const totalBuyers = buyers.length;

      // Вычисляем процент довольных клиентов
      const positiveReviews = reviews.filter(
        (review: any) => review.rating >= 4,
      ).length;
      const satisfactionRate =
        reviews.length > 0
          ? Math.round((positiveReviews / reviews.length) * 100)
          : 0;

      setStats({
        totalProducts,
        totalSellers: activeSellers,
        totalBuyers,
        satisfactionRate,
      });
    } catch (error) {
      console.error("Ошибка при загрузке статистики:", error);
      // Если ошибка, показываем нули
      setStats({
        totalProducts: 0,
        totalSellers: 0,
        totalBuyers: 0,
        satisfactionRate: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем статистику при монтировании
  useEffect(() => {
    loadStats();
  }, []);

  // Слушаем изменения в localStorage для обновления в реальном времени
  useEffect(() => {
    const handleStorageChange = () => {
      loadStats();
    };

    // Слушаем изменения в localStorage
    window.addEventListener("storage", handleStorageChange);

    // Также проверяем изменения каждые 2 секунды для случаев,
    // когда изменения происходят в том же окне
    const interval = setInterval(loadStats, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    isLoading,
    refresh: loadStats,
  };
};
