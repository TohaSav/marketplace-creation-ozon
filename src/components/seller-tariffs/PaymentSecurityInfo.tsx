import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function PaymentSecurityInfo() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Shield" size={24} className="mr-2 text-green-500" />
          Безопасная оплата
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Icon
              name="Lock"
              size={32}
              className="mx-auto mb-2 text-blue-500"
            />
            <h3 className="font-semibold mb-1">Защищенные платежи</h3>
            <p className="text-sm text-gray-600">
              Все платежи обрабатываются через ЮКассу с SSL-шифрованием
            </p>
          </div>
          <div>
            <Icon
              name="RefreshCw"
              size={32}
              className="mx-auto mb-2 text-green-500"
            />
            <h3 className="font-semibold mb-1">Автопродление</h3>
            <p className="text-sm text-gray-600">
              Подписка автоматически продлевается в конце периода
            </p>
          </div>
          <div>
            <Icon
              name="HeadphonesIcon"
              size={32}
              className="mx-auto mb-2 text-purple-500"
            />
            <h3 className="font-semibold mb-1">Поддержка 24/7</h3>
            <p className="text-sm text-gray-600">
              Техническая поддержка доступна круглосуточно
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}