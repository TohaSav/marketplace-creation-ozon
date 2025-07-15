import React from 'react';
import Icon from '@/components/ui/icon';
import { Profile } from '@/types/dating';

interface ProfileStatusProps {
  userProfile: Profile;
}

const ProfileStatus: React.FC<ProfileStatusProps> = ({ userProfile }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-lg p-6 shadow-md max-w-md text-center">
        <Icon 
          name={userProfile.isApproved ? "CheckCircle" : "Clock"} 
          size={48} 
          className={`mx-auto mb-4 ${userProfile.isApproved ? 'text-green-500' : 'text-yellow-500'}`} 
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ваша анкета {userProfile.isApproved ? 'одобрена' : 'на модерации'}
        </h3>
        <p className="text-gray-600 text-sm">
          {userProfile.isApproved 
            ? 'Ваша анкета опубликована и видна другим пользователям'
            : 'Ваша анкета находится на модерации и скоро будет опубликована'
          }
        </p>
      </div>
    </div>
  );
};

export default ProfileStatus;