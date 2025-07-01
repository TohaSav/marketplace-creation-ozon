import { DeliveryMethod } from "@/types/delivery";

export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "cdek",
    name: "СДЭК",
    fullName: "СДЭК — служба экспресс-доставки",
    description: "Быстрая доставка до пункта выдачи или курьером до двери",
    icon: "Truck",
    estimatedDays: "1-3 дня",
    minPrice: 150,
    maxPrice: 800,
    features: [
      "Доставка до пункта выдачи",
      "Курьерская доставка",
      "Отслеживание посылки",
      "Примерка перед покупкой",
      "Страхование груза",
    ],
    isPopular: true,
  },
  {
    id: "russianpost",
    name: "Почта России",
    fullName: "Почта России",
    description: "Доставка во все населённые пункты России",
    icon: "Mail",
    estimatedDays: "5-14 дней",
    minPrice: 200,
    maxPrice: 600,
    features: [
      "Доставка по всей России",
      "Доставка до почтового отделения",
      "Отслеживание отправления",
      "Наложенный платёж",
      "Доступные тарифы",
    ],
  },
  {
    id: "delline",
    name: "Деловые Линии",
    fullName: "Деловые Линии",
    description: "Грузоперевозки и логистические услуги",
    icon: "Package",
    estimatedDays: "2-5 дней",
    minPrice: 300,
    maxPrice: 1200,
    features: [
      "Доставка крупногабаритных товаров",
      "Терминальная доставка",
      "Доставка до двери",
      "Подъём на этаж",
      "Сборка и установка",
    ],
  },
  {
    id: "boxberry",
    name: "Boxberry",
    fullName: "Boxberry",
    description: "Доставка до постаматов и пунктов выдачи",
    icon: "Box",
    estimatedDays: "1-4 дня",
    minPrice: 120,
    maxPrice: 500,
    features: [
      "Постаматы 24/7",
      "Пункты выдачи",
      "Курьерская доставка",
      "Примерка при получении",
      "Возврат в любом пункте",
    ],
  },
  {
    id: "kit",
    name: "КТ Кит",
    fullName: "КТ — Курьерские Технологии",
    description: "Экспресс-доставка по Москве и области",
    icon: "Zap",
    estimatedDays: "1-2 дня",
    minPrice: 250,
    maxPrice: 700,
    features: [
      "Быстрая доставка",
      "Доставка в день заказа",
      "Курьер до двери",
      "Оплата при получении",
      "SMS-уведомления",
    ],
  },
];

export const getDeliveryMethod = (
  methodId: string,
): DeliveryMethod | undefined => {
  return DELIVERY_METHODS.find((method) => method.id === methodId);
};

export const calculateDeliveryPrice = (
  methodId: string,
  weight: number,
  distance: number,
): number => {
  const method = getDeliveryMethod(methodId);
  if (!method) return 0;

  // Простая формула расчёта (в реальном приложении будет API)
  const basePrice = method.minPrice;
  const weightMultiplier = Math.max(1, Math.ceil(weight / 1000)); // за каждый кг
  const distanceMultiplier = distance > 500 ? 1.5 : 1; // дальние регионы

  return Math.min(
    basePrice * weightMultiplier * distanceMultiplier,
    method.maxPrice,
  );
};
