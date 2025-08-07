import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SellerTerms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <Icon name="ArrowLeft" size={20} />
          Назад к платформе
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💼 Оферта для Продавцов
          </h1>
          <p className="text-xl text-gray-600">
            Условия сотрудничества и размещения товаров на платформе
          </p>
        </div>

        <div className="space-y-6">
          {/* Комиссия и выплаты */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CreditCard" size={24} className="text-green-600" />
                Комиссия и выплаты
              </CardTitle>
              <CardDescription>
                Прозрачная система расчетов и своевременные выплаты
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Комиссия платформы</h3>
                  <p className="text-2xl font-bold text-green-600">5%</p>
                  <p className="text-sm text-green-700">С каждой продажи</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Ваша прибыль</h3>
                  <p className="text-2xl font-bold text-blue-600">95%</p>
                  <p className="text-sm text-blue-700">От стоимости товара</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Сроки выплат:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Еженедельные выплаты по пятницам</li>
                  <li>• Минимальная сумма для вывода: 500 рублей</li>
                  <li>• Выплаты на карту или электронный кошелек</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Модерация */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-orange-600" />
                Процесс модерации
              </CardTitle>
              <CardDescription>
                Обеспечиваем качество и безопасность товаров на платформе
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Шаг 1</Badge>
                  <h4 className="font-medium mb-1">Подача заявки</h4>
                  <p className="text-sm text-gray-600">Заполните профиль и загрузите документы</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Шаг 2</Badge>
                  <h4 className="font-medium mb-1">Проверка</h4>
                  <p className="text-sm text-gray-600">Модерация до 24 часов</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Шаг 3</Badge>
                  <h4 className="font-medium mb-1">Одобрение</h4>
                  <p className="text-sm text-gray-600">Начинайте продавать!</p>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Критерии модерации:</h4>
                <ul className="space-y-1 text-orange-700 text-sm">
                  <li>• Качественные фото товаров (мин. 3 фото)</li>
                  <li>• Подробное описание характеристик</li>
                  <li>• Соответствие товара категории</li>
                  <li>• Отсутствие запрещенных товаров</li>
                  <li>• Корректно указанная цена</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Статусы продавца */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" size={24} className="text-purple-600" />
                Статусы продавца
              </CardTitle>
              <CardDescription>
                Система статусов для контроля качества сервиса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Badge className="bg-yellow-500">pending</Badge>
                  <div>
                    <h4 className="font-medium">На модерации</h4>
                    <p className="text-sm text-gray-600">Ожидание проверки документов и товаров</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Badge className="bg-green-500">active</Badge>
                  <div>
                    <h4 className="font-medium">Активный</h4>
                    <p className="text-sm text-gray-600">Может размещать и продавать товары</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500">revision</Badge>
                  <div>
                    <h4 className="font-medium">На доработке</h4>
                    <p className="text-sm text-gray-600">Необходимо исправить замечания модератора</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Badge className="bg-red-500">blocked</Badge>
                  <div>
                    <h4 className="font-medium">Заблокирован</h4>
                    <p className="text-sm text-gray-600">Нарушение условий использования</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Игровая механика */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Gamepad2" size={24} className="text-pink-600" />
                Игровая механика платформы
              </CardTitle>
              <CardDescription>
                Как покупатели получают кэшбэк через мини-игры
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-medium text-pink-800 mb-2">🎈 Игра "Шарики"</h4>
                <ul className="space-y-1 text-pink-700 text-sm">
                  <li>• Покупатели играют после покупок</li>
                  <li>• Каждый 10-й шарик содержит 1-3 рубля</li>
                  <li>• Золотые шарики дают 7-15 рублей</li>
                  <li>• Деньги автоматически зачисляются на кошелек</li>
                </ul>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Преимущества для продавцов:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Повышение лояльности покупателей</li>
                  <li>• Стимулирование повторных покупок</li>
                  <li>• Увеличение среднего чека</li>
                  <li>• Позитивный пользовательский опыт</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Обязанности */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CheckSquare" size={24} className="text-indigo-600" />
                Обязанности продавца
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-indigo-800">Качество товара</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Предоставлять качественные товары</li>
                    <li>• Соответствие описанию и фото</li>
                    <li>• Своевременная отправка заказов</li>
                    <li>• Упаковка товаров</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-indigo-800">Обслуживание</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Быстрые ответы на вопросы</li>
                    <li>• Решение спорных ситуаций</li>
                    <li>• Актуальная информация о товарах</li>
                    <li>• Профессиональное общение</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Запрещенные товары */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="XCircle" size={24} className="text-red-600" />
                Запрещенные товары
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-800 text-sm mb-3">
                  К размещению запрещены следующие категории товаров:
                </p>
                <ul className="grid md:grid-cols-2 gap-1 text-red-700 text-sm">
                  <li>• Алкоголь и табачные изделия</li>
                  <li>• Оружие и боеприпасы</li>
                  <li>• Наркотические вещества</li>
                  <li>• Медицинские препараты</li>
                  <li>• Контрафакт и подделки</li>
                  <li>• Материалы для взрослых</li>
                  <li>• Живые животные</li>
                  <li>• Документы и удостоверения</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm border">
          <p className="text-gray-600">
            Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Условия могут быть изменены с уведомлением продавцов за 7 дней
          </p>
        </div>
      </div>
    </div>
  );
}