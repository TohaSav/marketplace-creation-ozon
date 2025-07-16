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
    const gifts = profileGifts[profileId] || [];
    // Возвращаем только активные подарки (не истекшие)
    return gifts.filter(gift => new Date(gift.expiresAt) > new Date());
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
    cleanupExpiredGifts
  };
};