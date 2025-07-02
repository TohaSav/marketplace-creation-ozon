import { Seller, SellerStatus } from "@/types/seller";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getStatusBadge = (status: SellerStatus) => {
  switch (status) {
    case "active":
      return { text: "Активен", className: "bg-green-100 text-green-800" };
    case "blocked":
      return { text: "Заблокирован", className: "bg-red-100 text-red-800" };
    case "pending":
      return {
        text: "На модерации",
        className: "bg-yellow-100 text-yellow-800",
      };
    default:
      return { text: "Неизвестно", className: "bg-gray-100 text-gray-800" };
  }
};

export const mockSellers: Seller[] = [
  {
    id: "1",
    name: "Алексей Петров",
    email: "alexey@example.com",
    phone: "+7 (999) 123-45-67",
    shopName: "Электроника Плюс",
    registrationDate: "2024-01-15",
    status: "active",
    totalOrders: 245,
    revenue: 892000,
    rating: 4.8,
    description: "Магазин электроники и гаджетов с широким ассортиментом",
  },
  {
    id: "2",
    name: "Мария Сидорова",
    email: "maria@example.com",
    phone: "+7 (888) 987-65-43",
    shopName: "Модный стиль",
    registrationDate: "2024-02-03",
    status: "active",
    totalOrders: 156,
    revenue: 534000,
    rating: 4.6,
    description: "Женская одежда и аксессуары высокого качества",
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    email: "dmitry@example.com",
    phone: "+7 (777) 555-33-22",
    shopName: "Спорт и здоровье",
    registrationDate: "2024-01-28",
    status: "blocked",
    totalOrders: 89,
    revenue: 267000,
    rating: 3.2,
    description: "Спортивные товары и товары для здоровья",
  },
  {
    id: "4",
    name: "Елена Васильева",
    email: "elena@example.com",
    phone: "+7 (666) 444-11-88",
    shopName: "Детский мир",
    registrationDate: "2024-03-10",
    status: "pending",
    totalOrders: 12,
    revenue: 45000,
    rating: 4.9,
    description: "Детские товары, игрушки и развивающие материалы",
  },
];
