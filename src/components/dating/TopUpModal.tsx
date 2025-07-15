import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  datingBalance: number;
  onTopUp: (amount: number) => void;
}

const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  datingBalance,
  onTopUp,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const topUpAmount = parseFloat(amount);
    
    if (!topUpAmount || topUpAmount <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму для пополнения",
        variant: "destructive",
      });
      return;
    }
    
    if (topUpAmount > walletBalance) {
      toast({
        title: "Недостаточно средств",
        description: "На вашем кошельке недостаточно средств для пополнения",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onTopUp(topUpAmount);
      
      toast({
        title: "Успешно!",
        description: `Баланс пополнен на ${topUpAmount} ₽`,
      });
      
      setAmount('');
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось пополнить баланс. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const quickAmounts = [50, 100, 200, 500];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Wallet" size={20} className="text-green-500" />
            Пополнить баланс знакомств
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Баланс кошелька:</span>
              <span className="font-medium text-green-600">{walletBalance} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Баланс знакомств:</span>
              <span className="font-medium text-blue-600">{datingBalance} ₽</span>
            </div>
          </div>
          
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
                min="1"
                max={walletBalance}
                step="1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Быстрое пополнение</Label>
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  disabled={quickAmount > walletBalance}
                  className="text-xs"
                >
                  {quickAmount} ₽
                </Button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="flex items-center gap-2 text-blue-700">
              <Icon name="Info" size={16} />
              <span className="text-sm font-medium">Информация о тарифах</span>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              <div className="flex items-center gap-1">
                <Icon name="Flame" size={14} className="text-orange-500" />
                <span>Супер-лайк: 10 ₽</span>
              </div>
            </div>
          </div>
          
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
              disabled={isProcessing || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > walletBalance}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="ArrowRight" size={16} className="mr-2" />
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

export default TopUpModal;