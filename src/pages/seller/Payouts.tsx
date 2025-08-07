import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { yooKassaService } from '@/services/yookassaService';

interface PaymentMethod {
  id: string;
  type: 'card' | 'sbp';
  title: string;
  details: string;
  isDefault: boolean;
}

interface PayoutHistory {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
  paymentMethod: PaymentMethod;
  yookassaPaymentId?: string;
  failureReason?: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    title: 'Банковская карта',
    details: '•••• •••• •••• 1234',
    isDefault: true
  },
  {
    id: '2', 
    type: 'sbp',
    title: 'СБП',
    details: '+7 900 ••• •• 67',
    isDefault: false
  }
];

const mockPayoutHistory: PayoutHistory[] = [
  {
    id: '1',
    amount: 25750.50,
    status: 'completed',
    createdAt: '2024-07-28T10:00:00Z',
    processedAt: '2024-07-28T11:30:00Z',
    paymentMethod: mockPaymentMethods[0],
    yookassaPaymentId: 'yookassa_2c5d1c4a_0001'
  },
  {
    id: '2',
    amount: 15200.00,
    status: 'processing',
    createdAt: '2024-07-30T14:00:00Z',
    paymentMethod: mockPaymentMethods[1],
    yookassaPaymentId: 'yookassa_2c5d1c4a_0002'
  },
  {
    id: '3',
    amount: 8900.25,
    status: 'failed',
    createdAt: '2024-07-25T09:15:00Z',
    paymentMethod: mockPaymentMethods[0],
    failureReason: 'Недостаточно средств на счете'
  }
];

export default function Payouts() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [balance] = useState(42350.75); // В реальном проекте из user данных
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [payoutHistory, setPayoutHistory] = useState<PayoutHistory[]>(mockPayoutHistory);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);

  const minPayoutAmount = 500;
  const maxPayoutAmount = Math.min(balance, 600000);

  const getStatusBadge = (status: PayoutHistory['status']) => {
    const variants = {
      pending: { className: 'bg-yellow-100 text-yellow-800', label: 'Ожидает' },
      processing: { className: 'bg-blue-100 text-blue-800', label: 'Обработка' },
      completed: { className: 'bg-green-100 text-green-800', label: 'Выполнен' },
      failed: { className: 'bg-red-100 text-red-800', label: 'Ошибка' }
    };

    const variant = variants[status];
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (type: string) => {
    return type === 'card' ? 'CreditCard' : 'Smartphone';
  };

  const requestPayout = async () => {
    if (!selectedMethod || !payoutAmount) return;

    const amount = parseFloat(payoutAmount);
    const validation = yooKassaService.validatePayoutAmount(amount, minPayoutAmount);
    
    if (!validation.isValid) {
      toast({
        title: "Ошибка",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: "Недостаточно средств",
        description: "Сумма превышает доступный баланс",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Создаем выплату через ЮКассу
      const payoutResponse = await yooKassaService.createPayout(
        user?.id || 1,
        amount,
        selectedMethod.type,
        selectedMethod.details,
        `Выплата продавцу ${user?.name || 'Неизвестный'}`
      );

      // Добавляем в историю
      const newPayout: PayoutHistory = {
        id: payoutResponse.id,
        amount,
        status: 'processing',
        createdAt: new Date().toISOString(),
        paymentMethod: selectedMethod,
        yookassaPaymentId: payoutResponse.id
      };

      setPayoutHistory([newPayout, ...payoutHistory]);

      toast({
        title: "✅ Заявка на выплату отправлена",
        description: `${amount.toLocaleString('ru-RU')} ₽ будет переведено через ЮКассу`,
        duration: 5000
      });

      setPayoutAmount('');
      setSelectedMethod(null);

    } catch (error) {
      toast({
        title: "Ошибка создания выплаты",
        description: error instanceof Error ? error.message : "Попробуйте позже",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalProcessing = payoutHistory
    .filter(p => p.status === 'processing' || p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCompleted = payoutHistory
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">💰 Выплаты</h1>
          <p className="text-gray-600">Управление выплатами через ЮКассу</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Icon name="ArrowUp" size={20} />
              Запросить выплату
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Новая выплата</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700">Доступно к выводу:</span>
                  <span className="font-bold text-green-800">
                    {balance.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                {totalProcessing > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">В обработке:</span>
                    <span className="font-medium text-blue-800">
                      {totalProcessing.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}
              </div>

              <div>
                <Label>Способ получения</Label>
                <Select onValueChange={(value) => {
                  const method = paymentMethods.find(m => m.id === value);
                  setSelectedMethod(method || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <Icon name={getPaymentMethodIcon(method.type)} size={16} />
                          <span>{method.title}</span>
                          <span className="text-gray-500">{method.details}</span>
                          {method.isDefault && (
                            <Badge variant="outline" className="text-xs">По умолчанию</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Сумма выплаты (₽)</Label>
                <Input
                  type="number"
                  placeholder={`От ${minPayoutAmount.toLocaleString('ru-RU')}`}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  min={minPayoutAmount}
                  max={maxPayoutAmount}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Минимум: {minPayoutAmount.toLocaleString('ru-RU')} ₽</span>
                  <span>Максимум: {maxPayoutAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Условия выплат:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Выплаты через ЮКассу</li>
                      <li>• Обработка: 1-3 рабочих дня</li>
                      <li>• Комиссия: 0% для продавцов</li>
                      <li>• Доступно 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={requestPayout}
                disabled={isProcessing || !selectedMethod || !payoutAmount}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Отправка запроса...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={16} />
                    Отправить через ЮКассу
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Баланс</p>
                <p className="text-2xl font-bold text-green-600">
                  {balance.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <Icon name="Wallet" size={32} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В обработке</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalProcessing.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <Icon name="Clock" size={32} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Выплачено</p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalCompleted.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <Icon name="TrendingUp" size={32} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Способы получения */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon name="CreditCard" size={24} />
              Способы получения средств
            </span>
            <Button variant="outline" onClick={() => setShowAddMethod(true)}>
              <Icon name="Plus" size={16} />
              Добавить способ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name={getPaymentMethodIcon(method.type)} size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{method.title}</p>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge variant="outline">По умолчанию</Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <Icon name="Settings" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* История выплат */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={24} />
            История выплат
          </CardTitle>
          <CardDescription>
            Последние операции по выводу средств
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payoutHistory.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Wallet" size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Выплат пока не было</p>
                <p className="text-sm text-gray-400">Запросите первую выплату прямо сейчас!</p>
              </div>
            ) : (
              payoutHistory.map(payout => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name={getPaymentMethodIcon(payout.paymentMethod.type)} size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {payout.amount.toLocaleString('ru-RU')} ₽
                      </p>
                      <p className="text-sm text-gray-600">
                        {payout.paymentMethod.title} • {payout.paymentMethod.details}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payout.createdAt).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {payout.yookassaPaymentId && (
                        <p className="text-xs text-gray-400">
                          ID: {payout.yookassaPaymentId}
                        </p>
                      )}
                      {payout.failureReason && (
                        <p className="text-xs text-red-600">
                          {payout.failureReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    {getStatusBadge(payout.status)}
                    {payout.processedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Обработано: {new Date(payout.processedAt).toLocaleDateString('ru-RU')}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}