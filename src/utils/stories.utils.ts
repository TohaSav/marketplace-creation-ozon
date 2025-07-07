import { Story, CreateStoryData, StoryPayment } from "@/types/stories";

// Создание новой Story
export const createStory = async (
  storyData: CreateStoryData,
  sellerId: string,
  sellerName: string,
): Promise<Story> => {
  // Обработка платежа
  const paymentResult = await processStoryPayment(storyData, sellerId);

  if (paymentResult.status !== "completed") {
    throw new Error("Ошибка при обработке платежа");
  }

  // Создание Story
  const story: Story = {
    id: `story_${Date.now()}_${sellerId}`,
    sellerId,
    sellerName,
    sellerAvatar: "", // Можно добавить аватар продавца
    title: storyData.title,
    description: storyData.description,
    image:
      typeof storyData.image === "string"
        ? storyData.image
        : storyData.image
          ? URL.createObjectURL(storyData.image)
          : "",
    productId: storyData.productId,
    isActive: true,
    createdAt: new Date().toISOString(),
    expiresAt: calculateExpiryDate(storyData.planId),
    views: 0,
    clicks: 0,
  };

  // Сохраняем Story в localStorage
  const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
  existingStories.push(story);
  localStorage.setItem("stories", JSON.stringify(existingStories));

  return story;
};

// Обработка платежа за Story
export const processStoryPayment = async (
  storyData: CreateStoryData,
  sellerId: string,
): Promise<StoryPayment> => {
  const plans = {
    week: { duration: 7, price: 100, walletPrice: 97 },
    month: { duration: 30, price: 500, walletPrice: 485 },
  };

  const plan = plans[storyData.planId];
  const amount =
    storyData.paymentMethod === "wallet" ? plan.walletPrice : plan.price;

  const payment: StoryPayment = {
    id: `payment_${Date.now()}_${sellerId}`,
    sellerId,
    planId: storyData.planId,
    amount,
    paymentMethod: storyData.paymentMethod,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (storyData.paymentMethod === "wallet") {
    // Списание с кошелька продавца
    const walletData = JSON.parse(
      localStorage.getItem(`wallet_${sellerId}`) || "{}",
    );
    const currentBalance = walletData.balance || 0;

    if (currentBalance < amount) {
      payment.status = "failed";
      throw new Error("Недостаточно средств в кошельке");
    }

    // Списываем средства
    walletData.balance = currentBalance - amount;
    walletData.transactions = walletData.transactions || [];
    walletData.transactions.unshift({
      id: `transaction_${Date.now()}`,
      type: "expense",
      amount: -amount,
      description: `Оплата Story (${storyData.planId === "week" ? "неделя" : "месяц"})`,
      date: new Date().toISOString(),
      status: "completed",
    });

    localStorage.setItem(`wallet_${sellerId}`, JSON.stringify(walletData));
    payment.status = "completed";
    payment.completedAt = new Date().toISOString();
  } else {
    // Здесь будет интеграция с ЮKassa
    // Пока что просто помечаем как выполненный
    payment.status = "completed";
    payment.completedAt = new Date().toISOString();
  }

  // Сохраняем платеж
  const existingPayments = JSON.parse(
    localStorage.getItem("story_payments") || "[]",
  );
  existingPayments.push(payment);
  localStorage.setItem("story_payments", JSON.stringify(existingPayments));

  return payment;
};

// Вычисление даты окончания Story
export const calculateExpiryDate = (planId: "week" | "month"): string => {
  const now = new Date();
  const duration = planId === "week" ? 7 : 30;
  now.setDate(now.getDate() + duration);
  return now.toISOString();
};

// Получение всех Stories
export const getAllStories = (): Story[] => {
  const stories = JSON.parse(localStorage.getItem("stories") || "[]");
  return stories.filter((story: Story) => {
    // Проверяем, не истекла ли Story
    if (new Date(story.expiresAt) < new Date()) {
      story.isActive = false;
    }
    return story;
  });
};

// Получение Stories продавца
export const getSellerStories = (sellerId: string): Story[] => {
  const allStories = getAllStories();
  return allStories.filter((story: Story) => story.sellerId === sellerId);
};

// Получение активных Stories для главной страницы
export const getActiveStories = (): Story[] => {
  const allStories = getAllStories();
  return allStories.filter(
    (story: Story) => story.isActive && new Date(story.expiresAt) > new Date(),
  );
};

// Удаление Story
export const deleteStory = (storyId: string): void => {
  const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
  const updatedStories = existingStories.filter(
    (story: Story) => story.id !== storyId,
  );
  localStorage.setItem("stories", JSON.stringify(updatedStories));
};

// Увеличение просмотров Story
export const incrementStoryViews = (storyId: string): void => {
  const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
  const updatedStories = existingStories.map((story: Story) =>
    story.id === storyId ? { ...story, views: story.views + 1 } : story,
  );
  localStorage.setItem("stories", JSON.stringify(updatedStories));
};

// Увеличение кликов Story
export const incrementStoryClicks = (storyId: string): void => {
  const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
  const updatedStories = existingStories.map((story: Story) =>
    story.id === storyId ? { ...story, clicks: story.clicks + 1 } : story,
  );
  localStorage.setItem("stories", JSON.stringify(updatedStories));
};
