import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import DatingProfileCard from './DatingProfileCard';

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

interface DatingModerationContentProps {
  activeTab: 'pending' | 'approved';
  filteredPending: Profile[];
  filteredApproved: Profile[];
  pendingTotal: number;
  approvedTotal: number;
  selectedProfiles: Set<string>;
  onToggleSelection: (profileId: string) => void;
  onApprove: (profileId: string) => void;
  onReject: (profileId: string) => void;
  onHide: (profileId: string) => void;
}

const DatingModerationContent: React.FC<DatingModerationContentProps> = ({
  activeTab,
  filteredPending,
  filteredApproved,
  pendingTotal,
  approvedTotal,
  selectedProfiles,
  onToggleSelection,
  onApprove,
  onReject,
  onHide,
}) => {
  const renderEmptyState = (icon: string, title: string, description: string) => (
    <Card className="bg-white">
      <CardContent className="p-12 text-center">
        <Icon name={icon} size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );

  const renderProfilesGrid = (profiles: Profile[], isPending: boolean, total: number) => (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Найдено: {profiles.length} из {total} анкет
        </p>
        {selectedProfiles.size > 0 && (
          <p className="text-sm text-blue-600 font-medium">
            Выбрано: {selectedProfiles.size}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <DatingProfileCard
            key={profile.id}
            profile={profile}
            isPending={isPending}
            isSelected={selectedProfiles.has(profile.id)}
            onToggleSelection={onToggleSelection}
            onApprove={onApprove}
            onReject={onReject}
            onHide={onHide}
          />
        ))}
      </div>
    </>
  );

  if (activeTab === 'pending') {
    return (
      <div>
        {filteredPending.length === 0 ? (
          renderEmptyState(
            "Clock",
            "Нет анкет на модерации",
            "Новые анкеты появятся здесь для проверки"
          )
        ) : (
          renderProfilesGrid(filteredPending, true, pendingTotal)
        )}
      </div>
    );
  }

  return (
    <div>
      {filteredApproved.length === 0 ? (
        renderEmptyState(
          "CheckCircle",
          "Нет одобренных анкет",
          "Одобренные анкеты появятся здесь"
        )
      ) : (
        renderProfilesGrid(filteredApproved, false, approvedTotal)
      )}
    </div>
  );
};

export default DatingModerationContent;