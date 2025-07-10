import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  const { categorySlug, categoryId } = useParams<{
    categorySlug?: string;
    categoryId?: string;
  }>();
  const categoryKey = categorySlug || categoryId;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  // Получаем данные для текущей категории
  const currentCategory = categories[categoryKey as keyof typeof categories];
  const currentProducts =
    productsByCategory[categoryKey as keyof typeof productsByCategory] || [];

  useEffect(() => {
    setTimeout(() => {
      setProducts(currentProducts);
      setLoading(false);
    }, 500);
  }, [categoryKey]);

  // Фильтрация товаров
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
      default:
        return 0;
    }
  });

  // Обработка случая, когда категория не найдена
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Категория не найдена
          </h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Header */}
        <div
          className={`bg-gradient-to-r ${currentCategory.gradient} rounded-2xl p-8 mb-8 text-white`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`w-16 h-16 ${currentCategory.color} rounded-2xl flex items-center justify-center`}
            >
              <Icon
                name={currentCategory.icon as any}
                className="w-8 h-8 text-white"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {currentCategory.name}
              </h1>
              <p className="text-xl opacity-90">
                {currentCategory.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              <Icon name="Package" size={14} className="mr-1" />
              {sortedProducts.length} товаров
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              <Icon name="Truck" size={14} className="mr-1" />
              Быстрая доставка
            </Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              <Icon name="Shield" size={14} className="mr-1" />
              Гарантия качества
            </Badge>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="popular">Популярные</option>
                <option value="price-low">Цена: по возрастанию</option>
                <option value="price-high">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Icon
                      name="Star"
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Icon name="ShoppingCart" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="Package"
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-600">
              Попробуйте изменить поисковый запрос или фильтры
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Category;
