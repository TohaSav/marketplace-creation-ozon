import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

const MobileBottomMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoggedIn =
    !!user ||
    localStorage.getItem("user-token") ||
    localStorage.getItem("seller-token");

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

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const MenuItem = ({
    icon,
    label,
    to,
    onClick,
    isActive,
    badge,
    disabled = false,
  }: {
    icon: string;
    label: string;
    to?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: number;
    disabled?: boolean;
  }) => {
    const baseClasses = `flex flex-col items-center justify-center py-2 px-1 relative transition-colors ${
      isActive
        ? "text-blue-600"
        : disabled
          ? "text-gray-400"
          : "text-gray-600"
    }`;

    const content = (
      <>
        <Icon name={icon as any} size={20} className="mb-1" />
        <span className="text-[10px] leading-none">{label}</span>
        {badge !== undefined && badge > 0 && (
          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {badge > 99 ? "99+" : badge}
          </div>
        )}
      </>
    );

    if (to && !disabled) {
      return (
        <Link to={to} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button onClick={onClick} className={baseClasses} disabled={disabled}>
        {content}
      </button>
    );
  };

  return (
    <>
      {/* Фиксированное меню снизу - только для мобильных и планшетов */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden pb-safe-bottom">
        <div className="grid grid-cols-5 h-16">
          <MenuItem
            icon="Home"
            label="Главная"
            to="/"
            isActive={isActiveRoute("/")}
          />
          
          <MenuItem
            icon="Grid3X3"
            label="Каталог"
            to="/catalog"
            isActive={isActiveRoute("/catalog")}
          />

          <MenuItem
            icon="Gamepad2"
            label="Пузырики"
            to="/bubble-game"
            isActive={isActiveRoute("/bubble-game")}
          />

          <MenuItem
            icon="Heart"
            label="Избранное"
            to={isLoggedIn ? "/favorites" : "/login"}
            isActive={isActiveRoute("/favorites")}
            disabled={!isLoggedIn}
          />

          <div className="flex flex-col items-center justify-center py-2 px-1 relative">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex flex-col items-center justify-center text-gray-600"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                    <span className="text-white text-[8px] font-medium">
                      {user ? getInitials(user.name) : "U"}
                    </span>
                  </div>
                  <span className="text-[10px] leading-none">Профиль</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex flex-col items-center justify-center text-gray-600"
              >
                <Icon name="User" size={20} className="mb-1" />
                <span className="text-[10px] leading-none">Войти</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Модальное меню профиля */}
      {isUserMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute bottom-16 left-4 right-4 bg-white rounded-t-xl shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Профиль</h3>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {user && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              )}

              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Icon name="User" size={20} className="mr-3" />
                  <span>Мой профиль</span>
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-3" />
                  <span>Корзина</span>
                </Link>

                <Link
                  to="/bonus-card"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Icon name="CreditCard" size={20} className="mr-3" />
                  <span>Бонусная карта</span>
                </Link>

                <Link
                  to="/wallet"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Icon name="Wallet" size={20} className="mr-3" />
                  <span>Кошелёк</span>
                </Link>

                <Link
                  to="/returns"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <Icon name="RotateCcw" size={20} className="mr-3" />
                  <span>Возврат товара</span>
                </Link>

                <div className="border-t pt-2 mt-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Icon name="LogOut" size={20} className="mr-3" />
                    <span>Выйти</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Отступ для контента чтобы не перекрывался меню - только для мобильных */}
      <div className="h-16 pb-safe-bottom md:hidden" />
    </>
  );
};

export default MobileBottomMenu;