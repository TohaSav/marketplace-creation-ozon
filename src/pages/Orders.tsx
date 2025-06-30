import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Orders() {
  const [orders] = useState([
    {
      id: "#12345",
      date: "2024-06-28",
      status: "delivered",
      statusText: "Доставлен",
      total: 2450,
      items: [
        { name: "Смартфон iPhone 15", price: 89990, quantity: 1 },
        { name: "Чехол прозрачный", price: 1200, quantity: 2 },
      ],
    },
    {
      id: "#12344",
      date: "2024-06-25",
      status: "processing",
      statusText: "В обработке",
      total: 15600,
      items: [
        { name: "Наушники AirPods Pro", price: 24990, quantity: 1 },
        { name: "Кабель Lightning 2м", price: 2800, quantity: 1 },
      ],
    },
    {
      id: "#12343",
      date: "2024-06-20",
      status: "cancelled",
      statusText: "Отменён",
      total: 8900,
      items: [
        { name: "Портативная батарея 20000mAh", price: 4500, quantity: 2 },
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return "CheckCircle";
      case "processing":
        return "Clock";
      case "cancelled":
        return "XCircle";
      default:
        return "Package";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться в магазин
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Мои заказы</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Icon
              name="Package"
              size={48}
              className="mx-auto mb-4 text-gray-400"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Пока нет заказов
            </h2>
            <p className="text-gray-600 mb-4">
              Оформите первый заказ и он появится здесь
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold mr-4">
                      Заказ {order.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      <Icon
                        name={getStatusIcon(order.status)}
                        size={14}
                        className="inline mr-1"
                      />
                      {order.statusText}
                    </span>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {order.date}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Количество: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {item.price.toLocaleString()} ₽
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button className="text-green-600 hover:text-green-700 font-medium">
                        Подробнее
                      </button>
                      {order.status === "delivered" && (
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Повторить заказ
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Отменить
                        </button>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        Итого: {order.total.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Статистика */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Статистика заказов</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-600">Доставленных</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">В обработке</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {orders
                  .reduce((sum, order) => sum + order.total, 0)
                  .toLocaleString()}{" "}
                ₽
              </div>
              <div className="text-sm text-gray-600">Общая сумма</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
