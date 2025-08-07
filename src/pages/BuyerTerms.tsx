import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function BuyerTerms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
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
            🛒 Оферта для Покупателей
          </h1>
          <p className="text-xl text-gray-600">
            Условия покупок и игровой механики на платформе
          </p>
        </div>

        <div className="space-y-6">
          {/* Игровая механика и кэшбэк */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Gamepad2" size={24} className="text-purple-600" />
                🎈 Игра "Шарики" - Получайте кэшбэк!
              </CardTitle>
              <CardDescription>
                За каждую покупку получайте возможность играть и зарабатывать деньги
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🎯 Как играть?</h3>
                  <ul className="space-y-1 text-purple-700 text-sm">
                    <li>• Совершите покупку на любую сумму</li>
                    <li>• Получите доступ к игре "Шарики"</li>
                    <li>• Лопайте шарики и зарабатывайте</li>
                    <li>• Деньги автоматически на ваш кошелек</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">💰 Призы в шариках</h3>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Каждый 10-й шарик: 1-3 рубля</li>
                    <li>• Золотые шарики: 7-15 рублей</li>
                    <li>• Без лимитов на выигрыши</li>
                    <li>• Мгновенное зачисление</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <Icon name="Sparkles" size={20} className="text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Автоматическое начисление</h4>
                    <p className="text-yellow-700 text-sm">
                      Все выигранные деньги мгновенно зачисляются на ваш личный счет в платформе. 
                      Используйте их для новых покупок или выводите на карту!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кошелек и баланс */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" size={24} className="text-emerald-600" />
                Личный кошелек
              </CardTitle>
              <CardDescription>
                Управление балансом и выводом средств
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <Icon name="Plus" size={24} className="text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Пополнение</h4>
                  <p className="text-sm text-gray-600">Выигрыши в играх</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon name="ShoppingCart" size={24} className="text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Оплата</h4>
                  <p className="text-sm text-gray-600">Покупки на платформе</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Icon name="ArrowUpRight" size={24} className="text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Вывод</h4>
                  <p className="text-sm text-gray-600">На банковскую карту</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Условия вывода средств:</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Минимальная сумма: 100 рублей</li>
                  <li>• Комиссия: 0% (платформа не берет комиссию)</li>
                  <li>• Сроки: 1-3 рабочих дня</li>
                  <li>• Способы: Банковская карта, СБП, электронные кошельки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Защита покупателей */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-blue-600" />
                Защита покупателей
              </CardTitle>
              <CardDescription>
                Гарантии безопасности и качества покупок
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">🛡️ Гарантии</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• 100% возврат при недоставке</li>
                    <li>• Проверка всех продавцов</li>
                    <li>• Модерация товаров</li>
                    <li>• Служба поддержки 24/7</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">🔒 Безопасность</h4>
                  <ul className="space-y-1 text-teal-700 text-sm">
                    <li>• Шифрование данных карт</li>
                    <li>• Защищенные платежи</li>
                    <li>• Анонимность личных данных</li>
                    <li>• Соответствие 152-ФЗ</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Возврат и обмен */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="RotateCcw" size={24} className="text-orange-600" />
                Возврат и обмен товаров
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Сроки возврата:</h4>
                <ul className="space-y-1 text-orange-700 text-sm">
                  <li>• Стандартные товары: 14 дней</li>
                  <li>• Одежда и обувь: 30 дней</li>
                  <li>• Техника: в соответствии с гарантией</li>
                  <li>• Продукты питания: не подлежат возврату</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Условия возврата:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Товар в оригинальной упаковке</li>
                    <li>• Сохранены все бирки и этикетки</li>
                    <li>• Товар не использовался</li>
                    <li>• Есть чек или подтверждение покупки</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Процесс возврата:</h4>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Подайте заявку в личном кабинете</li>
                    <li>• Отправьте товар продавцу</li>
                    <li>• Получите возврат на кошелек/карту</li>
                    <li>• Сроки возврата: 3-7 дней</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Программа лояльности */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Star" size={24} className="text-yellow-600" />
                Программа лояльности
              </CardTitle>
              <CardDescription>
                Дополнительные бонусы для постоянных покупателей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Badge variant="outline" className="mb-2">Новичок</Badge>
                  <h4 className="font-medium mb-1">0-5 покупок</h4>
                  <p className="text-sm text-gray-600">Стандартные условия</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Badge className="bg-yellow-500 mb-2">Активный</Badge>
                  <h4 className="font-medium mb-1">6-20 покупок</h4>
                  <p className="text-sm text-gray-600">+10% призов в играх</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Badge className="bg-purple-500 mb-2">VIP</Badge>
                  <h4 className="font-medium mb-1">20+ покупок</h4>
                  <p className="text-sm text-gray-600">+25% призов + скидки</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border">
                <h4 className="font-medium text-purple-800 mb-2">VIP привилегии:</h4>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• Увеличенные призы в мини-играх</li>
                  <li>• Персональные скидки на товары</li>
                  <li>• Приоритетная поддержка</li>
                  <li>• Ранний доступ к новинкам</li>
                  <li>• Специальные акции и предложения</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Поддержка */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MessageCircle" size={24} className="text-green-600" />
                Служба поддержки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Способы связи:</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Чат в личном кабинете (24/7)</li>
                    <li>• Email: support@platform.ru</li>
                    <li>• Телефон: 8-800-XXX-XX-XX</li>
                    <li>• Telegram: @platform_support</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Время ответа:</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Чат: в течение 5 минут</li>
                    <li>• Email: до 2 часов</li>
                    <li>• Телефон: немедленно</li>
                    <li>• Сложные вопросы: до 24 часов</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Персональные данные */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lock" size={24} className="text-gray-600" />
                Защита персональных данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Мы гарантируем:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Соблюдение требований 152-ФЗ "О персональных данных"</li>
                  <li>• Шифрование всех передаваемых данных</li>
                  <li>• Не передаем данные третьим лицам без согласия</li>
                  <li>• Возможность удаления аккаунта и всех данных</li>
                  <li>• Регулярные аудиты безопасности системы</li>
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
            Условия могут быть изменены с уведомлением пользователей за 7 дней
          </p>
        </div>
      </div>
    </div>
  );
}