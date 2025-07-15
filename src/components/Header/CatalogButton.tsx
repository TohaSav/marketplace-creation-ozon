import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface CatalogButtonProps {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
}

const CatalogButton = ({
  isCatalogOpen,
  setIsCatalogOpen,
}: CatalogButtonProps) => {
  const categories = [
    {
      path: "/electronics",
      name: "Электроника",
      icon: "📱",
      bgColor: "bg-blue-100",
    },
    { path: "/clothing", name: "Одежда", icon: "👕", bgColor: "bg-pink-100" },
    {
      path: "/home-garden",
      name: "Дом и сад",
      icon: "🏠",
      bgColor: "bg-green-100",
    },
    { path: "/sport", name: "Спорт", icon: "⚽", bgColor: "bg-orange-100" },
    { path: "/beauty", name: "Красота", icon: "💄", bgColor: "bg-purple-100" },
    { path: "/books", name: "Книги", icon: "📚", bgColor: "bg-indigo-100" },
  ];

  return (
    <div className="flex items-center space-x-4 relative">
      <button
        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
        className="flex items-center space-x-2 px-4 py-2 sm:px-4 sm:py-2 px-2 py-1.5 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
      >
        <Icon name="Menu" size={16} className="sm:w-4 sm:h-4 w-3.5 h-3.5" />
        <span className="font-medium sm:text-base text-sm">Каталог</span>
      </button>

      {isCatalogOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 sm:w-64 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2 sm:py-2 py-1">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="flex items-center px-4 py-2 sm:px-4 sm:py-2 px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsCatalogOpen(false)}
              >
                <div
                  className={`w-8 h-8 sm:w-8 sm:h-8 w-6 h-6 ${category.bgColor} rounded-full flex items-center justify-center mr-3 sm:mr-3 mr-2`}
                >
                  <span className="sm:text-base text-sm">{category.icon}</span>
                </div>
                <span className="sm:text-base text-sm">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogButton;