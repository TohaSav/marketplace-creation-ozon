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

    // Если несколько подарков, переключаем их каждые 1.5 секунды с плавным переходом
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentGiftIndex((prevIndex) => 
          (prevIndex + 1) % activeGifts.length
        );
        setIsVisible(true);
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [activeGifts.length]);

  if (!isVisible || activeGifts.length === 0) {
    return null;
  }

  const currentGift = activeGifts[currentGiftIndex];

  return (
    <div className={`absolute top-2 right-2 ${className}`}>
      <div className="relative">
        {/* Основной подарок */}
        <div className={`w-14 h-14 bg-white rounded-full border-3 border-pink-500 flex items-center justify-center shadow-xl transition-all duration-300 ${
          activeGifts.length > 1 ? 'animate-pulse' : ''
        } ${isVisible ? 'opacity-100 scale-100' : 'opacity-60 scale-90'}`}>
          <span className="text-2xl leading-none">
            {currentGift.icon}
          </span>
        </div>

        {/* Индикатор количества подарков */}
        {activeGifts.length > 1 && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
            {activeGifts.length}
          </div>
        )}

        {/* Анимированное кольцо */}
        <div className="absolute inset-0 w-14 h-14 border-2 border-pink-300 rounded-full animate-ping"></div>
      </div>

      {/* Подсказка при наведении */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black bg-opacity-90 text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
        {currentGift.name}
        {activeGifts.length > 1 && (
          <div className="text-center text-gray-300 text-xs mt-1">
            {currentGiftIndex + 1} из {activeGifts.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftOverlay;