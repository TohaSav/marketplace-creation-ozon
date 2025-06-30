import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import StoriesCarousel from "@/components/StoriesCarousel";

// Товары будут загружаться от продавцов
const mockProducts: any[] = [];

export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
  }, [loading, hasMore, products.length]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Добро пожаловать в Calibre Store
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Миллионы товаров от проверенных продавцов
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Электроника",
                "Одежда",
                "Дом и сад",
                "Спорт",
                "Красота",
                "Автотовары",
              ].map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Ведущий маркетплейс с миллионами товаров от проверенных
                продавцов по всей России.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs">
                  VK
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-xs">
                  IG
                </div>
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
                  <a href="#" className="hover:text-white transition-colors">
                    Как сделать заказ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Способы оплаты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Возврат товара
                  </a>
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
                  <a href="#" className="hover:text-white transition-colors">
                    Как начать продавать
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Правила торговли
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Комиссии
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Аналитика
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
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
