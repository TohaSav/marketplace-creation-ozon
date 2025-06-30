import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerStats } from "@/types/seller-dashboard.types";
import {
  calculateAverageOrderValue,
  formatCurrency,
} from "@/utils/seller-dashboard.utils";

interface FinancesTabProps {
  stats: SellerStats;
}

export default function FinancesTab({ stats }: FinancesTabProps) {
  const monthlyIncome = Math.round(stats.totalSales * 0.3);
  const conversionRate = 3.2;
  const totalViews = 15420;
  const averageOrderValue = calculateAverageOrderValue(
    stats.totalSales,
    stats.ordersCount,
  );

  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Доход за месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(monthlyIncome)}
              </div>
              <p className="text-sm text-gray-600">+12% к прошлому месяцу</p>
              <div className="flex items-center text-green-600">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                <span className="text-sm">Рост продаж</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Конверсия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">
                {conversionRate}%
              </div>
              <p className="text-sm text-gray-600">Покупки от просмотров</p>
              <div className="flex items-center text-blue-600">
                <Icon name="Users" size={16} className="mr-1" />
                <span className="text-sm">
                  {totalViews.toLocaleString()} просмотров
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Средний чек</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(Math.round(averageOrderValue))}
              </div>
              <p className="text-sm text-gray-600">На один заказ</p>
              <div className="flex items-center text-purple-600">
                <Icon name="ShoppingCart" size={16} className="mr-1" />
                <span className="text-sm">{stats.ordersCount} заказов</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График продаж */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика продаж</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <Icon name="BarChart3" size={48} className="mx-auto mb-4" />
              <p>График продаж будет доступен в следующем обновлении</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
