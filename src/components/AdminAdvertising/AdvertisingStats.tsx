import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { BannerStats } from "@/types/advertising";

interface AdvertisingStatsProps {
  stats: BannerStats;
}

export default function AdvertisingStats({ stats }: AdvertisingStatsProps) {
  const statItems = [
    {
      label: "Всего",
      value: stats.total,
      icon: "BarChart3" as const,
      color: "blue",
    },
    {
      label: "Активные",
      value: stats.active,
      icon: "Play" as const,
      color: "green",
    },
    {
      label: "Пауза",
      value: stats.paused,
      icon: "Pause" as const,
      color: "yellow",
    },
    {
      label: "Истекшие",
      value: stats.expired,
      icon: "Clock" as const,
      color: "red",
    },
    {
      label: "Доход",
      value: `${stats.totalRevenue.toLocaleString()} ₽`,
      icon: "DollarSign" as const,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statItems.map((item, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 border-${item.color}-200`}
        >
          <CardContent className="p-6">
            <div className="flex items-center">
              <Icon
                name={item.icon}
                size={24}
                className={`text-${item.color}-600`}
              />
              <div className="ml-4">
                <p className={`text-sm font-medium text-${item.color}-900`}>
                  {item.label}
                </p>
                <p className={`text-2xl font-bold text-${item.color}-900`}>
                  {item.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
