import { ShopStats } from "@/types/admin";
import StatsCard from "./StatsCard";

interface AdminStatsProps {
  stats: ShopStats;
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const statsConfig = [
    {
      title: "Всего магазинов",
      value: stats.total,
      description: "Зарегистрировано на платформе",
      icon: "Store",
      className: "",
    },
    {
      title: "Активные",
      value: stats.active,
      description: "Работают сейчас",
      icon: "TrendingUp",
      className: "text-green-600",
    },
    {
      title: "Верифицированные",
      value: stats.verified,
      description: "Прошли проверку",
      icon: "BadgeCheck",
      className: "text-blue-600",
    },
    {
      title: "Истекшие",
      value: stats.expired,
      description: "Требуют продления",
      icon: "AlertTriangle",
      className: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          className={stat.className}
        />
      ))}
    </div>
  );
}
