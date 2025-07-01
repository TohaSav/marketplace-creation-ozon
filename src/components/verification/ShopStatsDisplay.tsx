import React from "react";
import { ShopStats } from "@/types/verification";

interface ShopStatsDisplayProps {
  stats: ShopStats;
}

const ShopStatsDisplay: React.FC<ShopStatsDisplayProps> = ({ stats }) => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="font-medium mb-2">Статистика магазина</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          Всего заказов:{" "}
          <span className="font-medium">{stats.totalOrders}</span>
        </div>
        <div>
          Выполнено:{" "}
          <span className="font-medium">{stats.completedOrders}</span>
        </div>
        <div>
          Рейтинг:{" "}
          <span className="font-medium">{stats.averageRating}/5.0</span>
        </div>
        <div>
          Отзывы: <span className="font-medium">{stats.totalReviews}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopStatsDisplay;
