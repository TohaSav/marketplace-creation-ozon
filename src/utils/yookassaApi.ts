// Утилиты для работы с ЮКасса API

interface PaymentData {
  amount: number;
  description: string;
  tariffId: string;
  sellerId: number;
  returnUrl: string;
}

interface PaymentResponse {
  id: string;
  status: string;
  confirmationUrl: string;
}

interface SubscriptionData {
  isActive: boolean;
  planType: "monthly" | "yearly" | "trial";
  planName: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// Создание платежа через ЮКассу (мок для демо)
export const createPayment = async (
  paymentData: PaymentData,
): Promise<PaymentResponse> => {
  try {
    // В демо версии имитируем создание платежа
    // В реальном приложении здесь будет API запрос к вашему серверу
    return new Promise((resolve) => {
      setTimeout(() => {
        const paymentId = `payment_${Date.now()}`;
        resolve({
          id: paymentId,
          status: "pending",
          confirmationUrl: `${paymentData.returnUrl}&payment_id=${paymentId}`,
        });
      }, 500);
    });
  } catch (error) {
    console.error("Ошибка создания платежа:", error);
    throw error;
  }
};

// Проверка статуса платежа (мок для демо)
export const verifyPayment = async (paymentId: string) => {
  try {
    // В демо версии всегда возвращаем успешный статус
    // В реальном приложении здесь будет запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "succeeded" });
      }, 1000);
    });
  } catch (error) {
    console.error("Ошибка проверки платежа:", error);
    throw error;
  }
};

// Активация подписки после успешной оплаты
export const activateSubscription = (
  sellerId: number,
  planType: "monthly" | "yearly" | "trial",
): SubscriptionData => {
  const now = new Date();
  const endDate = new Date(now);

  // Устанавливаем дату окончания в зависимости от типа плана
  if (planType === "trial") {
    endDate.setDate(endDate.getDate() + 2);
  } else if (planType === "monthly") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const planNames = {
    trial: "Пробный период",
    monthly: "Месячная подписка",
    yearly: "Годовая подписка",
  };

  const subscription: SubscriptionData = {
    isActive: true,
    planType,
    planName: planNames[planType],
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    autoRenew: planType !== "trial", // Пробный период не продлевается автоматически
  };

  // Сохраняем подписку в localStorage (в реальном приложении - в базе данных)
  const sellerData = localStorage.getItem("seller-token");
  if (sellerData) {
    const seller = JSON.parse(sellerData);
    seller.subscription = subscription;
    localStorage.setItem("seller-token", JSON.stringify(seller));
  }

  // Также обновляем в общем списке продавцов
  const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
  const updatedSellers = sellers.map((seller: any) =>
    seller.id === sellerId ? { ...seller, subscription } : seller,
  );
  localStorage.setItem("sellers", JSON.stringify(updatedSellers));

  // Обновляем карту продавца
  const sellerCards = JSON.parse(localStorage.getItem("sellerCards") || "[]");
  const updatedCards = sellerCards.map((card: any) =>
    card.sellerId === sellerId
      ? { ...card, subscriptionEndDate: endDate.toISOString() }
      : card,
  );
  localStorage.setItem("sellerCards", JSON.stringify(updatedCards));

  return subscription;
};

// Проверка активности подписки
export const isSubscriptionActive = (
  subscription?: SubscriptionData,
): boolean => {
  if (!subscription || !subscription.isActive) {
    return false;
  }

  const now = new Date();
  const endDate = new Date(subscription.endDate);

  return endDate > now;
};

// Получение информации о тарифных планах
export const getTariffPlans = () => [
  {
    id: "trial",
    name: "Пробный период",
    price: 0,
    duration: "2 дня",
    features: [
      "Добавление до 5 товаров",
      "Базовая статистика продаж",
      "Доступ к панели управления",
      "Тестирование всех функций",
    ],
  },
  {
    id: "monthly",
    name: "Месячная подписка",
    price: 4200,
    duration: "1 месяц",
    features: [
      "Добавление неограниченного количества товаров",
      "Управление заказами и статистикой",
      "Техническая поддержка",
      "Продвижение товаров в каталоге",
    ],
  },
  {
    id: "yearly",
    name: "Годовая подписка",
    price: 50000,
    duration: "12 месяцев",
    popular: true,
    savings: "Экономия 400 ₽ в месяц",
    features: [
      "Добавление неограниченного количества товаров",
      "Управление заказами и статистикой",
      "Приоритетная техническая поддержка",
      "Продвижение товаров в каталоге",
      "Расширенная аналитика продаж",
      "Персональный менеджер",
    ],
  },
];

// Форматирование даты для отображения
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Получение оставшихся дней подписки
export const getDaysRemaining = (endDate: string): number => {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};
