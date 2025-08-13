// Демо-аккаунты для Юкассы

export interface DemoAccount {
  email: string;
  password: string;
  role: 'seller' | 'buyer';
  name: string;
  description: string;
}

// Демо-аккаунты для входа
export const demoAccounts: DemoAccount[] = [
  {
    email: "demo-seller@yukassa.ru",
    password: "YuKassa2024Demo!",
    role: "seller",
    name: "Александр Михайлов",
    description: "Демо-продавец с полной статистикой для Юкассы"
  },
  {
    email: "demo-buyer@yukassa.ru", 
    password: "YuKassa2024Buyer!",
    role: "buyer",
    name: "Анна Иванова",
    description: "Демо-покупатель с пустым профилем"
  }
];

// Функция для автоматического входа в демо-режим
export const loginDemoAccount = (type: 'seller' | 'buyer') => {
  const account = demoAccounts.find(acc => acc.role === type);
  if (account) {
    // Сохраняем данные для демо-режима
    localStorage.setItem('demo_mode', 'true');
    localStorage.setItem('demo_user_type', type);
    localStorage.setItem('demo_user_email', account.email);
    localStorage.setItem('demo_user_name', account.name);
    
    if (type === 'seller') {
      // Загружаем полные демо-данные для продавца
      initializeDemoSellerData();
    } else {
      // Обнуляем данные для покупателя
      initializeEmptyBuyerData();
    }
  }
};

// Инициализация демо-данных продавца
const initializeDemoSellerData = () => {
  // Импортируем демо-данные из demoData.ts
  const demoData = {
    transactions: [
      {
        id: "tx_001",
        date: "2024-03-10T14:30:00Z",
        amount: 134990,
        status: "completed",
        description: "iPhone 15 Pro Max",
        paymentMethod: "Банковская карта",
        fee: 2024.85,
        netAmount: 132965.15
      },
      {
        id: "tx_002", 
        date: "2024-03-10T12:15:00Z",
        amount: 89990,
        status: "completed",
        description: "Игровой ноутбук ASUS",
        paymentMethod: "СБП",
        fee: 899.90,
        netAmount: 89090.10
      },
      {
        id: "tx_003",
        date: "2024-03-10T10:45:00Z", 
        amount: 24990,
        status: "pending",
        description: "AirPods Pro 2",
        paymentMethod: "Банковская карта",
        fee: 374.85,
        netAmount: 24615.15
      }
    ],
    stats: {
      totalRevenue: 2847650,
      monthlyRevenue: 425890,
      totalOrders: 1247,
      monthlyOrders: 156,
      averageOrderValue: 27350,
      conversionRate: 3.2
    }
  };
  
  localStorage.setItem('demo_seller_data', JSON.stringify(demoData));
};

// Инициализация пустых данных покупателя
const initializeEmptyBuyerData = () => {
  const emptyData = {
    orders: [],
    totalOrders: 0,
    totalSpent: 0,
    bonusPoints: 0,
    favoriteCategories: [],
    addresses: [],
    paymentMethods: []
  };
  
  localStorage.setItem('demo_buyer_data', JSON.stringify(emptyData));
};