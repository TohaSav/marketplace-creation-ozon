import StatCard from "./StatCard";

interface StatisticsData {
  total: number;
  active: number;
  pending: number;
  expired: number;
  totalRevenue: number;
  totalViews: number;
  totalClicks: number;
  averageCTR: number;
}

interface StatisticsSectionProps {
  stats: StatisticsData;
}

export default function StatisticsSection({ stats }: StatisticsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Всего объявлений"
          value={stats.total}
          icon="FileText"
          color="text-purple-600"
        />
        <StatCard
          title="Активных"
          value={stats.active}
          icon="CheckCircle"
          color="text-green-600"
        />
        <StatCard
          title="На модерации"
          value={stats.pending}
          icon="Clock"
          color="text-yellow-600"
        />
        <StatCard
          title="Истекших"
          value={stats.expired}
          icon="Calendar"
          color="text-gray-600"
        />
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Общая выручка"
          value={formatCurrency(stats.totalRevenue)}
          icon="DollarSign"
          color="text-purple-600"
        />
        <StatCard
          title="Просмотры"
          value={stats.totalViews.toLocaleString()}
          icon="Eye"
          color="text-blue-600"
        />
        <StatCard
          title="Клики"
          value={stats.totalClicks.toLocaleString()}
          icon="MousePointer"
          color="text-green-600"
        />
        <StatCard
          title="CTR"
          value={`${stats.averageCTR.toFixed(2)}%`}
          icon="TrendingUp"
          color="text-orange-600"
        />
      </div>
    </div>
  );
}
