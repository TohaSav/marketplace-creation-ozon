import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="cursor-pointer hover:opacity-90">
              <img
                src="https://cdn.poehali.dev/files/1d929307-708e-49a3-831d-3bdf359b605d.png"
                alt="Calibre Store"
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-2 md:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <button className="flex items-center space-x-2 px-2 md:px-4 py-2 text-gray-700 hover:text-purple-600">
              ❤️ <span className="hidden md:inline">Избранное</span>
            </button>

            <button className="flex items-center space-x-2 px-2 md:px-4 py-2 text-gray-700 hover:text-purple-600">
              🛒 <span className="hidden md:inline">Корзина</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-2 md:px-4 py-2 text-gray-700 hover:text-purple-600"
              >
                👤 <span className="hidden md:inline">Войти</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Войти как покупатель
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Регистрация покупателя
                  </Link>
                  <hr className="my-1" />
                  <Link
                    to="/seller"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Стать продавцом
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
