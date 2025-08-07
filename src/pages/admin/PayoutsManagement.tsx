import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/AdminLayout';

interface PayoutRequest {
  id: number;
  sellerName: string;
  amount: number;
  requestDate: string;
  paymentMethod: string;
  accountDetails: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

const mockPayoutRequests: PayoutRequest[] = [
  {
    id: 1,
    sellerName: "Анна Петрова",
    amount: 15750.50,
    requestDate: "2024-08-07T10:00:00Z",
    paymentMethod: "card",
    accountDetails: "****1234",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    sellerName: "Иван Сидоров",
    amount: 8920.00,
    requestDate: "2024-08-07T14:30:00Z",
    paymentMethod: "sbp",
    accountDetails: "+7900****567",
    priority: "medium",
    status: "pending"
  },
  {
    id: 3,
    sellerName: "Мария Козлова",
    amount: 25340.80,
    requestDate: "2024-08-07T16:15:00Z",
    paymentMethod: "card",
    accountDetails: "****5678",
    priority: "high",
    status: "pending"
  }
];

function PayoutsManagement() {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>(mockPayoutRequests);
  const { toast } = useToast();

  const getPaymentMethodIcon = (method: string) => {
    return method === 'card' ? 'CreditCard' : 'Smartphone';
  };

  const approvePayoutRequest = (requestId: number) => {
    const request = payoutRequests.find(r => r.id === requestId);
    if (!request) return;

    setPayoutRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    ));

    toast({
      title: "✅ Заявка одобрена",
      description: `Выплата ${request.amount.toLocaleString('ru-RU')} ₽ для ${request.sellerName} отправлена в ЮКассу`
    });
  };

  const rejectPayoutRequest = (requestId: number) => {
    const request = payoutRequests.find(r => r.id === requestId);
    if (!request) return;

    setPayoutRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));

    toast({
      title: "❌ Заявка отклонена",
      description: `Выплата для ${request.sellerName} отклонена`
    });
  };

  const pendingRequests = payoutRequests.filter(r => r.status === 'pending');

  return (
    <AdminLayout>
      <Tabs defaultValue="requests" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">💰 Управление выплатами</h1>
            <p className="text-gray-600">Выплаты продавцам через ЮКассу</p>
          </div>
          
          <TabsList>
            <TabsTrigger value="requests">
              Заявки
              {pendingRequests.length > 0 && (
                <Badge className="ml-2 bg-orange-100 text-orange-800">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="requests" className="space-y-6">
          {/* Статистика */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Новых заявок</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {pendingRequests.length}
                    </p>
                  </div>
                  <Icon name="AlertCircle" size={32} className="text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Сумма заявок</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {pendingRequests.reduce((sum, r) => sum + r.amount, 0).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <Icon name="Banknote" size={32} className="text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Приоритетных</p>
                    <p className="text-2xl font-bold text-red-600">
                      {pendingRequests.filter(r => r.priority === 'high').length}
                    </p>
                  </div>
                  <Icon name="AlertTriangle" size={32} className="text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Новые заявки от продавцов */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertCircle" size={24} className="text-orange-600" />
                Заявки на выплату
                {pendingRequests.length > 0 && (
                  <Badge className="bg-orange-100 text-orange-800">
                    {pendingRequests.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Запросы продавцов на вывод заработанных средств
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon name={getPaymentMethodIcon(request.paymentMethod)} size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-orange-900">{request.sellerName}</p>
                        <p className="text-sm text-orange-700">
                          {request.amount.toLocaleString('ru-RU')} ₽ → {request.accountDetails}
                        </p>
                        <p className="text-xs text-orange-600">
                          Заявка от {new Date(request.requestDate).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {request.priority === 'high' && (
                        <Badge className="bg-red-100 text-red-800">Приоритет</Badge>
                      )}
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => approvePayoutRequest(request.id)}
                      >
                        <Icon name="Check" size={16} />
                        Одобрить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => rejectPayoutRequest(request.id)}
                      >
                        <Icon name="X" size={16} />
                        Отклонить
                      </Button>
                    </div>
                  </div>
                ))}
                
                {pendingRequests.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="CheckCircle" size={48} className="mx-auto text-green-500 mb-4" />
                    <p className="text-gray-600 font-medium">Все заявки обработаны</p>
                    <p className="text-sm text-gray-500 mt-1">Новые заявки появятся здесь автоматически</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          {pendingRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" size={24} />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    className="h-16 flex-col" 
                    variant="outline"
                    onClick={() => {
                      pendingRequests.forEach(r => approvePayoutRequest(r.id));
                    }}
                  >
                    <Icon name="CheckCircle2" size={24} className="mb-2 text-green-600" />
                    <span>Одобрить все заявки</span>
                    <span className="text-xs text-gray-500">{pendingRequests.length} заявок</span>
                  </Button>
                  <Button className="h-16 flex-col" variant="outline">
                    <Icon name="Download" size={24} className="mb-2 text-blue-600" />
                    <span>Экспорт отчета</span>
                    <span className="text-xs text-gray-500">Excel/PDF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Инструкция по настройке ЮКассы */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={24} className="text-blue-600" />
                Настройка ЮКассы
              </CardTitle>
              <CardDescription>
                Пошаговая инструкция подключения платежной системы для выплат
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Шаги настройки */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Регистрация в ЮКассе</h3>
                    <p className="text-blue-800 text-sm mb-2">
                      Создайте бизнес-аккаунт в ЮКасса для работы с выплатами
                    </p>
                    <a 
                      href="https://yookassa.ru/joinups/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Icon name="ExternalLink" size={16} />
                      Перейти к регистрации
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Получение API ключей</h3>
                    <p className="text-green-800 text-sm mb-2">
                      В личном кабинете ЮКассы перейдите в раздел "Настройки" → "API ключи"
                    </p>
                    <ul className="text-green-800 text-sm space-y-1 ml-4">
                      <li>• Shop ID (идентификатор магазина)</li>
                      <li>• Secret Key (секретный ключ для выплат)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Настройка переменных окружения</h3>
                    <p className="text-purple-800 text-sm mb-3">
                      Добавьте полученные ключи в файл .env проекта:
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                      VITE_YOOKASSA_SHOP_ID=your_shop_id<br/>
                      VITE_YOOKASSA_SECRET_KEY=test_your_secret_key
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Настройка уведомлений</h3>
                    <p className="text-orange-800 text-sm mb-2">
                      Настройте webhook для получения уведомлений о статусах выплат:
                    </p>
                    <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                      https://calibrestore.ru/api/yookassa/webhook
                    </div>
                    <p className="text-orange-700 text-xs mt-2">
                      * Добавьте этот URL в настройках уведомлений ЮКассы
                    </p>
                  </div>
                </div>
              </div>

              {/* Текущие настройки */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Текущие настройки</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700">Shop ID</Label>
                    <p className="font-mono text-sm mt-1">
                      {import.meta.env.VITE_YOOKASSA_SHOP_ID || 'Не настроено'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700">Режим работы</Label>
                    <p className="text-sm mt-1">
                      {import.meta.env.MODE === 'production' ? '🟢 Production' : '🟡 Test'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Важные замечания */}
              <Alert>
                <Icon name="AlertTriangle" size={16} />
                <AlertTitle>Важные замечания для calibrestore.ru</AlertTitle>
                <AlertDescription className="mt-2">
                  <ul className="space-y-1 text-sm">
                    <li>• Все заявки от продавцов поступают в этот раздел автоматически</li>
                    <li>• Одобренные выплаты отправляются в ЮКассу для обработки</li>
                    <li>• Минимальная сумма выплаты: 500 ₽</li>
                    <li>• Максимальная сумма выплаты: 600,000 ₽</li>
                    <li>• Обработка выплат: 1-3 рабочих дня</li>
                    <li>• Комиссия за выплаты оплачивается платформой</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Контакты поддержки */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Поддержка ЮКассы</h3>
                <p className="text-blue-800 text-sm mb-2">
                  При возникновении вопросов по настройке:
                </p>
                <div className="space-y-1 text-blue-700 text-sm">
                  <p>📞 Телефон: 8 800 250-66-99</p>
                  <p>📧 Email: support@yoomoney.ru</p>
                  <p>🌐 Документация: docs.yookassa.ru</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

export default PayoutsManagement;