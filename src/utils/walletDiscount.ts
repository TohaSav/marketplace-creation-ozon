// Утилиты для работы со скидкой кошелька

export const WALLET_DISCOUNT_PERCENT = 5;

/**
 * Применяет скидку кошелька к общей сумме
 * @param totalAmount - общая сумма заказа
 * @returns объект с оригинальной суммой, размером скидки и итоговой суммой
 */
export const applyWalletDiscount = (totalAmount: number) => {
  const discountAmount = (totalAmount * WALLET_DISCOUNT_PERCENT) / 100;
  const finalAmount = totalAmount - discountAmount;

  return {
    originalAmount: totalAmount,
    discountAmount,
    finalAmount,
    discountPercent: WALLET_DISCOUNT_PERCENT,
  };
};

/**
 * Проверяет, достаточно ли средств на кошельке для оплаты
 * @param walletBalance - баланс кошелька
 * @param orderAmount - сумма заказа (с учетом скидки)
 * @returns true если средств достаточно
 */
export const canPayWithWallet = (
  walletBalance: number,
  orderAmount: number,
): boolean => {
  return walletBalance >= orderAmount;
};

/**
 * Генерирует уникальный номер кошелька на основе ID пользователя
 * @param userId - ID пользователя
 * @returns отформатированный номер кошелька
 */
export const generateWalletNumber = (userId: string): string => {
  const hash = userId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const uniqueNumber = Math.abs(hash).toString().padStart(10, "0");
  return `${uniqueNumber.slice(0, 4)} ${uniqueNumber.slice(4, 8)} ${uniqueNumber.slice(8)}`;
};

/**
 * Сохраняет операцию в локальное хранилище
 * @param userId - ID пользователя
 * @param transaction - данные транзакции
 */
export const saveWalletTransaction = (
  userId: string,
  transaction: {
    id: string;
    type: "deposit" | "payment" | "bonus";
    amount: number;
    description: string;
    status: "pending" | "completed" | "failed";
  },
) => {
  const transactions = JSON.parse(
    localStorage.getItem("wallet-transactions") || "[]",
  );

  const walletTransaction = {
    ...transaction,
    userId,
    createdAt: new Date().toISOString(),
  };

  transactions.push(walletTransaction);
  localStorage.setItem("wallet-transactions", JSON.stringify(transactions));

  return walletTransaction;
};

/**
 * Обновляет баланс кошелька пользователя
 * @param userId - ID пользователя
 * @param amount - сумма для добавления (может быть отрицательной)
 */
export const updateWalletBalance = (userId: string, amount: number) => {
  const walletData = JSON.parse(
    localStorage.getItem(`wallet-${userId}`) || "{}",
  );
  const currentBalance = walletData.balance || 0;
  const newBalance = Math.max(0, currentBalance + amount);

  walletData.balance = newBalance;
  localStorage.setItem(`wallet-${userId}`, JSON.stringify(walletData));

  return newBalance;
};

/**
 * Получает текущий баланс кошелька
 * @param userId - ID пользователя
 * @returns текущий баланс
 */
export const getWalletBalance = (userId: string): number => {
  const walletData = JSON.parse(
    localStorage.getItem(`wallet-${userId}`) || "{}",
  );
  return walletData.balance || 0;
};
