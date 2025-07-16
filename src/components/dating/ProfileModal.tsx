import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Profile } from '@/types/dating';

import { useGifts } from '@/hooks/useGifts';

import GiftOverlay from './GiftOverlay';

interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onBalanceChange: (amount: number) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  profile, 
  isOpen, 
  onClose, 
  userBalance, 
  onBalanceChange 
}) => {
  const { getProfileGifts } = useGifts();


  const handleLike = () => {
    toast({
      title: "Интерес проявлен! ❤️",
      description: "Если взаимность, вы получите уведомление",
    });
    onClose();
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            Профиль пользователя
          </DialogTitle>
        </DialogHeader>
        
        {profile && (
          <div className="space-y-4">
            {/* Фото профиля */}
            <div className="flex justify-center">
              <div className="relative">
                <div 
                  className="w-48 h-64 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  {profile.photo ? (
                    <img 
                      src={profile.photo} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={64} className="text-gray-400" />
                  )}
                </div>
                {/* Оверлей с подарками */}
                <GiftOverlay gifts={getProfileGifts(profile.id)} />
              </div>
            </div>

            {/* Информация о пользователе */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                <p className="text-gray-600">{profile.age} лет</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Город:</span>
                  <p className="text-gray-600">{profile.city}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Пол:</span>
                  <p className="text-gray-600">{profile.gender}</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Ищет:</span>
                <p className="text-gray-600">{profile.lookingFor}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">О себе:</span>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  {profile.about}
                </p>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-2 pt-4">
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleLike}
              >
                <Icon name="Heart" size={16} className="mr-2" />
                Нравится
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toast({
                  title: "Подарок 🎁",
                  description: "Функция подарков скоро будет доступна",
                })}
                className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Icon name="Gift" size={16} className="mr-2" />
                Подарок
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
        

      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;