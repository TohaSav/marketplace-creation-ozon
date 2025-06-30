import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

export default function Header() {
  return (
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
          <div className="flex-1 max-w-2xl mx-8">
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
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Icon name="Heart" size={20} />
              <span className="hidden sm:inline">Избранное</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center space-x-2 relative"
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="hidden sm:inline">Корзина</span>
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </Badge>
            </Button>

            <Button variant="ghost" className="flex items-center space-x-2">
              <Icon name="User" size={20} />
              <span className="hidden sm:inline">Войти</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
