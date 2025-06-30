import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Wallet from "@/components/Wallet";

export default function Profile() {
  const [user] = useState({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    birthDate: "1990-05-15",
    city: "Москва",
    address: "ул. Примерная, д. 123, кв. 45",
  });

  const [isEditing, setIsEditing] = useState(false);

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
              Личный кабинет
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Кошелек */}
        <div className="mb-8">
          <Wallet />
        </div>

        {/* Профиль пользователя */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Мой профиль</h2>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              <Icon
                name={isEditing ? "Check" : "Edit"}
                size={16}
                className="mr-2"
              />
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полное имя
              </label>
              <div className="relative">
                <Icon
                  name="User"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  defaultValue={user.name}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Icon
                  name="Mail"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <div className="relative">
                <Icon
                  name="Phone"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  defaultValue={user.phone}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата рождения
              </label>
              <div className="relative">
                <Icon
                  name="Calendar"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="date"
                  defaultValue={user.birthDate}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Город
              </label>
              <div className="relative">
                <Icon
                  name="MapPin"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  defaultValue={user.city}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес доставки
              </label>
              <div className="relative">
                <Icon
                  name="Home"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  defaultValue={user.address}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/orders"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Icon name="Package" size={24} className="text-blue-600 mr-3" />
              <h3 className="font-semibold">Мои заказы</h3>
            </div>
            <p className="text-gray-600 text-sm">Просмотреть историю покупок</p>
          </Link>

          <Link
            to="/bonus-card"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Icon
                name="CreditCard"
                size={24}
                className="text-yellow-600 mr-3"
              />
              <h3 className="font-semibold">Бонусная карта</h3>
            </div>
            <p className="text-gray-600 text-sm">Управление бонусами</p>
          </Link>

          <Link
            to="/notifications"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Icon name="Bell" size={24} className="text-purple-600 mr-3" />
              <h3 className="font-semibold">Уведомления</h3>
            </div>
            <p className="text-gray-600 text-sm">Управление уведомлениями</p>
          </Link>

          <Link
            to="/settings"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-3">
              <Icon name="Settings" size={24} className="text-gray-600 mr-3" />
              <h3 className="font-semibold">Настройки</h3>
            </div>
            <p className="text-gray-600 text-sm">Настройки аккаунта</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
