// Демонстрационные данные для тестирования функции фильтрации товаров

import { activateSubscription } from "./yookassaApi";

// Создание демонстрационных продавцов с разными статусами подписки
export const initializeMockSellers = () => {
  const sellers = [
    {
      id: "seller1",
      name: "Пасека Иванова",
      email: "ivanov@example.com",
      status: "active",
      subscription: null,
    },
    {
      id: "seller2",
      name: "Мастерская Елены",
      email: "elena@example.com",
      status: "active",
      subscription: null,
    },
    {
      id: "seller3",
      name: "Бабушкины заготовки",
      email: "grandma@example.com",
      status: "active",
      subscription: null,
    },
    {
      id: "seller4",
      name: "Столярная мастерская",
      email: "woodwork@example.com",
      status: "active",
      subscription: null,
    },
    {
      id: "seller5",
      name: "Гончарная студия",
      email: "pottery@example.com",
      status: "active",
      subscription: null,
    },
    {
      id: "seller6",
      name: "Ювелирная мастерская",
      email: "jewelry@example.com",
      status: "active",
      subscription: null,
    },
  ];

  // Активируем подписки для части продавцов
  sellers[0].subscription = activateSubscription(1, "monthly"); // Активная месячная подписка
  sellers[1].subscription = activateSubscription(2, "yearly"); // Активная годовая подписка
  sellers[2].subscription = activateSubscription(3, "free"); // Бесплатная подписка

  // Создаем истекшую подписку для демонстрации
  const expiredSubscription = {
    isActive: false,
    planType: "monthly" as const,
    planName: "Месячная подписка",
    startDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 дней назад
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 дней назад
    autoRenew: false,
  };

  sellers[3].subscription = expiredSubscription; // Истекшая подписка
  // sellers[4] и sellers[5] остаются без подписки

  localStorage.setItem("sellers", JSON.stringify(sellers));
  console.log("Mock sellers initialized:", sellers);
};

// Получение информации о статусе подписок для демонстрации
export const getSubscriptionStatusInfo = () => {
  const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");

  return sellers.map((seller: any) => ({
    id: seller.id,
    name: seller.name,
    hasSubscription: !!seller.subscription,
    isActive: seller.subscription?.isActive || false,
    planType: seller.subscription?.planType || "none",
    endDate: seller.subscription?.endDate || null,
  }));
};

// Функция для изменения статуса подписки продавца (для тестирования)
export const toggleSellerSubscription = (sellerId: string) => {
  const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
  const sellerIndex = sellers.findIndex((s: any) => s.id === sellerId);

  if (sellerIndex !== -1) {
    const seller = sellers[sellerIndex];

    if (seller.subscription) {
      // Переключаем статус активности
      seller.subscription.isActive = !seller.subscription.isActive;

      // Если активируем, устанавливаем новую дату окончания
      if (seller.subscription.isActive) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        seller.subscription.endDate = endDate.toISOString();
      }
    } else {
      // Создаем новую подписку
      seller.subscription = activateSubscription(
        parseInt(sellerId.replace("seller", "")),
        "monthly",
      );
    }

    localStorage.setItem("sellers", JSON.stringify(sellers));
    console.log(
      `Subscription toggled for seller ${sellerId}:`,
      seller.subscription,
    );
  }
};

// Функция для логирования текущего состояния подписок
export const logSubscriptionStates = () => {
  const info = getSubscriptionStatusInfo();
  console.table(info);
};
