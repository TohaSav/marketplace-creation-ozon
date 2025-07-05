import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: "🚀 Calibre Store",
      subtitle: "Новый маркетплейс в России",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      title: "🛍️ Для покупателей",
      subtitle: "Миллионы товаров по выгодным ценам",
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: 3,
      title: "💼 Для продавцов",
      subtitle: "Начните продавать уже сегодня",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  // Автопереключение баннеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-purple-600">
                Calibre Store
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link to="/catalog" className="text-gray-600 hover:text-gray-900">
                Каталог
              </Link>
              <Link to="/seller" className="text-gray-600 hover:text-gray-900">
                Продавцам
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-gray-900">
                Поддержка
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Войти
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Carousel */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
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
              className={`bg-gradient-to-r ${banner.gradient} h-full flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl opacity-90">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Добро пожаловать в Calibre Store
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Новый российский маркетплейс с современными технологиями: Ajax,
            real-time уведомления, без перезагрузок страниц
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold mb-2">Удобные покупки</h3>
            <p className="text-gray-600">
              Интуитивный интерфейс и быстрый поиск товаров
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Без перезагрузок</h3>
            <p className="text-gray-600">
              Современный Ajax интерфейс для быстрой работы
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold mb-2">Уведомления</h3>
            <p className="text-gray-600">
              Мгновенные уведомления о заказах в реальном времени
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Высокая скорость</h3>
            <p className="text-gray-600">
              Быстрая загрузка и отзывчивый интерфейс
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Готовы начать?</h3>
          <p className="text-lg mb-6">
            Присоединяйтесь к нашему маркетплейсу как покупатель или продавец
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Стать покупателем
            </Link>
            <Link
              to="/seller"
              className="bg-purple-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-900 transition-colors"
            >
              Стать продавцом
            </Link>
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Система работает • Все сервисы доступны
          </div>
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
