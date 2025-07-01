import { Shop } from "@/types/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShopCard from "./ShopCard";
import Icon from "@/components/ui/icon";

interface ShopsListProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop) => void;
}

export default function ShopsList({
  shops,
  selectedShop,
  onShopSelect,
}: ShopsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Store" size={20} />
          Магазины ({shops.length})
        </CardTitle>
        <CardDescription>
          Список всех зарегистрированных магазинов
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {shops.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Icon name="Store" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Магазины не найдены</p>
          </div>
        ) : (
          shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              isSelected={selectedShop?.id === shop.id}
              onClick={() => onShopSelect(shop)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
