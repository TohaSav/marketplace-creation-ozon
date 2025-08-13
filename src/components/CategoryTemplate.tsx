import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { useCart } from "@/hooks/useCart";
import Icon from "@/components/ui/icon";
import { getProductsByCategory } from "@/data/products";

interface CategoryTemplateProps {
  categoryKey: string;
  title: string;
  description: string;
  emptyIcon: string;
  showFilters?: boolean;
}

export default function CategoryTemplate({
  categoryKey,
  title,
  description,
  emptyIcon,
  showFilters = false,
}: CategoryTemplateProps) {
  const { getProductsByCategory: getStoreProducts } = useProductStore();
  const [realProducts, setRealProducts] = useState([]);
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Маппинг ключей категорий на названия категорий в данных
    const categoryMap: { [key: string]: string } = {
      'electronics': 'Электроника',
      'clothing': 'Одежда',
      'home-garden': 'Дом и интерьер',
      'beauty': 'Красота',
      'sport': 'Спорт',
      'sports': 'Спорт',
      'auto': 'Автотовары',
      'books': 'Книги',
      'toys': 'Детские товары'
    };

    const categoryName = categoryMap[categoryKey];
    if (categoryName) {
      const products = getProductsByCategory(categoryName);
      setRealProducts(products);
    }
  }, [categoryKey]);

  const allProducts = realProducts.length > 0 ? realProducts : getStoreProducts(categoryKey);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: ('image' in product ? product.image : product.images[0]) || '/placeholder.svg',
    });
  };

  // Фильтрация по поисковому запросу
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>

          {/* Поиск и фильтры */}
          {showFilters && (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Icon
                    name="Search"
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="name">По названию</option>
                  <option value="price-low">Цена: по возрастанию</option>
                  <option value="price-high">Цена: по убыванию</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {sortedProducts.length > 0 ? (
          <>
            {showFilters && (
              <div className="mb-4 text-sm text-gray-600">
                Найдено товаров: {sortedProducts.length}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={emptyIcon}
            title={
              searchQuery ? "Товары не найдены" : "Пока нет товаров в категории"
            }
            description={
              searchQuery
                ? "Попробуйте изменить поисковый запрос"
                : "Товары появятся здесь после того, как продавцы их добавят"
            }
          />
        )}
      </div>
    </div>
  );
}