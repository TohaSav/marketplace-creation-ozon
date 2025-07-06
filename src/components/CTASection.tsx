import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 border-0 shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="ShoppingBag" className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Для покупателей</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Миллионы товаров по выгодным ценам с быстрой доставкой
          </p>
          <ul className="text-emerald-100 mb-8 space-y-2">
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Скидки до 90%
            </li>
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Бесплатная доставка
            </li>
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Гарантия качества
            </li>
          </ul>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
            >
              Начать покупки
            </Button>
          </Link>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 border-0 shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Store" className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Для продавцов</h3>
          <p className="text-purple-100 mb-6 text-lg">
            Начните продавать и зарабатывать уже сегодня
          </p>
          <ul className="text-purple-100 mb-8 space-y-2">
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Низкие комиссии
            </li>
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Быстрые выплаты
            </li>
            <li className="flex items-center justify-center">
              <Icon name="Check" className="w-4 h-4 mr-2" />
              Поддержка 24/7
            </li>
          </ul>
          <Link to="/seller">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
            >
              Стать продавцом
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
