import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  SUBSCRIPTION_PLANS,
  type SellerSubscription,
  type SubscriptionStatus,
} from "@/types/subscription";
import { toast } from "@/hooks/use-toast";

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SellerSubscription | null>(
    null,
  );
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // Ключ для хранения данных подписки
  const getStorageKey = () => `seller-subscription-${user?.id || "guest"}`;

  // Загрузка данных подписки
  useEffect(() => {
    if (user?.userType === "seller") {
      loadSubscription();
    }
  }, [user]);

  const loadSubscription = () => {
    try {
      const savedSubscription = localStorage.getItem(getStorageKey());
      if (savedSubscription) {
        const parsed: SellerSubscription = JSON.parse(savedSubscription);
        // Преобразуем даты обратно в объекты Date
        parsed.startDate = new Date(parsed.startDate);
        parsed.endDate = new Date(parsed.endDate);

        setSubscription(parsed);
        updateSubscriptionStatus(parsed);
      }
    } catch (error) {
      console.error("Ошибка загрузки подписки:", error);
    }
    setLoading(false);
  };

  const updateSubscriptionStatus = (sub: SellerSubscription) => {
    const now = new Date();
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === sub.planId);

    if (!plan) {
      setSubscriptionStatus(null);
      return;
    }

    const isActive = sub.isActive && sub.endDate > now;
    const daysRemaining = Math.max(
      0,
      Math.ceil(
        (sub.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );

    // Если подписка истекла, деактивируем её
    if (sub.endDate <= now && sub.isActive) {
      const updatedSubscription = {
        ...sub,
        isActive: false,
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(updatedSubscription));
      setSubscription(updatedSubscription);
    }

    // Подсчитываем количество используемых товаров
    const productsUsed = getProductsCount();
    const canAddProducts =
      isActive && (plan.maxProducts === -1 || productsUsed < plan.maxProducts);

    setSubscriptionStatus({
      isActive,
      planName: plan.name,
      daysRemaining,
      productsUsed,
      maxProducts: plan.maxProducts,
      canAddProducts,
    });
  };

  // Получение количества товаров продавца
  const getProductsCount = (): number => {
    try {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      return products.filter((product: any) => product.sellerId === user?.id)
        .length;
    } catch {
      return 0;
    }
  };

  // Отметка показа модального окна
  const markSubscriptionModalShown = () => {
    const modalShownKey = `subscription-modal-shown-${user?.id || "guest"}`;
    sessionStorage.setItem(modalShownKey, "true");
  };

  // Активация подписки
  const activateSubscription = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
    if (!plan || !user) {
      throw new Error("План не найден или пользователь не авторизован");
    }

    const startDate = new Date();
    const endDate = new Date();

    if (plan.duration === "month") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const newSubscription: SellerSubscription = {
      sellerId: user.id,
      planId: plan.id,
      startDate,
      endDate,
      isActive: true,
      remainingProducts: plan.maxProducts === -1 ? -1 : plan.maxProducts,
      autoRenew: true,
    };

    // Сохраняем подписку
    localStorage.setItem(getStorageKey(), JSON.stringify(newSubscription));
    setSubscription(newSubscription);
    updateSubscriptionStatus(newSubscription);

    // Отмечаем что модальное окно уже показано и выбор сделан
    markSubscriptionModalShown();

    // Создаем запись о платеже
    const transaction = {
      id: Date.now().toString(),
      sellerId: user.id,
      type: "subscription",
      amount: plan.price,
      description: `Подписка "${plan.name}" на ${plan.duration === "month" ? "месяц" : "год"}`,
      createdAt: new Date().toISOString(),
      status: "completed",
      planId: plan.id,
    };

    // Добавляем транзакцию
    const transactions = JSON.parse(
      localStorage.getItem("seller-wallet-transactions") || "[]",
    );
    transactions.push(transaction);
    localStorage.setItem(
      "seller-wallet-transactions",
      JSON.stringify(transactions),
    );

    toast({
      title: "Подписка активирована! 🎉",
      description: `Тариф "${plan.name}" успешно подключен. Теперь вы можете добавлять товары!`,
    });

    return newSubscription;
  };

  // Проверка возможности добавления товара
  const canAddProduct = (): { allowed: boolean; reason?: string } => {
    if (!subscription || !subscriptionStatus) {
      return { allowed: false, reason: "Нет активной подписки" };
    }

    if (!subscriptionStatus.isActive) {
      return { allowed: false, reason: "Подписка истекла" };
    }

    if (
      subscriptionStatus.maxProducts !== -1 &&
      subscriptionStatus.productsUsed >= subscriptionStatus.maxProducts
    ) {
      return {
        allowed: false,
        reason: `Достигнут лимит товаров (${subscriptionStatus.maxProducts})`,
      };
    }

    return { allowed: true };
  };

  // Получение информации о тарифе
  const getCurrentPlan = () => {
    if (!subscription) return null;
    return SUBSCRIPTION_PLANS.find((p) => p.id === subscription.planId) || null;
  };

  // Проверка необходимости показа модального окна с тарифами
  const shouldShowSubscriptionModal = (): boolean => {
    if (!subscription || !subscriptionStatus) {
      // Проверяем, показывали ли уже модальное окно в этой сессии
      const modalShownKey = `subscription-modal-shown-${user?.id || "guest"}`;
      const modalShown = sessionStorage.getItem(modalShownKey);
      if (modalShown) {
        return false;
      }
      return true;
    }
    
    // Проверяем истекла ли подписка по времени
    const now = new Date();
    const endDate = subscription.endDate;
    const isExpired = now > endDate;
    
    return !subscriptionStatus.isActive || isExpired;
  };

  // Отмена подписки
  const cancelSubscription = () => {
    if (subscription) {
      const updatedSubscription = {
        ...subscription,
        autoRenew: false,
      };
      localStorage.setItem(
        getStorageKey(),
        JSON.stringify(updatedSubscription),
      );
      setSubscription(updatedSubscription);

      toast({
        title: "Автопродление отключено",
        description: "Подписка не будет продлена автоматически",
      });
    }
  };

  // Возобновление подписки
  const resumeSubscription = () => {
    if (subscription) {
      const updatedSubscription = {
        ...subscription,
        autoRenew: true,
      };
      localStorage.setItem(
        getStorageKey(),
        JSON.stringify(updatedSubscription),
      );
      setSubscription(updatedSubscription);

      toast({
        title: "Автопродление включено",
        description: "Подписка будет продлена автоматически",
      });
    }
  };

  return {
    subscription,
    subscriptionStatus,
    loading,
    activateSubscription,
    canAddProduct,
    getCurrentPlan,
    shouldShowSubscriptionModal,
    markSubscriptionModalShown,
    cancelSubscription,
    resumeSubscription,
    refreshSubscription: loadSubscription,
  };
};