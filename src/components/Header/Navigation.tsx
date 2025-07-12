import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

interface NavigationProps {
  isLoggedIn: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navigation = ({
  isLoggedIn,
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user-token");
    localStorage.removeItem("seller-token");
    localStorage.setItem("isLoggedIn", "false");
    setIsUserMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const NavButton = ({
    icon,
    label,
    to,
    onClick,
    isActive = true,
    badge,
  }: {
    icon: string;
    label: string;
    to?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: number;
  }) => {
    const baseClasses = `flex flex-col items-center transition-colors relative ${
      isActive
        ? "text-gray-600 hover:text-blue-600"
        : "text-gray-400 cursor-not-allowed"
    }`;

    const content = (
      <>
        <Icon name={icon as any} size={20} className="mb-1" />
        <span className="text-xs">{label}</span>
        {badge !== undefined && (
          <div
            className={`absolute -top-1 -right-1 ${isActive ? "bg-orange-500" : "bg-gray-400"} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
          >
            {badge}
          </div>
        )}
      </>
    );

    if (to && isActive) {
      return (
        <Link to={to} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button onClick={onClick} className={baseClasses}>
        {content}
      </button>
    );
  };

  return (
    <div className="flex items-center space-x-6">
      <NavButton
        icon="Package"
        label="Заказы"
        to={isLoggedIn ? "/orders" : undefined}
        onClick={!isLoggedIn ? () => setIsMenuOpen(true) : undefined}
        isActive={isLoggedIn}
      />

      <NavButton
        icon="Heart"
        label="Избранное"
        to={isLoggedIn ? "/favorites" : undefined}
        onClick={!isLoggedIn ? () => setIsMenuOpen(true) : undefined}
        isActive={isLoggedIn}
      />

      <NavButton
        icon="ShoppingCart"
        label="Корзина"
        to={isLoggedIn ? "/cart" : undefined}
        onClick={!isLoggedIn ? () => setIsMenuOpen(true) : undefined}
        isActive={isLoggedIn}
        badge={0}
      />

      <div className="relative">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-xs font-medium">
                  {user ? getInitials(user.name) : "U"}
                </span>
              </div>
              <span className="text-xs">{user?.name || "Профиль"}</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Мой профиль
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="Package" size={16} className="mr-2" />
                    Мои заказы
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="Heart" size={16} className="mr-2" />
                    Избранное
                  </Link>
                  <Link
                    to="/bonus-card"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Бонусная карта
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="User" size={20} className="mb-1" />
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
