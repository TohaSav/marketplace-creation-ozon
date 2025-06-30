import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";

const mockOrders = [
  {
    id: "12345",
    date: "2024-06-25",
    status: "delivered",
    total: 24999,
    items: [
      {
        name: "AirPods Pro 2-го поколения",
        price: 24999,
        image: "/placeholder.svg",
      },
    ],
  },
  {
    id: "12346",
    date: "2024-06-28",
    status: "shipping",
    total: 119999,
    items: [
      {
        name: "iPhone 15 Pro Max 256GB",
        price: 119999,
        image: "/placeholder.svg",
      },
    ],
  },
];

const mockBonusCard = {
  number: "4127 6543 2109 8765",
  balance: 2150,
  nextReward: 5000,
  progress: 43,
};

export default function BuyerDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipping":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Доставлен";
      case "shipping":
        return "В доставке";
      case "processing":
        return "Обрабатывается";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <p className="text-gray-600 mt-2">
            Управляйте своими заказами и настройками
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Мои заказы</TabsTrigger>
            <TabsTrigger value="bonus">Бонусная карта</TabsTrigger>
            <TabsTrigger value="favorites">Избранное</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="grid gap-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Заказ #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.date}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              ₽{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-semibold">
                          Итого: ₽{order.total.toLocaleString()}
                        </span>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon
                              name="MessageCircle"
                              size={16}
                              className="mr-1"
                            />
                            Связаться с продавцом
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="RotateCcw" size={16} className="mr-1" />
                            Вернуть товар
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bonus" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bonus Card */}
              <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Бонусная карта</span>
                    <Icon name="CreditCard" size={24} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-mono tracking-wider">
                      {mockBonusCard.number}
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Доступный баланс</p>
                      <p className="text-3xl font-bold">
                        ₽{mockBonusCard.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress to Next Reward */}
              <Card>
                <CardHeader>
                  <CardTitle>До следующей награды</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Прогресс</span>
                        <span>{mockBonusCard.progress}%</span>
                      </div>
                      <Progress
                        value={mockBonusCard.progress}
                        className="h-2"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Потратьте ещё ₽
                      {(
                        mockBonusCard.nextReward -
                        (mockBonusCard.nextReward * mockBonusCard.progress) /
                          100
                      ).toLocaleString()}
                      для получения дополнительных бонусов
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Избранные товары</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Icon
                    name="Heart"
                    size={48}
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-500">Пока нет избранных товаров</p>
                  <Button className="mt-4" variant="outline">
                    Перейти к покупкам
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Имя</label>
                      <p className="text-gray-900">Иван Петров</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-gray-900">ivan@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Телефон</label>
                      <p className="text-gray-900">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Адреса доставки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Домашний адрес</p>
                      <p className="text-sm text-gray-600">
                        г. Москва, ул. Ленина, д. 10, кв. 5
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить адрес
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
