import React, { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

export const ProductGrid: React.FC = () => {
  const { state } = useMarketplace();

  const filteredProducts = useMemo(() => {
    let filtered = [...state.products];

    // Search filter
    if (state.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (state.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === state.selectedCategory,
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= state.priceRange[0] &&
        product.price <= state.priceRange[1],
    );

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (state.sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "newest":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        default:
          return 0;
      }

      if (state.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
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
