import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import CreateStoryModal from "@/components/CreateStoryModal";
import SellerWallet from "@/components/SellerWallet";

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 119999,
    stock: 15,
    sold: 23,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "AirPods Pro 2-го поколения",
    price: 24999,
    stock: 8,
    sold: 45,
    status: "active",
    image: "/placeholder.svg",
  },
];

const mockOrders = [
  {
    id: "12345",
    customerName: "Иван Петров",
    product: "iPhone 15 Pro Max",
    amount: 119999,
    status: "new",
    date: "2024-06-30",
  },
  {
    id: "12346",
    customerName: "Мария Сидорова",
    product: "AirPods Pro",
    amount: 24999,
    status: "shipped",
    date: "2024-06-29",
  },
];

const mockStats = {
  totalSales: 2450000,
  ordersCount: 156,
  productsCount: 23,
  rating: 4.8,
  balance: 850000,
};

export default function SellerDashboard() {
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [stories, setStories] = useState<any[]>([]);

  const handleCreateStory = (storyData: any) => {
    const newStory = {
      id: stories.length + 1,
      ...storyData,
      createdAt: new Date().toISOString(),
    };
    setStories([...stories, newStory]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Новый";
      case "shipped":
        return "Отправлен";
      case "delivered":
        return "Доставлен";
      case "cancelled":
        return "Отменён";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Кабинет продавца</h1>
          <p className="text-gray-600 mt-2">
            Управляйте своим магазином и товарами
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Общие продажи</p>
                  <p className="text-2xl font-bold">
                    ₽{mockStats.totalSales.toLocaleString()}
                  </p>
                </div>
                <Icon name="TrendingUp" className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Заказы</p>
                  <p className="text-2xl font-bold">{mockStats.ordersCount}</p>
                </div>
                <Icon name="Package" className="text-blue-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Товары</p>
                  <p className="text-2xl font-bold">
                    {mockStats.productsCount}
                  </p>
                </div>
                <Icon name="Box" className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Рейтинг</p>
                  <p className="text-2xl font-bold flex items-center">
                    {mockStats.rating}
                    <Icon
                      name="Star"
                      className="text-yellow-500 fill-current ml-1"
                      size={20}
                    />
                  </p>
                </div>
                <Icon name="Award" className="text-yellow-500" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Баланс</p>
                  <p className="text-2xl font-bold">
                    ₽{mockStats.balance.toLocaleString()}
                  </p>
                </div>
                <Icon name="Wallet" className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="products">Мои товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="wallet">Кошелёк</TabsTrigger>
            <TabsTrigger value="finances">Финансы</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Мои товары</CardTitle>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить товар
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Товар</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Остаток</TableHead>
                      <TableHead>Продано</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>₽{product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sold}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Активный
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Новые заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ Заказа</TableHead>
                      <TableHead>Покупатель</TableHead>
                      <TableHead>Товар</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>₽{order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Обработать
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="MessageCircle" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="mt-6">
            <SellerWallet />
          </TabsContent>

          <TabsContent value="finances" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Доход за месяц</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-green-600">
                      ₽{(mockStats.totalSales * 0.3).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">
                      +12% к прошлому месяцу
                    </p>
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
                    <div className="text-3xl font-bold text-blue-600">3.2%</div>
                    <p className="text-sm text-gray-600">
                      Покупки от просмотров
                    </p>
                    <div className="flex items-center text-blue-600">
                      <Icon name="Users" size={16} className="mr-1" />
                      <span className="text-sm">15,420 просмотров</span>
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
                      ₽
                      {Math.round(
                        mockStats.totalSales / mockStats.ordersCount,
                      ).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">На один заказ</p>
                    <div className="flex items-center text-purple-600">
                      <Icon name="ShoppingCart" size={16} className="mr-1" />
                      <span className="text-sm">
                        {mockStats.ordersCount} заказов
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* График продаж */}
            <Card className="mt-6">
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
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Stories товаров</CardTitle>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setIsCreateStoryOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать Story
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {stories.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon
                      name="Camera"
                      size={48}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <p className="text-gray-500">Пока нет созданных Stories</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Создавайте Stories для привлечения покупателей
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {stories.map((story) => (
                      <Card key={story.id} className="overflow-hidden">
                        <div className="aspect-[9/16] relative">
                          <img
                            src={
                              story.image
                                ? URL.createObjectURL(story.image)
                                : "/placeholder.svg"
                            }
                            alt="Story"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                setStories(
                                  stories.filter((s) => s.id !== story.id),
                                )
                              }
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-gray-600 truncate">
                            Товар ID: {story.productId}
                          </p>
                          {story.discount && (
                            <Badge className="text-xs mt-1">
                              Скидка {story.discount}%
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки магазина</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Название магазина
                      </label>
                      <p className="text-gray-900">Apple Store Official</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Статус</label>
                      <div className="flex items-center">
                        <Badge className="bg-blue-100 text-blue-800 mr-2">
                          Подтверждён
                        </Badge>
                        <Icon
                          name="CheckCircle"
                          className="text-blue-500"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateStoryModal
        isOpen={isCreateStoryOpen}
        onClose={() => setIsCreateStoryOpen(false)}
        onSubmit={handleCreateStory}
      />
    </div>
  );
}
