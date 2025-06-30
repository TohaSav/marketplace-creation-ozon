import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showOrders: false,
    dataProcessing: true,
  });

  const [theme, setTheme] = useState("light");

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
            <h1 className="text-xl font-semibold text-gray-900">Настройки</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Уведомления */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Icon name="Bell" size={20} className="mr-2" />
            Уведомления
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email уведомления</p>
                <p className="text-sm text-gray-600">
                  Получать уведомления о заказах на email
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, email: !prev.email }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS уведомления</p>
                <p className="text-sm text-gray-600">
                  Получать SMS о статусе доставки
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, sms: !prev.sms }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.sms ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.sms ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push уведомления</p>
                <p className="text-sm text-gray-600">Уведомления в браузере</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, push: !prev.push }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.push ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.push ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Маркетинговые уведомления</p>
                <p className="text-sm text-gray-600">Акции, скидки и новости</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    marketing: !prev.marketing,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.marketing ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.marketing ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Приватность */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Icon name="Shield" size={20} className="mr-2" />
            Приватность
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Показывать профиль</p>
                <p className="text-sm text-gray-600">
                  Другие пользователи могут видеть ваш профиль
                </p>
              </div>
              <button
                onClick={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    showProfile: !prev.showProfile,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showProfile ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showProfile ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Показывать заказы</p>
                <p className="text-sm text-gray-600">
                  Показывать историю покупок в профиле
                </p>
              </div>
              <button
                onClick={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    showOrders: !prev.showOrders,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showOrders ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showOrders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Обработка данных</p>
                <p className="text-sm text-gray-600">
                  Согласие на обработку персональных данных
                </p>
              </div>
              <button
                onClick={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    dataProcessing: !prev.dataProcessing,
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.dataProcessing ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.dataProcessing ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Тема оформления */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Icon name="Palette" size={20} className="mr-2" />
            Тема оформления
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                theme === "light"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <Icon name="Sun" size={20} className="mr-2" />
              Светлая
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                theme === "dark"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <Icon name="Moon" size={20} className="mr-2" />
              Тёмная
            </button>
            <button
              onClick={() => setTheme("auto")}
              className={`p-4 border rounded-lg flex items-center justify-center ${
                theme === "auto"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <Icon name="Monitor" size={20} className="mr-2" />
              Авто
            </button>
          </div>
        </div>

        {/* Безопасность */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2" />
            Безопасность
          </h2>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Key" size={16} className="mr-2" />
              Изменить пароль
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Icon name="Smartphone" size={16} className="mr-2" />
              Двухфакторная аутентификация
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Icon name="Download" size={16} className="mr-2" />
              Скачать мои данные
            </Button>
          </div>
        </div>

        {/* Опасная зона */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-red-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-red-600">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            Опасная зона
          </h2>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти из всех устройств
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Удалить аккаунт
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
