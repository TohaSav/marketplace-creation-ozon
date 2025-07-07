import { useMemo } from "react";
import { Advertisement } from "@/types/advertising";

export const useAdvertisingFilters = (
  advertisements: Advertisement[],
  searchTerm: string,
  statusFilter: string,
): Advertisement[] => {
  return useMemo(() => {
    return advertisements.filter((ad) => {
      const matchesSearch =
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ad.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [advertisements, searchTerm, statusFilter]);
};
