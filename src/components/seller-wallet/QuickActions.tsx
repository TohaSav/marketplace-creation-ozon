import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  path: string;
}

const quickActions: QuickAction[] = [
  {
    title: "Купить тариф",
    description: "Активация магазина",
    icon: "Crown",
    path: "/seller/tariffs",
  },
  {
    title: "Заказать рекламу",
    description: "Продвижение товаров",
    icon: "Megaphone",
    path: "/seller/advertising",
  },
  {
    title: "Игры Удача",
    description: "Ежедневные призы",
    icon: "Ticket",
    path: "/seller/luck-game",
  },
  {
    title: "Аналитика",
    description: "Статистика продаж",
    icon: "BarChart3",
    path: "/seller/dashboard",
  },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Zap" size={20} />
          Быстрые действия
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.path}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => navigate(action.path)}
            >
              <Icon name={action.icon} size={24} />
              <span>{action.title}</span>
              <span className="text-xs text-gray-500">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
