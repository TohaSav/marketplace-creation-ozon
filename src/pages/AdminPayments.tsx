import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useYookassa } from "@/hooks/useYookassa";
import { toast } from "@/hooks/use-toast";

export default function AdminPayments() {
  const { config, isLoading, saveConfig, testConnection } = useYookassa();
  const [isEditing, setIsEditing] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [formData, setFormData] = useState(config);

  const handleSave = async () => {
    try {
      await saveConfig(formData);
      setIsEditing(false);
      toast({
        title: "Настройки сохранены",
        description:
          "Конфигурация ЮКассы успешно обновлена и активирована на сайте",
      });
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить настройки ЮКассы",
        variant: "destructive",
      });
    }
  };

  const handleTestConnection = async () => {
    try {
      const result = await testConnection();
      toast({
        title: result.success ? "Успех" : "Ошибка",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    setFormData(config);
    setIsEditing(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Настройки пополнения
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Конфигурация платежной системы ЮКасса
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Badge
              variant={config.isConfigured ? "default" : "secondary"}
              className={
                config.isConfigured
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {config.isConfigured ? "Настроено" : "Требует настройки"}
            </Badge>
          </div>
        </div>

        {/* Статус интеграции */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={20} />
              Статус интеграции ЮКасса
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    config.isConfigured ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium">
                    {config.isConfigured
                      ? "ЮКасса подключена"
                      : "ЮКасса не настроена"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {config.isConfigured
                      ? "Платежи принимаются"
                      : "Необходимо заполнить настройки"}
                  </p>
                </div>
              </div>
              {config.isConfigured && (
                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isLoading}
                >
                  <Icon name="Zap" size={16} className="mr-2" />
                  {isLoading ? "Тестирование..." : "Тест подключения"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Настройки ЮКассы */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Настройки ЮКассы</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => (isEditing ? handleSave() : handleEdit())}
                disabled={isLoading}
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shop ID (Идентификатор магазина)
                  </label>
                  <input
                    type="text"
                    value={isEditing ? formData.shopId : config.shopId}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shopId: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    placeholder="123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Секретный ключ
                  </label>
                  <div className="relative">
                    <input
                      type={showSecretKey ? "text" : "password"}
                      value={isEditing ? formData.secretKey : config.secretKey}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          secretKey: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="live_..."
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      <Icon
                        name={showSecretKey ? "EyeOff" : "Eye"}
                        size={16}
                        className="text-gray-400"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={isEditing ? formData.webhookUrl : config.webhookUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      webhookUrl: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  placeholder="https://yourdomain.com/api/yookassa/webhook"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="testMode"
                  checked={isEditing ? formData.testMode : config.testMode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testMode: e.target.checked,
                    }))
                  }
                  disabled={!isEditing}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label
                  htmlFor="testMode"
                  className="ml-2 text-sm text-gray-900"
                >
                  Тестовый режим
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Инструкция по настройке */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={20} />
              Инструкция по подключению ЮКассы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Шаг 1: Регистрация в ЮКассе
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>
                    Перейдите на{" "}
                    <a
                      href="https://yookassa.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      официальный сайт ЮКассы
                    </a>
                  </li>
                  <li>Зарегистрируйтесь как продавец</li>
                  <li>Пройдите процедуру верификации</li>
                  <li>Подключите нужные методы оплаты</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Шаг 2: Получение данных для интеграции
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Войдите в личный кабинет ЮКассы</li>
                  <li>
                    Перейдите в раздел "Настройки" → "Данные для разработчиков"
                  </li>
                  <li>
                    Скопируйте <strong>shopId</strong> (идентификатор магазина)
                  </li>
                  <li>
                    Создайте и скопируйте <strong>секретный ключ</strong>
                  </li>
                  <li>
                    <strong>Готовые решения:</strong> В разделе ЮКассы "Начните
                    вводить название системы" - выберите из списка готовых
                    интеграций для вашей CMS/платформы
                  </li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Шаг 3: Настройка Webhook
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>
                    В личном кабинете ЮКассы перейдите в "HTTP-уведомления"
                  </li>
                  <li>
                    Добавьте URL:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      https://yourdomain.com/api/yookassa/webhook
                    </code>
                  </li>
                  <li>Выберите события: "Успешный платеж", "Отмена платежа"</li>
                  <li>Сохраните настройки</li>
                </ol>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Шаг 4: Тестирование
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Включите тестовый режим в настройках выше</li>
                  <li>Сохраните конфигурацию</li>
                  <li>Нажмите кнопку "Тест подключения"</li>
                  <li>Проведите тестовый платеж</li>
                  <li>После успешного тестирования отключите тестовый режим</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <Icon
                    name="AlertTriangle"
                    size={20}
                    className="text-yellow-600"
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Важные моменты
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          Никогда не передавайте секретный ключ третьим лицам
                        </li>
                        <li>Используйте HTTPS для webhook URL</li>
                        <li>Тестовые платежи не списывают реальные деньги</li>
                        <li>Webhook должен отвечать статусом 200 OK</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика платежей */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Статистика платежей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Всего платежей</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0 ₽</div>
                <div className="text-sm text-gray-500">Успешные платежи</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">0 ₽</div>
                <div className="text-sm text-gray-500">Отклоненные платежи</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
