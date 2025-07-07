// Утилиты для фильтрации товаров по активности подписки продавца

import {
  isSellerSubscriptionActive,
  updateAllSubscriptionStatuses,
} from "./yookassaApi";

// Интерфейс для товара с информацией о продавце
export interface ProductWithSeller {
  id: string | number;
  sellerId: string;
  sellerName?: string;
  title?: string;
  name?: string;
  [key: string]: any;
}

// Фильтрация товаров по активности подписки продавца
export const filterProductsByActiveSubscription = <T extends ProductWithSeller>(
  products: T[],
): T[] => {
  // Сначала обновляем статусы всех подписок
  updateAllSubscriptionStatuses();

  // Фильтруем товары от продавцов с активными подписками
  return products.filter((product) =>
    isSellerSubscriptionActive(product.sellerId),
  );
};

// Добавление информации о статусе подписки к товарам
export const enrichProductsWithSubscriptionStatus = <
  T extends ProductWithSeller,
>(
  products: T[],
): (T & { isSellerSubscriptionActive: boolean })[] => {
  updateAllSubscriptionStatuses();

  return products.map((product) => ({
    ...product,
    isSellerSubscriptionActive: isSellerSubscriptionActive(product.sellerId),
  }));
};

// Получение статистики по товарам и подпискам
export const getProductSubscriptionStats = <T extends ProductWithSeller>(
  products: T[],
): {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  activeSellers: Set<string>;
  inactiveSellers: Set<string>;
} => {
  updateAllSubscriptionStatuses();

  const activeSellers = new Set<string>();
  const inactiveSellers = new Set<string>();
  let activeProducts = 0;
  let inactiveProducts = 0;

  products.forEach((product) => {
    const isActive = isSellerSubscriptionActive(product.sellerId);

    if (isActive) {
      activeProducts++;
      activeSellers.add(product.sellerId);
    } else {
      inactiveProducts++;
      inactiveSellers.add(product.sellerId);
    }
  });

  return {
    totalProducts: products.length,
    activeProducts,
    inactiveProducts,
    activeSellers,
    inactiveSellers,
  };
};

// Логирование информации о фильтрации (для отладки)
export const logFilteringInfo = <T extends ProductWithSeller>(
  originalProducts: T[],
  filteredProducts: T[],
  context: string = "Unknown",
): void => {
  const stats = getProductSubscriptionStats(originalProducts);

  console.log(`[${context}] Product filtering info:`, {
    original: originalProducts.length,
    filtered: filteredProducts.length,
    hidden: originalProducts.length - filteredProducts.length,
    activeSellers: stats.activeSellers.size,
    inactiveSellers: stats.inactiveSellers.size,
  });
};

// Функция для проверки и предупреждения о скрытых товарах
export const checkForHiddenProducts = <T extends ProductWithSeller>(
  products: T[],
  context: string = "marketplace",
): { visible: T[]; hidden: T[] } => {
  const enrichedProducts = enrichProductsWithSubscriptionStatus(products);

  const visible = enrichedProducts.filter((p) => p.isSellerSubscriptionActive);
  const hidden = enrichedProducts.filter((p) => !p.isSellerSubscriptionActive);

  if (hidden.length > 0) {
    console.warn(
      `[${context}] ${hidden.length} products hidden due to inactive seller subscriptions`,
    );
  }

  return { visible, hidden };
};
