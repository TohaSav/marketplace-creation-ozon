import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DatingModerationFiltersProps {
  searchTerm: string;
  filterGender: string;
  filterCity: string;
  uniqueCities: string[];
  onSearchChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

const DatingModerationFilters: React.FC<DatingModerationFiltersProps> = ({
  searchTerm,
  filterGender,
  filterCity,
  uniqueCities,
  onSearchChange,
  onGenderChange,
  onCityChange,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Поиск по имени, городу или описанию..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select value={filterGender} onValueChange={onGenderChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Пол" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все полы</SelectItem>
                <SelectItem value="Мужчина">Мужчина</SelectItem>
                <SelectItem value="Женщина">Женщина</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCity} onValueChange={onCityChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все города</SelectItem>
                {uniqueCities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatingModerationFilters;