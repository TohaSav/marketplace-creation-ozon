import { Shop } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import {
  getStatusColor,
  getStatusText,
  calculateProgress,
  formatDate,
} from "@/utils/admin-helpers";
import Icon from "@/components/ui/icon";

interface ShopCardProps {
  shop: Shop;
  isSelected: boolean;
  onClick: () => void;
}

export default function ShopCard({ shop, isSelected, onClick }: ShopCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            {shop.name}
            {shop.verified && (
              <Badge variant="secondary" className="text-xs">
                <Icon name="BadgeCheck" size={12} className="mr-1" />
                Верифицирован
              </Badge>
            )}
          </h3>
          <p className="text-sm text-gray-600">{shop.owner}</p>
          <p className="text-xs text-gray-500">{shop.email}</p>
        </div>
        <Badge className={getStatusColor(shop.status)}>
          {getStatusText(shop.status)}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Дней: {shop.daysRemaining} / {shop.totalDays}
        </span>
        <span className="text-gray-500">
          Создан: {formatDate(shop.createdAt)}
        </span>
      </div>

      {shop.status === "active" && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${calculateProgress(shop.daysRemaining, shop.totalDays)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
