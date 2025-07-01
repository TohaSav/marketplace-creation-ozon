import Header from "@/components/Header";

export default function Commissions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Комиссии и тарифы
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Для продавцов
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-medium text-blue-900 mb-3">
                  Базовая комиссия
                </h3>
                <div className="space-y-2 text-blue-800">
                  <p>
                    • <span className="font-semibold">5%</span> с каждой
                    успешной продажи
                  </p>
                  <p>• Комиссия взимается только при завершении сделки</p>
                  <p>• Возврат комиссии при отмене заказа покупателем</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">
                    Премиум продавцы
                  </h4>
                  <p className="text-green-800 text-sm">
                    Комиссия <span className="font-semibold">3%</span> при
                    обороте свыше 100,000₽/месяц
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">
                    VIP продавцы
                  </h4>
                  <p className="text-purple-800 text-sm">
                    Комиссия <span className="font-semibold">2%</span> при
                    обороте свыше 500,000₽/месяц
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Дополнительные услуги
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Услуга
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Стоимость
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Описание
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Продвижение товара
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        50₽/день
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Показ в топе категории
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        Премиум размещение
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        200₽/день
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Размещение на главной странице
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Профессиональные фото
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        1,500₽
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Съёмка до 10 товаров
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        Консультация менеджера
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        Бесплатно
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        Помощь в оптимизации продаж
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Для покупателей
              </h2>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 mb-3">
                  Бесплатно для покупателей
                </h3>
                <div className="space-y-2 text-green-800">
                  <p>• Регистрация и использование платформы</p>
                  <p>• Размещение в избранном</p>
                  <p>• Система отзывов и рейтингов</p>
                  <p>• Техническая поддержка</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Комиссии платёжных систем
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Банковские карты
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">2.3%</p>
                  <p className="text-sm text-gray-600">Visa, MasterCard, МИР</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Электронные кошельки
                  </h4>
                  <p className="text-2xl font-bold text-green-600">1.8%</p>
                  <p className="text-sm text-gray-600">
                    ЮMoney, WebMoney, QIWI
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">СБП</h4>
                  <p className="text-2xl font-bold text-purple-600">0.7%</p>
                  <p className="text-sm text-gray-600">
                    Система быстрых платежей
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Программа лояльности
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Кэшбэк для постоянных клиентов
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Для покупателей:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 1% кэшбэк с первых покупок</li>
                      <li>• 2% при покупках свыше 10,000₽/месяц</li>
                      <li>• 3% при покупках свыше 25,000₽/месяц</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Для продавцов:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Бонус 500₽ за первые 10 продаж</li>
                      <li>• Скидка 20% на продвижение товаров</li>
                      <li>• Приоритетная поддержка</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Условия выплат
              </h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <div className="space-y-3 text-gray-700">
                  <p>
                    <span className="font-semibold">Периодичность:</span>{" "}
                    Выплаты продавцам каждый вторник и пятницу
                  </p>
                  <p>
                    <span className="font-semibold">Минимальная сумма:</span>{" "}
                    1,000₽ для вывода средств
                  </p>
                  <p>
                    <span className="font-semibold">Комиссия за вывод:</span> 0₽
                    на карты российских банков
                  </p>
                  <p>
                    <span className="font-semibold">Сроки поступления:</span>{" "}
                    1-3 рабочих дня
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Нужна помощь?
              </h3>
              <p className="text-blue-800 mb-4">
                Наши менеджеры помогут выбрать оптимальный тариф для вашего
                бизнеса
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+78001234567"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  📞 +7 (800) 123-45-67
                </a>
                <a
                  href="mailto:support@calibrestore.ru"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ✉️ support@calibrestore.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
