import React, { useState, useEffect } from 'react';
import { SentGift } from '@/types/gifts';

interface GiftOverlayProps {
  gifts: SentGift[];
  className?: string;
}

const GiftOverlay: React.FC<GiftOverlayProps> = ({ gifts, className = '' }) => {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Фильтруем активные подарки (не истекшие)
  const activeGifts = gifts.filter(gift => new Date(gift.expiresAt) > new Date());

  useEffect(() => {
    if (activeGifts.length === 0) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    
    // Если только один подарок, показываем его постоянно
    if (activeGifts.length === 1) {
      setCurrentGiftIndex(0);
      return;
    }

    // Если несколько подарков, переключаем их каждые 3 секунды
    const interval = setInterval(() => {
      setCurrentGiftIndex((prevIndex) => 
        (prevIndex + 1) % activeGifts.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [activeGifts.length]);

  if (!isVisible || activeGifts.length === 0) {
    return null;
  }

  const currentGift = activeGifts[currentGiftIndex];

  return (
    <div className={`absolute -top-1 -right-1 ${className}`}>
      <div className="relative">
        {/* Основной подарок */}
        <div className="w-8 h-8 bg-white rounded-full border-2 border-red-500 flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-lg leading-none">
            {currentGift.gift.emoji}
          </span>
        </div>

        {/* Индикатор количества подарков */}
        {activeGifts.length > 1 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {activeGifts.length}
          </div>
        )}

        {/* Анимированное кольцо */}
        <div className="absolute inset-0 w-8 h-8 border-2 border-red-300 rounded-full animate-ping"></div>
      </div>

      {/* Подсказка при наведении */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {currentGift.gift.name}
        {activeGifts.length > 1 && ` (${activeGifts.length} подарков)`}
      </div>
    </div>
  );
};

export default GiftOverlay;