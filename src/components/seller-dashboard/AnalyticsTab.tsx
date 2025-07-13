import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Моковые данные для демонстрации
  const analyticsData = {
    sales: {
      current: 125000,
      previous: 98000,
      growth: 27.6
    },
    orders: {
      current: 87,
      previous: 64,
      growth: 35.9
    },
    products: {
      bestseller: "iPhone 15 Pro Max",
      worstSeller: "Наушники XYZ",
      totalViews: 15420
    },
    customers: {
      new: 23,
      returning: 41,
      total: 64
    }
  };

  const salesByDay = [
    { day: "Пн", sales: 15000, orders: 12 },
    { day: "Вт", sales: 22000, orders: 18 },
    { day: "Ср", sales: 18000, orders: 14 },
    { day: "Чт", sales: 28000, orders: 21 },
    { day: "Пт", sales: 32000, orders: 15 },
    { day: "Сб", sales: 35000, orders: 25 },
    { day: "Вс", sales: 28000, orders: 19 }
  ];

  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 45000, units: 15, growth: 12.5 },
    { name: "Samsung Galaxy S24", sales: 32000, units: 8, growth: -5.2 },
    { name: "MacBook Air M2", sales: 28000, units: 4, growth: 8.1 },
    { name: "iPad Air", sales: 20000, units: 10, growth: 15.3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header с фильтрами */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Аналитика продаж</h2>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="quarter">За квартал</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Продажи</p>
                <p className="text-2xl font-bold">₽{analyticsData.sales.current.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                +{analyticsData.sales.growth}%
              </Badge>
              <span className="text-sm text-gray-600 ml-2">к прошлому периоду</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Заказы</p>
                <p className="text-2xl font-bold">{analyticsData.orders.current}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                +{analyticsData.orders.growth}%
              </Badge>
              <span className="text-sm text-gray-600 ml-2">к прошлому периоду</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Просмотры</p>
                <p className="text-2xl font-bold">{analyticsData.products.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                +18.5%
              </Badge>
              <span className="text-sm text-gray-600 ml-2">к прошлому периоду</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Конверсия</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name="Target" size={24} className="text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                +0.8%
              </Badge>
              <span className="text-sm text-gray-600 ml-2">к прошлому периоду</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График продаж по дням */}
      <Card>
        <CardHeader>
          <CardTitle>Продажи по дням</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {salesByDay.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-200 rounded-t-sm relative" style={{ height: '200px' }}>
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm absolute bottom-0"
                    style={{ height: `${(day.sales / 35000) * 100}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                    ₽{(day.sales / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 mt-2">{day.day}</div>
                <div className="text-xs text-gray-500">{day.orders} заказов</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Топ товары */}
        <Card>
          <CardHeader>
            <CardTitle>Топ товары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.units} продано</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₽{product.sales.toLocaleString()}</div>
                    <div className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Клиенты */}
        <Card>
          <CardHeader>
            <CardTitle>Анализ клиентов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analyticsData.customers.new}</div>
                  <div className="text-sm text-gray-600">Новые клиенты</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.customers.returning}</div>
                  <div className="text-sm text-gray-600">Повторные</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Новые клиенты</span>
                  <span>{((analyticsData.customers.new / analyticsData.customers.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(analyticsData.customers.new / analyticsData.customers.total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Повторные клиенты</span>
                  <span>{((analyticsData.customers.returning / analyticsData.customers.total) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(analyticsData.customers.returning / analyticsData.customers.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}