import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import StoriesCarousel from "@/components/StoriesCarousel";
import Icon from "@/components/ui/icon";

// Товары будут загружаться от продавцов
const mockProducts: any[] = [];

export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Данные для баннеров
  const banners = [
    {
      id: 1,
      title: "Добро пожаловать в Calibre Store",
      subtitle: "Миллионы товаров от проверенных продавцов",
      description: "Найдите всё, что нужно, в одном месте",
      gradient: "from-purple-600 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      buttonText: "Начать покупки",
      buttonLink: "#products",
    },
    {
      id: 2,
      title: "Скидки до 70% на электронику",
      subtitle: "Лучшие предложения месяца",
      description: "Смартфоны, ноутбуки, аксессуары по выгодным ценам",
      gradient: "from-orange-500 to-red-600",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
      buttonText: "Смотреть скидки",
      buttonLink: "/category/electronics",
    },
    {
      id: 3,
      title: "Новая коллекция одежды",
      subtitle: "Модные тренды 2025",
      description: "Стильная одежда для всей семьи от ведущих брендов",
      gradient: "from-pink-500 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      buttonText: "Посмотреть коллекцию",
      buttonLink: "/category/clothing",
    },
    {
      id: 4,
      title: "Бесплатная доставка",
      subtitle: "При заказе от 2000 рублей",
      description: "Быстрая доставка по всей России",
      gradient: "from-green-500 to-teal-600",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
      buttonText: "Узнать больше",
      buttonLink: "/delivery",
    },
  ];

  // Функция для загрузки товаров от продавцов
  const loadProductsFromSellers = () => {
    // Здесь будет запрос к API для получения товаров от продавцов
    return [];
  };

  // Функция загрузки дополнительных товаров
  const loadMoreProducts = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Загрузка товаров от продавцов
    setTimeout(() => {
      const newProducts = loadProductsFromSellers();
      setProducts((prev) => [...prev, ...newProducts]);
      setLoading(false);

      // Если товаров больше нет, останавливаем загрузку
      if (newProducts.length === 0) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Автопереключение баннеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Banner Carousel */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentBanner
                ? "translate-x-0"
                : index < currentBanner
                  ? "-translate-x-full"
                  : "translate-x-full"
            }`}
          >
            <div
              className={`bg-gradient-to-r ${banner.gradient} h-full relative overflow-hidden`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="flex items-center justify-center h-full">
                    {/* Text Content */}
                    <div className="text-white text-center">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        🎉 Тут будут акции и скидки
                      </h1>
                      <p className="text-xl sm:text-2xl md:text-3xl opacity-90 mb-6">
                        Следите за новостями
                      </p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 max-w-2xl mx-auto">
                        <p className="text-base sm:text-lg md:text-xl font-medium">
                          Скоро здесь появятся горячие предложения! 🔥
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevBanner}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-colors"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-colors"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentBanner ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Stories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stories</h3>
          <StoriesCarousel />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Рекомендуем для вас
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Пока нет товаров от продавцов
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Товары появятся здесь после добавления продавцами
            </p>
          </div>
        )}

        {/* Индикатор загрузки */}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-4 py-2 text-purple-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
              Загружаем ещё товары...
            </div>
          </div>
        )}

        {/* Сообщение об окончании товаров */}
        {!hasMore && !loading && (
          <div className="text-center mt-8">
            <p className="text-gray-500">Все товары загружены</p>
          </div>
        )}
      </div>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* О компании */}
            <div>
              <h3 className="text-lg font-semibold mb-4">О Calibre Store</h3>
              <p className="text-gray-300 text-sm mb-4">
                Новый маркетплейс с качественными товарами от надёжных продавцов
                по всей стране и выгодными ценами.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://vk.com/cloudpryanik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs hover:bg-blue-700 transition-colors"
                >
                  VK
                </a>

                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center text-xs">
                  TG
                </div>
              </div>
            </div>

            {/* Покупателям */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/how-to-order"
                    className="hover:text-white transition-colors"
                  >
                    Как сделать заказ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/payment-methods"
                    className="hover:text-white transition-colors"
                  >
                    Способы оплаты
                  </Link>
                </li>
                <li>
                  <Link
                    to="/delivery"
                    className="hover:text-white transition-colors"
                  >
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="hover:text-white transition-colors"
                  >
                    Возврат товара
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Гарантия
                  </a>
                </li>
              </ul>
            </div>

            {/* Продавцам */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Продавцам</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/how-to-sell"
                    className="hover:text-white transition-colors"
                  >
                    Как начать продавать
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trading-rules"
                    className="hover:text-white transition-colors"
                  >
                    Правила торговли
                  </Link>
                </li>
                <li>
                  <Link
                    to="/commissions"
                    className="hover:text-white transition-colors"
                  >
                    Комиссии
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Аналитика
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@calibrestore.ru?subject=Поддержка продавцов"
                    className="hover:text-white transition-colors"
                  >
                    Поддержка продавцов
                  </a>
                </li>
              </ul>
            </div>

            {/* Поддержка */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Служба поддержки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Безопасность
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Пользовательское соглашение
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Нижняя часть футера */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 Calibre Store. Все права защищены.
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Политика конфиденциальности
                </a>
                <a
                  href="/personal-data"
                  className="hover:text-white transition-colors"
                >
                  Обработка персональных данных
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Пользовательское соглашение
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Публичная оферта
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
