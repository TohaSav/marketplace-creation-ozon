import React, { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";
import { filterProducts, sortProducts } from "@/utils/marketplace";
import { MarketplaceFilters } from "@/types/marketplace";

export const ProductGrid: React.FC = () => {
  const { state } = useMarketplace();

  const filteredProducts = useMemo(() => {
    const filters: MarketplaceFilters = {
      searchQuery: state.searchQuery,
      selectedCategory: state.selectedCategory,
      priceRange: state.priceRange,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
    };

    const filtered = filterProducts(state.products, filters);
    return sortProducts(filtered, state.sortBy, state.sortOrder);
  }, [
    state.products,
    state.searchQuery,
    state.selectedCategory,
    state.priceRange,
    state.sortBy,
    state.sortOrder,
  ]);

  if (state.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={index} product={{} as any} isLoading={true} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Alert>
        <Icon name="Search" size={16} />
        <AlertDescription>
          {state.searchQuery ||
          state.selectedCategory ||
          state.priceRange[0] > 0 ||
          state.priceRange[1] < 10000
            ? "По вашему запросу ничего не найдено. Попробуйте изменить фильтры."
            : "Товары не найдены. Попробуйте обновить страницу."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Найдено товаров: {filteredProducts.length}
        </p>
        <div className="flex items-center gap-2">
          <Icon
            name={state.isConnected ? "Wifi" : "WifiOff"}
            size={16}
            className={state.isConnected ? "text-green-500" : "text-red-500"}
          />
          <span className="text-xs text-gray-500">
            {state.isConnected ? "В сети" : "Не в сети"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
