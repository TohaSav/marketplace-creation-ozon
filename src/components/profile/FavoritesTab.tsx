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
        {false ? (
          <div className="text-center py-8">
            <Icon
              name="Heart"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Список избранного пуст
            </h3>
            <p className="text-gray-500 mb-4">
              Добавляйте товары в избранное, чтобы не потерять их
            </p>
            <Link to="/">
              <Button>Перейти к покупкам</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Мокап избранных товаров */}
            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-sm mb-1">
                Смартфон iPhone 15 Pro
              </h3>
              <p className="text-gray-600 text-xs mb-2">128GB, Титановый</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">89 990 ₽</span>
                <Button size="sm" variant="outline">
                  <Icon name="ShoppingCart" size={14} className="mr-1" />В
                  корзину
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-red-500 hover:text-red-600"
              >
                <Icon name="Heart" size={14} className="mr-1 fill-current" />
                Убрать из избранного
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-sm mb-1">MacBook Air M2</h3>
              <p className="text-gray-600 text-xs mb-2">13", 8GB, 256GB SSD</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">129 990 ₽</span>
                <Button size="sm" variant="outline">
                  <Icon name="ShoppingCart" size={14} className="mr-1" />В
                  корзину
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-red-500 hover:text-red-600"
              >
                <Icon name="Heart" size={14} className="mr-1 fill-current" />
                Убрать из избранного
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-sm mb-1">AirPods Pro 2</h3>
              <p className="text-gray-600 text-xs mb-2">с чехлом MagSafe</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">24 990 ₽</span>
                <Button size="sm" variant="outline">
                  <Icon name="ShoppingCart" size={14} className="mr-1" />В
                  корзину
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-red-500 hover:text-red-600"
              >
                <Icon name="Heart" size={14} className="mr-1 fill-current" />
                Убрать из избранного
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Icon name="Image" size={32} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-sm mb-1">
                Samsung Galaxy Watch 6
              </h3>
              <p className="text-gray-600 text-xs mb-2">44mm, Silver</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">29 990 ₽</span>
                <Button size="sm" variant="outline">
                  <Icon name="ShoppingCart" size={14} className="mr-1" />В
                  корзину
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-red-500 hover:text-red-600"
              >
                <Icon name="Heart" size={14} className="mr-1 fill-current" />
                Убрать из избранного
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
