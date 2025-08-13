export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  sellerId: number;
  sellerName: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  brand: string;
  model?: string;
  specifications: { [key: string]: string };
  tags: string[];
  weight?: string;
  dimensions?: string;
  warranty: string;
  deliveryInfo: string;
  returnsPolicy: string;
  createdAt: string;
  views: number;
  isPopular: boolean;
  isFeatured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB Space Black",
    description: "Новейший iPhone 15 Pro Max с титановым корпусом и самой совершенной камерной системой. Процессор A17 Pro обеспечивает невероятную производительность для профессиональных задач и игр. Система Pro camera с новым объективом 5x Telephoto позволяет снимать потрясающие фото и видео в любых условиях.",
    price: 134990,
    originalPrice: 149990,
    category: "Электроника",
    subcategory: "Смартфоны",
    images: ["/img/75efe2f2-e0db-477f-9353-0bb4a1f9da03.jpg"],
    sellerId: 1,
    sellerName: "Александр Михайлов",
    rating: 4.9,
    reviewsCount: 89,
    inStock: true,
    stockCount: 15,
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    specifications: {
      "Процессор": "A17 Pro",
      "Память": "256 ГБ",
      "Оперативная память": "8 ГБ",
      "Экран": "6.7\" Super Retina XDR OLED",
      "Камера": "48 Мп + 12 Мп + 12 Мп",
      "Батарея": "4441 мАч",
      "Операционная система": "iOS 17",
      "Цвет": "Space Black"
    },
    tags: ["новинка", "флагман", "5G", "беспроводная зарядка"],
    weight: "221 г",
    dimensions: "159.9 × 76.7 × 8.25 мм",
    warranty: "1 год официальной гарантии Apple",
    deliveryInfo: "Бесплатная доставка по Москве в течение 1-2 дней",
    returnsPolicy: "Возврат в течение 14 дней без объяснения причин",
    createdAt: "2024-01-15T10:00:00Z",
    views: 2847,
    isPopular: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Игровой ноутбук ASUS ROG Strix G15",
    description: "Мощный игровой ноутбук для самых требовательных игр и профессиональных задач. Процессор AMD Ryzen 7 и видеокарта RTX 4060 обеспечивают плавный геймплей в 1080p на максимальных настройках. Продвинутая система охлаждения ROG Intelligent Cooling поддерживает оптимальную температуру.",
    price: 89990,
    originalPrice: 99990,
    category: "Электроника",
    subcategory: "Ноутбуки",
    images: ["/img/5620cd4a-e1d4-491e-ada5-1840e15542b7.jpg"],
    sellerId: 1,
    sellerName: "Александр Михайлов",
    rating: 4.7,
    reviewsCount: 134,
    inStock: true,
    stockCount: 8,
    brand: "ASUS",
    model: "ROG Strix G15 G513",
    specifications: {
      "Процессор": "AMD Ryzen 7 7735HS",
      "Видеокарта": "NVIDIA RTX 4060 8GB",
      "Оперативная память": "16 ГБ DDR5",
      "Накопитель": "512 ГБ SSD NVMe",
      "Экран": "15.6\" IPS 144Hz",
      "Разрешение": "1920x1080 Full HD",
      "Операционная система": "Windows 11 Home"
    },
    tags: ["игровой", "RTX", "144Hz", "RGB подсветка"],
    weight: "2.3 кг",
    dimensions: "35.4 × 25.9 × 2.24 см",
    warranty: "2 года гарантии ASUS",
    deliveryInfo: "Доставка по России 3-5 рабочих дней",
    returnsPolicy: "Возврат в течение 7 дней при сохранении упаковки",
    createdAt: "2024-01-20T14:30:00Z",
    views: 1923,
    isPopular: true,
    isFeatured: false
  },
  {
    id: 3,
    name: "Женское пальто Zara Premium",
    description: "Элегантное женское пальто из высококачественной шерсти с добавлением кашемира. Классический приталенный крой подчеркивает силуэт. Подходит для деловых встреч и особых случаев. Выполнено в благородном цвете camel, который легко сочетается с любым гардеробом.",
    price: 12990,
    originalPrice: 15990,
    category: "Одежда",
    subcategory: "Верхняя одежда",
    images: ["/img/b68406dd-83dd-4076-b3a3-5bc700222cde.jpg"],
    sellerId: 2,
    sellerName: "Марина Солнцева",
    rating: 4.8,
    reviewsCount: 67,
    inStock: true,
    stockCount: 12,
    brand: "Zara",
    specifications: {
      "Материал": "80% шерсть, 15% кашемир, 5% полиамид",
      "Подкладка": "100% вискоза",
      "Размерный ряд": "XS, S, M, L, XL",
      "Длина": "Миди",
      "Застежка": "Пуговицы",
      "Карманы": "2 боковых кармана",
      "Уход": "Химчистка"
    },
    tags: ["премиум", "шерсть", "кашемир", "классика"],
    weight: "800 г",
    warranty: "Гарантия качества 6 месяцев",
    deliveryInfo: "Доставка курьером или в пункт выдачи",
    returnsPolicy: "Обмен и возврат в течение 30 дней",
    createdAt: "2024-01-25T09:15:00Z",
    views: 856,
    isPopular: false,
    isFeatured: true
  },
  {
    id: 4,
    name: "Кроссовки Nike Air Max 270",
    description: "Стильные и комфортные кроссовки для ежедневной носки и спорта. Технология Air Max обеспечивает превосходную амортизацию. Легкая сетчатая конструкция верха обеспечивает воздухопроницаемость. Подошва из прочной резины гарантирует долговечность.",
    price: 8990,
    originalPrice: 11990,
    category: "Обувь",
    subcategory: "Кроссовки",
    images: ["/img/56cf261e-9164-4f29-a277-20c9d6f826de.jpg"],
    sellerId: 3,
    sellerName: "Дмитрий Волков",
    rating: 4.6,
    reviewsCount: 203,
    inStock: true,
    stockCount: 25,
    brand: "Nike",
    model: "Air Max 270",
    specifications: {
      "Материал верха": "Текстиль и синтетика",
      "Подошва": "Резина",
      "Технология": "Air Max",
      "Размерный ряд": "36-46",
      "Высота подошвы": "32 мм",
      "Назначение": "Lifestyle, бег",
      "Пол": "Унисекс"
    },
    tags: ["Nike", "Air Max", "спорт", "комфорт"],
    weight: "300 г (размер 42)",
    warranty: "6 месяцев гарантии производителя",
    deliveryInfo: "Бесплатная доставка при заказе от 3000₽",
    returnsPolicy: "Возврат в течение 14 дней",
    createdAt: "2024-02-01T11:20:00Z",
    views: 1456,
    isPopular: true,
    isFeatured: false
  },
  {
    id: 5,
    name: "Журнальный столик Скандинавский",
    description: "Стильный журнальный столик в скандинавском стиле. Изготовлен из натурального дуба с металлическими ножками. Минималистичный дизайн идеально впишется в современный интерьер. Прочная конструкция выдерживает нагрузку до 30 кг.",
    price: 7490,
    originalPrice: 8990,
    category: "Дом и интерьер",
    subcategory: "Мебель",
    images: ["/img/84408365-6f8e-40b0-bbec-5d90f7fadce0.jpg"],
    sellerId: 4,
    sellerName: "Елена Кузнецова",
    rating: 4.7,
    reviewsCount: 45,
    inStock: true,
    stockCount: 18,
    brand: "Скандинавия",
    specifications: {
      "Материал столешницы": "Массив дуба",
      "Материал ножек": "Металл с порошковым покрытием",
      "Размеры": "100×60×45 см",
      "Максимальная нагрузка": "30 кг",
      "Цвет столешницы": "Натуральный дуб",
      "Цвет ножек": "Черный матовый",
      "Сборка": "Требуется"
    },
    tags: ["скандинавский стиль", "дуб", "минимализм", "мебель"],
    weight: "12 кг",
    dimensions: "100×60×45 см",
    warranty: "2 года гарантии",
    deliveryInfo: "Доставка и подъем до квартиры",
    returnsPolicy: "Возврат в течение 7 дней в оригинальной упаковке",
    createdAt: "2024-02-05T13:45:00Z",
    views: 634,
    isPopular: false,
    isFeatured: false
  },
  {
    id: 6,
    name: "Антивозрастной крем La Mer",
    description: "Люксовый антивозрастной крем с легендарным комплексом Miracle Broth™. Интенсивно увлажняет, разглаживает морщины и повышает упругость кожи. Подходит для всех типов кожи. Результат заметен уже через 2 недели регулярного использования.",
    price: 18990,
    originalPrice: 21990,
    category: "Красота",
    subcategory: "Уход за лицом",
    images: ["/img/77962f78-0aa7-467f-8374-4e49cf5384b8.jpg"],
    sellerId: 6,
    sellerName: "Ирина Белова",
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    stockCount: 7,
    brand: "La Mer",
    model: "The Moisturizing Cream",
    specifications: {
      "Объем": "50 мл",
      "Тип кожи": "Все типы",
      "Возраст": "35+",
      "Эффект": "Увлажнение, антивозрастной",
      "Время применения": "Утро, вечер",
      "Страна производства": "США",
      "Срок годности": "36 месяцев"
    },
    tags: ["люкс", "антивозрастной", "La Mer", "премиум"],
    weight: "150 г",
    warranty: "Гарантия качества от производителя",
    deliveryInfo: "Деликатная доставка курьером",
    returnsPolicy: "Возврат в течение 14 дней при сохранении упаковки",
    createdAt: "2024-02-08T16:30:00Z",
    views: 789,
    isPopular: false,
    isFeatured: true
  },
  {
    id: 7,
    name: "Развивающая деревянная головоломка",
    description: "Образовательная деревянная головоломка для развития мелкой моторики и логического мышления. Изготовлена из экологически чистого дерева, окрашена безопасными красками. Подходит для детей от 3 лет. Способствует развитию пространственного мышления.",
    price: 1290,
    originalPrice: 1590,
    category: "Детские товары",
    subcategory: "Развивающие игрушки",
    images: ["/img/e8ad55ea-4eb2-4ddd-ad0e-4c32e8d9c975.jpg"],
    sellerId: 7,
    sellerName: "Сергей Петров",
    rating: 4.8,
    reviewsCount: 234,
    inStock: true,
    stockCount: 45,
    brand: "EcoToys",
    specifications: {
      "Материал": "Натуральное дерево (береза)",
      "Краски": "Водные, безопасные",
      "Возраст": "3+ лет",
      "Размер": "20×20×2 см",
      "Количество деталей": "26 букв алфавита",
      "Сертификация": "CE, EN71",
      "Развивает": "Моторику, логику, память"
    },
    tags: ["развивающая", "дерево", "экологичная", "безопасная"],
    weight: "400 г",
    dimensions: "20×20×2 см",
    warranty: "1 год гарантии качества",
    deliveryInfo: "Быстрая доставка по всей России",
    returnsPolicy: "Возврат в течение 30 дней",
    createdAt: "2024-02-10T08:00:00Z",
    views: 567,
    isPopular: true,
    isFeatured: false
  },
  {
    id: 8,
    name: "Набор автокосметики Premium",
    description: "Профессиональный набор для ухода за автомобилем. Включает шампунь для бесконтактной мойки, воск, полироль и микрофибровые салфетки. Подходит для всех типов покрытий. Немецкое качество по доступной цене.",
    price: 2890,
    originalPrice: 3490,
    category: "Автотовары",
    subcategory: "Автокосметика",
    images: ["/img/bf763bde-9f74-43a7-b9c9-ab4350a6e55e.jpg"],
    sellerId: 5,
    sellerName: "Андрей Романов",
    rating: 4.6,
    reviewsCount: 89,
    inStock: true,
    stockCount: 32,
    brand: "CarPro",
    specifications: {
      "В наборе": "Шампунь 500мл, воск 200мл, полироль 250мл, 3 салфетки",
      "Шампунь": "Концентрированный, pH-нейтральный",
      "Воск": "Карнаубский воск",
      "Салфетки": "Микрофибра 40×40 см",
      "Применение": "Легковые и грузовые авто",
      "Страна": "Германия"
    },
    tags: ["автокосметика", "немецкое качество", "набор", "детейлинг"],
    weight: "1.2 кг",
    warranty: "Гарантия качества 1 год",
    deliveryInfo: "Доставка транспортной компанией",
    returnsPolicy: "Возврат в течение 14 дней",
    createdAt: "2024-02-12T12:15:00Z",
    views: 423,
    isPopular: false,
    isFeatured: false
  },
  {
    id: 9,
    name: "Набор бизнес-литературы \"Успех\"",
    description: "Коллекция из 5 бестселлеров по бизнесу и личностному росту. Включает произведения признанных экспертов в области управления, психологии успеха и финансовой грамотности. Идеальный подарок для амбициозных людей.",
    price: 3290,
    originalPrice: 4590,
    category: "Книги",
    subcategory: "Бизнес-литература",
    images: ["/img/89ca6afa-3288-41ce-8587-d82ae9bc6767.jpg"],
    sellerId: 8,
    sellerName: "Ольга Смирнова",
    rating: 4.7,
    reviewsCount: 167,
    inStock: true,
    stockCount: 23,
    brand: "Разные издательства",
    specifications: {
      "Количество книг": "5 шт",
      "Язык": "Русский",
      "Переплет": "Твердый",
      "Общее количество страниц": "≈1500",
      "Издательства": "Эксмо, АСТ, Альпина",
      "Год издания": "2022-2024",
      "Темы": "Бизнес, психология, финансы"
    },
    tags: ["бизнес", "саморазвитие", "набор", "бестселлеры"],
    weight: "2.1 кг",
    warranty: "Гарантия качества печати",
    deliveryInfo: "Упаковка в подарочную коробку",
    returnsPolicy: "Возврат в течение 14 дней",
    createdAt: "2024-02-14T15:40:00Z",
    views: 345,
    isPopular: false,
    isFeatured: false
  }
];

// Функция для загрузки товаров в localStorage
export const initializeProducts = () => {
  const existingProducts = localStorage.getItem('products');
  if (!existingProducts) {
    localStorage.setItem('products', JSON.stringify(products));
  }
};

// Функция для получения товаров из localStorage
export const getProducts = (): Product[] => {
  try {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

// Функция для получения товаров по категории
export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category === category);
};

// Функция для получения товаров продавца
export const getProductsBySeller = (sellerId: number): Product[] => {
  const products = getProducts();
  return products.filter(product => product.sellerId === sellerId);
};

// Функция для поиска товаров
export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Совместимость со старым форматом
export const productsByCategory: Record<string, any[]> = {
  electronics: products.filter(p => p.category === "Электроника"),
  clothing: products.filter(p => p.category === "Одежда"),
  "home-garden": products.filter(p => p.category === "Дом и интерьер"),
  home: products.filter(p => p.category === "Дом и интерьер"),
  sport: products.filter(p => p.category === "Спорт"),
  sports: products.filter(p => p.category === "Спорт"),
  beauty: products.filter(p => p.category === "Красота"),
  auto: products.filter(p => p.category === "Автотовары"),
  books: products.filter(p => p.category === "Книги"),
  toys: products.filter(p => p.category === "Детские товары"),
};