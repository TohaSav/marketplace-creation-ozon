import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface DatingProfileCardProps {
  profile: Profile;
  isPending: boolean;
  isSelected: boolean;
  onToggleSelection: (profileId: string) => void;
  onApprove: (profileId: string) => void;
  onReject: (profileId: string) => void;
  onHide: (profileId: string) => void;
}

const DatingProfileCard: React.FC<DatingProfileCardProps> = ({
  profile,
  isPending,
  isSelected,
  onToggleSelection,
  onApprove,
  onReject,
  onHide,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
    }`}>
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(profile.id)}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
        
        <div 
          className="w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-gray-600 relative cursor-pointer"
          style={{ aspectRatio: '9/16', maxHeight: '300px' }}
          onClick={() => onToggleSelection(profile.id)}
        >
          {profile.photo && profile.photo.length > 0 ? (
            <>
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="font-semibold text-lg text-white">{profile.name}</h3>
                <p className="text-sm text-white/90">{profile.age} лет</p>
                <p className="text-sm text-white/90">{profile.city}</p>
              </div>
            </>
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
        
        <div className="absolute top-2 right-2">
          <Badge variant={profile.isApproved ? "default" : "secondary"}>
            {profile.isApproved ? "Одобрена" : "На модерации"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-lg">{profile.name}</span>
            <span className="text-sm text-gray-600">{profile.age} лет</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Город:</span>
            <span>{profile.city}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Пол:</span>
            <span>{profile.gender}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Ищет:</span>
            <span>{profile.lookingFor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Фото:</span>
            <span className={profile.photo ? "text-green-600" : "text-red-600"}>
              {profile.photo ? "Загружено" : "Отсутствует"}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">О себе:</span>
            <p className="mt-1 text-gray-700 text-xs leading-relaxed">{profile.about}</p>
          </div>
          <div className="text-xs text-gray-500">
            Подана: {formatDate(profile.createdAt)}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isPending ? (
            <>
              <Button 
                onClick={() => onApprove(profile.id)}
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Icon name="Check" size={16} className="mr-1" />
                Одобрить
              </Button>
              <Button 
                onClick={() => onReject(profile.id)}
                size="sm"
                variant="destructive"
                className="flex-1"
              >
                <Icon name="X" size={16} className="mr-1" />
                Отклонить
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => onHide(profile.id)}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Icon name="EyeOff" size={16} className="mr-1" />
                Скрыть
              </Button>
              <Button 
                onClick={() => onReject(profile.id)}
                size="sm"
                variant="destructive"
                className="flex-1"
              >
                <Icon name="Trash2" size={16} className="mr-1" />
                Удалить
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatingProfileCard;