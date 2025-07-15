import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import AuthPrompt from '@/components/dating/AuthPrompt';
import YukassaTopUp from '@/components/wallet/YukassaTopUp';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0); // Изначально баланс равен 0
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  
  // Имитация истории транзакций (пока пустая)
  const [transactions] = useState<Transaction[]>([]);

  const handleTopUp = () => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Для пополнения кошелька необходимо войти в систему",
        variant: "destructive",
      });
      return;
    }
    
    setIsTopUpModalOpen(true);
  };

  const handleTopUpSubmit = (amount: number) => {
    // Здесь будет реальная логика пополнения через ЮKassa
    // Пока что имитируем успешное пополнение
    setBalance(prev => prev + amount);
    toast({
      title: "Заявка отправлена",
      description: `Заявка на пополнение ${amount} ₽ отправлена администратору`,
    });
  };

  const handleTransfer = () => {
    toast({
      title: "Перевод средств",
      description: "Функция перевода средств в разработке",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Icon name="TrendingUp" size={16} className="text-green-500" />;
      case 'withdraw':
        return <Icon name="TrendingDown" size={16} className="text-red-500" />;
      case 'transfer':
        return <Icon name="ArrowLeftRight" size={16} className="text-blue-500" />;
      default:
        return <Icon name="Circle" size={16} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Выполнено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">В обработке</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Отклонено</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  if (!user) {
    return <AuthPrompt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💰 Личный кошелек
          </h1>
          <p className="text-gray-600">
            Управляйте своими финансами
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100">
                Текущий баланс
              </CardDescription>
              <CardTitle className="text-4xl font-bold">
                {balance.toLocaleString()} ₽
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-3">
                <Button
                  onClick={handleTopUp}
                  className="bg-white text-blue-600 hover:bg-blue-50 flex-1"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Пополнить
                </Button>
                <Button
                  onClick={handleTransfer}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 flex-1"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Перевести
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Wallet" size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Пополнить</h3>
                <p className="text-sm text-gray-600">Через ЮKassa</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="ArrowLeftRight" size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Перевести</h3>
                <p className="text-sm text-gray-600">На другой счет</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="CreditCard" size={24} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Карты</h3>
                <p className="text-sm text-gray-600">Управление</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" size={20} />
                История операций
              </CardTitle>
              <CardDescription>
                Все ваши транзакции
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="FileText" size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Пока операций нет
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Здесь появятся ваши транзакции после первого пополнения
                  </p>
                  <Button onClick={handleTopUp} className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Пополнить кошелек
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-800">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'deposit' ? 'text-green-600' : 
                          transaction.type === 'withdraw' ? 'text-red-600' : 
                          'text-blue-600'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {transaction.amount.toLocaleString()} ₽
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Информация о кошельке
                  </h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• Пополнение кошелька происходит только через админку</p>
                    <p>• Средства можно использовать для покупок на сайте</p>
                    <p>• Переводы между пользователями доступны</p>
                    <p>• Комиссия за операции не взимается</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Модальное окно пополнения */}
      <YukassaTopUp
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onTopUp={handleTopUpSubmit}
      />
    </div>
  );
};

export default WalletPage;