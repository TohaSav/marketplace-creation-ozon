import { Product, MarketplaceFilters } from "@/types/marketplace";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export const generateProductId = (): string => {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateOrderId = (): string => {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateNotificationId = (): string => {
  return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const filterProducts = (
  products: Product[],
  filters: MarketplaceFilters,
): Product[] => {
  let filtered = [...products];

  // Search filter
  if (filters.searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()),
    );
  }

  // Category filter
  if (filters.selectedCategory) {
    filtered = filtered.filter(
      (product) => product.category === filters.selectedCategory,
    );
  }

  // Price range filter
  filtered = filtered.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1],
  );

  return filtered;
};

export const sortProducts = (
  products: Product[],
  sortBy: string,
  sortOrder: string,
): Product[] => {
  return [...products].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "newest":
        aValue = a.createdAt;
        bValue = b.createdAt;
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const calculateCartTotal = (items: any[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateCartItemCount = (items: any[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const validateProduct = (product: Partial<Product>): string[] => {
  const errors: string[] = [];

  if (!product.name || product.name.trim().length < 3) {
    errors.push("Название товара должно содержать минимум 3 символа");
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.push("Описание товара должно содержать минимум 10 символов");
  }

  if (!product.price || product.price <= 0) {
    errors.push("Цена товара должна быть больше 0");
  }

  if (!product.category || product.category.trim().length === 0) {
    errors.push("Категория товара обязательна");
  }

  if (!product.stock || product.stock < 0) {
    errors.push("Количество товара не может быть отрицательным");
  }

  return errors;
};

export const isProductInStock = (
  product: Product,
  quantity: number = 1,
): boolean => {
  return product.stock >= quantity;
};

export const getStockStatus = (
  stock: number,
): { text: string; color: string } => {
  if (stock === 0) {
    return { text: "Нет в наличии", color: "text-red-500" };
  } else if (stock < 10) {
    return { text: `Осталось ${stock} шт.`, color: "text-orange-500" };
  } else if (stock < 50) {
    return { text: "В наличии", color: "text-green-500" };
  } else {
    return { text: "Много в наличии", color: "text-green-600" };
  }
};

export const getOrderStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Ожидает обработки",
    processing: "В обработке",
    shipped: "Отправлен",
    delivered: "Доставлен",
    cancelled: "Отменен",
  };

  return statusMap[status] || "Неизвестный статус";
};

export const getOrderStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: "text-yellow-600",
    processing: "text-blue-600",
    shipped: "text-purple-600",
    delivered: "text-green-600",
    cancelled: "text-red-600",
  };

  return colorMap[status] || "text-gray-600";
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
