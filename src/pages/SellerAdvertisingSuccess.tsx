import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

export default function SellerAdvertisingSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [advertising, setAdvertising] = useState<any>(null);

  useEffect(() => {
    const advertisingId = searchParams.get("id");
    if (advertisingId) {
      // Активируем рекламу после успешной оплаты
      const existingRequests = JSON.parse(
        localStorage.getItem("advertising-requests") || "[]",
      );

      const updatedRequests = existingRequests.map((req: any) => {
        if (req.id.toString() === advertisingId) {
          return { ...req, status: "active" };
        }
        return req;
      });

      localStorage.setItem(
        "advertising-requests",
        JSON.stringify(updatedRequests),
      );

      const activeAd = updatedRequests.find(
        (req: any) => req.id.toString() === advertisingId,
      );
      setAdvertising(activeAd);

      toast({
        title: "Оплата прошла успешно!",
        description: "Ваша реклама уже размещена на главной странице",
      });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Обработка платежа...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Icon name="CheckCircle" size={64} className="text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Реклама успешно размещена!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {advertising && (
            <div className="space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  Детали размещения:
                </h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p>
                    <strong>Магазин:</strong> {advertising.shopName}
                  </p>
                  <p>
                    <strong>Длительность:</strong> {advertising.duration} дней
                  </p>
                  <p>
                    <strong>Стоимость:</strong> {advertising.price} ₽
                  </p>
                  <p>
                    <strong>Статус:</strong> Активна
                  </p>
                  <p>
                    <strong>Истекает:</strong>{" "}
                    {new Date(advertising.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Что происходит дальше:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Ваша реклама уже показывается на главной странице</li>
                  <li>📊 Баннер ротируется каждые 3 секунды</li>
                  <li>👥 Пользователи могут кликать по баннеру</li>
                  <li>📈 Ожидайте увеличения трафика в ваш магазин</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть на главной странице
                </Button>
                <Button
                  onClick={() => navigate("/seller/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  Вернуться в кабинет
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
