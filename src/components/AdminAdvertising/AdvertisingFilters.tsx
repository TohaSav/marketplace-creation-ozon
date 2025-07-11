import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BannerFilters } from "@/types/advertising";

interface AdvertisingFiltersProps {
  filters: BannerFilters;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
}

export default function AdvertisingFilters({
  filters,
  onSearchChange,
  onStatusChange,
}: AdvertisingFiltersProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Поиск по магазину или продавцу..."
              value={filters.searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filters.statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="paused">Приостановленные</SelectItem>
              <SelectItem value="expired">Истекшие</SelectItem>
              <SelectItem value="pending_payment">Ожидают оплаты</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
