import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { categories } from "@/data/categories";

interface CategoryNavigationProps {
  currentCategorySlug: string;
}

const CategoryNavigation = ({
  currentCategorySlug,
}: CategoryNavigationProps) => {
  const categoryList = Object.entries(categories).filter(
    ([slug]) => slug !== currentCategorySlug,
  );

  return (
    <div className="bg-white border-b py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Другие категории
          </h3>
          <Link
            to="/"
            className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>Все категории</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categoryList.map(([slug, category]) => (
            <Link key={slug} to={`/category/${slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={category.icon as any}
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors text-sm">
                    {category.name}
                  </h4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
