import { SellerCard, CardTransaction } from "@/types/card.types";

// Генерация уникального номера карты
export function generateCardNumber(): string {
  // Префикс Calibre Store: 5847
  const prefix = "5847";

  // Генерируем 12 случайных цифр
  let cardNumber = prefix;
  for (let i = 0; i < 12; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }

  // Форматируем номер карты (xxxx xxxx xxxx xxxx)
  return cardNumber.replace(/(.{4})/g, "$1 ").trim();
}

// Проверка уникальности номера карты
export function isCardNumberUnique(
  cardNumber: string,
  existingCards: SellerCard[],
): boolean {
  return !existingCards.some((card) => card.cardNumber === cardNumber);
}

// Генерация уникального номера карты с проверкой
export function generateUniqueCardNumber(existingCards: SellerCard[]): string {
  let cardNumber: string;
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    cardNumber = generateCardNumber();
    attempts++;

    if (attempts > maxAttempts) {
      throw new Error("Не удалось сгенерировать уникальный номер карты");
    }
  } while (!isCardNumberUnique(cardNumber, existingCards));

  return cardNumber;
}

// Определение типа карты на основе статистики продавца
export function determineCardType(
  totalEarnings: number,
  monthlyEarnings: number,
): SellerCard["cardType"] {
  if (totalEarnings >= 500000 || monthlyEarnings >= 100000) {
    return "elite";
  } else if (totalEarnings >= 100000 || monthlyEarnings >= 25000) {
    return "premium";
  } else {
    return "standard";
  }
}

// Создание новой карты для продавца
export function createSellerCard(
  sellerId: number,
  existingCards: SellerCard[] = [],
  initialEarnings: { total: number; monthly: number } = {
    total: 0,
    monthly: 0,
  },
): SellerCard {
  const cardNumber = generateUniqueCardNumber(existingCards);
  const cardType = determineCardType(
    initialEarnings.total,
    initialEarnings.monthly,
  );

  return {
    id: `card_${Date.now()}_${sellerId}`,
    cardNumber,
    sellerId,
    balance: 0,
    issuedDate: new Date().toISOString().split("T")[0],
    cardType,
    status: "active",
    transactions: [],
    monthlyEarnings: initialEarnings.monthly,
    totalEarnings: initialEarnings.total,
  };
}

// Добавление транзакции на карту
export function addTransactionToCard(
  card: SellerCard,
  transaction: Omit<CardTransaction, "id" | "date" | "status">,
): SellerCard {
  const newTransaction: CardTransaction = {
    ...transaction,
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
    status: "completed",
  };

  const updatedBalance =
    transaction.type === "purchase" || transaction.type === "bonus"
      ? card.balance + transaction.amount
      : card.balance - transaction.amount;

  const updatedCard: SellerCard = {
    ...card,
    balance: Math.max(0, updatedBalance),
    transactions: [newTransaction, ...card.transactions],
  };

  // Обновляем статистику заработка
  if (transaction.type === "purchase") {
    updatedCard.totalEarnings += transaction.amount;

    // Проверяем, нужно ли обновить тип карты
    const newCardType = determineCardType(
      updatedCard.totalEarnings,
      updatedCard.monthlyEarnings,
    );
    if (newCardType !== updatedCard.cardType) {
      updatedCard.cardType = newCardType;
    }
  }

  return updatedCard;
}

// Форматирование номера карты (скрытие части номера)
export function formatCardNumberSecure(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, "");
  const firstFour = cleaned.slice(0, 4);
  const lastFour = cleaned.slice(-4);
  return `${firstFour} •••• •••• ${lastFour}`;
}

// Форматирование суммы для отображения
export function formatCardBalance(balance: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(balance);
}
