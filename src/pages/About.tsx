import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";

export default function About() {
  const { stats, isLoading } = usePlatformStats();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span>О нас</span>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            О CalibreStore
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем удобную платформу для покупок и продаж, где каждый может
            найти нужные товары или начать свой бизнес
          </p>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Наша миссия */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={24} className="text-blue-600" />
                Наша миссия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Мы стремимся создать безопасную и удобную торговую площадку, где
                покупатели могут найти качественные товары по выгодным ценам, а
                продавцы — успешно развивать свой бизнес. Наша цель — объединить
                людей через честную торговлю.
              </p>
            </CardContent>
          </Card>

          {/* Наши ценности */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Heart" size={24} className="text-red-600" />
                Наши ценности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Честность и прозрачность
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Качество обслуживания
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Поддержка предпринимательства
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  Безопасность платежей
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Преимущества */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Почему выбирают CalibreStore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="Shield"
                  size={48}
                  className="text-blue-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Безопасность</h3>
                <p className="text-gray-600 text-sm">
                  Защищенные платежи и проверенные продавцы
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="Zap"
                  size={48}
                  className="text-yellow-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Скорость</h3>
                <p className="text-gray-600 text-sm">
                  Быстрые покупки и моментальная оплата
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="Users"
                  size={48}
                  className="text-green-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Сообщество</h3>
                <p className="text-gray-600 text-sm">
                  Тысячи довольных покупателей и продавцов
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Статистика */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">CalibreStore в цифрах</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                  ) : (
                    <AnimatedCounter value={stats.totalProducts} />
                  )}
                </div>
                <div className="text-gray-600">Товаров</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                  ) : (
                    <AnimatedCounter value={stats.totalSellers} />
                  )}
                </div>
                <div className="text-gray-600">Продавцов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                  ) : (
                    <AnimatedCounter value={stats.totalBuyers} />
                  )}
                </div>
                <div className="text-gray-600">Покупателей</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                  ) : (
                    <AnimatedCounter
                      value={stats.satisfactionRate}
                      suffix="%"
                    />
                  )}
                </div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Команда */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">Алексей Смирнов</h3>
                <p className="text-sm text-gray-600 mb-2">CEO & Основатель</p>
                <p className="text-xs text-gray-500">
                  Опыт в e-commerce более 10 лет
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">Мария Иванова</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Технический директор
                </p>
                <p className="text-xs text-gray-500">
                  Эксперт в области IT и безопасности
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">Дмитрий Петров</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Директор по маркетингу
                </p>
                <p className="text-xs text-gray-500">
                  Специалист по развитию бизнеса
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Призыв к действию */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Присоединяйтесь к CalibreStore!
            </h2>
            <p className="text-gray-700 mb-6">
              Начните покупать или продавать уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Зарегистрироваться</Button>
              </Link>
              <Link to="/how-to-sell">
                <Button variant="outline" size="lg">
                  Узнать о продажах
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
