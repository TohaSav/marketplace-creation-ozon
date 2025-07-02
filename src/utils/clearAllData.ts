// Утилита для полной очистки всех данных пользователей, продавцов и магазинов

export const clearAllUserData = () => {
  // Очищаем данные пользователей
  localStorage.removeItem("users");
  localStorage.removeItem("user-token");

  // Очищаем данные продавцов
  localStorage.removeItem("sellers");
  localStorage.removeItem("seller-token");
  localStorage.removeItem("sellerCards");

  // Очищаем данные магазинов
  localStorage.removeItem("shops");
  localStorage.removeItem("shopRequests");
  localStorage.removeItem("verificationRequests");

  // Очищаем данные товаров
  localStorage.removeItem("products");
  localStorage.removeItem("sellerProducts");

  // Очищаем данные заказов
  localStorage.removeItem("orders");
  localStorage.removeItem("userOrders");

  // Очищаем корзину и избранное
  localStorage.removeItem("cart");
  localStorage.removeItem("favorites");

  // Очищаем данные админа
  localStorage.removeItem("admin-token");
  localStorage.removeItem("adminData");

  // Очищаем аналитику
  localStorage.removeItem("analyticsData");
  localStorage.removeItem("statisticsData");

  console.log("✅ Все пользовательские данные очищены");
};

export const clearUserData = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("user-token");
  console.log("✅ Данные пользователей очищены");
};

export const clearSellerData = () => {
  localStorage.removeItem("sellers");
  localStorage.removeItem("seller-token");
  localStorage.removeItem("sellerCards");
  localStorage.removeItem("sellerProducts");
  console.log("✅ Данные продавцов очищены");
};

export const clearShopData = () => {
  localStorage.removeItem("shops");
  localStorage.removeItem("shopRequests");
  localStorage.removeItem("verificationRequests");
  console.log("✅ Данные магазинов очищены");
};
