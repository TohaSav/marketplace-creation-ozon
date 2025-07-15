import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface YukassaTopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number) => void;
}

const YukassaTopUp: React.FC<YukassaTopUpProps> = ({
  isOpen,
  onClose,
  onTopUp,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const topUpAmount = parseFloat(amount);
    
    if (!topUpAmount || topUpAmount < 100) {
      toast({
        title: "Ошибка",
        description: "Минимальная сумма пополнения 100 ₽",
        variant: "destructive",
      });
      return;
    }
    
    if (topUpAmount > 50000) {
      toast({
        title: "Ошибка",
        description: "Максимальная сумма пополнения 50 000 ₽",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Имитация запроса к ЮKassa
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Здесь будет реальная интеграция с ЮKassa через админку
      toast({
        title: "Запрос отправлен",
        description: "Ваш запрос на пополнение передан в админку. Ожидайте подтверждения.",
      });
      
      setAmount('');
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить запрос. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} className="text-green-500" />
            Пополнение через ЮKassa
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Сумма пополнения</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-8"
                min="100"
                max="50000"
                step="1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
            </div>
            <p className="text-xs text-gray-500">
              Минимум: 100 ₽ • Максимум: 50 000 ₽
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Быстрый выбор</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs"
                >
                  {quickAmount.toLocaleString()} ₽
                </Button>
              ))}
            </div>
          </div>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Icon name="Shield" size={16} className="text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 text-sm mb-1">
                    Безопасные платежи
                  </h4>
                  <div className="space-y-1 text-xs text-green-800">
                    <p>• Платежи обрабатываются через ЮKassa</p>
                    <p>• Средства поступают после подтверждения админом</p>
                    <p>• Комиссии за пополнение нет</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isProcessing || !amount || parseFloat(amount) < 100}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Пополнить
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default YukassaTopUp;