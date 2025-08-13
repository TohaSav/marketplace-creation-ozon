// Демо-данные для презентации Юкассе

export interface DemoTransaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  description: string;
  paymentMethod: string;
  orderId: string;
  fee: number;
  netAmount: number;
  customerEmail: string;
}

export interface DemoOrder {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    phone: string;
  };
}

export interface DemoSellerStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  monthlyOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  returnRate: number;
  customerSatisfaction: number;
}

// Демо-транзакции для кабинета продавца
export const demoTransactions: DemoTransaction[] = [
  {
    id: "tx_001",
    date: "2024-03-10T14:30:00Z",
    amount: 134990,
    currency: "RUB",
    status: "completed",
    description: "Заказ #ORD-001 - iPhone 15 Pro Max",
    paymentMethod: "Банковская карта",
    orderId: "ORD-001",
    fee: 2024.85, // 1.5%
    netAmount: 132965.15,
    customerEmail: "ivan.petrov@email.com"
  },
  {
    id: "tx_002",
    date: "2024-03-10T12:15:00Z",
    amount: 89990,
    currency: "RUB",
    status: "completed",
    description: "Заказ #ORD-002 - Игровой ноутбук ASUS",
    paymentMethod: "СБП",
    orderId: "ORD-002",
    fee: 899.90, // 1%
    netAmount: 89090.10,
    customerEmail: "maria.smirnova@email.com"
  },
  {
    id: "tx_003",
    date: "2024-03-10T10:45:00Z",
    amount: 24990,
    currency: "RUB",
    status: "pending",
    description: "Заказ #ORD-003 - AirPods Pro 2",
    paymentMethod: "Банковская карта",
    orderId: "ORD-003",
    fee: 374.85,
    netAmount: 24615.15,
    customerEmail: "alexey.kozlov@email.com"
  },
  {
    id: "tx_004",
    date: "2024-03-09T16:20:00Z",
    amount: 12990,
    currency: "RUB",
    status: "completed",
    description: "Заказ #ORD-004 - Женское пальто Zara",
    paymentMethod: "ЮMoney",
    orderId: "ORD-004",
    fee: 324.75, // 2.5%
    netAmount: 12665.25,
    customerEmail: "elena.volkova@email.com"
  },
  {
    id: "tx_005",
    date: "2024-03-09T14:00:00Z",
    amount: 7990,
    currency: "RUB",
    status: "refunded",
    description: "Возврат заказа #ORD-005 - Клавиатура Gaming Pro",
    paymentMethod: "Банковская карта",
    orderId: "ORD-005",
    fee: -119.85,
    netAmount: -7870.15,
    customerEmail: "dmitry.sokolov@email.com"
  },
  {
    id: "tx_006",
    date: "2024-03-08T18:30:00Z",
    amount: 54990,
    currency: "RUB",
    status: "completed",
    description: "Заказ #ORD-006 - PlayStation 5 Slim",
    paymentMethod: "Банковская карта",
    orderId: "ORD-006",
    fee: 824.85,
    netAmount: 54165.15,
    customerEmail: "andrey.petrov@email.com"
  },
  {
    id: "tx_007",
    date: "2024-03-08T15:45:00Z",
    amount: 39990,
    currency: "RUB",
    status: "completed",
    description: "Заказ #ORD-007 - Apple Watch Series 9",
    paymentMethod: "СБП",
    orderId: "ORD-007",
    fee: 399.90,
    netAmount: 39590.10,
    customerEmail: "olga.fedorova@email.com"
  },
  {
    id: "tx_008",
    date: "2024-03-07T11:20:00Z",
    amount: 18990,
    currency: "RUB",
    status: "failed",
    description: "Заказ #ORD-008 - Ботинки Timberland (неуспешный платеж)",
    paymentMethod: "Банковская карта",
    orderId: "ORD-008",
    fee: 0,
    netAmount: 0,
    customerEmail: "sergey.morozov@email.com"
  }
];

// Демо-заказы для кабинета продавца
export const demoOrders: DemoOrder[] = [
  {
    id: "ORD-001",
    date: "2024-03-10T14:30:00Z",
    customerId: "CUST-001",
    customerName: "Иван Петров",
    customerEmail: "ivan.petrov@email.com",
    items: [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB Space Black",
        price: 134990,
        quantity: 1,
        total: 134990
      }
    ],
    subtotal: 134990,
    shipping: 0,
    tax: 0,
    total: 134990,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      name: "Иван Петров",
      address: "ул. Тверская, д. 15, кв. 45",
      city: "Москва",
      region: "Московская область",
      postalCode: "125009",
      phone: "+7 (999) 123-45-67"
    }
  },
  {
    id: "ORD-002",
    date: "2024-03-10T12:15:00Z",
    customerId: "CUST-002",
    customerName: "Мария Смирнова",
    customerEmail: "maria.smirnova@email.com",
    items: [
      {
        id: 2,
        name: "Игровой ноутбук ASUS ROG Strix G15",
        price: 89990,
        quantity: 1,
        total: 89990
      }
    ],
    subtotal: 89990,
    shipping: 0,
    tax: 0,
    total: 89990,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      name: "Мария Смирнова",
      address: "пр. Невский, д. 28, кв. 12",
      city: "Санкт-Петербург",
      region: "Ленинградская область",
      postalCode: "191025",
      phone: "+7 (812) 234-56-78"
    }
  },
  {
    id: "ORD-003",
    date: "2024-03-10T10:45:00Z",
    customerId: "CUST-003",
    customerName: "Алексей Козлов",
    customerEmail: "alexey.kozlov@email.com",
    items: [
      {
        id: 11,
        name: "AirPods Pro 2-го поколения",
        price: 24990,
        quantity: 1,
        total: 24990
      }
    ],
    subtotal: 24990,
    shipping: 300,
    tax: 0,
    total: 25290,
    status: "processing",
    paymentStatus: "pending",
    shippingAddress: {
      name: "Алексей Козлов",
      address: "ул. Ленина, д. 42, кв. 8",
      city: "Екатеринбург",
      region: "Свердловская область",
      postalCode: "620014",
      phone: "+7 (343) 567-89-01"
    }
  },
  {
    id: "ORD-004",
    date: "2024-03-09T16:20:00Z",
    customerId: "CUST-004",
    customerName: "Елена Волкова",
    customerEmail: "elena.volkova@email.com",
    items: [
      {
        id: 3,
        name: "Женское пальто Zara Premium",
        price: 12990,
        quantity: 1,
        total: 12990
      }
    ],
    subtotal: 12990,
    shipping: 400,
    tax: 0,
    total: 13390,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      name: "Елена Волкова",
      address: "ул. Красная, д. 123, кв. 56",
      city: "Краснодар",
      region: "Краснодарский край",
      postalCode: "350000",
      phone: "+7 (861) 234-56-78"
    }
  },
  {
    id: "ORD-005",
    date: "2024-03-09T14:00:00Z",
    customerId: "CUST-005",
    customerName: "Дмитрий Соколов",
    customerEmail: "dmitry.sokolov@email.com",
    items: [
      {
        id: 20,
        name: "Механическая клавиатура Gaming Pro RGB",
        price: 7990,
        quantity: 1,
        total: 7990
      }
    ],
    subtotal: 7990,
    shipping: 350,
    tax: 0,
    total: 8340,
    status: "refunded",
    paymentStatus: "refunded",
    shippingAddress: {
      name: "Дмитрий Соколов",
      address: "ул. Мира, д. 67, кв. 23",
      city: "Новосибирск",
      region: "Новосибирская область",
      postalCode: "630000",
      phone: "+7 (383) 456-78-90"
    }
  }
];

// Статистика продавца
export const demoSellerStats: DemoSellerStats = {
  totalRevenue: 2847650,
  monthlyRevenue: 425890,
  totalOrders: 1247,
  monthlyOrders: 156,
  averageOrderValue: 27350,
  conversionRate: 3.2,
  returnRate: 2.1,
  customerSatisfaction: 4.7
};

// Демо-данные для кабинета покупателя
export interface DemoBuyerOrder {
  id: string;
  date: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface DemoBuyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  bonusPoints: number;
  favoriteCategories: string[];
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    phone: string;
    isDefault: boolean;
  }>;
  paymentMethods: Array<{
    id: string;
    type: 'card' | 'sbp' | 'yoomoney';
    lastFour?: string;
    expiryDate?: string;
    isDefault: boolean;
  }>;
}

// Пустой список заказов для демо покупателя
export const demoBuyerOrders: DemoBuyerOrder[] = [];

// Пустой профиль покупателя для демо Юкассы
export const demoBuyerProfile: DemoBuyerProfile = {
  id: "BUYER-001",
  name: "Анна Иванова",
  email: "demo-buyer@yukassa.ru",
  phone: "",
  birthDate: "",
  joinDate: "2024-03-10T00:00:00Z",
  totalOrders: 0,
  totalSpent: 0,
  bonusPoints: 0,
  favoriteCategories: [],
  addresses: [],
  paymentMethods: []
};

// Демо-аналитика для отчетов
export const demoAnalytics = {
  sales: {
    daily: [
      { date: "2024-03-01", amount: 45620 },
      { date: "2024-03-02", amount: 52340 },
      { date: "2024-03-03", amount: 38950 },
      { date: "2024-03-04", amount: 67820 },
      { date: "2024-03-05", amount: 71230 },
      { date: "2024-03-06", amount: 49870 },
      { date: "2024-03-07", amount: 56940 },
      { date: "2024-03-08", amount: 63450 },
      { date: "2024-03-09", amount: 58720 },
      { date: "2024-03-10", amount: 74980 }
    ],
    byCategory: [
      { category: "Электроника", amount: 185420, percentage: 45.2 },
      { category: "Одежда", amount: 98760, percentage: 24.1 },
      { category: "Дом и интерьер", amount: 67230, percentage: 16.4 },
      { category: "Красота", amount: 34560, percentage: 8.4 },
      { category: "Спорт", amount: 23980, percentage: 5.9 }
    ]
  },
  topProducts: [
    { id: 1, name: "iPhone 15 Pro Max", sales: 12, revenue: 1619880 },
    { id: 10, name: "Samsung Galaxy S24 Ultra", sales: 8, revenue: 959920 },
    { id: 25, name: "PlayStation 5 Slim", sales: 6, revenue: 329940 },
    { id: 23, name: "Apple Watch Series 9", sales: 9, revenue: 359910 },
    { id: 22, name: "iPad Air M2", sales: 5, revenue: 374950 }
  ]
};

// Данные для демонстрации Юкассе
export const yuKassaDemoData = {
  seller: {
    accountId: "DEMO-SELLER-001",
    shopId: "123456",
    secretKey: "live_demo_key_...",
    webhookUrl: "https://poehali.dev/api/yukassa/webhook",
    returnUrl: "https://poehali.dev/payment/success",
    description: "Демо-магазин для интеграции с ЮКассой"
  },
  buyer: {
    customerId: "DEMO-BUYER-001",
    email: "demo@poehali.dev"
  },
  transactions: demoTransactions,
  analytics: demoAnalytics
};