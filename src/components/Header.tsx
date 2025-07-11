import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#f6f7f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs">
            <div className="flex items-center space-x-4">
              <Link
                to="/seller"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Продавайте на OZON
              </Link>
              <Link
                to="/help"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Помощь
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Пункты выдачи</span>
              <span className="text-gray-600">Москва</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="cursor-pointer hover:opacity-90">
              <div className="text-2xl font-bold text-blue-600">OZON</div>
            </Link>
          </div>

          {/* Catalog Button */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="font-medium">Каталог</span>
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Искать на Ozon"
                className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-0 text-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/orders"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-xs">Заказы</span>
            </Link>

            <Link
              to="/favorites"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs">Избранное</span>
            </Link>

            <Link
              to="/cart"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors relative"
            >
              <svg
                className="w-5 h-5 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h9a1 1 0 001-1v-6m-4-6v6m-2-6v6m-2-6v6"
                />
              </svg>
              <span className="text-xs">Корзина</span>
              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </div>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs">Войти</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <Link
                      to="/login"
                      className="block w-full mb-2 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Войти
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-2 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Зарегистрироваться
                    </Link>
                  </div>
                  <hr />
                  <div className="p-2">
                    <Link
                      to="/seller"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Стать продавцом
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
