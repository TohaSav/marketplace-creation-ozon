export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Calibre Store</h3>
            <p className="text-gray-400">
              Маркетплейс товаров от проверенных продавцов
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/how-to-order" className="hover:text-white">
                  Как заказать
                </a>
              </li>
              <li>
                <a href="/delivery" className="hover:text-white">
                  Доставка
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white">
                  Возврат товаров
                </a>
              </li>
              <li>
                <a href="/payment-methods" className="hover:text-white">
                  Способы оплаты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продавцам</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/how-to-sell" className="hover:text-white">
                  Как продавать
                </a>
              </li>
              <li>
                <a href="/commissions" className="hover:text-white">
                  Комиссии
                </a>
              </li>
              <li>
                <a href="/trading-rules" className="hover:text-white">
                  Правила торговли
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/support" className="hover:text-white">
                  Служба поддержки
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/personal-data" className="hover:text-white">
                  Обработка данных
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Calibre Store. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
