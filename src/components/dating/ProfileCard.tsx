import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Profile } from '@/types/dating';

interface ProfileCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
  onLike: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
  onDislike: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onClick, 
  onLike, 
  onSuperLike, 
  onDislike 
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div 
          className="w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-gray-600 cursor-pointer"
          style={{ aspectRatio: '9/16' }}
          onClick={() => onClick(profile)}
        >
          {profile.photo ? (
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <Icon name="User" size={48} className="mx-auto mb-4 text-gray-400" />
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-sm">{profile.age} лет</p>
                <p className="text-sm">{profile.city}</p>
              </div>
            </div>
          )}
        </div>
        {profile.photo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="font-semibold text-lg text-white">{profile.name}</h3>
            <p className="text-sm text-white/90">{profile.age} лет, {profile.city}</p>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-2">
          Ищет: {profile.lookingFor}
        </p>
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {profile.about}
        </p>
        
        {/* Кнопки действий */}
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={(e) => {
              e.stopPropagation();
              onDislike(profile);
            }}
          >
            <Icon name="X" size={20} className="text-red-500" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full p-0 border-green-200 hover:bg-green-50 hover:border-green-300"
            onClick={(e) => {
              e.stopPropagation();
              onLike(profile);
            }}
          >
            <Icon name="Heart" size={20} className="text-green-500" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full p-0 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
            onClick={(e) => {
              e.stopPropagation();
              onSuperLike(profile);
            }}
          >
            <Icon name="Flame" size={20} className="text-orange-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;