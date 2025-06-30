import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

// Функция генерации уникального номера карты
const generateCardNumber = () => {
  // Генерируем 16-значный номер карты
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = Math.floor(1000 + Math.random() * 9000).toString();
    segments.push(segment);
  }
  return segments.join(" ");
};

// Функция получения или создания номера карты для пользователя
const getUserCardNumber = () => {
  const stored = localStorage.getItem("userCardNumber");
  if (stored) {
    return stored;
  }
  const newCardNumber = generateCardNumber();
  localStorage.setItem("userCardNumber", newCardNumber);
  return newCardNumber;
};

export default function BonusCard() {
  const [userPoints] = useState(0);
  const [cardLevel] = useState("Золотая");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    setCardNumber(getUserCardNumber());
  }, []);

  const bonusHistory: Array<{
    id: number;
    date: string;
    action: string;
    points: string;
    order: string;
  }> = [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться в магазин
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Бонусная карта
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Бонусная карта */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl p-6 text-white mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{cardLevel} карта</h2>
              <p className="opacity-90">№ {cardNumber}</p>
            </div>
            <Icon name="CreditCard" size={48} className="opacity-80" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Баланс бонусов</p>
              <p className="text-3xl font-bold">
                {userPoints.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">1 бонус = 1 ₽</p>
              <p className="text-lg font-semibold">Экономия: {userPoints} ₽</p>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-3">
              <Icon name="Percent" size={24} className="text-green-600 mr-3" />
              <h3 className="font-semibold">Кэшбэк 5%</h3>
            </div>
            <p className="text-gray-600 text-sm">
              За каждую покупку возвращается 5% бонусами
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-3">
              <Icon name="Gift" size={24} className="text-purple-600 mr-3" />
              <h3 className="font-semibold">Подарки</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Специальные предложения и подарки к дню рождения
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-3">
              <Icon name="Truck" size={24} className="text-blue-600 mr-3" />
              <h3 className="font-semibold">Бесплатная доставка</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Бесплатная доставка при заказе от 1000 ₽
            </p>
          </div>
        </div>

        {/* История операций */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">История бонусов</h3>
          </div>

          <div className="px-6 py-8 text-center text-gray-500">
            <Icon
              name="Receipt"
              size={48}
              className="mx-auto mb-4 opacity-50"
            />
            <p className="text-lg font-medium mb-2">Пока нет операций</p>
            <p className="text-sm">
              Совершите первую покупку, чтобы начать копить бонусы!
            </p>
          </div>
        </div>

        {/* Как использовать */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Как использовать бонусы?
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>• Бонусы можно использовать для оплаты до 50% от суммы заказа</p>
            <p>• 1 бонус = 1 рубль скидки</p>
            <p>
              • Бонусы начисляются в течение 24 часов после получения заказа
            </p>
            <p>• Срок действия бонусов: 1 год с момента начисления</p>
          </div>
        </div>
      </div>
    </div>
  );
}
