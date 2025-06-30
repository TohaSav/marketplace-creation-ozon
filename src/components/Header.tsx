import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { useStore } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);

  const { favorites, getTotalItems } = useStore();

  useEffect(() => {
    const userData = localStorage.getItem("user-token");
    const sellerData = localStorage.getItem("seller-token");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem("user-token");
      }
    }

    if (sellerData) {
      try {
        setSeller(JSON.parse(sellerData));
      } catch (e) {
        localStorage.removeItem("seller-token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("seller-token");
    setUser(null);
    setSeller(null);
    toast({
      title: "Вы вышли из аккаунта",
      description: "До свидания!",
    });
    navigate("/");
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="text-2xl font-bold text-purple-600 cursor-pointer hover:text-purple-700 transition-colors"
                onClick={() => navigate("/")}
              >
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

              {user || seller ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 px-2 md:px-4"
                    >
                      <Icon name="User" size={20} />
                      <span className="hidden md:inline">
                        {user?.name || seller?.name}
                      </span>
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {user && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          <Icon name="User" size={16} className="mr-2" />
                          Личный кабинет
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/orders")}>
                          <Icon name="Package" size={16} className="mr-2" />
                          Мои заказы
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/bonus-card")}
                        >
                          <Icon name="CreditCard" size={16} className="mr-2" />
                          Бонусная карта
                        </DropdownMenuItem>
                      </>
                    )}

                    {seller && (
                      <>
                        <DropdownMenuItem
                          onClick={() => navigate("/seller/dashboard")}
                        >
                          <Icon name="Store" size={16} className="mr-2" />
                          Кабинет продавца
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/seller/add-product")}
                        >
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить товар
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 px-2 md:px-4"
                    >
                      <Icon name="User" size={20} />
                      <span className="hidden md:inline">Войти</span>
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      <Icon name="User" size={16} className="mr-2" />
                      Войти как покупатель
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/register")}>
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Регистрация покупателя
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/seller")}>
                      <Icon name="Store" size={16} className="mr-2" />
                      Стать продавцом
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
