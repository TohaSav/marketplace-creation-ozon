import { StoryPlan } from "@/types/stories";

export const STORY_PLANS: StoryPlan[] = [
  {
    id: "week",
    name: "Неделя",
    duration: 7,
    price: 100,
    walletPrice: 97, // 3% скидка
    discount: 3,
  },
  {
    id: "month",
    name: "Месяц",
    duration: 30,
    price: 500,
    walletPrice: 485, // 3% скидка
    discount: 3,
  },
];

export const getStoryPlan = (planId: string): StoryPlan | undefined => {
  return STORY_PLANS.find((plan) => plan.id === planId);
};
