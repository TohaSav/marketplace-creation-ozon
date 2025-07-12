import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface ReturnRequest {
  id: string;
  orderId: string;
  productName: string;
  reason: string;
  description: string;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
  amount: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
}

export default function ProductReturns() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [returnReason, setReturnReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserOrders();
      loadReturnRequests();
    }
  }, [user]);

  const loadUserOrders = () => {
    if (!user) return;
    const userOrders = JSON.parse(
      localStorage.getItem(`orders_${user.id}`) || "[]",
    );
    // Фильтруем заказы старше 1 дня для возможности возврата
    const eligibleOrders = userOrders.filter((order: Order) => {
      const orderDate = new Date(order.date);
      const daysSinceOrder =
        (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceOrder >= 0 && daysSinceOrder <= 14; // Возврат в течение 14 дней
    });
    setOrders(eligibleOrders);
  };

  const loadReturnRequests = () => {
    if (!user) return;
    const requests = JSON.parse(
      localStorage.getItem(`returns_${user.id}`) || "[]",
    );
    setReturnRequests(requests);
  };

  const handleSubmitReturn = () => {
    if (!user || !selectedOrder || !selectedProduct || !returnReason) {
      alert("Заполните все обязательные поля");
      return;
    }

    setLoading(true);

    const order = orders.find((o) => o.id === selectedOrder);
    const product = order?.items.find((item) => item.name === selectedProduct);

    if (!order || !product) {
      alert("Заказ или товар не найден");
      setLoading(false);
      return;
    }

    const returnRequest: ReturnRequest = {
      id: `return_${Date.now()}`,
      orderId: selectedOrder,
      productName: selectedProduct,
      reason: returnReason,
      description: description,
      status: "pending",
      createdAt: new Date().toISOString(),
      amount: product.total,
    };

    // Сохраняем заявку на возврат
    const updatedRequests = [...returnRequests, returnRequest];
    localStorage.setItem(`returns_${user.id}`, JSON.stringify(updatedRequests));
    setReturnRequests(updatedRequests);

    // Очищаем форму
    setSelectedOrder("");
    setSelectedProduct("");
    setReturnReason("");
    setDescription("");
    setLoading(false);

    alert(
      "Заявка на возврат успешно подана! Мы рассмотрим её в течение 3-5 рабочих дней.",
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            На рассмотрении
          </Badge>
        );
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Одобрено</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Отклонено</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Завершено</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getReturnReasons = () => [
    { value: "defect", label: "Товар бракованный/поврежден" },
    { value: "wrong-item", label: "Пришел не тот товар" },
    { value: "not-as-described", label: "Товар не соответствует описанию" },
    { value: "changed-mind", label: "Передумал покупать" },
    { value: "size-issue", label: "Не подошел размер" },
    { value: "quality-issue", label: "Низкое качество товара" },
    { value: "other", label: "Другая причина" },
  ];

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                Для подачи заявки на возврат необходимо авторизоваться
              </p>
              <Button onClick={() => (window.location.href = "/login")}>
                Войти в аккаунт
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Возврат товара
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Подайте заявку на возврат товара в течение 14 дней
            </p>
          </div>
          <Badge variant="outline" className="self-start sm:self-auto">
            Возврат в течение 14 дней
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="new-return" className="space-y-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="new-return" className="flex items-center gap-2">
              <Icon name="Plus" size={16} />
              Новый возврат
            </TabsTrigger>
            <TabsTrigger value="my-returns" className="flex items-center gap-2">
              <Icon name="History" size={16} />
              Мои заявки
              {returnRequests.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {returnRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* New Return Form */}
          <TabsContent value="new-return">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="RotateCcw" size={24} />
                  Подача заявки на возврат
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon
                      name="Package"
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Нет доступных заказов для возврата
                    </h3>
                    <p className="text-gray-600">
                      У вас нет заказов, которые можно вернуть. Возврат возможен
                      в течение 14 дней с момента покупки.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Выбор заказа */}
                    <div>
                      <Label htmlFor="order-select">Выберите заказ</Label>
                      <Select
                        value={selectedOrder}
                        onValueChange={setSelectedOrder}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите заказ для возврата" />
                        </SelectTrigger>
                        <SelectContent>
                          {orders.map((order) => (
                            <SelectItem key={order.id} value={order.id}>
                              Заказ #{order.id} от {order.date} -{" "}
                              {order.total.toLocaleString()} ₽
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Выбор товара */}
                    {selectedOrder && (
                      <div>
                        <Label htmlFor="product-select">Выберите товар</Label>
                        <Select
                          value={selectedProduct}
                          onValueChange={setSelectedProduct}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите товар для возврата" />
                          </SelectTrigger>
                          <SelectContent>
                            {orders
                              .find((o) => o.id === selectedOrder)
                              ?.items.map((item, index) => (
                                <SelectItem key={index} value={item.name}>
                                  {item.name} - {item.total.toLocaleString()} ₽
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Причина возврата */}
                    <div>
                      <Label htmlFor="reason-select">Причина возврата *</Label>
                      <Select
                        value={returnReason}
                        onValueChange={setReturnReason}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите причину возврата" />
                        </SelectTrigger>
                        <SelectContent>
                          {getReturnReasons().map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Описание */}
                    <div>
                      <Label htmlFor="description">
                        Дополнительное описание
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Опишите подробнее проблему с товаром..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmitReturn}
                      disabled={
                        loading ||
                        !selectedOrder ||
                        !selectedProduct ||
                        !returnReason
                      }
                      className="w-full sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Подача заявки...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={16} className="mr-2" />
                          Подать заявку на возврат
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon
                      name="Info"
                      size={20}
                      className="text-blue-600 mt-0.5"
                    />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        Условия возврата
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>
                          • Возврат возможен в течение 14 дней с момента покупки
                        </li>
                        <li>• Товар должен быть в оригинальной упаковке</li>
                        <li>• Рассмотрение заявки занимает 3-5 рабочих дней</li>
                        <li>
                          • Возврат средств осуществляется в течение 7-10 дней
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Returns */}
          <TabsContent value="my-returns">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Мои заявки на возврат
                </CardTitle>
              </CardHeader>
              <CardContent>
                {returnRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon
                      name="FileText"
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Нет заявок на возврат
                    </h3>
                    <p className="text-gray-600">
                      Вы еще не подавали заявки на возврат товаров
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {returnRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-900">
                                {request.productName}
                              </h3>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              Заказ: #{request.orderId}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              Причина:{" "}
                              {
                                getReturnReasons().find(
                                  (r) => r.value === request.reason,
                                )?.label
                              }
                            </p>
                            {request.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {request.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-400">
                              Подано:{" "}
                              {new Date(request.createdAt).toLocaleString(
                                "ru-RU",
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">
                              {request.amount.toLocaleString()} ₽
                            </p>
                            <p className="text-xs text-gray-500">К возврату</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
