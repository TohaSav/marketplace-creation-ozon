import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AddGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (gift: { icon: string; name: string; price: number }) => void;
}

const giftIcons = [
  '💎', '💍', '👑', '🌹', '💐', '🌸', '💖', '💕', 
  '💘', '💝', '🎁', '🧸', '🎀', '🦋', '✨', '⭐',
  '🥂', '🍾', '🍷', '🍫', '🍰', '🎂', '☕', '🌺',
  '🌻', '🌷', '🎵', '🎶', '🎉', '💯', '❤️', '🧳'
];

const AddGiftModal: React.FC<AddGiftModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIcon || !name.trim()) {
      alert('Пожалуйста, выберите иконку и введите название подарка');
      return;
    }

    const priceValue = parseFloat(price) || 0;
    
    onAdd({
      icon: selectedIcon,
      name: name.trim(),
      price: priceValue
    });

    // Очищаем форму
    setSelectedIcon('');
    setName('');
    setPrice('');
  };

  const handleClose = () => {
    setSelectedIcon('');
    setName('');
    setPrice('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-pink-600" />
            Добавить подарок
          </h2>
          <Button onClick={handleClose} variant="outline" size="sm">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Содержимое */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Выбор иконки */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Выберите иконку подарка
            </label>
            <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {giftIcons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-14 h-14 text-3xl flex items-center justify-center rounded-lg transition-all hover:bg-white hover:shadow-md ${
                    selectedIcon === icon 
                      ? 'bg-pink-100 border-2 border-pink-500 shadow-md' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            {selectedIcon && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <span>Выбрано:</span>
                <span className="text-3xl">{selectedIcon}</span>
              </div>
            )}
          </div>

          {/* Название подарка */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название подарка
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название подарка"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              maxLength={50}
            />
            <div className="text-xs text-gray-500 mt-1">
              {name.length}/50 символов
            </div>
          </div>

          {/* Цена */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена подарка
            </label>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
              <span className="absolute right-3 top-2 text-gray-500">₽</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Если указать 0, подарок будет бесплатным
            </div>
          </div>

          {/* Предпросмотр */}
          {selectedIcon && name && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Предпросмотр:</h3>
              <div className="bg-white rounded-lg p-4 border inline-block">
                <div className="text-center">
                  <div className="text-3xl mb-2">{selectedIcon}</div>
                  <div className="font-medium text-gray-900">{name}</div>
                  <div className={`text-sm font-bold mt-1 ${
                    parseFloat(price) === 0 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {parseFloat(price) === 0 ? 'Бесплатно' : `${parseFloat(price) || 0}₽`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить подарок
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="px-6"
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGiftModal;