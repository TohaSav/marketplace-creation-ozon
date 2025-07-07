import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function CategoryFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Icon name="Store" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CalibreStore</span>
            </div>
            <p className="text-gray-400">
              Современный маркетплейс с широким ассортиментом товаров
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
                  Возврат
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white">
                  Поддержка
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
                <Link to="/seller/tariffs" className="hover:text-white">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link to="/seller" className="hover:text-white">
                  Кабинет продавца
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>8 (800) 555-35-35</li>
              <li>info@calibrestore.ru</li>
              <li>Работаем 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CalibreStore. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
