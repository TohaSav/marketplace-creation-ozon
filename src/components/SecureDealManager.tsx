import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface SecureDeal {
  id: string;
  productName: string;
  buyerName: string;
  amount: number;
  status: "pending" | "confirmed" | "delivered" | "completed" | "disputed";
  createdAt: string;
}

const mockDeals: SecureDeal[] = [
  {
    id: "SD001",
    productName: "Sony WH-1000XM5 Наушники беспроводные",
    buyerName: "Алексей Иванов",
    amount: 24990,
    status: "pending",
    createdAt: "2024-03-07T10:30:00Z",
  },
  {
    id: "SD002",
    productName: "Samsung Galaxy S24 Ultra 512GB",
    buyerName: "Мария Петрова",
    amount: 119990,
    status: "confirmed",
    createdAt: "2024-03-06T14:20:00Z",
  },
  {
    id: "SD003",
    productName: "iPhone 15 Pro Max 256GB",
    buyerName: "Дмитрий Сидоров",
    amount: 89990,
    status: "delivered",
    createdAt: "2024-03-05T09:15:00Z",
  },
];

const getStatusInfo = (status: SecureDeal["status"]) => {
  const statusMap = {
    pending: { color: "bg-yellow-500", text: "Ожидает подтверждения", icon: "Clock" as const },
    confirmed: { color: "bg-blue-500", text: "Подтверждена", icon: "CheckCircle" as const },
    delivered: { color: "bg-green-500", text: "Доставлена", icon: "Truck" as const },
    completed: { color: "bg-gray-500", text: "Завершена", icon: "Check" as const },
    disputed: { color: "bg-red-500", text: "Спор", icon: "AlertTriangle" as const },
  };
  return statusMap[status];
};

export default function SecureDealManager() {
  const handleConfirmDelivery = (dealId: string) => {
    console.log("Подтверждение доставки:", dealId);
    // Здесь будет логика подтверждения доставки
  };

  const handleCompleteTransaction = (dealId: string) => {
    console.log("Завершение сделки:", dealId);
    // Здесь будет логика завершения сделки и перевода денег
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Безопасные сделки</h2>
        <div className="text-sm text-gray-600">
          {mockDeals.length} активных сделок
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockDeals.map((deal) => {
          const statusInfo = getStatusInfo(deal.status);
          return (
            <Card key={deal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{deal.productName}</CardTitle>
                  <Badge className={`${statusInfo.color} text-white`}>
                    <Icon name={statusInfo.icon} size={12} className="mr-1" />
                    {statusInfo.text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} className="text-gray-500" />
                      <span>Покупатель: {deal.buyerName}</span>
                    </div>
                    <div className="font-semibold text-green-600">
                      {deal.amount.toLocaleString("ru-RU")} ₽
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon name="Calendar" size={14} />
                    <span>
                      Создана: {new Date(deal.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Shield" size={14} className="text-blue-600" />
                    <span className="text-blue-700">
                      ID сделки: {deal.id}
                    </span>
                  </div>

                  {/* Action buttons based on status */}
                  <div className="flex space-x-2 pt-2">
                    {deal.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmDelivery(deal.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Icon name="CheckCircle" size={14} className="mr-1" />
                        Подтвердить отправку
                      </Button>
                    )}
                    
                    {deal.status === "delivered" && (
                      <Button
                        size="sm"
                        onClick={() => handleCompleteTransaction(deal.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="DollarSign" size={14} className="mr-1" />
                        Получить оплату
                      </Button>
                    )}

                    <Button variant="outline" size="sm">
                      <Icon name="MessageSquare" size={14} className="mr-1" />
                      Чат с покупателем
                    </Button>
                  </div>

                  {/* Deal explanation */}
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <div className="flex items-start space-x-2">
                      <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                      <div className="text-blue-800">
                        {deal.status === "pending" && (
                          <p>Средства заморожены до подтверждения отправки товара покупателю.</p>
                        )}
                        {deal.status === "confirmed" && (
                          <p>Товар отправлен. Средства будут переведены после получения покупателем.</p>
                        )}
                        {deal.status === "delivered" && (
                          <p>Покупатель получил товар. Нажмите "Получить оплату" для завершения сделки.</p>
                        )}
                        {deal.status === "completed" && (
                          <p>Сделка завершена. Средства переведены на ваш счет.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Как работают безопасные сделки?
              </h3>
              <div className="space-y-2 text-blue-800">
                <p className="flex items-start space-x-2">
                  <Icon name="Circle" size={6} className="mt-2" />
                  <span>Деньги блокируются на счете покупателя при заказе</span>
                </p>
                <p className="flex items-start space-x-2">
                  <Icon name="Circle" size={6} className="mt-2" />
                  <span>Вы отправляете товар и подтверждаете отправку</span>
                </p>
                <p className="flex items-start space-x-2">
                  <Icon name="Circle" size={6} className="mt-2" />
                  <span>После получения товара покупателем средства переводятся вам</span>
                </p>
                <p className="flex items-start space-x-2">
                  <Icon name="Circle" size={6} className="mt-2" />
                  <span>Защита от мошенничества для обеих сторон</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}