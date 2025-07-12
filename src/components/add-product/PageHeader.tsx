import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PageHeaderProps {
  onBack: () => void;
}

export default function PageHeader({ onBack }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Назад к кабинету
      </Button>
      <h1 className="text-3xl font-bold text-gray-900">Добавить товар</h1>
      <p className="text-gray-600 mt-2">Заполните информацию о вашем товаре</p>
    </div>
  );
}
