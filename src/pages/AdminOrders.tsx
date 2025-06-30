import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: string;
}

// Пустой массив заказов - данные будут загружаться с сервера
const initialOrders: Order[] = [];

const statusLabels = {
  pending: "Ожидает",
  processing: "Обрабатывается",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.includes(searchTerm) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus as Order["status"] }
          : order,
      ),
    );
    toast({
      title: "Статус заказа обновлён",
      description: `Заказ #${orderId} теперь имеет статус: ${statusLabels[newStatus as keyof typeof statusLabels]}`,
    });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              Управление заказами
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Обработка и отслеживание всех заказов
            </p>
          </div>
        </div>

        {/* Фильтры */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск
              </label>
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Номер заказа, имя клиента..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Все статусы</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Таблица заказов */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Заказ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Icon
                          name="ShoppingCart"
                          size={48}
                          className="text-gray-400 mb-4"
                        />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Пока нет заказов
                        </h3>
                        <p className="text-gray-500">
                          Заказы будут отображаться здесь, когда они появятся
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.products.length} товар(ов)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.totalAmount.toLocaleString()} ₽
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`text-xs font-medium rounded-full px-2 py-1 border-none focus:ring-2 focus:ring-purple-500 ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {Object.entries(statusLabels).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ),
                          )}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Модальное окно деталей заказа */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Детали заказа #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Информация о клиенте */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Информация о клиенте
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Имя:</span>
                        <p className="text-gray-900">
                          {selectedOrder.customerName}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>
                        <p className="text-gray-900">
                          {selectedOrder.customerEmail}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Телефон:
                        </span>
                        <p className="text-gray-900">
                          {selectedOrder.customerPhone}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Способ оплаты:
                        </span>
                        <p className="text-gray-900">
                          {selectedOrder.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Адрес доставки */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Адрес доставки
                    </h4>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                      {selectedOrder.deliveryAddress}
                    </p>
                  </div>

                  {/* Состав заказа */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Состав заказа
                    </h4>
                    <div className="space-y-3">
                      {selectedOrder.products.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              Количество: {product.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {(
                                product.price * product.quantity
                              ).toLocaleString()}{" "}
                              ₽
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.price.toLocaleString()} ₽ за шт.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Итог */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">
                        Итого:
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {selectedOrder.totalAmount.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  {/* Статус и дата */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Статус: </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          selectedOrder.status,
                        )}`}
                      >
                        {statusLabels[selectedOrder.status]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Дата заказа: {formatDate(selectedOrder.orderDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
