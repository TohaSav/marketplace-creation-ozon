import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Gift } from '@/pages/admin/GiftsPage';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientId: string;
  userBalance: number;
  onBalanceChange: (amount: number) => void;
  onGiftSent?: () => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ 
  isOpen, 
  onClose, 
  recipientName, 
  recipientId,
  userBalance,
  onBalanceChange,
  onGiftSent
}) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadGifts();
    }
  }, [isOpen]);

  const loadGifts = () => {
    const savedGifts = localStorage.getItem('adminGifts');
    if (savedGifts) {
      setGifts(JSON.parse(savedGifts));
    }
  };

  const handleSendGift = () => {
    if (!selectedGift) return;

    // Проверяем баланс для платных подарков
    if (selectedGift.price > 0 && userBalance < selectedGift.price) {
      toast({
        title: "Недостаточно средств",
        description: `Для отправки этого подарка нужно ${selectedGift.price}₽`,
        variant: "destructive"
      });
      return;
    }

    // Списываем средства если подарок платный
    if (selectedGift.price > 0) {
      onBalanceChange(-selectedGift.price);
    }

    // Сохраняем подарок в профиль получателя
    const profileGiftsKey = `profile_gifts_${recipientId}`;
    const existingGifts = JSON.parse(localStorage.getItem(profileGiftsKey) || '[]');
    const newGift = {
      ...selectedGift,
      sentAt: new Date().toISOString(),
      senderId: 'current_user' // В реальном приложении это будет ID текущего пользователя
    };
    
    localStorage.setItem(profileGiftsKey, JSON.stringify([...existingGifts, newGift]));

    toast({
      title: "Подарок отправлен! 🎁",
      description: `${selectedGift.icon} ${selectedGift.name} отправлен пользователю ${recipientName}`,
    });

    // Уведомляем о отправке подарка
    if (onGiftSent) {
      onGiftSent();
    }

    onClose();
    setSelectedGift(null);
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Бесплатно' : `${price}₽`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-pink-600" />
            Отправить подарок пользователю {recipientName}
          </h2>
          <Button onClick={onClose} variant="outline" size="sm">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Баланс */}
        <div className="px-6 py-3 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Ваш баланс:</span>
            <span className="font-bold text-blue-600">{userBalance.toFixed(2)}₽</span>
          </div>
        </div>

        {/* Список подарков */}
        <div className="p-6">
          {gifts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Gift" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Подарки недоступны
              </h3>
              <p className="text-gray-600">
                Администратор пока не добавил подарки в систему
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Выберите подарок:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {gifts.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift)}
                    className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                      selectedGift?.id === gift.id
                        ? 'border-pink-500 bg-pink-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{gift.icon}</div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {gift.name}
                      </h4>
                      <div className={`text-sm font-bold ${
                        gift.price === 0 ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {formatPrice(gift.price)}
                      </div>
                      {gift.price > 0 && userBalance < gift.price && (
                        <div className="text-xs text-red-500 mt-1">
                          Недостаточно средств
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Выбранный подарок и кнопки */}
        {selectedGift && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedGift.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedGift.name}</h4>
                  <p className={`text-sm ${
                    selectedGift.price === 0 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {formatPrice(selectedGift.price)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleSendGift}
                disabled={selectedGift.price > 0 && userBalance < selectedGift.price}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white disabled:bg-gray-400"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить подарок
              </Button>
              <Button
                onClick={() => setSelectedGift(null)}
                variant="outline"
                className="px-6"
              >
                Отмена
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftModal;