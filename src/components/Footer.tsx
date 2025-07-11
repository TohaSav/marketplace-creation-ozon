import { Link } from "react-router-dom";

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
                <Link to="/how-to-order" className="hover:text-white">
                  Как заказать
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-white">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Возврат товаров
                </Link>
              </li>
              <li>
                <Link to="/payment-methods" className="hover:text-white">
                  Способы оплаты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продавцам</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/how-to-sell" className="hover:text-white">
                  Как продавать
                </Link>
              </li>
              <li>
                <Link to="/commissions" className="hover:text-white">
                  Комиссии
                </Link>
              </li>
              <li>
                <Link to="/trading-rules" className="hover:text-white">
                  Правила торговли
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/support" className="hover:text-white">
                  Служба поддержки
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/personal-data" className="hover:text-white">
                  Обработка данных
                </Link>
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
