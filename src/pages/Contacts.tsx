import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span>Контакты</span>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Контактная информация */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-blue-600" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      +7 (904) 980-82-75
                    </p>
                    <p className="text-gray-600">Ежедневно с 9:00 до 21:00</p>
                  </div>
                  <Button>
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-green-600" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      swi79@bk.ru
                    </p>
                    <p className="text-gray-600">Ответим в течение 24 часов</p>
                  </div>
                  <Button>
                    <Icon name="Mail" size={16} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-red-600" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900 mb-1">
                      г. Каменск-Уральский
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      ул. Репина, д.19
                    </p>
                    <p className="text-gray-600">
                      Свердловская область, Россия
                    </p>
                  </div>
                  <Button variant="outline">
                    <Icon name="Map" size={16} className="mr-2" />
                    На карте
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Реквизиты */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building" size={24} className="text-purple-600" />
                  Реквизиты организации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">
                    Индивидуальный предприниматель
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon
                        name="User"
                        size={20}
                        className="text-blue-600 mt-0.5"
                      />
                      <div>
                        <p className="font-medium">
                          ИП Савельев Виталий Игоревич
                        </p>
                        <p className="text-sm text-gray-600">
                          Индивидуальный предприниматель
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Icon
                        name="FileText"
                        size={20}
                        className="text-green-600 mt-0.5"
                      />
                      <div>
                        <p className="font-medium">ИНН: 661208876805</p>
                        <p className="text-sm text-gray-600">
                          Идентификационный номер налогоплательщика
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Icon
                        name="Shield"
                        size={20}
                        className="text-purple-600 mt-0.5"
                      />
                      <div>
                        <p className="font-medium">ОГРН: 324665800281052</p>
                        <p className="text-sm text-gray-600">
                          Основной государственный регистрационный номер
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Документы</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Выписка из ЕГРИП
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Справка о налоговом статусе
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Форма обратной связи */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Форма обратной связи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Тема</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="О чем хотите написать"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows={5}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше сообщение..."
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Время работы */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Icon name="Clock" size={24} className="text-orange-600" />
              Время работы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-3">Служба поддержки</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Понедельник - Пятница:</strong> 9:00 - 21:00
                  </p>
                  <p>
                    <strong>Суббота - Воскресенье:</strong> 10:00 - 18:00
                  </p>
                  <p className="text-sm text-gray-500">
                    Время московское (UTC+3)
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-3">Обработка заказов</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Автоматически:</strong> 24/7
                  </p>
                  <p>
                    <strong>Ручная проверка:</strong> 9:00 - 18:00
                  </p>
                  <p className="text-sm text-gray-500">
                    Среднее время обработки: 15 минут
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Социальные сети */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Следите за нами</h2>
            <p className="text-gray-700 mb-6">
              Новости, акции и полезные советы в наших социальных сетях
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Telegram
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Phone" size={20} className="mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Mail" size={20} className="mr-2" />
                Email рассылка
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
