import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersSectionProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function FiltersSection({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: FiltersSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="search">Поиск</Label>
            <Input
              id="search"
              placeholder="Поиск по названию или описанию..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Статус</Label>
            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">На модерации</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="paused">Приостановленные</SelectItem>
                <SelectItem value="rejected">Отклоненные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
