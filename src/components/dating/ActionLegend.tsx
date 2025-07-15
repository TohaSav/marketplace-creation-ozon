import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ActionLegend: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">
          Как оценивать анкеты:
        </h3>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-red-200 bg-red-50 flex items-center justify-center">
              <Icon name="X" size={16} className="text-red-500" />
            </div>
            <span className="text-sm text-gray-600">Не нравится</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-green-200 bg-green-50 flex items-center justify-center">
              <Icon name="Heart" size={16} className="text-green-500" />
            </div>
            <span className="text-sm text-gray-600">Нравится</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center">
              <Icon name="Flame" size={16} className="text-orange-500" />
            </div>
            <span className="text-sm text-gray-600">Супер-лайк (10₽)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionLegend;