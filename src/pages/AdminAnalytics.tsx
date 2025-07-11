import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";

// Пустые массивы для аналитики - данные будут загружаться с сервера
const salesData: {
  period: string;
  sales: number;
  orders: number;
  users: number;
}[] = [];
const topProducts: { name: string; sales: number; revenue: number }[] = [];
const topCategories: { name: string; percentage: number; sales: number }[] = [];

export default function AdminAnalytics() {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalUsers = salesData.reduce((sum, item) => sum + item.users, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Аналитика
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Подробная статистика продаж и адалитика маркетплейса
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0 space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Icon name="Calendar" size={16} className="mr-2" />
              Последние 30 дней
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </button>
          </div>
        </div>

        {/* Основная статистика */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon
                    name="DollarSign"
                    size={24}
                    className="text-green-600"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Общая выручка
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalRevenue.toLocaleString()} ₽
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon
                    name="ShoppingCart"
                    size={24}
                    className="text-blue-600"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Общее количество заказов
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalOrders}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="Users" size={24} className="text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Новые пользователи
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalUsers}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon
                    name="TrendingUp"
                    size={24}
                    className="text-orange-600"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Средний чек
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {Math.round(avgOrderValue).toLocaleString()} ₽
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* График продаж */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Динамика продаж
              </h3>
              <Icon name="BarChart3" size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {salesData.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    name="BarChart3"
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <p className="text-gray-500">Нет данных по продажам</p>
                </div>
              ) : (
                salesData.map((item, index) => {
                  const maxSales = Math.max(...salesData.map((d) => d.sales));
                  const percentage = (item.sales / maxSales) * 100;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900 w-16">
                          {item.period}
                        </span>
                        <div className="flex-1">
                          <div className="bg-gray-200 rounded-full h-2 w-32">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {item.sales.toLocaleString()} ₽
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.orders} заказов
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Топ товаров */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Топ товаров</h3>
              <Icon name="Package" size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {topProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    name="Package"
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <p className="text-gray-500">Нет данных по товарам</p>
                </div>
              ) : (
                topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.sales} продаж
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {product.revenue.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Категории товаров */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Продажи по категориям
            </h3>
            <Icon name="PieChart" size={20} className="text-gray-400" />
          </div>
          {topCategories.length === 0 ? (
            <div className="text-center py-8 col-span-full">
              <Icon
                name="PieChart"
                size={48}
                className="text-gray-400 mx-auto mb-4"
              />
              <p className="text-gray-500">Нет данных по категориям</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topCategories.map((category, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-20 h-20 relative mb-2">
                    <svg
                      className="w-20 h-20 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#8b5cf6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${category.percentage * 2.51} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-900">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.sales.toLocaleString()} ₽
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Отчёты */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Отчёты</h3>
            <Icon name="FileText" size={20} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Icon
                name="Download"
                size={20}
                className="text-purple-600 mr-3"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  Отчёт по продажам
                </div>
                <div className="text-xs text-gray-500">
                  Подробная статистика продаж
                </div>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Icon name="Users" size={20} className="text-blue-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  Отчёт по клиентам
                </div>
                <div className="text-xs text-gray-500">
                  Анализ поведения пользователей
                </div>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Icon name="Package" size={20} className="text-green-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  Отчёт по товарам
                </div>
                <div className="text-xs text-gray-500">
                  Статистика по категориям
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
