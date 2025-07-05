import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useMarketplace } from "@/contexts/MarketplaceContext";

const categories = [
  { value: "", label: "Все категории" },
  { value: "electronics", label: "Электроника" },
  { value: "clothes", label: "Одежда" },
  { value: "shoes", label: "Обувь" },
  { value: "books", label: "Книги" },
  { value: "home", label: "Дом и сад" },
  { value: "sport", label: "Спорт" },
  { value: "beauty", label: "Красота" },
  { value: "auto", label: "Авто" },
];

export const ProductFilters: React.FC = () => {
  const { state, searchProducts, filterByCategory, setPriceRange, setSorting } =
    useMarketplace();

  const handleSearchChange = (value: string) => {
    searchProducts(value);
  };

  const handleCategoryChange = (value: string) => {
    filterByCategory(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    setSorting(sortBy, sortOrder);
  };

  const clearFilters = () => {
    searchProducts("");
    filterByCategory("");
    setPriceRange([0, 10000]);
    setSorting("newest", "desc");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Фильтры
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Поиск</Label>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />
            <Input
              id="search"
              placeholder="Поиск товаров..."
              value={state.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Категория</Label>
          <Select
            value={state.selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Цена</Label>
          <div className="px-3">
            <Slider
              value={state.priceRange}
              onValueChange={handlePriceRangeChange}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(state.priceRange[0])}</span>
            <span>{formatPrice(state.priceRange[1])}</span>
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label>Сортировка</Label>
          <Select
            value={`${state.sortBy}-${state.sortOrder}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest-desc">Сначала новые</SelectItem>
              <SelectItem value="newest-asc">Сначала старые</SelectItem>
              <SelectItem value="price-asc">По цене: дешевле</SelectItem>
              <SelectItem value="price-desc">По цене: дороже</SelectItem>
              <SelectItem value="rating-desc">По рейтингу</SelectItem>
              <SelectItem value="name-asc">По названию А-Я</SelectItem>
              <SelectItem value="name-desc">По названию Я-А</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(state.searchQuery ||
          state.selectedCategory ||
          state.priceRange[0] > 0 ||
          state.priceRange[1] < 10000) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Активные фильтры</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-auto p-0 text-xs"
              >
                Очистить все
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Search" size={12} className="mr-1" />
                  {state.searchQuery}
                </Badge>
              )}
              {state.selectedCategory && (
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Tag" size={12} className="mr-1" />
                  {
                    categories.find((c) => c.value === state.selectedCategory)
                      ?.label
                  }
                </Badge>
              )}
              {(state.priceRange[0] > 0 || state.priceRange[1] < 10000) && (
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Banknote" size={12} className="mr-1" />
                  {formatPrice(state.priceRange[0])} -{" "}
                  {formatPrice(state.priceRange[1])}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
