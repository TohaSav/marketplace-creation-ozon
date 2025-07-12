export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: "month" | "year";
  maxProducts: number;
  features: string[];
  isPopular?: boolean;
  description: string;
}

export interface SellerSubscription {
  sellerId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  remainingProducts: number;
  autoRenew: boolean;
}

export interface SubscriptionStatus {
  isActive: boolean;
  planName: string;
  daysRemaining: number;
  productsUsed: number;
  maxProducts: number;
  canAddProducts: boolean;
}

// Новые тарифные планы для магазинов
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "mini",
    name: "Мини",
    price: 1500,
    duration: "month",
    maxProducts: 100,
    description: "Идеально для начинающих продавцов",
    features: [
      "До 100 товаров в каталоге",
      "Базовая аналитика продаж",
      "Поддержка в рабочие дни",
      "Стандартные инструменты продвижения",
      "Комиссия 5% с продаж",
      "Возможность участия в акциях",
    ],
  },
  {
    id: "maxi",
    name: "Макси",
    price: 7900,
    duration: "month",
    maxProducts: 5500,
    isPopular: true,
    description: "Оптимальный выбор для растущего бизнеса",
    features: [
      "До 5 500 товаров в каталоге",
      "Расширенная аналитика и отчеты",
      "Приоритетная поддержка 24/7",
      "Продвинутые инструменты продвижения",
      "Сниженная комиссия 3.5% с продаж",
      "Участие в специальных акциях",
      "Персональный менеджер",
      "Возможность создания брендинга магазина",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 27900,
    duration: "month",
    maxProducts: 50000,
    description: "Для крупных магазинов и серьезного бизнеса",
    features: [
      "До 50 000 товаров в каталоге",
      "Полная аналитика с BI-панелью",
      "VIP-поддержка и консультации",
      "Эксклюзивные инструменты продвижения",
      "Минимальная комиссия 2.5% с продаж",
      "Эксклюзивные акции и спецпредложения",
      "Выделенный персональный менеджер",
      "Полная кастомизация магазина",
      "API для интеграций",
      "Приоритетное размещение в поиске",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 75000,
    duration: "year",
    maxProducts: -1, // Безлимит
    description: "Максимальные возможности для enterprise-клиентов",
    features: [
      "Неограниченное количество товаров",
      "Enterprise аналитика и отчетность",
      "Персональная техническая поддержка",
      "Все инструменты продвижения включены",
      "Минимальная комиссия 1.5% с продаж",
      "Эксклюзивный статус в маркетплейсе",
      "Команда персональных менеджеров",
      "Индивидуальный дизайн магазина",
      "Полный доступ к API",
      "Приоритетное размещение и реклама",
      "Экономия 50% при годовой подписке",
      "Возможность белого лейбла",
    ],
  },
];
