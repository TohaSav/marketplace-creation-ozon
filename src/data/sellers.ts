export interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'seller';
  balance: number;
  paymentMethod: string;
  accountDetails: string;
  rating: number;
  reviewsCount: number;
  description: string;
  location: string;
  joinDate: string;
  verified: boolean;
  specialization: string[];
}

export const sellers: Seller[] = [
  {
    id: 1,
    name: "Александр Михайлов",
    email: "alex.mikhailov@email.ru",
    phone: "+7 (912) 345-67-89",
    userType: "seller",
    balance: 85420.50,
    paymentMethod: "card",
    accountDetails: "****2847",
    rating: 4.9,
    reviewsCount: 247,
    description: "Специализируюсь на продаже электроники и компьютерной техники. Работаю с проверенными поставщиками, гарантирую качество и быструю доставку.",
    location: "Москва",
    joinDate: "2022-03-15",
    verified: true,
    specialization: ["Электроника", "Компьютеры", "Смартфоны"]
  },
  {
    id: 2,
    name: "Марина Солнцева",
    email: "marina.solntseva@gmail.com",
    phone: "+7 (985) 123-45-67",
    userType: "seller",
    balance: 127340.80,
    paymentMethod: "sbp",
    accountDetails: "+7985****567",
    rating: 4.8,
    reviewsCount: 189,
    description: "Продаю женскую одежду и аксессуары. Работаю напрямую с производителями в Турции и Италии. Все товары сертифицированы.",
    location: "Санкт-Петербург",
    joinDate: "2021-11-08",
    verified: true,
    specialization: ["Одежда", "Аксессуары", "Обувь"]
  },
  {
    id: 3,
    name: "Дмитрий Волков",
    email: "dmitry.volkov@yandex.ru",
    phone: "+7 (903) 789-12-34",
    userType: "seller",
    balance: 93750.25,
    paymentMethod: "card",
    accountDetails: "****1592",
    rating: 4.7,
    reviewsCount: 156,
    description: "Торгую спортивными товарами и товарами для активного отдыха. Официальный дилер нескольких известных брендов.",
    location: "Екатеринбург",
    joinDate: "2022-07-22",
    verified: true,
    specialization: ["Спорт", "Туризм", "Активный отдых"]
  },
  {
    id: 4,
    name: "Елена Кузнецова",
    email: "elena.kuznetsova@mail.ru",
    phone: "+7 (926) 456-78-90",
    userType: "seller",
    balance: 156780.40,
    paymentMethod: "card",
    accountDetails: "****3741",
    rating: 4.9,
    reviewsCount: 312,
    description: "Продаю товары для дома и интерьера. Работаю с декором, мебелью, освещением. Помогаю с дизайн-проектами.",
    location: "Нижний Новгород",
    joinDate: "2021-05-13",
    verified: true,
    specialization: ["Дом и интерьер", "Мебель", "Декор"]
  },
  {
    id: 5,
    name: "Андрей Романов",
    email: "andrey.romanov@gmail.com",
    phone: "+7 (917) 234-56-78",
    userType: "seller",
    balance: 74520.90,
    paymentMethod: "sbp",
    accountDetails: "+7917****678",
    rating: 4.6,
    reviewsCount: 98,
    description: "Специализируюсь на автотоварах и автоаксессуарах. Работаю с оригинальными запчастями и качественной автокосметикой.",
    location: "Краснодар",
    joinDate: "2022-09-03",
    verified: true,
    specialization: ["Автотовары", "Запчасти", "Автокосметика"]
  },
  {
    id: 6,
    name: "Ирина Белова",
    email: "irina.belova@outlook.com",
    phone: "+7 (495) 678-90-12",
    userType: "seller",
    balance: 112950.60,
    paymentMethod: "card",
    accountDetails: "****8265",
    rating: 4.8,
    reviewsCount: 203,
    description: "Продаю косметику и товары для красоты. Работаю только с сертифицированной продукцией известных брендов.",
    location: "Москва",
    joinDate: "2021-12-07",
    verified: true,
    specialization: ["Красота", "Косметика", "Уход"]
  },
  {
    id: 7,
    name: "Сергей Петров",
    email: "sergey.petrov@rambler.ru",
    phone: "+7 (912) 345-67-89",
    userType: "seller",
    balance: 89430.75,
    paymentMethod: "sbp",
    accountDetails: "+7912****789",
    rating: 4.7,
    reviewsCount: 167,
    description: "Торгую детскими товарами и игрушками. Все товары безопасны, имеют необходимые сертификаты качества.",
    location: "Новосибирск",
    joinDate: "2022-02-18",
    verified: true,
    specialization: ["Детские товары", "Игрушки", "Детская одежда"]
  },
  {
    id: 8,
    name: "Ольга Смирнова",
    email: "olga.smirnova@bk.ru",
    phone: "+7 (981) 567-89-01",
    userType: "seller",
    balance: 198750.20,
    paymentMethod: "card",
    accountDetails: "****4926",
    rating: 4.9,
    reviewsCount: 445,
    description: "Специализируюсь на книгах, канцелярских товарах и товарах для творчества. Работаю с издательствами напрямую.",
    location: "Санкт-Петербург",
    joinDate: "2020-08-25",
    verified: true,
    specialization: ["Книги", "Канцелярия", "Творчество"]
  }
];

// Функция для загрузки продавцов в localStorage
export const initializeSellers = () => {
  const existingSellers = localStorage.getItem('sellers');
  if (!existingSellers) {
    localStorage.setItem('sellers', JSON.stringify(sellers));
  }
};