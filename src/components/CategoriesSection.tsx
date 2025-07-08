import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Электроника",
    icon: "Smartphone",
    color: "bg-blue-500",
    slug: "electronics",
  },
  { name: "Одежда", icon: "Shirt", color: "bg-pink-500", slug: "clothing" },
  {
    name: "Дом и сад",
    icon: "Home",
    color: "bg-green-500",
    slug: "home-garden",
  },
  { name: "Красота", icon: "Sparkles", color: "bg-purple-500", slug: "beauty" },
  { name: "Спорт", icon: "Dumbbell", color: "bg-orange-500", slug: "sport" },
  { name: "Авто", icon: "Car", color: "bg-red-500", slug: "auto" },
  { name: "Книги", icon: "Book", color: "bg-indigo-500", slug: "books" },
  {
    name: "Игрушки",
    icon: "GameController2",
    color: "bg-yellow-500",
    slug: "toys",
  },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Популярные категории
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300"
            onClick={() => navigate(`/category/${category.slug}`)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon
                  name={category.icon as any}
                  className="w-8 h-8 text-white"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
