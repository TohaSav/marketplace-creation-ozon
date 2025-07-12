import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface AccessDeniedProps {
  type: "subscription" | "status";
  reason?: string;
}

export default function AccessDenied({ type, reason }: AccessDeniedProps) {
  const navigate = useNavigate();

  if (type === "subscription") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Icon name="AlertTriangle" size={64} className="text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Невозможно добавить товар
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 text-lg mb-6">{reason}</p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/seller/tariffs")}
                className="bg-red-600 hover:bg-red-700"
              >
                <Icon name="CreditCard" size={16} className="mr-2" />
                Выбрать тариф
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/seller/dashboard")}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться в кабинет
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Icon name="Lock" size={64} className="text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Доступ ограничен
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-lg mb-6">
            Добавление товаров доступно только после подтверждения вашего
            профиля администрацией.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/seller/dashboard")}
              variant="outline"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к кабинету
            </Button>
            <br />
            <Button
              onClick={() => navigate("/notifications")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Icon name="Bell" size={16} className="mr-2" />
              Проверить уведомления
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
