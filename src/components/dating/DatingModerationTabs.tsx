import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  gender: 'Мужчина' | 'Женщина';
  lookingFor: 'Мужчина' | 'Женщина';
  about: string;
  photo: string;
  isApproved: boolean;
  createdAt: string;
}

interface DatingModerationTabsProps {
  activeTab: 'pending' | 'approved';
  pendingCount: number;
  approvedCount: number;
  selectedProfiles: Set<string>;
  onTabChange: (tab: 'pending' | 'approved') => void;
  onBulkApprove: () => void;
  onBulkReject: () => void;
  onAddTestProfile: () => void;
}

const DatingModerationTabs: React.FC<DatingModerationTabsProps> = ({
  activeTab,
  pendingCount,
  approvedCount,
  selectedProfiles,
  onTabChange,
  onBulkApprove,
  onBulkReject,
  onAddTestProfile,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'pending' ? 'default' : 'outline'}
          onClick={() => onTabChange('pending')}
          className="flex items-center gap-2"
        >
          <Icon name="Clock" size={16} />
          На модерации ({pendingCount})
        </Button>
        <Button
          variant={activeTab === 'approved' ? 'default' : 'outline'}
          onClick={() => onTabChange('approved')}
          className="flex items-center gap-2"
        >
          <Icon name="CheckCircle" size={16} />
          Одобренные ({approvedCount})
        </Button>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex gap-2">
        {selectedProfiles.size > 0 && (
          <>
            <Button
              onClick={onBulkApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={activeTab !== 'pending'}
            >
              <Icon name="Check" size={16} className="mr-1" />
              Одобрить ({selectedProfiles.size})
            </Button>
            <Button
              onClick={onBulkReject}
              variant="destructive"
            >
              <Icon name="X" size={16} className="mr-1" />
              Отклонить ({selectedProfiles.size})
            </Button>
          </>
        )}
        <Button
          variant="outline"
          onClick={onAddTestProfile}
          className="flex items-center gap-2"
        >
          <Icon name="Plus" size={16} />
          Тестовый профиль
        </Button>
      </div>
    </div>
  );
};

export default DatingModerationTabs;