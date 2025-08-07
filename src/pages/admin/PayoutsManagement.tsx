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

interface Seller {
  id: number;
  name: string;
  email: string;
  balance: number;
  totalEarnings: number;
  lastPayout: string | null;
  paymentMethod: string;
  accountDetails: string;
}

interface Payout {
  id: number;
  sellerId: number;
  sellerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
  paymentMethod: string;
  accountDetails: string;
  yookassaPaymentId?: string;
}

const mockSellers: Seller[] = [
  {
    id: 1,
    name: "Анна Петрова",
    email: "anna@example.com",
    balance: 15750.50,
    totalEarnings: 125680.30,
    lastPayout: "2024-07-28",
    paymentMethod: "card",
    accountDetails: "****1234"
  },
  {
    id: 2,
    name: "Иван Сидоров",
    email: "ivan@example.com",
    balance: 8920.00,
    totalEarnings: 89450.75,
    lastPayout: "2024-07-25",
    paymentMethod: "sbp",
    accountDetails: "+7900****567"
  },
  {
    id: 3,
    name: "Мария Козлова",
    email: "maria@example.com",
    balance: 25340.80,
    totalEarnings: 156790.45,
    lastPayout: null,
    paymentMethod: "card",
    accountDetails: "****5678"
  }
];

const mockPayouts: Payout[] = [
  {
    id: 1,
    sellerId: 1,
    sellerName: "Анна Петрова",
    amount: 12500.00,
    status: 'completed',
    createdAt: "2024-07-28T10:00:00Z",
    processedAt: "2024-07-28T11:30:00Z",
    paymentMethod: "card",
    accountDetails: "****1234",
    yookassaPaymentId: "2c5d1c4a-0000-5000-8000-1d3c1c4a0001"
  },
  {
    id: 2,
    sellerId: 2,
    sellerName: "Иван Сидоров", 
    amount: 8500.00,
    status: 'processing',
    createdAt: "2024-07-30T14:00:00Z",
    paymentMethod: "sbp",
    accountDetails: "+7900****567",
    yookassaPaymentId: "2c5d1c4a-0000-5000-8000-1d3c1c4a0002"
  }
];

export default function PayoutsManagement() {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status: Payout['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800', 
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'Ожидает',
      processing: 'Обработка',
      completed: 'Выполнен',
      failed: 'Ошибка'
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return 'CreditCard';
      case 'sbp': return 'Smartphone';
      case 'wallet': return 'Wallet';
      default: return 'CircleHelp';
    }
  };

  const createPayout = async () => {
    if (!selectedSeller || !payoutAmount) return;

    const amount = parseFloat(payoutAmount);
    if (amount <= 0 || amount > selectedSeller.balance) {
      toast({
        title: "Ошибка",
        description: "Некорректная сумма выплаты",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Имитация API вызова к ЮКассе
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPayout: Payout = {
        id: payouts.length + 1,
        sellerId: selectedSeller.id,
        sellerName: selectedSeller.name,
        amount,
        status: 'processing',
        createdAt: new Date().toISOString(),
        paymentMethod: selectedSeller.paymentMethod,
        accountDetails: selectedSeller.accountDetails,
        yookassaPaymentId: `yookassa_${Date.now()}`
      };

      setPayouts([newPayout, ...payouts]);
      
      // Обновляем баланс продавца
      setSellers(sellers.map(seller => 
        seller.id === selectedSeller.id 
          ? { ...seller, balance: seller.balance - amount }
          : seller
      ));

      toast({
        title: "✅ Выплата создана",
        description: `Отправлен запрос на выплату ${amount.toLocaleString('ru-RU')} ₽ через ЮКассу`
      });

      setSelectedSeller(null);
      setPayoutAmount('');

    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать выплату",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPendingAmount = payouts
    .filter(p => p.status === 'pending' || p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCompletedAmount = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">💰 Управление выплатами</h1>
          <p className="text-gray-600">Выплаты продавцам через ЮКассу</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Icon name="Plus" size={20} />
              Создать выплату
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Новая выплата</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Выберите продавца</Label>
                <Select onValueChange={(value) => {
                  const seller = sellers.find(s => s.id.toString() === value);
                  setSelectedSeller(seller || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите продавца" />
                  </SelectTrigger>
                  <SelectContent>
                    {sellers.filter(s => s.balance > 500).map(seller => (
                      <SelectItem key={seller.id} value={seller.id.toString()}>
                        {seller.name} - {seller.balance.toLocaleString('ru-RU')} ₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSeller && (
                <>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={getPaymentMethodIcon(selectedSeller.paymentMethod)} size={16} />
                      <span className="text-sm font-medium">
                        {selectedSeller.paymentMethod === 'card' ? 'Банковская карта' : 'СБП'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Реквизиты: {selectedSeller.accountDetails}
                    </p>
                    <p className="text-sm text-gray-600">
                      Доступно: {selectedSeller.balance.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <div>
                    <Label>Сумма выплаты (₽)</Label>
                    <Input
                      type="number"
                      placeholder="Введите сумму"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      max={selectedSeller.balance}
                      min="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Минимум 500 ₽, максимум {selectedSeller.balance.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <Button 
                    onClick={createPayout}
                    disabled={isProcessing || !payoutAmount}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} />
                        Отправить выплату через ЮКассу
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В обработке</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalPendingAmount.toLocaleString('ru-RU')} ₽
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
                <p className="text-2xl font-bold text-green-600">
                  {totalCompletedAmount.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Продавцов</p>
                <p className="text-2xl font-bold">
                  {sellers.length}
                </p>
              </div>
              <Icon name="Users" size={32} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего выплат</p>
                <p className="text-2xl font-bold">
                  {payouts.length}
                </p>
              </div>
              <Icon name="Activity" size={32} className="text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* История выплат */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={24} />
            История выплат
          </CardTitle>
          <CardDescription>
            Последние операции по выплатам продавцам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map(payout => (
              <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Icon name={getPaymentMethodIcon(payout.paymentMethod)} size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">{payout.sellerName}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(payout.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                    {payout.yookassaPaymentId && (
                      <p className="text-xs text-gray-500">
                        ID: {payout.yookassaPaymentId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold">
                      {payout.amount.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-xs text-gray-500">
                      {payout.accountDetails}
                    </p>
                  </div>
                  {getStatusBadge(payout.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Продавцы с балансом */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={24} />
            Продавцы с балансом
          </CardTitle>
          <CardDescription>
            Продавцы, готовые к получению выплат
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sellers
              .filter(seller => seller.balance >= 500)
              .map(seller => (
                <div key={seller.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-gray-600">{seller.email}</p>
                      {seller.lastPayout && (
                        <p className="text-xs text-gray-500">
                          Последняя выплата: {new Date(seller.lastPayout).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {seller.balance.toLocaleString('ru-RU')} ₽
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Icon name={getPaymentMethodIcon(seller.paymentMethod)} size={14} />
                        {seller.accountDetails}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSeller(seller);
                            setPayoutAmount(seller.balance.toString());
                          }}
                        >
                          <Icon name="Send" size={16} />
                          Выплатить
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}