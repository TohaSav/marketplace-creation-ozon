import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import StoriesSection from "@/components/StoriesSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  isVerified?: boolean;
  bonusPercent?: number;
  deliveryInfo?: string;
  inStock?: boolean;
  isHit?: boolean;
  isNew?: boolean;
  fastDelivery?: boolean;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Товары от зарегистрированных продавцов
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Крафтовый мёд с пасеки в Подмосковье, 500г",
      price: 890,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.9,
      reviews: 127,
      seller: "Пасека Иванова",
      isVerified: true,
      bonusPercent: 5,
      deliveryInfo: "Доставка 2-3 дня",
      inStock: true,
      isNew: true,
    },
    {
      id: 2,
      title: "Вязаные носки из овечьей шерсти ручной работы",
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.8,
      reviews: 89,
      seller: "Мастерская Елены",
      isVerified: true,
      bonusPercent: 3,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isHit: true,
      fastDelivery: true,
    },
    {
      id: 3,
      title: "Домашние соленья и маринады, набор 6 банок",
      price: 2400,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.7,
      reviews: 203,
      seller: "Бабушкины заготовки",
      isVerified: true,
      bonusPercent: 4,
      deliveryInfo: "Доставка 2-3 дня",
      inStock: true,
    },
    {
      id: 4,
      title: "Деревянные игрушки ручной работы для детей",
      price: 3500,
      originalPrice: 4200,
      discount: 17,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      seller: "Столярная мастерская",
      isVerified: true,
      bonusPercent: 6,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isNew: true,
      fastDelivery: true,
    },
    {
      id: 5,
      title: "Керамическая посуда ручной лепки, набор тарелок",
      price: 4500,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.6,
      reviews: 78,
      seller: "Гончарная студия",
      isVerified: true,
      bonusPercent: 2,
      deliveryInfo: "Доставка через 5-7 дней",
      inStock: false,
    },
    {
      id: 6,
      title: "Авторские украшения из серебра с натуральными камнями",
      price: 8900,
      originalPrice: 12000,
      discount: 26,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.8,
      reviews: 67,
      seller: "Ювелирная мастерская",
      isVerified: true,
      bonusPercent: 4,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isHit: true,
      fastDelivery: true,
    },
  ];

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { name: "Электроника", icon: "Smartphone", count: 12450 },
    { name: "Одежда", icon: "Shirt", count: 8932 },
    { name: "Дом и сад", icon: "Home", count: 6721 },
    { name: "Красота", icon: "Sparkles", count: 4582 },
    { name: "Спорт", icon: "Dumbbell", count: 3456 },
    { name: "Авто", icon: "Car", count: 2341 },
    { name: "Книги", icon: "Book", count: 1876 },
    { name: "Игрушки", icon: "GameController2", count: 1654 },
  ];

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
              <Button
                key={category.name}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                seller={product.seller}
                isVerified={product.isVerified}
                bonusPercent={product.bonusPercent}
                deliveryInfo={product.deliveryInfo}
                inStock={product.inStock}
                isHit={product.isHit}
                isNew={product.isNew}
                fastDelivery={product.fastDelivery}
              />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            Показать больше товаров
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
