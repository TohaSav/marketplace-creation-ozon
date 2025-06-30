import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Доставка товаров
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Быстрая и надежная доставка по всей России
          </p>
        </div>

        {/* Delivery Options */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Courier Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Truck" className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Курьерская доставка</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Доставка до двери в удобное время
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Сроки:</span>
                <span className="font-medium">1-3 дня</span>
              </div>
              <div className="flex justify-between">
                <span>Стоимость:</span>
                <span className="font-medium">от 350 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Бесплатно:</span>
                <span className="font-medium">от 2000 ₽</span>
              </div>
            </div>
          </div>

          {/* Pickup Points */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="MapPin" className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Пункты выдачи</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Получение в удобном пункте выдачи
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Сроки:</span>
                <span className="font-medium">2-5 дней</span>
              </div>
              <div className="flex justify-between">
                <span>Стоимость:</span>
                <span className="font-medium">от 150 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Бесплатно:</span>
                <span className="font-medium">от 1500 ₽</span>
              </div>
            </div>
          </div>

          {/* Express Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="Zap" className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Экспресс-доставка</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Ускоренная доставка в день заказа
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Сроки:</span>
                <span className="font-medium">в день заказа</span>
              </div>
              <div className="flex justify-between">
                <span>Стоимость:</span>
                <span className="font-medium">от 800 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доступно:</span>
                <span className="font-medium">Москва, СПб</span>
              </div>
            </div>
          </div>

          {/* Post Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Mail" className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Почта России</h3>
            </div>
            <p className="text-gray-600 mb-4">Доставка в любую точку России</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Сроки:</span>
                <span className="font-medium">5-14 дней</span>
              </div>
              <div className="flex justify-between">
                <span>Стоимость:</span>
                <span className="font-medium">от 200 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Бесплатно:</span>
                <span className="font-medium">от 3000 ₽</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Coverage */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            География доставки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-600">городов России</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-600">пунктов выдачи</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">отслеживание заказа</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <p className="text-gray-600">доставка вовремя</p>
            </div>
          </div>
        </div>

        {/* Delivery Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Как происходит доставка
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Обработка заказа</h3>
                <p className="text-gray-600">
                  Заказ поступает продавцу и проходит проверку в течение 1-2
                  часов
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Упаковка и отправка</h3>
                <p className="text-gray-600">
                  Товар упаковывается и передается службе доставки
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Доставка</h3>
                <p className="text-gray-600">
                  Курьер доставляет заказ по указанному адресу
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Получение</h3>
                <p className="text-gray-600">
                  Вы получаете заказ и можете его проверить перед оплатой
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">
                Можно ли изменить адрес доставки?
              </h3>
              <p className="text-gray-600">
                Адрес можно изменить до момента передачи заказа в службу
                доставки. Обратитесь в поддержку.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">
                Что делать, если товар не подошел?
              </h3>
              <p className="text-gray-600">
                Вы можете отказаться от заказа при получении или вернуть его в
                течение 14 дней.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Как отследить заказ?</h3>
              <p className="text-gray-600">
                После отправки вы получите трек-номер для отслеживания в личном
                кабинете или по SMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
