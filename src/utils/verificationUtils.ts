import {
  VerificationRequirements,
  RequirementCheck,
} from "@/types/verification";

export const checkVerificationRequirements = (
  requirements: VerificationRequirements,
): RequirementCheck[] => {
  return [
    {
      id: 1,
      name: "Продажи",
      text: "Ваш магазин должен иметь не менее 100 продаж",
      value: requirements.salesCount,
      required: 100,
      met: requirements.salesCount >= 100,
      icon: "ShoppingCart",
    },
    {
      id: 2,
      name: "Отзывы",
      text: "Ваш магазин должен иметь не менее 50 отзывов",
      value: requirements.reviewsCount,
      required: 50,
      met: requirements.reviewsCount >= 50,
      icon: "MessageSquare",
    },
    {
      id: 3,
      name: "Месяцы",
      text: "Вашему магазину должно быть больше 6 месяцев на площадке Calibre Store",
      value: requirements.monthsOnPlatform,
      required: 6,
      met: requirements.monthsOnPlatform > 6,
      icon: "Calendar",
    },
    {
      id: 4,
      name: "Жалобы",
      text: "На ваш магазин за последний 4 месяца не было жалоб",
      value: requirements.complaintsCount,
      required: 0,
      met: requirements.complaintsCount === 0,
      icon: "Shield",
    },
    {
      id: 5,
      name: "Поддержка",
      text: "Поддержка вашего магазина работает стабильно",
      value: requirements.supportRating,
      required: 4.5,
      met: requirements.supportRating >= 4.5,
      icon: "Headphones",
    },
  ];
};

export const formatRequirementValue = (check: RequirementCheck): string => {
  switch (check.id) {
    case 4: // Жалобы
      return check.value === 0 ? "Нет" : check.value.toString();
    case 5: // Поддержка
      return `${check.value}/5.0`;
    case 3: // Месяцы
      return `${check.value} мес.`;
    default:
      return `${check.value}/${check.required}`;
  }
};

export const getStatusBadgeProps = (status: string) => {
  switch (status) {
    case "pending":
      return {
        text: "На рассмотрении",
        className: "bg-yellow-100 text-yellow-800",
      };
    case "approved":
      return { text: "Одобрена", className: "bg-green-100 text-green-800" };
    case "rejected":
      return { text: "Отклонена", className: "bg-red-100 text-red-800" };
    default:
      return { text: "Неизвестно", className: "bg-gray-100 text-gray-800" };
  }
};
