export interface Gift {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: 'free' | 'flowers' | 'hearts' | 'luxury' | 'fun';
  description?: string;
}

export interface SentGift {
  id: string;
  giftId: string;
  fromUserId: string;
  toProfileId: string;
  sentAt: string;
  expiresAt: string;
  gift: Gift;
}

export interface ProfileGift {
  profileId: string;
  gifts: SentGift[];
}

export const GIFTS: Gift[] = [
  // Бесплатные подарки
  {
    id: 'free-smile',
    name: 'Улыбка',
    emoji: '😊',
    price: 0,
    category: 'free',
    description: 'Поделитесь улыбкой!'
  },
  {
    id: 'free-wave',
    name: 'Привет',
    emoji: '👋',
    price: 0,
    category: 'free',
    description: 'Дружеский привет'
  },
  {
    id: 'free-heart',
    name: 'Сердечко',
    emoji: '💖',
    price: 0,
    category: 'free',
    description: 'Простое сердечко'
  },

  // Цветы (5 монет)
  {
    id: 'rose',
    name: 'Роза',
    emoji: '🌹',
    price: 5,
    category: 'flowers',
    description: 'Красивая красная роза'
  },
  {
    id: 'bouquet',
    name: 'Букет',
    emoji: '💐',
    price: 5,
    category: 'flowers',
    description: 'Красивый букет цветов'
  },
  {
    id: 'tulip',
    name: 'Тюльпан',
    emoji: '🌷',
    price: 5,
    category: 'flowers',
    description: 'Нежный тюльпан'
  },
  {
    id: 'sunflower',
    name: 'Подсолнух',
    emoji: '🌻',
    price: 5,
    category: 'flowers',
    description: 'Яркий подсолнух'
  },

  // Сердечки (5 монет)
  {
    id: 'heart-eyes',
    name: 'Влюблённые глаза',
    emoji: '😍',
    price: 5,
    category: 'hearts',
    description: 'Влюблённый взгляд'
  },
  {
    id: 'kiss',
    name: 'Поцелуй',
    emoji: '💋',
    price: 5,
    category: 'hearts',
    description: 'Нежный поцелуй'
  },
  {
    id: 'couple',
    name: 'Пара',
    emoji: '💑',
    price: 5,
    category: 'hearts',
    description: 'Влюблённая пара'
  },
  {
    id: 'sparkling-heart',
    name: 'Сияющее сердце',
    emoji: '💖',
    price: 5,
    category: 'hearts',
    description: 'Сияющее сердце'
  },

  // Роскошные подарки (5 монет)
  {
    id: 'diamond',
    name: 'Бриллиант',
    emoji: '💎',
    price: 5,
    category: 'luxury',
    description: 'Роскошный бриллиант'
  },
  {
    id: 'crown',
    name: 'Корона',
    emoji: '👑',
    price: 5,
    category: 'luxury',
    description: 'Золотая корона'
  },
  {
    id: 'ring',
    name: 'Кольцо',
    emoji: '💍',
    price: 5,
    category: 'luxury',
    description: 'Обручальное кольцо'
  },
  {
    id: 'champagne',
    name: 'Шампанское',
    emoji: '🥂',
    price: 5,
    category: 'luxury',
    description: 'Бокал шампанского'
  },

  // Весёлые подарки (5 монет)
  {
    id: 'balloon',
    name: 'Шарик',
    emoji: '🎈',
    price: 5,
    category: 'fun',
    description: 'Праздничный шарик'
  },
  {
    id: 'cake',
    name: 'Торт',
    emoji: '🎂',
    price: 5,
    category: 'fun',
    description: 'Праздничный торт'
  },
  {
    id: 'teddy',
    name: 'Мишка',
    emoji: '🧸',
    price: 5,
    category: 'fun',
    description: 'Плюшевый мишка'
  },
  {
    id: 'gift-box',
    name: 'Подарок',
    emoji: '🎁',
    price: 5,
    category: 'fun',
    description: 'Красивая коробка'
  }
];

export const GIFT_CATEGORIES = {
  free: { name: 'Бесплатные', color: 'bg-green-100 text-green-800' },
  flowers: { name: 'Цветы', color: 'bg-pink-100 text-pink-800' },
  hearts: { name: 'Сердечки', color: 'bg-red-100 text-red-800' },
  luxury: { name: 'Роскошь', color: 'bg-purple-100 text-purple-800' },
  fun: { name: 'Веселье', color: 'bg-yellow-100 text-yellow-800' }
};