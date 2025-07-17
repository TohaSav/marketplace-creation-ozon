import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AddGiftModal from '@/components/admin/AddGiftModal';

export interface Gift {
  id: string;
  icon: string;
  name: string;
  price: number;
  createdAt: string;
}

const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = () => {
    const savedGifts = localStorage.getItem('adminGifts');
    if (savedGifts) {
      setGifts(JSON.parse(savedGifts));
    }
  };

  const handleAddGift = (gift: Omit<Gift, 'id' | 'createdAt'>) => {
    const newGift: Gift = {
      ...gift,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedGifts = [...gifts, newGift];
    setGifts(updatedGifts);
    localStorage.setItem('adminGifts', JSON.stringify(updatedGifts));
    setIsAddModalOpen(false);
  };

  const handleDeleteGift = (giftId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот подарок?')) return;
    
    const updatedGifts = gifts.filter(gift => gift.id !== giftId);
    setGifts(updatedGifts);
    localStorage.setItem('adminGifts', JSON.stringify(updatedGifts));
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Бесплатно' : `${price}₽`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Icon name="Gift" size={32} className="text-pink-600" />
                Управление подарками
              </h1>
              <p className="text-gray-600 mt-2">
                Добавляйте и управляйте подарками для модуля знакомств
              </p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить подарок
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-pink-100">
                <Icon name="Gift" size={24} className="text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего подарков</p>
                <p className="text-2xl font-bold text-gray-900">{gifts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Icon name="Heart" size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Бесплатных</p>
                <p className="text-2xl font-bold text-gray-900">
                  {gifts.filter(g => g.price === 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Icon name="CreditCard" size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Платных</p>
                <p className="text-2xl font-bold text-gray-900">
                  {gifts.filter(g => g.price > 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Список подарков */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Список подарков</h2>
          </div>

          {gifts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Gift" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Пока нет подарков
              </h3>
              <p className="text-gray-600 mb-6">
                Добавьте первый подарок для модуля знакомств
              </p>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить подарок
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {gifts.map((gift) => (
                <div 
                  key={gift.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{gift.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{gift.name}</h3>
                    <div className={`text-lg font-bold mb-4 ${
                      gift.price === 0 ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {formatPrice(gift.price)}
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      Добавлен: {new Date(gift.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                    <Button
                      onClick={() => handleDeleteGift(gift.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления подарка */}
      <AddGiftModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGift}
      />
    </div>
  );
};

export default GiftsPage;