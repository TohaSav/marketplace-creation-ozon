import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const HowToSell = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Calibre Store
              </span>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Как начать продавать
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к тысячам успешных продавцов на Calibre Store. Мы
            поможем вам начать продавать ваши товары онлайн всего за несколько
            шагов.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            Стать продавцом
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Простые шаги для начала продаж
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-slate-800 border-gray-700 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserPlus" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">1. Регистрация</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Создайте аккаунт продавца и заполните профиль компании
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-gray-700 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileText" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">2. Документы</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Загрузите необходимые документы для верификации
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-gray-700 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">3. Товары</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Добавьте свои товары с описанием и фотографиями
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-gray-700 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white">4. Продажи</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Начните продавать и зарабатывать с первого дня
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Преимущества продаж на Calibre Store
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Миллионы покупателей
                </h3>
                <p className="text-gray-300">
                  Получите доступ к огромной аудитории потенциальных клиентов
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Защита продавца
                </h3>
                <p className="text-gray-300">
                  Гарантированные выплаты и защита от мошенничества
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="BarChart" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Аналитика продаж
                </h3>
                <p className="text-gray-300">
                  Подробная статистика для оптимизации ваших продаж
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Truck" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Логистика
                </h3>
                <p className="text-gray-300">
                  Собственная служба доставки по всей России
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Headphones" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Поддержка 24/7
                </h3>
                <p className="text-gray-300">
                  Круглосуточная техническая поддержка продавцов
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Быстрый старт
                </h3>
                <p className="text-gray-300">
                  Начните продавать уже через 24 часа после регистрации
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Требования к продавцам
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Что нужно для начала работы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Icon
                        name="Building"
                        size={20}
                        className="mr-2 text-blue-400"
                      />
                      Юридические лица
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Регистрация ООО или ИП
                      </li>
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Банковские реквизиты
                      </li>
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Сертификаты качества товаров
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Icon
                        name="User"
                        size={20}
                        className="mr-2 text-purple-400"
                      />
                      Физические лица
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Паспорт РФ
                      </li>
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Банковская карта
                      </li>
                      <li className="flex items-start">
                        <Icon
                          name="Check"
                          size={16}
                          className="mr-2 text-green-400 mt-1 flex-shrink-0"
                        />
                        Лимит продаж до 2.4 млн руб/год
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы начать продавать?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к успешным продавцам Calibre Store и увеличьте свои
            продажи уже сегодня
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Подать заявку
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Calibre Store
              </span>
            </Link>
            <div className="text-sm text-gray-400">
              © 2025 Calibre Store. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowToSell;
