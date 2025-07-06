import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function Index() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Баннеры для карусели
  const banners = [
    {
      id: 1,
      title: "Черная пятница",
      subtitle: "Скидки до 90% на всё",
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=500&fit=crop",
      color: "from-gray-900 to-black",
    },
    {
      id: 2,
      title: "Суперцены",
      subtitle: "Топ товары от 99₽",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 3,
      title: "Новинки техники",
      subtitle: "iPhone 15, MacBook и многое другое",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=500&fit=crop",
      color: "from-blue-600 to-purple-700",
    },
    {
      id: 4,
      title: "Быстрая доставка",
      subtitle: "Заказ сегодня — получи завтра",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=500&fit=crop",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 5,
      title: "Премиум бренды",
      subtitle: "Оригинальные товары с гарантией",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      color: "from-purple-600 to-pink-600",
    },
  ];

  // Категории товаров
  const categories = [
    { name: "Электроника", icon: "Smartphone", color: "bg-blue-500" },
    { name: "Одежда", icon: "Shirt", color: "bg-pink-500" },
    { name: "Дом и сад", icon: "Home", color: "bg-green-500" },
    { name: "Спорт", icon: "Dumbbell", color: "bg-orange-500" },
    { name: "Красота", icon: "Sparkles", color: "bg-purple-500" },
    { name: "Авто", icon: "Car", color: "bg-red-500" },
    { name: "Книги", icon: "BookOpen", color: "bg-indigo-500" },
    { name: "Игрушки", icon: "Gamepad2", color: "bg-yellow-500" },
  ];

  // Автопереключение баннеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Icon name="Store" className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                CalibreStore
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                />
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              </div>
              <Button className="ml-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl">
                Найти
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Heart" className="w-6 h-6" />
                  {favoritesCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                      {favoritesCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" className="w-6 h-6" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-1.5 py-0.5">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl">
                  Войти
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b px-4 py-3">
        <div className="relative">
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
          />
          <Icon
            name="Search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner Carousel */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-96 md:h-[500px]">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentBanner ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                      {banner.title}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
                      {banner.subtitle}
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg"
                    >
                      Смотреть товары
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Популярные категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={category.icon as any}
                      className="w-8 h-8 text-white"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty Product Grid Placeholders */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Рекомендуемые товары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Card
                key={item}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300"
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <Icon name="Package" className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-emerald-200 rounded w-20" />
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg"
                      >
                        <Icon name="ShoppingCart" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Быстрая доставка
              </h3>
              <p className="text-gray-600">
                Доставка в день заказа по всей России
              </p>
            </Card>
            <Card className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Гарантия качества
              </h3>
              <p className="text-gray-600">
                Все товары проверены и сертифицированы
              </p>
            </Card>
            <Card className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Удобная оплата
              </h3>
              <p className="text-gray-600">
                Любые способы оплаты, рассрочка 0%
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Sections */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Для покупателей */}
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 border-0 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingBag" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Для покупателей</h3>
              <p className="text-emerald-100 mb-6 text-lg">
                Миллионы товаров по выгодным ценам с быстрой доставкой
              </p>
              <ul className="text-emerald-100 mb-8 space-y-2">
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Скидки до 90%
                </li>
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Бесплатная доставка
                </li>
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Гарантия качества
                </li>
              </ul>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  Начать покупки
                </Button>
              </Link>
            </div>
          </Card>

          {/* Для продавцов */}
          <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 border-0 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Store" className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Для продавцов</h3>
              <p className="text-purple-100 mb-6 text-lg">
                Начните продавать и зарабатывать уже сегодня
              </p>
              <ul className="text-purple-100 mb-8 space-y-2">
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Низкие комиссии
                </li>
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Быстрые выплаты
                </li>
                <li className="flex items-center justify-center">
                  <Icon name="Check" className="w-4 h-4 mr-2" />
                  Поддержка 24/7
                </li>
              </ul>
              <Link to="/seller">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                >
                  Стать продавцом
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Calibre Store</h3>
              <p className="text-gray-400">
                Современный российский маркетплейс с передовыми технологиями
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/how-to-order" className="hover:text-white">
                    Как заказать
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="hover:text-white">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-white">
                    Возврат
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-white">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Продавцам</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/how-to-sell" className="hover:text-white">
                    Как продавать
                  </Link>
                </li>
                <li>
                  <Link to="/commissions" className="hover:text-white">
                    Комиссии
                  </Link>
                </li>
                <li>
                  <Link to="/seller/tariffs" className="hover:text-white">
                    Тарифы
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Конфиденциальность
                  </Link>
                </li>
                <li>
                  <Link to="/personal-data" className="hover:text-white">
                    Персональные данные
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@calibrestore.ru"
                    className="hover:text-white"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Calibre Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
