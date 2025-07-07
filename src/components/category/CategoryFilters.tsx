import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface CategoryFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function CategoryFilters({
  sortBy,
  setSortBy,
}: CategoryFiltersProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Сортировка:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price_low">Сначала дешевые</SelectItem>
                <SelectItem value="price_high">Сначала дорогие</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="newest">Новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Icon name="Filter" className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Grid3X3" className="w-4 h-4 mr-2" />
              Сетка
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
