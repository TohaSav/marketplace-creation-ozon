import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Возврат товара
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Простая процедура возврата в течение 14 дней
          </p>
        </div>

        {/* Return Conditions */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Условия возврата</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} />
                  Можно вернуть
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Товар не использовался</li>
                  <li>• Сохранена оригинальная упаковка</li>
                  <li>• Есть все документы и бирки</li>
                  <li>• Товарный вид не нарушен</li>
                  <li>• Прошло не более 14 дней</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <Icon name="XCircle" size={20} />
                  Нельзя вернуть
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Товары личной гигиены</li>
                  <li>• Нижнее белье</li>
                  <li>• Парфюмерия (вскрытая)</li>
                  <li>• Продукты питания</li>
                  <li>• Цифровые товары</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Как вернуть товар
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Подайте заявку</h3>
                <p className="text-gray-600 mb-4">
                  Создайте заявку на возврат в личном кабинете или обратитесь в
                  поддержку
                </p>
                <Button variant="outline" size="sm">
                  Подать заявку
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Упакуйте товар</h3>
                <p className="text-gray-600 mb-4">
                  Аккуратно упакуйте товар в оригинальную упаковку с документами
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="Package" size={16} />
                  Сохраните товарный вид
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Передайте курьеру
                </h3>
                <p className="text-gray-600 mb-4">
                  Курьер заберет товар бесплатно в удобное для вас время
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="Truck" size={16} />
                  Бесплатный забор
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Получите возврат</h3>
                <p className="text-gray-600 mb-4">
                  Деньги вернутся на ваш счет в течение 3-5 рабочих дней
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="CreditCard" size={16} />
                  Возврат на карту или кошелек
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Reasons */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Причины возврата
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="Shuffle"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Не подошел размер</h3>
              <p className="text-gray-600 text-sm">
                Обменяем на подходящий размер или вернем деньги
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="Eye"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Не понравился</h3>
              <p className="text-gray-600 text-sm">
                Товар не соответствует ожиданиям по внешнему виду
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="AlertTriangle"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Дефект или брак</h3>
              <p className="text-gray-600 text-sm">
                Товар имеет производственные дефекты
              </p>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <Icon
              name="Info"
              className="text-blue-600 flex-shrink-0 mt-1"
              size={20}
            />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Важная информация
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>
                  • Возврат денежных средств происходит тем же способом, которым
                  была произведена оплата
                </li>
                <li>
                  • При возврате товара, купленного в рассрочку, деньги
                  возвращаются после погашения кредита
                </li>
                <li>
                  • Стоимость доставки не возвращается, если товар возвращается
                  без дефектов
                </li>
                <li>• Сроки возврата могут увеличиться в праздничные дни</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Нужна помощь?</h2>
          <p className="text-gray-600 mb-6">
            Наша служба поддержки поможет с оформлением возврата
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Написать в поддержку
            </Button>
            <Button variant="outline">Позвонить: 8 800 555-35-35</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
