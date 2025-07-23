import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function SecurityInfo() {
  const navigate = useNavigate();

  return (
    <>
      {/* Информация об оплате */}
      <Card className="max-w-5xl mx-auto shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Icon name="Shield" size={28} className="mr-3 text-green-500" />
            Безопасная оплата
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Icon
                  name="Lock"
                  size={40}
                  className="text-blue-600"
                />
              </div>
              <h3 className="font-bold text-lg">Защищенные платежи</h3>
              <p className="text-gray-600">
                Все платежи обрабатываются через ЮКассу с SSL-шифрованием
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Icon
                  name="RefreshCw"
                  size={40}
                  className="text-green-600"
                />
              </div>
              <h3 className="font-bold text-lg">Автопродление</h3>
              <p className="text-gray-600">
                Подписка автоматически продлевается в конце периода
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Icon
                  name="HeadphonesIcon"
                  size={40}
                  className="text-purple-600"
                />
              </div>
              <h3 className="font-bold text-lg">Поддержка 24/7</h3>
              <p className="text-gray-600">
                Техническая поддержка доступна круглосуточно
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кнопка возврата */}
      <div className="text-center mt-12">
        <Button
          variant="outline"
          onClick={() => navigate("/seller/dashboard")}
          className="px-8 py-3 text-lg border-2 hover:bg-gray-50"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Вернуться в кабинет
        </Button>
      </div>
    </>
  );
}