import { useState, useEffect } from 'react';
import { SentGift, Gift } from '@/types/gifts';

export const useGifts = () => {
  const [profileGifts, setProfileGifts] = useState<Record<string, SentGift[]>>({});

  // Загрузка подарков из localStorage
  useEffect(() => {
    const savedGifts = localStorage.getItem('profileGifts');
    if (savedGifts) {
      setProfileGifts(JSON.parse(savedGifts));
    }
  }, []);
  
  // Принудительное обновление при изменении localStorage
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const refreshGifts = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  useEffect(() => {
    // Этот эффект будет вызываться при изменении refreshTrigger
  }, [refreshTrigger]);

  // Сохранение подарков в localStorage
  const saveGifts = (gifts: Record<string, SentGift[]>) => {
    localStorage.setItem('profileGifts', JSON.stringify(gifts));
    setProfileGifts(gifts);
  };

  // Отправка подарка
  const sendGift = (gift: Gift, fromUserId: string, toProfileId: string) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 дней

    const sentGift: SentGift = {
      id: Date.now().toString(),
      giftId: gift.id,
      fromUserId,
      toProfileId,
      sentAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      gift
    };

    const updatedGifts = { ...profileGifts };
    if (!updatedGifts[toProfileId]) {
      updatedGifts[toProfileId] = [];
    }
    updatedGifts[toProfileId].push(sentGift);

    saveGifts(updatedGifts);
  };

  // Получение подарков для конкретного профиля
  const getProfileGifts = (profileId: string): SentGift[] => {
    // Проверяем новый формат из GiftModal
    const profileGiftsKey = `profile_gifts_${profileId}`;
    const directGifts = JSON.parse(localStorage.getItem(profileGiftsKey) || '[]');
    
    // Преобразуем формат если нужно
    const convertedGifts = directGifts.map((gift: any) => {
      if (gift.icon && gift.name) {
        // Это подарок из нового формата
        return {
          id: gift.id || Date.now().toString(),
          giftId: gift.id || 'unknown',
          fromUserId: gift.senderId || 'unknown',
          toProfileId: profileId,
          sentAt: gift.sentAt,
          expiresAt: gift.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          gift: {
            id: gift.id || 'unknown',
            name: gift.name,
            icon: gift.icon,
            price: gift.price || 0,
            createdAt: gift.createdAt || new Date().toISOString()
          },
          // Добавляем прямые свойства для совместимости
          icon: gift.icon,
          name: gift.name,
          price: gift.price || 0
        };
      }
      return gift;
    });
    
    // Также проверяем старый формат
    const oldFormatGifts = profileGifts[profileId] || [];
    
    // Объединяем и возвращаем все подарки
    return [...convertedGifts, ...oldFormatGifts];
  };

  // Очистка истекших подарков
  const cleanupExpiredGifts = () => {
    const now = new Date();
    const updatedGifts = { ...profileGifts };
    let hasChanges = false;

    Object.keys(updatedGifts).forEach(profileId => {
      const originalLength = updatedGifts[profileId].length;
      updatedGifts[profileId] = updatedGifts[profileId].filter(
        gift => new Date(gift.expiresAt) > now
      );
      
      if (updatedGifts[profileId].length !== originalLength) {
        hasChanges = true;
      }
      
      // Удаляем пустые массивы
      if (updatedGifts[profileId].length === 0) {
        delete updatedGifts[profileId];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      saveGifts(updatedGifts);
    }
  };

  // Проверка, можно ли отправить бесплатный подарок
  const canSendFreeGift = (fromUserId: string, toProfileId: string): boolean => {
    const gifts = profileGifts[toProfileId] || [];
    const freeGiftsFromUser = gifts.filter(
      gift => gift.fromUserId === fromUserId && gift.gift.price === 0
    );
    
    // Можно отправить только один бесплатный подарок от каждого пользователя
    return freeGiftsFromUser.length === 0;
  };

  // Очистка истекших подарков при каждом использовании хука
  useEffect(() => {
    cleanupExpiredGifts();
  }, [profileGifts]);

  return {
    sendGift,
    getProfileGifts,
    canSendFreeGift,
    cleanupExpiredGifts,
    refreshGifts
  };
};