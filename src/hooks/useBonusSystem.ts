import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface BonusTransaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  orderId: string;
  description: string;
  date: Date;
}

interface BonusData {
  balance: number;
  transactions: BonusTransaction[];
  cardNumber: string;
  cardLevel: "Серебряная" | "Золотая" | "Платиновая";
}

// Функция генерации уникального номера карты
const generateCardNumber = () => {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = Math.floor(1000 + Math.random() * 9000).toString();
    segments.push(segment);
  }
  return segments.join(" ");
};

// Функция расчета процента бонусов (1-3% рандомно)
const calculateBonusPercentage = () => {
  return Math.floor(Math.random() * 3) + 1; // 1%, 2% или 3%
};

// Функция определения уровня карты на основе потраченной суммы
const getCardLevel = (
  totalSpent: number,
): "Серебряная" | "Золотая" | "Платиновая" => {
  if (totalSpent >= 100000) return "Платиновая";
  if (totalSpent >= 50000) return "Золотая";
  return "Серебряная";
};

export const useBonusSystem = () => {
  const { user } = useAuth();
  const [bonusData, setBonusData] = useState<BonusData>({
    balance: 0,
    transactions: [],
    cardNumber: "",
    cardLevel: "Серебряная",
  });

  const storageKey = `bonus-data-${user?.id || "guest"}`;

  // Загрузка данных при инициализации
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setBonusData({
          ...parsed,
          transactions: parsed.transactions.map((t: any) => ({
            ...t,
            date: new Date(t.date),
          })),
        });
      } catch (error) {
        console.error("Ошибка загрузки бонусных данных:", error);
        initializeBonusData();
      }
    } else {
      initializeBonusData();
    }
  }, [user?.id]);

  // Инициализация бонусных данных для нового пользователя
  const initializeBonusData = () => {
    const newData: BonusData = {
      balance: 0,
      transactions: [],
      cardNumber: generateCardNumber(),
      cardLevel: "Серебряная",
    };
    setBonusData(newData);
    localStorage.setItem(storageKey, JSON.stringify(newData));
  };

  // Сохранение данных в localStorage
  const saveData = (data: BonusData) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  // Начисление бонусов за покупку
  const earnBonuses = (orderId: string, orderAmount: number) => {
    const bonusPercentage = calculateBonusPercentage();
    const bonusAmount = Math.floor((orderAmount * bonusPercentage) / 100);

    const transaction: BonusTransaction = {
      id: crypto.randomUUID(),
      type: "earned",
      amount: bonusAmount,
      orderId,
      description: `Покупка на сумму ${orderAmount.toLocaleString()} ₽ (+${bonusPercentage}% бонусов)`,
      date: new Date(),
    };

    setBonusData((prev) => {
      // Рассчитываем общую потраченную сумму для определения уровня карты
      const totalSpent =
        prev.transactions
          .filter((t) => t.type === "earned")
          .reduce(
            (sum, t) => sum + (t.amount * 100) / calculateBonusPercentage(),
            0,
          ) + orderAmount;

      const newData = {
        ...prev,
        balance: prev.balance + bonusAmount,
        cardLevel: getCardLevel(totalSpent),
        transactions: [transaction, ...prev.transactions].slice(0, 50), // Храним последние 50 операций
      };

      saveData(newData);
      return newData;
    });

    return { bonusAmount, bonusPercentage };
  };

  // Списание бонусов при оплате
  const spendBonuses = (
    orderId: string,
    bonusAmount: number,
    description?: string,
  ) => {
    if (bonusAmount > bonusData.balance) {
      throw new Error("Недостаточно бонусов на счету");
    }

    const transaction: BonusTransaction = {
      id: crypto.randomUUID(),
      type: "spent",
      amount: bonusAmount,
      orderId,
      description:
        description || `Оплата заказа бонусами (-${bonusAmount} бонусов)`,
      date: new Date(),
    };

    setBonusData((prev) => {
      const newData = {
        ...prev,
        balance: prev.balance - bonusAmount,
        transactions: [transaction, ...prev.transactions].slice(0, 50),
      };

      saveData(newData);
      return newData;
    });

    return true;
  };

  // Проверка возможности использования бонусов
  const canUseBonuses = (orderAmount: number, requestedBonuses: number) => {
    const maxBonusUsage = Math.floor(orderAmount * 0.5); // Максимум 50% от суммы заказа
    return (
      requestedBonuses <= bonusData.balance && requestedBonuses <= maxBonusUsage
    );
  };

  // Расчет максимального количества бонусов для использования
  const getMaxUsableBonuses = (orderAmount: number) => {
    const maxBonusUsage = Math.floor(orderAmount * 0.5);
    return Math.min(bonusData.balance, maxBonusUsage);
  };

  return {
    bonusData,
    earnBonuses,
    spendBonuses,
    canUseBonuses,
    getMaxUsableBonuses,
    calculateBonusPercentage,
  };
};
