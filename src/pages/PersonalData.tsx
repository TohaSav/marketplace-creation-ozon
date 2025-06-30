import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function PersonalData() {
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
              Обработка персональных данных
            </CardTitle>
            <p className="text-muted-foreground text-center">
              Согласие на обработку персональных данных для маркетплейса
              МаркетМастер
              <br />
              Дата последнего обновления:{" "}
              {new Date().toLocaleDateString("ru-RU")}
            </p>
          </CardHeader>

          <CardContent className="prose max-w-none">
            <div className="space-y-8">
              {/* Оператор */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Оператор персональных данных
                </h2>
                <div className="bg-primary/10 p-6 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">ООО «МаркетМастер»</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Юридический адрес:</strong> 115114, г. Москва, ул.
                      Примерная, д. 123, к. 1
                    </p>
                    <p>
                      <strong>Почтовый адрес:</strong> 115114, г. Москва, ул.
                      Примерная, д. 123, к. 1
                    </p>
                    <p>
                      <strong>ОГРН:</strong> 1234567891011
                    </p>
                    <p>
                      <strong>ИНН:</strong> 7712345678
                    </p>
                    <p>
                      <strong>КПП:</strong> 771201001
                    </p>
                    <p>
                      <strong>Телефон:</strong> +7 (800) 123-45-67
                    </p>
                    <p>
                      <strong>Email:</strong> legal@marketmaster.ru
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор осуществляет обработку персональных данных в
                  соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О
                  персональных данных» и иными нормативными правовыми актами
                  Российской Федерации.
                </p>
              </section>

              {/* Категории субъектов */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Категории субъектов персональных данных
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Users" size={18} />
                      Покупатели
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Физические лица, совершающие покупки на маркетплейсе
                    </p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Store" size={18} />
                      Продавцы
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Индивидуальные предприниматели и представители юридических
                      лиц
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="MessageSquare" size={18} />
                      Посетители сайта
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Лица, осуществляющие посещение маркетплейса
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Mail" size={18} />
                      Подписчики
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Лица, подписавшиеся на рассылку и уведомления
                    </p>
                  </div>
                </div>
              </section>

              {/* Персональные данные */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Категории обрабатываемых персональных данных
                </h2>

                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-primary">
                      Идентификационные данные:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
                      <li>Фамилия, имя, отчество</li>
                      <li>Пол</li>
                      <li>Дата рождения</li>
                      <li>Место рождения</li>
                      <li>Гражданство</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-semibold text-secondary">
                      Контактные данные:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
                      <li>Номер телефона</li>
                      <li>Адрес электронной почты</li>
                      <li>Адрес места жительства</li>
                      <li>Адрес доставки</li>
                      <li>Почтовый индекс</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-semibold text-accent">
                      Паспортные данные:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
                      <li>Серия и номер паспорта</li>
                      <li>Дата выдачи паспорта</li>
                      <li>Код подразделения</li>
                      <li>Кем выдан паспорт</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-muted pl-4">
                    <h4 className="font-semibold text-muted-foreground">
                      Финансовые данные:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
                      <li>Номер банковской карты (частично маскированный)</li>
                      <li>Банковские реквизиты</li>
                      <li>Информация о платежах</li>
                      <li>История транзакций</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Цели обработки */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Цели обработки персональных данных
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Основные цели:
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Регистрация пользователей</li>
                      <li>• Обработка заказов</li>
                      <li>• Организация доставки</li>
                      <li>• Обеспечение безопасности</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Дополнительные цели:
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Маркетинговые исследования</li>
                      <li>• Персонализация предложений</li>
                      <li>• Аналитика и статистика</li>
                      <li>• Обслуживание клиентов</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Правовые основания */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Правовые основания обработки
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                    <Icon
                      name="FileText"
                      size={20}
                      className="text-amber-600 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-amber-800">
                        Согласие субъекта персональных данных
                      </h4>
                      <p className="text-sm text-amber-700">
                        п. 1 ч. 1 ст. 6 ФЗ «О персональных данных»
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Icon
                      name="Scale"
                      size={20}
                      className="text-blue-600 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-blue-800">
                        Исполнение договора
                      </h4>
                      <p className="text-sm text-blue-700">
                        п. 5 ч. 1 ст. 6 ФЗ «О персональных данных»
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Icon
                      name="Shield"
                      size={20}
                      className="text-green-600 mt-1"
                    />
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Законные интересы
                      </h4>
                      <p className="text-sm text-green-700">
                        п. 6 ч. 1 ст. 6 ФЗ «О персональных данных»
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Способы обработки */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Способы обработки персональных данных
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Icon name="Zap" size={18} />
                      Автоматизированная обработка
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Сбор, запись, систематизация</li>
                      <li>• Накопление, хранение</li>
                      <li>• Уточнение, обновление</li>
                      <li>• Использование, передача</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <Icon name="User" size={18} />
                      Неавтоматизированная обработка
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Обработка обращений</li>
                      <li>• Консультации по продуктам</li>
                      <li>• Рассмотрение спорных ситуаций</li>
                      <li>• Верификация документов</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Сроки обработки */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Сроки обработки персональных данных
                </h2>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon
                          name="Clock"
                          size={24}
                          className="text-cyan-600"
                        />
                      </div>
                      <h4 className="font-semibold text-cyan-800">
                        Активные пользователи
                      </h4>
                      <p className="text-sm text-cyan-700 mt-1">
                        До момента удаления аккаунта
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon
                          name="Calendar"
                          size={24}
                          className="text-blue-600"
                        />
                      </div>
                      <h4 className="font-semibold text-blue-800">
                        Неактивные пользователи
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        3 года с момента последней активности
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon
                          name="Archive"
                          size={24}
                          className="text-indigo-600"
                        />
                      </div>
                      <h4 className="font-semibold text-indigo-800">
                        Архивные данные
                      </h4>
                      <p className="text-sm text-indigo-700 mt-1">
                        5 лет для финансовой отчетности
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Права субъектов */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. Права субъектов персональных данных
                </h2>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                    <Icon
                      name="Eye"
                      size={20}
                      className="text-emerald-600 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-800">
                        Право на доступ к персональным данным
                      </h4>
                      <p className="text-sm text-emerald-700 mt-1">
                        Получение информации о факте обработки, целях, способах
                        и сроках
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Icon
                      name="Edit"
                      size={20}
                      className="text-blue-600 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800">
                        Право на уточнение персональных данных
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Исправление неточных, неполных или недостоверных данных
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <Icon
                      name="Trash2"
                      size={20}
                      className="text-red-600 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800">
                        Право на уничтожение персональных данных
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        Удаление персональных данных при определенных условиях
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <Icon
                      name="XCircle"
                      size={20}
                      className="text-orange-600 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-800">
                        Право на отзыв согласия
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Отзыв ранее данного согласия на обработку персональных
                        данных
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Меры безопасности */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. Меры по обеспечению безопасности персональных данных
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">
                      Организационные меры:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Shield"
                          size={16}
                          className="text-primary mt-1"
                        />
                        <span className="text-sm">
                          Назначение ответственных лиц
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Users"
                          size={16}
                          className="text-primary mt-1"
                        />
                        <span className="text-sm">Обучение сотрудников</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="FileText"
                          size={16}
                          className="text-primary mt-1"
                        />
                        <span className="text-sm">
                          Разработка локальных актов
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="CheckSquare"
                          size={16}
                          className="text-primary mt-1"
                        />
                        <span className="text-sm">
                          Контроль соблюдения требований
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary">
                      Технические меры:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Lock"
                          size={16}
                          className="text-secondary mt-1"
                        />
                        <span className="text-sm">
                          Криптографическая защита
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Server"
                          size={16}
                          className="text-secondary mt-1"
                        />
                        <span className="text-sm">
                          Защищенные сервера хранения
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Key"
                          size={16}
                          className="text-secondary mt-1"
                        />
                        <span className="text-sm">Системы аутентификации</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon
                          name="Activity"
                          size={16}
                          className="text-secondary mt-1"
                        />
                        <span className="text-sm">Мониторинг доступа</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Контакты */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Контактная информация
                </h2>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    По вопросам обработки персональных данных и реализации своих
                    прав вы можете обратиться:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Mail" size={18} className="text-primary" />
                        <div>
                          <span className="font-medium">Email:</span>
                          <br />
                          <span className="text-sm text-muted-foreground">
                            legal@marketmaster.ru
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon
                          name="Phone"
                          size={18}
                          className="text-secondary"
                        />
                        <div>
                          <span className="font-medium">Телефон:</span>
                          <br />
                          <span className="text-sm text-muted-foreground">
                            +7 (800) 123-45-67
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon
                          name="MapPin"
                          size={18}
                          className="text-accent mt-1"
                        />
                        <div>
                          <span className="font-medium">Почтовый адрес:</span>
                          <br />
                          <span className="text-sm text-muted-foreground">
                            115114, г. Москва,
                            <br />
                            ул. Примерная, д. 123, к. 1
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon
                          name="Clock"
                          size={18}
                          className="text-muted-foreground"
                        />
                        <div>
                          <span className="font-medium">Часы работы:</span>
                          <br />
                          <span className="text-sm text-muted-foreground">
                            Пн-Пт: 9:00-18:00 (МСК)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Заключение */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  11. Заключительные положения
                </h2>
                <div className="bg-muted/20 p-6 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Настоящее согласие действует с момента выражения согласия и
                    до момента его отзыва или уничтожения персональных данных.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Оператор оставляет за собой право вносить изменения в
                    настоящее согласие. О существенных изменениях субъект
                    персональных данных будет уведомлен любым доступным
                    способом.
                  </p>
                  <div className="bg-primary/10 p-4 rounded border-l-4 border-primary">
                    <p className="text-sm font-medium">
                      Важно: Продолжая использовать наш маркетплейс, вы
                      подтверждаете свое согласие на обработку персональных
                      данных в соответствии с условиями данного согласия.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
