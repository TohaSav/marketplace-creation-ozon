// Утилита для инициализации чистой базы данных

export const initializeCleanDatabase = () => {
  // Полная очистка всех данных
  const keysToRemove = [
    // Пользователи
    "users",
    "user-token",

    // Продавцы
    "sellers",
    "seller-token",
    "sellerCards",

    // Магазины и верификация
    "shops",
    "shopRequests",
    "verificationRequests",

    // Товары и заказы
    "products",
    "sellerProducts",
    "orders",
    "userOrders",

    // Корзина и избранное
    "cart",
    "favorites",

    // Админ данные
    "admin-token",
    "adminData",

    // Аналитика
    "analyticsData",
    "statisticsData",

    // Игра и баланс
    "user-balance",
    "balloon-game-last-played",

    // Прочие данные
    "notification-count",
    "lastVisit",
  ];

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
  });

  console.log("✅ База данных полностью очищена");
  console.log("🎯 Все системы готовы к работе с нуля");
};

// Функция для инициализации базовых настроек
export const initializeDefaultSettings = () => {
  // Устанавливаем дефолтные настройки если нужно
  if (!localStorage.getItem("app-initialized")) {
    localStorage.setItem("app-initialized", "true");
    console.log("✅ Приложение инициализировано");
  }
};
