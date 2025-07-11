import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FavoritesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Heart" size={20} />
          Избранное
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Демонстрационные товары в избранном */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="relative">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                <Icon name="Heart" size={16} className="text-red-500" />
              </button>
            </div>
            <h4 className="font-medium mb-2">iPhone 15 Pro</h4>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">89 990 ₽</p>
                <span className="text-sm text-red-600 line-through">
                  99 990 ₽
                </span>
              </div>
              <span className="text-sm text-red-600">-10%</span>
            </div>
            <Button className="w-full" size="sm">
              В корзину
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            <div className="relative">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                <Icon name="Heart" size={16} className="text-red-500" />
              </button>
            </div>
            <h4 className="font-medium mb-2">MacBook Air M2</h4>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">124 990 ₽</p>
                <span className="text-sm text-red-600 line-through">
                  129 990 ₽
                </span>
              </div>
              <span className="text-sm text-red-600">-4%</span>
            </div>
            <Button className="w-full" size="sm">
              В корзину
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            <div className="relative">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
                <Icon name="Heart" size={16} className="text-red-500" />
              </button>
            </div>
            <h4 className="font-medium mb-2">AirPods Pro</h4>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">24 990 ₽</p>
                <span className="text-sm text-red-600 line-through">
                  29 990 ₽
                </span>
              </div>
              <span className="text-sm text-red-600">-17%</span>
            </div>
            <Button className="w-full" size="sm">
              В корзину
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">
            Нравится что-то еще? Продолжайте изучать наш каталог
          </p>
          <Link to="/">
            <Button variant="outline">Перейти к покупкам</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
