import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Хедер */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            На главную
          </Button>
        </div>

        {/* Основной контент */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">
              Политика конфиденциальности
            </CardTitle>
            <p className="text-muted-foreground text-center">
              Дата последнего обновления:{" "}
              {new Date().toLocaleDateString("ru-RU")}
            </p>
          </CardHeader>

          <CardContent className="prose max-w-none">
            <div className="space-y-8">
              {/* Введение */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Общие положения
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Настоящая Политика конфиденциальности (далее — «Политика»)
                  регулирует порядок обработки персональных данных пользователей
                  маркетплейса «МаркетМастер» (далее — «Платформа»). Мы серьезно
                  относимся к защите ваших персональных данных и обязуемся
                  обеспечивать их конфиденциальность и безопасность.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Используя наш маркетплейс, вы соглашаетесь с условиями данной
                  Политики конфиденциальности. Если вы не согласны с какими-либо
                  положениями, пожалуйста, не используйте наши услуги.
                </p>
              </section>

              {/* Сбор данных */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Какие данные мы собираем
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы собираем следующие категории персональных данных:
                </p>
                <div className="bg-muted/50 p-6 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">
                    Регистрационные данные:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Имя и фамилия</li>
                    <li>Адрес электронной почты</li>
                    <li>Номер телефона</li>
                    <li>Дата рождения</li>
                    <li>Пол (по желанию)</li>
                  </ul>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">
                    Данные для покупок и доставки:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Адрес доставки</li>
                    <li>Платежная информация (в зашифрованном виде)</li>
                    <li>История заказов и покупок</li>
                    <li>Предпочтения и избранные товары</li>
                  </ul>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">
                    Техническая информация:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>IP-адрес и данные о местоположении</li>
                    <li>Информация о браузере и устройстве</li>
                    <li>Файлы cookie и данные сессий</li>
                    <li>Логи активности на платформе</li>
                  </ul>
                </div>
              </section>

              {/* Цели обработки */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Цели обработки персональных данных
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы обрабатываем ваши персональные данные для следующих целей:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="ShoppingCart" size={18} />
                      Обслуживание заказов
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Обработка и доставка заказов, связь с курьерскими службами
                    </p>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="User" size={18} />
                      Управление аккаунтом
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Создание и поддержка учетной записи пользователя
                    </p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Mail" size={18} />
                      Коммуникации
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о заказах, новости, маркетинговые сообщения
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Shield" size={18} />
                      Безопасность
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Предотвращение мошенничества и обеспечение безопасности
                    </p>
                  </div>
                </div>
              </section>

              {/* Передача данных */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Передача данных третьим лицам
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы можем передавать ваши персональные данные следующим
                  категориям третьих лиц:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Продавцы на платформе</h4>
                    <p className="text-sm text-muted-foreground">
                      Контактные данные для выполнения заказа и связи по
                      вопросам товара
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold">Службы доставки</h4>
                    <p className="text-sm text-muted-foreground">
                      Адрес доставки и контактные данные для осуществления
                      доставки
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold">Платежные системы</h4>
                    <p className="text-sm text-muted-foreground">
                      Минимально необходимые данные для обработки платежей
                    </p>
                  </div>
                  <div className="border-l-4 border-muted pl-4">
                    <h4 className="font-semibold">Государственные органы</h4>
                    <p className="text-sm text-muted-foreground">
                      При наличии законных требований в установленном порядке
                    </p>
                  </div>
                </div>
              </section>

              {/* Права пользователей */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Ваши права</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  В соответствии с законодательством о защите персональных
                  данных, вы имеете следующие права:
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <Icon name="Eye" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Право на доступ</h4>
                      <p className="text-sm text-muted-foreground">
                        Получение информации о том, какие данные мы обрабатываем
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <Icon
                      name="Edit"
                      size={20}
                      className="text-secondary mt-1"
                    />
                    <div>
                      <h4 className="font-semibold">Право на исправление</h4>
                      <p className="text-sm text-muted-foreground">
                        Обновление или исправление неточных данных
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <Icon
                      name="Trash2"
                      size={20}
                      className="text-accent mt-1"
                    />
                    <div>
                      <h4 className="font-semibold">Право на удаление</h4>
                      <p className="text-sm text-muted-foreground">
                        Удаление ваших персональных данных при определенных
                        условиях
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <Icon
                      name="Download"
                      size={20}
                      className="text-primary mt-1"
                    />
                    <div>
                      <h4 className="font-semibold">Право на портируемость</h4>
                      <p className="text-sm text-muted-foreground">
                        Получение ваших данных в структурированном формате
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Безопасность */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Безопасность данных
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы применяем современные технические и организационные меры
                  для защиты ваших персональных данных:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Icon
                      name="Lock"
                      size={32}
                      className="mx-auto mb-2 text-green-600"
                    />
                    <h4 className="font-semibold text-green-800">Шифрование</h4>
                    <p className="text-sm text-green-700">
                      SSL/TLS шифрование передачи данных
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Icon
                      name="Server"
                      size={32}
                      className="mx-auto mb-2 text-blue-600"
                    />
                    <h4 className="font-semibold text-blue-800">
                      Надежные сервера
                    </h4>
                    <p className="text-sm text-blue-700">
                      Защищенные дата-центры с резервным копированием
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Icon
                      name="UserCheck"
                      size={32}
                      className="mx-auto mb-2 text-purple-600"
                    />
                    <h4 className="font-semibold text-purple-800">
                      Контроль доступа
                    </h4>
                    <p className="text-sm text-purple-700">
                      Ограниченный доступ сотрудников к данным
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Использование файлов Cookie
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы используем файлы cookie и аналогичные технологии для
                  улучшения функциональности сайта:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/10 rounded">
                    <Icon
                      name="Settings"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm">
                      <strong>Необходимые cookie:</strong> Обеспечивают базовую
                      функциональность сайта
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/10 rounded">
                    <Icon
                      name="BarChart"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm">
                      <strong>Аналитические cookie:</strong> Помогают понять,
                      как пользователи взаимодействуют с сайтом
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/10 rounded">
                    <Icon
                      name="Target"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm">
                      <strong>Маркетинговые cookie:</strong> Используются для
                      персонализации рекламы
                    </span>
                  </div>
                </div>
              </section>

              {/* Связь */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. Контактная информация
                </h2>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    По всем вопросам, касающимся обработки персональных данных,
                    вы можете обратиться к нам:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={18} className="text-primary" />
                      <span>Email: privacy@marketmaster.ru</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-secondary" />
                      <span>Телефон: +7 (800) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={18} className="text-accent" />
                      <span>
                        Адрес: г. Москва, ул. Примерная, д. 123, офис 456
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Изменения */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. Изменения в Политике
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящую
                  Политику конфиденциальности. О существенных изменениях мы
                  уведомим вас по электронной почте или через уведомления на
                  сайте. Рекомендуем регулярно просматривать данную страницу для
                  отслеживания изменений.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
