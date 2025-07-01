// Функция для полной очистки базы данных
export const clearAllUserData = () => {
  // Удаляем всех продавцов
  localStorage.removeItem("sellers");

  // Удаляем всех пользователей
  localStorage.removeItem("users");

  // Удаляем карты продавцов
  localStorage.removeItem("sellerCards");

  // Удаляем заказы
  localStorage.removeItem("orders");

  // Удаляем товары
  localStorage.removeItem("products");

  // Удаляем корзины
  localStorage.removeItem("cart");

  // Удаляем избранное
  localStorage.removeItem("favorites");

  // Удаляем историю транзакций
  localStorage.removeItem("transactions");

  // Удаляем данные авторизации
  localStorage.removeItem("auth");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("adminAuth");

  // Удаляем настройки
  localStorage.removeItem("settings");

  console.log("🗑️ База данных полностью очищена");

  return true;
};

// Функция для удаления только продавцов
export const clearSellers = () => {
  localStorage.removeItem("sellers");
  localStorage.removeItem("sellerCards");
  console.log("🗑️ Все продавцы удалены");
  return true;
};

// Функция для удаления только пользователей
export const clearUsers = () => {
  localStorage.removeItem("users");
  console.log("🗑️ Все пользователи удалены");
  return true;
};

// Функция для безопасной очистки с подтверждением
export const clearDatabaseWithConfirmation = () => {
  const confirmed = window.confirm(
    "⚠️ Вы уверены, что хотите удалить ВСЕ данные из базы данных?\n\n" +
      "Это действие нельзя отменить!\n\n" +
      "Будут удалены:\n" +
      "• Все продавцы и их карты\n" +
      "• Все пользователи\n" +
      "• Все заказы\n" +
      "• Все товары\n" +
      "• Все корзины и избранное\n" +
      "• Вся история транзакций",
  );

  if (confirmed) {
    clearAllUserData();
    // Перезагружаем страницу для обновления состояния
    window.location.reload();
    return true;
  }

  return false;
};
