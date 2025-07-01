import Header from "@/components/Header";

export default function TradingRules() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Правила торговли
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                1. Общие положения
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  1.1. Настоящие правила регулируют отношения между покупателями
                  и продавцами на платформе Calibre Store.
                </p>
                <p>
                  1.2. Регистрируясь на платформе, пользователь автоматически
                  соглашается с данными правилами.
                </p>
                <p>
                  1.3. Администрация платформы оставляет за собой право изменять
                  правила без предварительного уведомления.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                2. Права и обязанности продавцов
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  2.1. Продавец обязан предоставлять достоверную информацию о
                  товаре.
                </p>
                <p>
                  2.2. Все товары должны соответствовать описанию и фотографиям
                  в объявлении.
                </p>
                <p>
                  2.3. Продавец несёт ответственность за качество и безопасность
                  реализуемых товаров.
                </p>
                <p>
                  2.4. Запрещена продажа товаров, не соответствующих
                  законодательству РФ.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                3. Права и обязанности покупателей
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  3.1. Покупатель имеет право на получение полной информации о
                  товаре.
                </p>
                <p>
                  3.2. Покупатель обязан своевременно оплачивать заказанные
                  товары.
                </p>
                <p>
                  3.3. В случае получения некачественного товара, покупатель
                  имеет право на возврат.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                4. Оплата и доставка
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  4.1. Оплата производится через защищённые платёжные системы
                  платформы.
                </p>
                <p>
                  4.2. Доставка осуществляется согласованными между сторонами
                  способами.
                </p>
                <p>
                  4.3. Риски повреждения товара при доставке несёт сторона,
                  выбравшая способ доставки.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                5. Возврат и обмен товаров
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  5.1. Возврат товара возможен в течение 14 дней с момента
                  получения.
                </p>
                <p>
                  5.2. Товар должен быть в оригинальной упаковке и не иметь
                  следов использования.
                </p>
                <p>
                  5.3. Возврат денежных средств осуществляется в течение 10
                  рабочих дней.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                6. Ответственность сторон
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>
                  6.1. Платформа не несёт ответственности за сделки между
                  пользователями.
                </p>
                <p>
                  6.2. Каждая сторона несёт ответственность за нарушение условий
                  сделки.
                </p>
                <p>
                  6.3. Споры решаются путём переговоров или через службу
                  поддержки.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                7. Контактная информация
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>По всем вопросам обращайтесь в службу поддержки:</p>
                <p>Email: support@calibrestore.ru</p>
                <p>Телефон: +7 (800) 123-45-67</p>
                <p>Режим работы: Пн-Пт с 9:00 до 18:00 (МСК)</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Последнее обновление: 1 июля 2025 года
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
