import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
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

  // Тестовые данные товаров
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Смартфон Apple iPhone 15 Pro 128GB Titanium Natural",
      price: 89990,
      originalPrice: 99990,
      discount: 10,
      image:
        "https://cdn.poehali.dev/files/1d929307-708e-49a3-831d-3bdf359b605d.png",
      rating: 4.8,
      reviews: 1247,
      seller: "Apple Store",
      isVerified: true,
      bonusPercent: 5,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isHit: true,
      fastDelivery: true,
    },
    {
      id: 2,
      title:
        'Ноутбук ASUS VivoBook 15 X1500EA-EJ3019 15.6" FHD Intel Core i5-1135G7',
      price: 45990,
      originalPrice: 52990,
      discount: 13,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.6,
      reviews: 834,
      seller: "ASUS Official",
      isVerified: true,
      bonusPercent: 3,
      deliveryInfo: "Доставка 2-3 дня",
      inStock: true,
      isNew: true,
    },
    {
      id: 3,
      title: "Наушники Sony WH-1000XM5 беспроводные с шумоподавлением",
      price: 24990,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.9,
      reviews: 567,
      seller: "Sony Russia",
      isVerified: true,
      bonusPercent: 4,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      fastDelivery: true,
    },
    {
      id: 4,
      title: "Умные часы Apple Watch Series 9 GPS 41mm Sport Band",
      price: 32990,
      originalPrice: 39990,
      discount: 18,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.7,
      reviews: 923,
      seller: "Apple Store",
      isVerified: true,
      bonusPercent: 6,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isHit: true,
    },
    {
      id: 5,
      title: "Игровая консоль Sony PlayStation 5 825GB",
      price: 54990,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.8,
      reviews: 1456,
      seller: "Sony Interactive",
      isVerified: true,
      bonusPercent: 2,
      deliveryInfo: "Доставка через 5-7 дней",
      inStock: false,
    },
    {
      id: 6,
      title: 'Планшет Samsung Galaxy Tab S9 11" 128GB Wi-Fi',
      price: 64990,
      originalPrice: 74990,
      discount: 13,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.5,
      reviews: 402,
      seller: "Samsung Electronics",
      isVerified: true,
      bonusPercent: 4,
      deliveryInfo: "Доставка завтра",
      inStock: true,
      isNew: true,
      fastDelivery: true,
    },
    {
      id: 7,
      title: "Кофемашина De'Longhi Dinamica Plus ECAM370.95.T",
      price: 89990,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.4,
      reviews: 267,
      seller: "De'Longhi Official",
      isVerified: true,
      bonusPercent: 5,
      deliveryInfo: "Доставка 2-3 дня",
      inStock: true,
    },
    {
      id: 8,
      title: 'Телевизор LG OLED55C3PUA 55" 4K Smart TV webOS',
      price: 124990,
      originalPrice: 149990,
      discount: 17,
      image: "https://cdn.poehali.dev/files/placeholder.svg",
      rating: 4.9,
      reviews: 1876,
      seller: "LG Electronics",
      isVerified: true,
      bonusPercent: 3,
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
