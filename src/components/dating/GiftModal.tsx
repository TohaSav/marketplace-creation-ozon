import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Gift, GIFTS, GIFT_CATEGORIES } from '@/types/gifts';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientId: string;
  userBalance: number;
  onSendGift: (gift: Gift) => void;
}

const GiftModal: React.FC<GiftModalProps> = ({
  isOpen,
  onClose,
  recipientName,
  recipientId,
  userBalance,
  onSendGift
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('free');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const categorizedGifts = GIFTS.filter(gift => gift.category === selectedCategory);

  const handleGiftSelect = (gift: Gift) => {
    setSelectedGift(gift);
  };

  const handleSendGift = () => {
    if (!selectedGift) return;

    if (selectedGift.price > userBalance) {
      toast({
        title: "Недостаточно средств",
        description: `Для отправки подарка "${selectedGift.name}" нужно ${selectedGift.price} рублей`,
        variant: "destructive",
      });
      return;
    }

    onSendGift(selectedGift);
    onClose();
    setSelectedGift(null);
    
    toast({
      title: `Подарок отправлен! ${selectedGift.emoji}`,
      description: `Вы подарили ${selectedGift.name} пользователю ${recipientName}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-red-500" />
            Подарок для {recipientName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Баланс пользователя */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Ваш баланс:</span>
              <span className="text-lg font-bold text-blue-900">{userBalance} ₽</span>
            </div>
          </div>

          {/* Категории подарков */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(GIFT_CATEGORIES).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="text-xs"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Сетка подарков */}
          <div className="grid grid-cols-4 gap-3 max-h-64 overflow-y-auto">
            {categorizedGifts.map((gift) => (
              <div
                key={gift.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedGift?.id === gift.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  gift.price > userBalance && gift.price > 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={() => gift.price <= userBalance || gift.price === 0 ? handleGiftSelect(gift) : null}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{gift.emoji}</div>
                  <div className="text-xs font-medium text-gray-800 mb-1">{gift.name}</div>
                  <div className="text-xs">
                    {gift.price === 0 ? (
                      <Badge className="bg-green-100 text-green-800 text-xs">Бесплатно</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">{gift.price} ₽</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Информация о выбранном подарке */}
          {selectedGift && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedGift.emoji}</span>
                  <div>
                    <h4 className="font-medium">{selectedGift.name}</h4>
                    <p className="text-sm text-gray-600">{selectedGift.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {selectedGift.price === 0 ? 'Бесплатно' : `${selectedGift.price} ₽`}
                  </div>
                  <div className="text-xs text-gray-500">
                    Отображается 7 дней
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button 
              onClick={handleSendGift}
              disabled={!selectedGift}
              className="bg-red-500 hover:bg-red-600"
            >
              <Icon name="Gift" size={16} className="mr-2" />
              Подарить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftModal;