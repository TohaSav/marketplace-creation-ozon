import { SellerStats } from "@/types/seller-dashboard.types";
import { STATS_CARDS_CONFIG } from "@/constants/seller-dashboard.constants";
import StatsCard from "./StatsCard";

interface StatsGridProps {
  stats: SellerStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {STATS_CARDS_CONFIG.map((config) => (
        <StatsCard
          key={config.key}
          title={config.title}
          value={stats[config.key as keyof SellerStats]}
          icon={config.icon}
          color={config.color}
          format={config.format}
        />
      ))}
    </div>
  );
}
