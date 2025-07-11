import React from "react";
import { useProductStore } from "@/store/productStore";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import StoriesSection from "@/components/StoriesSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { getFeaturedProducts } = useProductStore();
  const products = getFeaturedProducts(8);

  const categories = [
    {
      name: "Электроника",
      icon: "Smartphone",
      count: 12450,
      slug: "electronics",
    },
    { name: "Одежда", icon: "Shirt", count: 8932, slug: "clothing" },
    { name: "Дом и сад", icon: "Home", count: 6721, slug: "home-garden" },
    { name: "Красота", icon: "Sparkles", count: 4582, slug: "beauty" },
    { name: "Спорт", icon: "Dumbbell", count: 3456, slug: "sport" },
    { name: "Авто", icon: "Car", count: 2341, slug: "auto" },
    { name: "Книги", icon: "Book", count: 1876, slug: "books" },
    { name: "Игрушки", icon: "GameController2", count: 1654, slug: "toys" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Добро пожаловать в Calibre Store!
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Откройте для себя тысячи товаров с быстрой доставкой и выгодными
              ценами
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <Icon name="Zap" size={14} className="mr-1" />
                Быстрая доставка
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <Icon name="Shield" size={14} className="mr-1" />
                Гарантия качества
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <Icon name="CreditCard" size={14} className="mr-1" />
                Бонусы за покупки
              </Badge>
            </div>
          </div>
        </div>

        {/* Stories Section */}
        <StoriesSection className="mb-8" />

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Категории товаров
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to={`/category/${category.slug}`}>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <Icon
                    name={category.icon as any}
                    size={24}
                    className="text-indigo-600"
                  />
                  <div className="text-center">
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      {category.count.toLocaleString()}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Популярные товары
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ArrowUpDown" size={16} className="mr-2" />
                Сортировка
              </Button>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="Store"
              title="Нет товаров"
              description="Товары появятся здесь после того, как продавцы их добавят"
              actionText="Стать продавцом"
              actionLink="/seller/register"
            />
          )}
        </div>

        {/* Load More */}
        {products.length > 0 && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
            >
              Показать больше товаров
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
