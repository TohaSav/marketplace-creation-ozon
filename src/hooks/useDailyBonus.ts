import { useState, useEffect } from 'react';

export interface DailyBonusData {
  currentStreak: number;
  todayBonus: number;
  canClaim: boolean;
  totalEarned: number;
  nextDayBonus: number;
}

export const useDailyBonus = (userId: string, joinDate: string) => {
  const [bonusData, setBonusData] = useState<DailyBonusData | null>(null);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  // Система бонусов первые 7 дней
  const bonusSchedule = [2, 3, 5, 7, 10, 12, 15];
  const dailyBonusAfter7Days = 1;

  const calculateDaysSinceJoin = (joinDate: string): number => {
    const join = new Date(joinDate);
    const today = new Date();
    const diffTime = today.getTime() - join.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const getBonusAmount = (day: number): number => {
    if (day <= 7) {
      return bonusSchedule[day - 1];
    }
    return dailyBonusAfter7Days;
  };

  const getTotalBonusEarned = (currentDay: number): number => {
    let total = 0;
    for (let i = 1; i < currentDay; i++) {
      if (i <= 7) {
        total += bonusSchedule[i - 1];
      } else {
        total += dailyBonusAfter7Days;
      }
    }
    return total;
  };

  const checkCanClaimToday = (userId: string): boolean => {
    const lastClaimDate = localStorage.getItem(`lastBonusClaim_${userId}`);
    const today = new Date().toDateString();
    return lastClaimDate !== today;
  };

  const shouldShowBonusModal = (userId: string): boolean => {
    const lastModalShown = localStorage.getItem(`lastModalShown_${userId}`);
    const today = new Date().toDateString();
    return lastModalShown !== today;
  };

  const claimBonus = async (userId: string, amount: number): Promise<void> => {
    try {
      // Сохраняем дату получения бонуса
      const today = new Date().toDateString();
      localStorage.setItem(`lastBonusClaim_${userId}`, today);
      localStorage.setItem(`lastModalShown_${userId}`, today);

      // Обновляем баланс пользователя в localStorage
      const currentWallet = localStorage.getItem(`userWallet_${userId}`);
      const walletBalance = currentWallet ? parseFloat(currentWallet) : 0;
      const newBalance = walletBalance + amount;
      localStorage.setItem(`userWallet_${userId}`, newBalance.toString());

      // Сохраняем историю бонусов
      const bonusHistory = localStorage.getItem(`bonusHistory_${userId}`);
      const history = bonusHistory ? JSON.parse(bonusHistory) : [];
      history.push({
        date: new Date().toISOString(),
        amount: amount,
        type: 'daily_bonus',
        day: bonusData?.currentStreak || 1
      });
      localStorage.setItem(`bonusHistory_${userId}`, JSON.stringify(history));

      // Обновляем состояние
      if (bonusData) {
        setBonusData({
          ...bonusData,
          canClaim: false,
          totalEarned: bonusData.totalEarned + amount
        });
      }

      // Скрываем модальное окно
      setShouldShowModal(false);

      // Отправляем событие обновления баланса
      window.dispatchEvent(new CustomEvent('walletUpdated', { 
        detail: { newBalance, bonusAmount: amount } 
      }));

    } catch (error) {
      console.error('Ошибка при начислении бонуса:', error);
    }
  };

  useEffect(() => {
    if (!userId || !joinDate) return;

    const currentDay = calculateDaysSinceJoin(joinDate);
    const todayBonus = getBonusAmount(currentDay);
    const canClaim = checkCanClaimToday(userId);
    const totalEarned = getTotalBonusEarned(currentDay);
    const nextDayBonus = getBonusAmount(currentDay + 1);

    setBonusData({
      currentStreak: currentDay,
      todayBonus,
      canClaim,
      totalEarned,
      nextDayBonus
    });

    // Показываем модальное окно только если:
    // 1. Пользователь может получить бонус сегодня
    // 2. Модальное окно не показывалось сегодня
    // 3. Прошло более 1 дня с момента регистрации (чтобы не показывать сразу)
    if (canClaim && shouldShowBonusModal(userId) && currentDay >= 1) {
      // Небольшая задержка для лучшего UX
      setTimeout(() => {
        setShouldShowModal(true);
      }, 1000);
    }
  }, [userId, joinDate]);

  return {
    bonusData,
    shouldShowModal,
    setShouldShowModal,
    claimBonus: (amount: number) => claimBonus(userId, amount),
    getBonusSchedule: () => bonusSchedule,
    getDailyBonusAfter7Days: () => dailyBonusAfter7Days
  };
};