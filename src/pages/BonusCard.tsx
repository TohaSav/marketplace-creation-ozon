import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useBonusSystem } from "@/hooks/useBonusSystem";
import Icon from "@/components/ui/icon";

// Функция для выбора градиента карты в зависимости от уровня
const getCardGradient = (level: "Серебряная" | "Золотая" | "Платиновая") => {
  switch (level) {
    case "Серебряная":
      return "bg-gradient-to-r from-gray-400 to-gray-600";
    case "Золотая":
      return "bg-gradient-to-r from-amber-400 to-yellow-500";
    case "Платиновая":
      return "bg-gradient-to-r from-purple-600 to-indigo-600";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-600";
  }
};

export default function BonusCard() {
  const { user } = useAuth();
  const { bonusData } = useBonusSystem();

  // Показываем страницу входа, если пользователь не авторизован
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="CreditCard"
            size={64}
            className="text-gray-400 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Авторизуйтесь для доступа к бонусной карте
          </h2>
          <p className="text-gray-600 mb-6">
            Войдите в аккаунт, чтобы просматривать и управлять своими бонусами
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div
          className={`${getCardGradient(bonusData.cardLevel)} rounded-xl p-6 text-white mb-8 shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {bonusData.cardLevel} карта
              </h2>
              <p className="opacity-90">№ {bonusData.cardNumber}</p>
            </div>
            <Icon name="CreditCard" size={48} className="opacity-80" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Баланс бонусов</p>
              <p className="text-3xl font-bold">
                {bonusData.balance.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">1 бонус = 1 ₽</p>
              <p className="text-lg font-semibold">
                Экономия: {bonusData.balance} ₽
              </p>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-3">
              <Icon name="Percent" size={24} className="text-green-600 mr-3" />
              <h3 className="font-semibold">Кэшбэк 1-3%</h3>
            </div>
            <p className="text-gray-600 text-sm">
              За каждую покупку возвращается от 1% до 3% бонусами (рандомно)
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

          {bonusData.transactions.length > 0 ? (
            <div className="divide-y">
              {bonusData.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        transaction.type === "earned"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Icon
                        name={transaction.type === "earned" ? "Plus" : "Minus"}
                        size={16}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date.toLocaleDateString("ru-RU")} в{" "}
                        {transaction.date.toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      transaction.type === "earned"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "earned" ? "+" : "-"}
                    {transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
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
