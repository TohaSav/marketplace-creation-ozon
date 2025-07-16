// Утилиты для управления приостановкой магазинов

export interface TrialInfo {
  isActive: boolean;
  startDate: Date;
  expiryDate: Date;
  daysRemaining: number;
}

export interface ShopStatus {
  isSuspended: boolean;
  suspensionReason?: 'trial_expired' | 'subscription_expired' | 'manual';
  canReactivate: boolean;
  currentPlan: string;
  trialUsed: boolean;
}

// Проверяет статус пробного периода
export const getTrialStatus = (trialStartDate?: string): TrialInfo | null => {
  if (!trialStartDate) return null;

  const startDate = new Date(trialStartDate);
  const expiryDate = new Date(startDate);
  expiryDate.setDate(expiryDate.getDate() + 2); // 2 дня пробного периода

  const now = new Date();
  const isActive = now <= expiryDate;
  
  const timeDiff = expiryDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

  return {
    isActive,
    startDate,
    expiryDate,
    daysRemaining
  };
};

// Проверяет нужно ли приостановить магазин
export const shouldSuspendShop = (user: any): boolean => {
  // Проверяем пробный период
  if (user.trialStartDate && user.currentPlan === 'trial') {
    const trialStatus = getTrialStatus(user.trialStartDate);
    if (trialStatus && !trialStatus.isActive) {
      return true;
    }
  }

  // Проверяем подписку (для будущих платных тарифов)
  if (user.subscriptionExpiry && user.currentPlan !== 'free') {
    const now = new Date();
    const expiryDate = new Date(user.subscriptionExpiry);
    if (now > expiryDate) {
      return true;
    }
  }

  return false;
};

// Получает статус магазина
export const getShopStatus = (user: any): ShopStatus => {
  const suspended = shouldSuspendShop(user);
  let suspensionReason: ShopStatus['suspensionReason'];

  if (suspended) {
    if (user.currentPlan === 'trial') {
      suspensionReason = 'trial_expired';
    } else if (user.currentPlan !== 'free') {
      suspensionReason = 'subscription_expired';
    }
  }

  return {
    isSuspended: suspended,
    suspensionReason,
    canReactivate: suspended,
    currentPlan: user.currentPlan || 'free',
    trialUsed: !!user.trialStartDate
  };
};

// Форматирует оставшееся время
export const formatTimeRemaining = (expiryDate: Date): string => {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  
  if (diff <= 0) return 'Истёк';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}д ${hours}ч`;
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
};

// Активирует пробный период
export const activateTrialPeriod = (userId: string): Promise<TrialInfo> => {
  const startDate = new Date();
  const expiryDate = new Date(startDate);
  expiryDate.setDate(expiryDate.getDate() + 2);

  // Здесь будет логика сохранения в базу данных
  console.log(`Активирован пробный период для пользователя ${userId}:`, {
    startDate: startDate.toISOString(),
    expiryDate: expiryDate.toISOString()
  });

  return Promise.resolve({
    isActive: true,
    startDate,
    expiryDate,
    daysRemaining: 2
  });
};

// Проверяет доступность функций для текущего тарифа
export const hasFeatureAccess = (feature: string, userPlan: string, isSuspended: boolean): boolean => {
  if (isSuspended) return false;

  const planFeatures = {
    free: [
      'basic_shop',
      'up_to_10_products',
      'basic_stats'
    ],
    trial: [
      'unlimited_products',
      'advanced_analytics',
      'product_promotion',
      'priority_support',
      'shop_customization',
      'data_export',
      'all_premium_features'
    ],
    basic: [
      'unlimited_products',
      'advanced_analytics',
      'product_promotion',
      'priority_support'
    ],
    pro: [
      'unlimited_products',
      'advanced_analytics',
      'product_promotion',
      'priority_support',
      'shop_customization',
      'data_export',
      'personal_manager',
      'auto_promotion'
    ]
  };

  const currentPlanFeatures = planFeatures[userPlan as keyof typeof planFeatures] || planFeatures.free;
  return currentPlanFeatures.includes(feature);
};