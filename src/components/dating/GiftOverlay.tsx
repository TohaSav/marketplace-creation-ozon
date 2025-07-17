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

    // Если несколько подарков, переключаем их каждые 1.2 секунды с плавным переходом
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentGiftIndex((prevIndex) => 
          (prevIndex + 1) % activeGifts.length
        );
        setIsVisible(true);
      }, 120);
    }, 1200);

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
        <div className={`w-16 h-16 bg-white rounded-full border-4 border-pink-500 flex items-center justify-center shadow-2xl transition-all duration-300 ${
          activeGifts.length > 1 ? 'animate-pulse' : ''
        } ${isVisible ? 'opacity-100 scale-100' : 'opacity-50 scale-85'}`}>
          <span className="text-3xl leading-none">
            {currentGift.icon}
          </span>
        </div>

        {/* Индикатор количества подарков */}
        {activeGifts.length > 1 && (
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xl border-3 border-white animate-bounce">
            {activeGifts.length}
          </div>
        )}

        {/* Анимированное кольцо */}
        <div className="absolute inset-0 w-16 h-16 border-3 border-pink-300 rounded-full animate-ping"></div>
        
        {/* Дополнительное кольцо для множественных подарков */}
        {activeGifts.length > 1 && (
          <div className="absolute inset-0 w-16 h-16 border-2 border-yellow-400 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Подсказка при наведении */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-black bg-opacity-95 text-white text-sm px-4 py-3 rounded-xl opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 shadow-2xl border border-pink-500">
        <div className="font-bold text-pink-300">{currentGift.name}</div>
        {activeGifts.length > 1 && (
          <div className="text-center text-gray-300 text-xs mt-2 flex items-center justify-center gap-2">
            <span>Подарок {currentGiftIndex + 1} из {activeGifts.length}</span>
            <div className="flex gap-1">
              {Array.from({ length: activeGifts.length }, (_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${
                  i === currentGiftIndex ? 'bg-pink-400' : 'bg-gray-500'
                }`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftOverlay;