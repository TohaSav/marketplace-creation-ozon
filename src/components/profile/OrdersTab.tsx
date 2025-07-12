import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStats } from "@/types/profile.types";

interface OrdersTabProps {
  userStats: UserStats;
}

export default function OrdersTab({ userStats }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Package" size={20} />
          Мои заказы
        </CardTitle>
      </CardHeader>
      <CardContent>
        {false ? (
          <div className="text-center py-12">
            <Icon
              name="Package"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              У вас пока нет заказов
            </h3>
            <p className="text-gray-500 mb-4">
              Заказы будут отображаться здесь после ваших покупок
            </p>
            <Link to="/">
              <Button>Перейти к покупкам</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Мокап заказов для демонстрации */}
            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">Заказ #12345</h4>
                  <p className="text-sm text-gray-600">от 15 января 2024</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Доставлен
                  </span>
                  <p className="font-semibold mt-1">3 450 ₽</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Смартфон Samsung Galaxy S23
                    </p>
                    <p className="text-xs text-gray-600">2 200 ₽</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">Чехол для телефона</p>
                    <p className="text-xs text-gray-600">1 250 ₽</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Повторить заказ
                </Button>
                <Button variant="outline" size="sm">
                  Детали заказа
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">Заказ #12346</h4>
                  <p className="text-sm text-gray-600">от 10 января 2024</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    В пути
                  </span>
                  <p className="font-semibold mt-1">1 890 ₽</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">Беспроводные наушники</p>
                    <p className="text-xs text-gray-600">1 890 ₽</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Отследить заказ
                </Button>
                <Button variant="outline" size="sm">
                  Детали заказа
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
