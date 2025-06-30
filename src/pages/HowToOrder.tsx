import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function HowToOrder() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Как сделать заказ
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Простые шаги для создания заказа в нашем маркетплейсе
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Выберите товар</h3>
                <p className="text-gray-600 mb-4">
                  Просмотрите каталог товаров, используйте фильтры и поиск для
                  нахождения нужного товара.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="Search" size={16} />
                  Поиск по категориям и брендам
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Добавьте в корзину
                </h3>
                <p className="text-gray-600 mb-4">
                  Выберите нужные характеристики товара (размер, цвет,
                  количество) и добавьте в корзину.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="ShoppingCart" size={16} />
                  Сохранение товаров в корзине
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Оформите заказ</h3>
                <p className="text-gray-600 mb-4">
                  Перейдите в корзину, проверьте выбранные товары и заполните
                  данные для доставки.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="MapPin" size={16} />
                  Выберите адрес доставки
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Выберите способ оплаты
                </h3>
                <p className="text-gray-600 mb-4">
                  Оплатите заказ удобным способом: картой, электронными деньгами
                  или при получении.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="CreditCard" size={16} />
                  Безопасная оплата
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Преимущества покупок
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600 text-sm">
                Все товары проверены и имеют гарантию от продавца
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600 text-sm">
                Доставка по всей стране в кратчайшие сроки
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="RotateCcw" className="text-purple-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Легкий возврат</h3>
              <p className="text-gray-600 text-sm">
                Простая процедура возврата в течение 14 дней
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Начать покупки
          </Button>
        </div>
      </div>
    </div>
  );
}
