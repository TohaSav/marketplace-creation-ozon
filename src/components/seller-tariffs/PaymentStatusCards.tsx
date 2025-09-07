import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface PaymentStatusCardsProps {
  yookassaActive: boolean;
}

export default function PaymentStatusCards({ yookassaActive }: PaymentStatusCardsProps) {
  if (!yookassaActive) {
    return (
      <Card className="mb-8 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-800">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            Платежи временно недоступны
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            ЮКасса не настроена администратором. Платежные функции будут
            доступны после настройки платежной системы. Обратитесь к
            администратору для активации платежей.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center text-green-800">
          <Icon name="CheckCircle" size={20} className="mr-2" />
          Платежи активны
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-700">
          ЮКасса настроена и готова к приему платежей. Вы можете безопасно
          оплачивать тарифы.
        </p>
      </CardContent>
    </Card>
  );
}