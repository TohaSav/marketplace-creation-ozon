import Icon from "@/components/ui/icon";
import type { UserStats } from "@/types/admin-user.types";

interface UserStatsCardsProps {
  stats: UserStats;
}

export default function UserStatsCards({ stats }: UserStatsCardsProps) {
  const statsConfig = [
    {
      title: "Всего пользователей",
      value: stats.total,
      icon: "Users",
      color: "text-blue-600",
      suffix: "",
    },
    {
      title: "Активных",
      value: stats.active,
      icon: "UserCheck",
      color: "text-green-600",
      suffix: "",
    },
    {
      title: "Заблокированных",
      value: stats.blocked,
      icon: "UserX",
      color: "text-red-600",
      suffix: "",
    },
    {
      title: "Общая выручка",
      value: stats.totalRevenue,
      icon: "TrendingUp",
      color: "text-purple-600",
      suffix: " ₽",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <div
          key={stat.title}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon
                  name={stat.icon as any}
                  size={24}
                  className={stat.color}
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
