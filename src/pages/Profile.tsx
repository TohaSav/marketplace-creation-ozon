import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Wallet from "@/components/Wallet";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  // Если пользователь не авторизован, показываем заглушку
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon
              name="User"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Войдите в аккаунт
            </h2>
            <p className="text-gray-500 mb-4">
              Чтобы просматривать профиль, нужно авторизоваться
            </p>
            <Link to="/login">
              <Button>Войти в аккаунт</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Рассчитываем реальные данные пользователя
  const userStats = {
    ordersCount: 0, // Заказы будут добавляться при реальных покупках
    bonusPoints: 0, // Бонусы появляются только после покупок
    totalSpent: 0,
    memberSince: user.joinDate
      ? new Date(user.joinDate).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
        })
      : "Недавно",
  };

  const displayUser = {
    ...user,
    ...userStats,
    level: user.userType === "seller" ? "Продавец" : "Покупатель",
    birthDate: "", // Пустое поле - будет заполняться пользователем
    city: "", // Пустое поле - будет заполняться пользователем
    address: "", // Пустое поле - будет заполняться пользователем
  };

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Профиль", icon: "User" },
    { id: "orders", label: "Заказы", icon: "Package" },
    { id: "favorites", label: "Избранное", icon: "Heart" },
    { id: "notifications", label: "Уведомления", icon: "Bell" },
    { id: "settings", label: "Настройки", icon: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться в магазин
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Личный кабинет
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {displayUser.level}
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                  {displayUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Профиль пользователя - компактный */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                      {displayUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {displayUser.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      С нами с {displayUser.memberSince}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-green-50 text-green-700"
                    >
                      {displayUser.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {displayUser.ordersCount}
                    </div>
                    <div className="text-xs text-gray-500">Заказов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">
                      {displayUser.bonusPoints > 0
                        ? displayUser.bonusPoints.toLocaleString()
                        : "0"}
                    </div>
                    <div className="text-xs text-gray-500">Бонусов</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Кошелек */}
            <div className="mb-6">
              <Wallet />
            </div>

            {/* Навигация */}
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        name={tab.icon as any}
                        size={20}
                        className={`mr-3 ${
                          activeTab === tab.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Контент вкладок */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Личные данные</CardTitle>
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
                </CardHeader>
                <CardContent>
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
                          defaultValue={displayUser.name}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                          defaultValue={displayUser.email}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                          defaultValue={displayUser.phone || ""}
                          disabled={!isEditing}
                          placeholder="Введите номер телефона"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                          defaultValue={displayUser.birthDate}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                          defaultValue={displayUser.city}
                          disabled={!isEditing}
                          placeholder="Введите ваш город"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                          defaultValue={displayUser.address}
                          disabled={!isEditing}
                          placeholder="Введите адрес доставки"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Package" size={20} />
                    Мои заказы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {displayUser.ordersCount === 0 ? (
                    <div className="text-center py-12">
                      <Icon
                        name="Package"
                        size={48}
                        className="text-gray-400 mx-auto mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        У вас пока нет заказов
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Заказы будут отображаться здесь после ваших покупок
                      </p>
                      <Link to="/">
                        <Button>Перейти к покупкам</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Здесь будут отображаться реальные заказы пользователя */}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "favorites" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Heart" size={20} />
                    Избранное
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Icon
                      name="Heart"
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Список избранного пуст
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Добавляйте товары в избранное, чтобы не потерять их
                    </p>
                    <Link to="/">
                      <Button>Перейти к покупкам</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <div className="font-medium">Email уведомления</div>
                        <div className="text-sm text-gray-500">
                          О статусе заказов и акциях
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <div className="font-medium">SMS уведомления</div>
                        <div className="text-sm text-gray-500">
                          О доставке заказов
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Выключено
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium">Push уведомления</div>
                        <div className="text-sm text-gray-500">В браузере</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" size={20} />
                    Настройки аккаунта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Безопасность</h3>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Icon name="Key" size={16} className="mr-2" />
                          Изменить пароль
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Icon name="Shield" size={16} className="mr-2" />
                          Двухфакторная аутентификация
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Конфиденциальность</h3>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать мои данные
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full justify-start"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить аккаунт
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
