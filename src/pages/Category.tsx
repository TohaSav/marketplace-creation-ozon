import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const Category = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Товары по категориям
  const productsByCategory = {
    electronics: [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 89990,
        rating: 4.9,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 79990,
        rating: 4.8,
        reviews: 189,
        image: "/placeholder.svg",
      },
      {
        id: 3,
        name: "MacBook Air M2",
        price: 129990,
        rating: 4.9,
        reviews: 145,
        image: "/placeholder.svg",
      },
      {
        id: 4,
        name: "iPad Pro 12.9",
        price: 99990,
        rating: 4.8,
        reviews: 167,
        image: "/placeholder.svg",
      },
      {
        id: 5,
        name: "AirPods Pro",
        price: 22990,
        rating: 4.7,
        reviews: 298,
        image: "/placeholder.svg",
      },
      {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 29990,
        rating: 4.8,
        reviews: 156,
        image: "/placeholder.svg",
      },
    ],
    clothing: [
      {
        id: 7,
        name: "Джинсы Levi's 501",
        price: 8990,
        rating: 4.6,
        reviews: 89,
        image: "/placeholder.svg",
      },
      {
        id: 8,
        name: "Футболка Nike",
        price: 2990,
        rating: 4.5,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 9,
        name: "Кроссовки Adidas",
        price: 12990,
        rating: 4.7,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 10,
        name: "Куртка Zara",
        price: 6990,
        rating: 4.4,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 11,
        name: "Платье H&M",
        price: 3990,
        rating: 4.3,
        reviews: 45,
        image: "/placeholder.svg",
      },
      {
        id: 12,
        name: "Свитер Uniqlo",
        price: 4990,
        rating: 4.5,
        reviews: 78,
        image: "/placeholder.svg",
      },
    ],
    home: [
      {
        id: 13,
        name: "Пылесос Dyson V15",
        price: 49990,
        rating: 4.8,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 14,
        name: "Мультиварка Redmond",
        price: 8990,
        rating: 4.6,
        reviews: 89,
        image: "/placeholder.svg",
      },
      {
        id: 15,
        name: "Кофеварка DeLonghi",
        price: 25990,
        rating: 4.7,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 16,
        name: "Диван-кровать IKEA",
        price: 32990,
        rating: 4.4,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 17,
        name: "Стиральная машина LG",
        price: 45990,
        rating: 4.5,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 18,
        name: "Микроволновка Samsung",
        price: 12990,
        rating: 4.3,
        reviews: 98,
        image: "/placeholder.svg",
      },
    ],
    sport: [
      {
        id: 19,
        name: "Гантели 20 кг",
        price: 4990,
        rating: 4.7,
        reviews: 145,
        image: "/placeholder.svg",
      },
      {
        id: 20,
        name: "Беговая дорожка",
        price: 89990,
        rating: 4.6,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 21,
        name: "Мяч футбольный Nike",
        price: 2990,
        rating: 4.8,
        reviews: 189,
        image: "/placeholder.svg",
      },
      {
        id: 22,
        name: "Велосипед горный",
        price: 45990,
        rating: 4.5,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 23,
        name: "Коврик для йоги",
        price: 1990,
        rating: 4.4,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 24,
        name: "Гири 16 кг",
        price: 3990,
        rating: 4.6,
        reviews: 89,
        image: "/placeholder.svg",
      },
    ],
    beauty: [
      {
        id: 25,
        name: "Крем для лица L'Oreal",
        price: 1990,
        rating: 4.5,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 26,
        name: "Тушь для ресниц Maybelline",
        price: 890,
        rating: 4.6,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 27,
        name: "Парфюм Chanel",
        price: 8990,
        rating: 4.8,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 28,
        name: "Шампунь Pantene",
        price: 590,
        rating: 4.3,
        reviews: 189,
        image: "/placeholder.svg",
      },
      {
        id: 29,
        name: "Помада MAC",
        price: 2990,
        rating: 4.7,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 30,
        name: "Скраб для тела",
        price: 1290,
        rating: 4.4,
        reviews: 98,
        image: "/placeholder.svg",
      },
    ],
    auto: [
      {
        id: 31,
        name: "Автомобильный пылесос",
        price: 3990,
        rating: 4.5,
        reviews: 89,
        image: "/placeholder.svg",
      },
      {
        id: 32,
        name: "Моторное масло 5W-30",
        price: 2990,
        rating: 4.6,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 33,
        name: "Видеорегистратор",
        price: 8990,
        rating: 4.4,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 34,
        name: "Шины летние R16",
        price: 15990,
        rating: 4.7,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 35,
        name: "Автосигнализация",
        price: 12990,
        rating: 4.3,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 36,
        name: "Коврики в салон",
        price: 1990,
        rating: 4.5,
        reviews: 145,
        image: "/placeholder.svg",
      },
    ],
    books: [
      {
        id: 37,
        name: "Война и мир",
        price: 1290,
        rating: 4.9,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 38,
        name: "Учебник по React",
        price: 2990,
        rating: 4.8,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 39,
        name: "Атлас мира",
        price: 1990,
        rating: 4.6,
        reviews: 89,
        image: "/placeholder.svg",
      },
      {
        id: 40,
        name: "Детская энциклопедия",
        price: 1590,
        rating: 4.7,
        reviews: 67,
        image: "/placeholder.svg",
      },
      {
        id: 41,
        name: "Блокнот Moleskine",
        price: 2490,
        rating: 4.5,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 42,
        name: "Словарь английского",
        price: 990,
        rating: 4.4,
        reviews: 145,
        image: "/placeholder.svg",
      },
    ],
    toys: [
      {
        id: 43,
        name: "Конструктор LEGO",
        price: 4990,
        rating: 4.8,
        reviews: 189,
        image: "/placeholder.svg",
      },
      {
        id: 44,
        name: "Кукла Barbie",
        price: 2990,
        rating: 4.6,
        reviews: 156,
        image: "/placeholder.svg",
      },
      {
        id: 45,
        name: "Машинка на радиоуправлении",
        price: 3990,
        rating: 4.7,
        reviews: 123,
        image: "/placeholder.svg",
      },
      {
        id: 46,
        name: "Мягкая игрушка мишка",
        price: 1990,
        rating: 4.5,
        reviews: 234,
        image: "/placeholder.svg",
      },
      {
        id: 47,
        name: "Пазл 1000 деталей",
        price: 1290,
        rating: 4.4,
        reviews: 89,
        image: "/placeholder.svg",
      },
      {
        id: 48,
        name: "Настольная игра Монополия",
        price: 2490,
        rating: 4.6,
        reviews: 67,
        image: "/placeholder.svg",
      },
    ],
  };

  const currentProducts =
    productsByCategory[categorySlug as keyof typeof productsByCategory] || [];

  // Данные категорий
  const categories = {
    electronics: {
      name: "Электроника",
      icon: "Smartphone",
      color: "bg-blue-500",
      description: "Смартфоны, планшеты, компьютеры и другая техника",
      gradient: "from-blue-500 to-purple-600",
    },
    clothing: {
      name: "Одежда",
      icon: "Shirt",
      color: "bg-pink-500",
      description: "Мужская и женская одежда, обувь, аксессуары",
      gradient: "from-pink-500 to-rose-600",
    },
    home: {
      name: "Дом и сад",
      icon: "Home",
      color: "bg-green-500",
      description: "Товары для дома, сада и дачи",
      gradient: "from-green-500 to-emerald-600",
    },
    sport: {
      name: "Спорт",
      icon: "Dumbbell",
      color: "bg-orange-500",
      description: "Спортивные товары и инвентарь",
      gradient: "from-orange-500 to-red-600",
    },
    beauty: {
      name: "Красота",
      icon: "Sparkles",
      color: "bg-purple-500",
      description: "Косметика, парфюмерия и товары для красоты",
      gradient: "from-purple-500 to-pink-600",
    },
    auto: {
      name: "Авто",
      icon: "Car",
      color: "bg-red-500",
      description: "Автомобильные товары и аксессуары",
      gradient: "from-red-500 to-orange-600",
    },
    books: {
      name: "Книги",
      icon: "BookOpen",
      color: "bg-indigo-500",
      description: "Книги, учебники и канцелярские товары",
      gradient: "from-indigo-500 to-blue-600",
    },
    toys: {
      name: "Игрушки",
      icon: "Gamepad2",
      color: "bg-yellow-500",
      description: "Детские игрушки и товары для детей",
      gradient: "from-yellow-500 to-orange-600",
    },
  };

  const currentCategory = categories[categorySlug as keyof typeof categories];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Категория не найдена
          </h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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

      {/* Category Header */}
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

      {/* Filters and Sort */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Сортировка:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price_low">Сначала дешевые</SelectItem>
                  <SelectItem value="price_high">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="newest">Новинки</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Filter" className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Grid3X3" className="w-4 h-4 mr-2" />
                Сетка
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-emerald-600">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg"
                      onClick={() => setCartCount(cartCount + 1)}
                    >
                      <Icon name="ShoppingCart" className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {currentProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl"
            >
              Загрузить еще
            </Button>
          </div>
        )}

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon
              name={currentCategory.icon as any}
              className="w-24 h-24 text-gray-300 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Товары в категории "{currentCategory.name}" скоро появятся
            </h3>
            <p className="text-gray-600 mb-8">
              Мы работаем над наполнением этой категории качественными товарами
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl">
                Перейти к другим категориям
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Icon name="Store" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CalibreStore</span>
              </div>
              <p className="text-gray-400">
                Современный маркетплейс с широким ассортиментом товаров
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
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
              <h4 className="font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/how-to-sell" className="hover:text-white">
                    Как продавать
                  </Link>
                </li>
                <li>
                  <Link to="/seller/tariffs" className="hover:text-white">
                    Тарифы
                  </Link>
                </li>
                <li>
                  <Link to="/seller" className="hover:text-white">
                    Кабинет продавца
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>8 (800) 555-35-35</li>
                <li>info@calibrestore.ru</li>
                <li>Работаем 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CalibreStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Category;
