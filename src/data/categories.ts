export interface Category {
  name: string;
  icon: string;
  color: string;
  description: string;
  gradient: string;
}

export const categories: Record<string, Category> = {
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
  "home-garden": {
    name: "Дом и сад",
    icon: "Home",
    color: "bg-green-500",
    description: "Товары для дома, сада и дачи",
    gradient: "from-green-500 to-emerald-600",
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
  sports: {
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
