import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Profile } from '@/types/dating';
import { useGifts } from '@/hooks/useGifts';
import GiftOverlay from './GiftOverlay';

interface ProfileCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
  onLike: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
  onDislike: (profile: Profile) => void;
  currentUserId?: string;
  onGift?: (profile: Profile) => void;
  userBalance?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onClick, 
  onLike, 
  onSuperLike, 
  onDislike,
  currentUserId,
  onGift,
  userBalance = 0
}) => {
  const { getProfileGifts } = useGifts();
  const [giftsKey, setGiftsKey] = React.useState(0);
  const profileGifts = getProfileGifts(profile.id);
  const isOwnProfile = currentUserId === profile.id;
  
  // Принудительное обновление подарков каждые 2 секунды
  React.useEffect(() => {
    const interval = setInterval(() => {
      setGiftsKey(prev => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

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
        {/* Оверлей с подарками */}
        <GiftOverlay key={giftsKey} gifts={profileGifts} className="top-2 right-2" />
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
        
        {/* Кнопки действий с подписями */}
        <div className={`flex justify-center ${isOwnProfile ? 'gap-8' : 'gap-4'}`}>
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-red-200 hover:bg-red-50 hover:border-red-300 mb-1"
              onClick={(e) => {
                e.stopPropagation();
                onDislike(profile);
              }}
            >
              <Icon name="X" size={20} className="text-red-500" />
            </Button>
            <span className="text-xs text-gray-500">Пропустить</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-green-200 hover:bg-green-50 hover:border-green-300 mb-1"
              onClick={(e) => {
                e.stopPropagation();
                onLike(profile);
              }}
            >
              <Icon name="Heart" size={20} className="text-green-500" />
            </Button>
            <span className="text-xs text-gray-500">Нравится</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full p-0 border-orange-200 hover:bg-orange-50 hover:border-orange-300 mb-1"
              onClick={(e) => {
                e.stopPropagation();
                onSuperLike(profile);
              }}
            >
              <Icon name="Flame" size={20} className="text-orange-500" />
            </Button>
            <span className="text-xs text-gray-500">Супер (10₽)</span>
          </div>
          
          {/* Кнопка подарка - скрыта для собственной анкеты */}
          {!isOwnProfile && onGift && (
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full p-0 border-purple-200 hover:bg-purple-50 hover:border-purple-300 mb-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onGift(profile);
                }}
              >
                <Icon name="Gift" size={20} className="text-purple-500" />
              </Button>
              <span className="text-xs text-gray-500">Подарок</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;