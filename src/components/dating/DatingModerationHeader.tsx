import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface DatingModerationHeaderProps {
  totalProfiles: number;
  pendingCount: number;
  approvedCount: number;
}

const DatingModerationHeader: React.FC<DatingModerationHeaderProps> = ({
  totalProfiles,
  pendingCount,
  approvedCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={16} />
              Вернуться в админку
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Icon name="Heart" size={28} className="text-red-500" />
                Модерация знакомств
              </h1>
              <p className="text-gray-600 text-sm">
                Управление анкетами пользователей
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Всего: {totalProfiles}
            </Badge>
            <Badge variant="outline" className="text-xs text-orange-600">
              На модерации: {pendingCount}
            </Badge>
            <Badge variant="default" className="text-xs">
              Одобрено: {approvedCount}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatingModerationHeader;