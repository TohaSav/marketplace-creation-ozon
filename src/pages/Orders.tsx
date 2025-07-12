import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function Orders() {
  const { user } = useAuth();

  // Получаем заказы пользователя из localStorage
  const getUserOrders = () => {
    if (!user) return [];
    const orders = JSON.parse(
      localStorage.getItem(`orders_${user.id}`) || "[]",
    );
    return orders;
  };

  const orders = getUserOrders();

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Icon
                  name="Lock"
                  size={48}
                  className="text-gray-400 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Войдите в аккаунт
                </h2>
                <p className="text-gray-600 mb-4">
                  Чтобы просматривать заказы, нужно авторизоваться
                </p>
                <Link to="/login">
                  <Button>Войти в аккаунт</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Мои заказы</h1>
          <p className="text-gray-600">
            Здесь отображаются все ваши заказы и их текущий статус
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              История заказов
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
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
                {orders.map((order: any) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">Заказ {order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.statusText}
                        </span>
                        <p className="font-semibold mt-1">
                          {order.total.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded"></div>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              {item.price.toLocaleString()} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Повторить заказ
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Всего заказов</p>
                  <p className="text-xl font-semibold">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Доставлено</p>
                  <p className="text-xl font-semibold">
                    {orders.filter((o: any) => o.status === "delivered").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">В обработке</p>
                  <p className="text-xl font-semibold">
                    {
                      orders.filter((o: any) => o.status === "processing")
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
