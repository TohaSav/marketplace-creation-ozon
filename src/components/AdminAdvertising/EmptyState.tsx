import Icon from "@/components/ui/icon";

interface EmptyStateProps {
  type: "no-banners" | "no-results";
}

export default function EmptyState({ type }: EmptyStateProps) {
  if (type === "no-banners") {
    return (
      <div className="col-span-full text-center py-12">
        <Icon
          name="Megaphone"
          size={64}
          className="mx-auto text-gray-400 mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Нет рекламных баннеров
        </h3>
        <p className="text-gray-600">
          Рекламные баннеры будут отображаться здесь после их создания
          продавцами
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-full text-center py-12">
      <Icon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Ничего не найдено
      </h3>
      <p className="text-gray-600">
        Попробуйте изменить поисковый запрос или фильтры
      </p>
    </div>
  );
}
