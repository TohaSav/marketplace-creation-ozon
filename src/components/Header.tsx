import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import AuthModal from "@/components/AuthModal";
import { useStore } from "@/lib/store";

export default function Header() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    type: "buyer" | "seller";
  } | null>(null);

  const { favorites, getTotalItems } = useStore();

  const handleLogin = (
    email: string,
    password: string,
    userType: "buyer" | "seller",
  ) => {
    // Mock login - в реальном приложении здесь будет API запрос
    setUser({ name: email.split("@")[0], type: userType });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">
                Calibre Store
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-2 md:mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <Icon
                  name="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-2 md:space-x-6">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-2 md:px-4 relative"
                onClick={() => navigate("/favorites")}
              >
                <Icon name="Heart" size={20} />
                <span className="hidden md:inline">Избранное</span>
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                className="flex items-center space-x-2 relative px-2 md:px-4"
                onClick={() => navigate("/cart")}
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="hidden md:inline">Корзина</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 px-2 md:px-4"
                    >
                      <Icon name="User" size={20} />
                      <span className="hidden md:inline">{user.name}</span>
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <Icon name="User" size={16} className="mr-2" />
                      {user.type === "buyer"
                        ? "Личный кабинет"
                        : "Кабинет продавца"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Package" size={16} className="mr-2" />
                      {user.type === "buyer" ? "Мои заказы" : "Мои товары"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      {user.type === "buyer" ? "Бонусная карта" : "Финансы"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настройки
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-2 md:px-4"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <Icon name="User" size={20} />
                  <span className="hidden md:inline">Войти</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
