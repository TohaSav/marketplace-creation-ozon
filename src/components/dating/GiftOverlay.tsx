import React, { useState, useEffect } from 'react';
import { SentGift } from '@/types/gifts';

interface GiftOverlayProps {
  gifts: SentGift[];
  className?: string;
}

const GiftOverlay: React.FC<GiftOverlayProps> = ({ gifts, className = '' }) => {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Используем все подарки (убираем фильтрацию по времени)
  const activeGifts = gifts;

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

    // Если несколько подарков, переключаем их каждые 2 секунды с плавным миганием
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentGiftIndex((prevIndex) => 
          (prevIndex + 1) % activeGifts.length
        );
        setIsVisible(true);
      }, 200);
    }, 2000);

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
        <div className={`w-10 h-10 bg-white rounded-full border-2 border-pink-500 flex items-center justify-center shadow-lg transition-all duration-200 ${
          activeGifts.length > 1 ? 'animate-pulse' : ''
        } ${isVisible ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
          <span className="text-xl leading-none">
            {currentGift.icon}
          </span>
        </div>

        {/* Индикатор количества подарков */}
        {activeGifts.length > 1 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
            {activeGifts.length}
          </div>
        )}

        {/* Анимированное кольцо */}
        <div className="absolute inset-0 w-10 h-10 border-2 border-pink-300 rounded-full animate-ping"></div>
      </div>

      {/* Подсказка при наведении */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {currentGift.name}
        {activeGifts.length > 1 && ` (${activeGifts.length} подарков)`}
      </div>
    </div>
  );
};

export default GiftOverlay;