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
        {userStats.ordersCount === 0 ? (
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
            {/* Здесь будут отображаться реальные заказы пользователя */}
            <div className="text-center py-8">
              <Icon
                name="Package"
                size={48}
                className="text-gray-400 mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Заказы появятся здесь
              </h3>
              <p className="text-gray-500 mb-4">
                После совершения покупок ваши заказы будут отображаться на этой
                странице
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
