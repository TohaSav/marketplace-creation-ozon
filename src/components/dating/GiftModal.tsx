import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Profile } from '@/types/dating';

interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  emoji: string;
}

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  userBalance: number;
  onGiftSent: (giftId: string, cost: number) => void;
}

const gifts: Gift[] = [
  { id: '1', name: 'Роза', icon: 'Heart', price: 0, emoji: '🌹' },
  { id: '2', name: 'Поцелуй', icon: 'Heart', price: 5, emoji: '💋' },
  { id: '3', name: 'Конфета', icon: 'Gift', price: 5, emoji: '🍬' },
  { id: '4', name: 'Цветы', icon: 'Flower', price: 5, emoji: '💐' },
  { id: '5', name: 'Торт', icon: 'Cake', price: 5, emoji: '🎂' },
  { id: '6', name: 'Шампанское', icon: 'Wine', price: 5, emoji: '🍾' },
  { id: '7', name: 'Мишка', icon: 'Heart', price: 5, emoji: '🧸' },
  { id: '8', name: 'Сердце', icon: 'Heart', price: 5, emoji: '💖' },
];

const GiftModal: React.FC<GiftModalProps> = ({
  isOpen,
  onClose,
  profile,
  userBalance,
  onGiftSent
}) => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleGiftSend = (gift: Gift) => {
    if (gift.price > userBalance) {
      toast({
        title: "Недостаточно средств",
        description: `Для отправки подарка "${gift.name}" нужно ${gift.price} монет`,
        variant: "destructive",
      });
      return;
    }

    onGiftSent(gift.id, gift.price);
    
    toast({
      title: "Подарок отправлен! 🎁",
      description: `Вы отправили "${gift.name}" пользователю ${profile?.name}`,
    });
    
    onClose();
  };

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Подарки для {profile.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Icon name="Coins" size={16} />
            <span>Ваш баланс: {userBalance} монет</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedGift?.id === gift.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
              onClick={() => setSelectedGift(gift)}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{gift.emoji}</div>
                <div className="text-xs font-medium text-gray-700 mb-1">
                  {gift.name}
                </div>
                <div className="text-xs text-gray-500">
                  {gift.price === 0 ? 'Бесплатно' : `${gift.price} монет`}
                </div>
              </div>
              
              {gift.price > userBalance && (
                <div className="absolute inset-0 bg-gray-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Lock" size={20} className="text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            onClick={() => selectedGift && handleGiftSend(selectedGift)}
            disabled={!selectedGift || (selectedGift.price > userBalance)}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            <Icon name="Gift" size={16} className="mr-2" />
            Отправить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftModal;