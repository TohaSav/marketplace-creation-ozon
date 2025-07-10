import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Электроника",
      icon: "Smartphone",
      color: "bg-blue-500",
      slug: "electronics",
    },
    { name: "Одежда", icon: "Shirt", color: "bg-pink-500", slug: "clothing" },
    { name: "Дом и сад", icon: "Home", color: "bg-green-500", slug: "home" },
    { name: "Спорт", icon: "Dumbbell", color: "bg-orange-500", slug: "sport" },
    {
      name: "Красота",
      icon: "Sparkles",
      color: "bg-purple-500",
      slug: "beauty",
    },
    { name: "Авто", icon: "Car", color: "bg-red-500", slug: "auto" },
    { name: "Книги", icon: "BookOpen", color: "bg-indigo-500", slug: "books" },
    { name: "Игрушки", icon: "Gamepad2", color: "bg-yellow-500", slug: "toys" },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Категории</h2>
        <Button variant="outline">
          Все категории
          <Icon name="ArrowRight" className="ml-2" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
          >
            <div
              className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon
                name={category.icon as any}
                className="text-white"
                size={24}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
