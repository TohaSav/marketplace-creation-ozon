import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface CategoryHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentCategory: {
    name: string;
    icon: string;
    color: string;
    description: string;
    gradient: string;
  };
  favoritesCount: number;
  cartCount: number;
}

export default function CategoryHeader({
  searchQuery,
  setSearchQuery,
  currentCategory,
  favoritesCount,
  cartCount,
}: CategoryHeaderProps) {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Icon name="Store" className="w-6 h-6 text-white" />
              </div>
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              >
                CalibreStore
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  placeholder={`Поиск в категории ${currentCategory.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                />
                <Icon
                  name="Search"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              </div>
              <Button className="ml-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl">
                Найти
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Heart" className="w-6 h-6" />
                  {favoritesCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                      {favoritesCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" className="w-6 h-6" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-1.5 py-0.5">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl">
                  Войти
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">
              Главная
            </Link>
            <Icon name="ChevronRight" className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {currentCategory.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Category Hero */}
      <div className={`bg-gradient-to-r ${currentCategory.gradient} py-16`}>
        <div className="container mx-auto px-4 text-center text-white">
          <div
            className={`w-24 h-24 ${currentCategory.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
          >
            <Icon
              name={currentCategory.icon as any}
              className="w-12 h-12 text-white"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentCategory.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>
      </div>
    </>
  );
}
