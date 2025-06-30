import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function PaymentMethods() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Способы оплаты
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите удобный способ оплаты заказа
          </p>
        </div>

        {/* Payment Methods */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card Payment */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="CreditCard" className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Банковские карты</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Visa, MasterCard, МИР - безопасная оплата с защитой 3D-Secure
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Мгновенная обработка платежа</li>
              <li>• Защита данных по стандарту PCI DSS</li>
              <li>• Возможность сохранения карты</li>
            </ul>
          </div>

          {/* Digital Wallets */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Smartphone" className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Электронные кошельки</h3>
            </div>
            <p className="text-gray-600 mb-4">
              ЮMoney, QIWI, WebMoney - быстрая оплата онлайн
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Быстрые переводы</li>
              <li>• Не нужно вводить данные карты</li>
              <li>• История всех операций</li>
            </ul>
          </div>

          {/* SBP */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="QrCode" className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">
                Система быстрых платежей
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Оплата через QR-код или номер телефона
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Без комиссии</li>
              <li>• Мгновенное зачисление</li>
              <li>• Оплата через банковское приложение</li>
            </ul>
          </div>

          {/* Cash on Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name="Banknote" className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">При получении</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Наличными или картой курьеру или в пункте выдачи
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Осмотр товара перед оплатой</li>
              <li>• Возможность отказаться от заказа</li>
              <li>• Дополнительная комиссия 2%</li>
            </ul>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <div className="text-center mb-6">
            <Icon
              name="Shield"
              className="text-green-600 mx-auto mb-4"
              size={48}
            />
            <h2 className="text-2xl font-bold mb-2">Безопасность платежей</h2>
            <p className="text-gray-600">
              Ваши данные защищены по международным стандартам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">SSL-шифрование</h3>
              <p className="text-sm text-gray-600">
                Данные передаются в зашифрованном виде
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">PCI DSS</h3>
              <p className="text-sm text-gray-600">
                Соответствие стандартам безопасности карточных данных
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">3D-Secure</h3>
              <p className="text-sm text-gray-600">
                Дополнительная защита от мошенничества
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Когда спишется оплата?</h3>
              <p className="text-gray-600">
                Оплата списывается сразу после подтверждения заказа. При отмене
                заказа деньги возвращаются в течение 3-5 рабочих дней.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">
                Можно ли изменить способ оплаты?
              </h3>
              <p className="text-gray-600">
                Способ оплаты можно изменить до подтверждения заказа. После
                подтверждения изменение невозможно.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Есть ли рассрочка?</h3>
              <p className="text-gray-600">
                Да, доступна рассрочка от партнерских банков на срок от 3 до 24
                месяцев без переплаты.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
