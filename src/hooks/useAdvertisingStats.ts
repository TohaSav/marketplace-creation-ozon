import { useMemo } from "react";
import { Advertisement } from "@/types/advertising";

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

export const useAdvertisingStats = (
  advertisements: Advertisement[],
): StatisticsData => {
  return useMemo(() => {
    const now = new Date();
    const active = advertisements.filter(
      (ad) => ad.status === "active" && new Date(ad.endDate) > now,
    );
    const pending = advertisements.filter((ad) => ad.status === "pending");
    const expired = advertisements.filter(
      (ad) => ad.status === "active" && new Date(ad.endDate) <= now,
    );

    const totalRevenue = advertisements.reduce((sum, ad) => sum + ad.price, 0);
    const totalViews = advertisements.reduce((sum, ad) => sum + ad.views, 0);
    const totalClicks = advertisements.reduce((sum, ad) => sum + ad.clicks, 0);
    const averageCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

    return {
      total: advertisements.length,
      active: active.length,
      pending: pending.length,
      expired: expired.length,
      totalRevenue,
      totalViews,
      totalClicks,
      averageCTR,
    };
  }, [advertisements]);
};
