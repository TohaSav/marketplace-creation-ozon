import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface PricingHeaderProps {
  isFromApproval?: boolean;
  yookassaActive: boolean;
}

export default function PricingHeader({ isFromApproval, yookassaActive }: PricingHeaderProps) {
  return (
    <>
      {/* Заголовок с приветствием */}
      <div className="text-center mb-16">
        {isFromApproval && (
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">Заявка одобрена!</span>
          </div>
        )}
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Выберите тарифный план
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {isFromApproval 
            ? "Поздравляем! Ваша заявка одобрена. Теперь выберите тарифный план для начала продаж на Calibre Store."
            : "Для начала продажи товаров необходимо выбрать и оплатить тарифный план. Выберите подходящий вариант и начните зарабатывать на Calibre Store."
          }
        </p>
      </div>

      {/* Статус ЮКассы */}
      {!yookassaActive && (
        <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-800">
              <Icon name="AlertTriangle" size={20} className="mr-2" />
              Платежи временно недоступны
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700">
              ЮКасса не настроена администратором. Платежные функции будут
              доступны после настройки платежной системы. Обратитесь к
              администратору для активации платежей.
            </p>
          </CardContent>
        </Card>
      )}

      {yookassaActive && (
        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
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
      )}
    </>
  );
}