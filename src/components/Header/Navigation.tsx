import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

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
        to={isLoggedIn ? "/profile" : undefined}
        onClick={!isLoggedIn ? () => setIsMenuOpen(true) : undefined}
        isActive={isLoggedIn}
      />

      <NavButton
        icon="Heart"
        label="Избранное"
        to={isLoggedIn ? "/profile" : undefined}
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
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Icon name="User" size={20} className="mb-1" />
            <span className="text-xs">Профиль</span>
          </Link>
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
