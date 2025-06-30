import Icon from "@/components/ui/icon";
import AdminLayout from "@/components/AdminLayout";

const stats = [
  {
    name: "Общая выручка",
    value: "2,847,293 ₽",
    change: "+12.5%",
    changeType: "increase",
  },
  {
    name: "Новые заказы",
    value: "1,247",
    change: "+8.2%",
    changeType: "increase",
  },
  {
    name: "Количество товаров",
    value: "12,847",
    change: "+2.1%",
    changeType: "increase",
  },
  {
    name: "Количество пользователей",
    value: "8,429",
    change: "+15.3%",
    changeType: "increase",
  },
];

const recentOrders = [
  {
    id: "12847",
    customer: "Иван Петров",
    product: "iPhone 15 Pro Max",
    amount: "119,990 ₽",
    status: "Обрабатывается",
  },
  {
    id: "12846",
    customer: "Мария Сидорова",
    product: "Samsung Galaxy S24",
    amount: "89,990 ₽",
    status: "Доставляется",
  },
  {
    id: "12845",
    customer: "Алексей Козлов",
    product: "MacBook Air M3",
    amount: "149,990 ₽",
    status: "Завершен",
  },
  {
    id: "12844",
    customer: "Ольга Новикова",
    product: "AirPods Pro",
    amount: "24,990 ₽",
    status: "Завершен",
  },
  {
    id: "12843",
    customer: "Дмитрий Волков",
    product: "Клавиатура Magic",
    amount: "12,990 ₽",
    status: "Отменен",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Завершен":
      return "bg-green-100 text-green-800";
    case "Обрабатывается":
      return "bg-yellow-100 text-yellow-800";
    case "Доставляется":
      return "bg-blue-100 text-blue-800";
    case "Отменен":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Дашборд
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Общая статистика маркетплейса
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт отчета
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <div
                    className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } md:mt-2 lg:mt-0`}
                  >
                    <Icon
                      name={
                        stat.changeType === "increase" ? "ArrowUp" : "ArrowDown"
                      }
                      size={12}
                      className="mr-0.5"
                    />
                    {stat.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Последние заказы */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-lg font-medium text-gray-900">
                  Последние заказы
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Список последних заказов с возможностью отслеживания
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                  Посмотреть все
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          № Заказа
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Клиент
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Товар
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Сумма
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Статус
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            #{order.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {order.product}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {order.amount}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="Plus" size={24} className="text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Добавить товар
                    </dt>
                    <dd className="text-sm text-gray-900">
                      Создать новый товар в каталоге
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button className="font-medium text-purple-600 hover:text-purple-500">
                  Перейти к созданию
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="Users" size={24} className="text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Управление пользователями
                    </dt>
                    <dd className="text-sm text-gray-900">
                      Просмотр и редактирование пользователей
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button className="font-medium text-blue-600 hover:text-blue-500">
                  Открыть список
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="BarChart3" size={24} className="text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Отчеты
                    </dt>
                    <dd className="text-sm text-gray-900">
                      Подробная аналитика продаж
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button className="font-medium text-green-600 hover:text-green-500">
                  Посмотреть отчеты
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
