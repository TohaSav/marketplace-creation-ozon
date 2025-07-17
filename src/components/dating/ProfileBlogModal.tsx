import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Profile } from '@/types/dating';
import { SentGift } from '@/types/gifts';
import { useGifts } from '@/hooks/useGifts';

interface ProfileBlogModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileBlogModal: React.FC<ProfileBlogModalProps> = ({ profile, isOpen, onClose }) => {
  const { getProfileGifts } = useGifts();
  const profileGifts = getProfileGifts(profile.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGiftStats = () => {
    if (!profileGifts || profileGifts.length === 0) return { total: 0, categories: {} };

    const categories: { [key: string]: number } = {};
    profileGifts.forEach(gift => {
      const category = gift.gift.category;
      categories[category] = (categories[category] || 0) + 1;
    });

    return {
      total: profileGifts.length,
      categories
    };
  };

  const giftStats = getGiftStats();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              {profile.photo ? (
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Icon name="User" size={32} className="text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.age} лет, {profile.city}</p>
            </div>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Основное содержимое */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {/* Информация о профиле */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Левая колонка - Основная информация */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="User" size={20} className="text-blue-600" />
                  Основная информация
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Пол:</span>
                    <span className="font-medium">{profile.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ищет:</span>
                    <span className="font-medium">{profile.lookingFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Статус:</span>
                    <Badge variant={profile.isApproved ? "default" : "secondary"}>
                      {profile.isApproved ? "Одобрена" : "На модерации"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата создания:</span>
                    <span className="font-medium text-sm">{formatDate(profile.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* О себе */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-green-600" />
                  О себе
                </h3>
                <p className="text-gray-700 leading-relaxed">{profile.about}</p>
              </div>
            </div>

            {/* Правая колонка - Статистика подарков */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Gift" size={20} className="text-pink-600" />
                  Статистика подарков
                </h3>
                
                {giftStats.total > 0 ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">{giftStats.total}</div>
                      <div className="text-gray-600">всего подарков</div>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(giftStats.categories).map(([category, count]) => {
                        const categoryNames: { [key: string]: string } = {
                          free: 'Бесплатные',
                          flowers: 'Цветы',
                          hearts: 'Сердечки',
                          luxury: 'Роскошь',
                          fun: 'Веселье'
                        };
                        return (
                          <div key={category} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{categoryNames[category] || category}:</span>
                            <Badge variant="outline" className="text-xs">{count}</Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Icon name="Gift" size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>Подарков пока нет</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Полученные подарки */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Gift" size={20} className="text-purple-600" />
              Полученные подарки ({profileGifts.length})
            </h3>
            
            {profileGifts.length > 0 ? (
              <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-2">
                {profileGifts.map((sentGift) => (
                  <div
                    key={sentGift.id}
                    className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow text-center"
                    title={`${sentGift.gift.name} - ${formatDate(sentGift.sentAt)}`}
                  >
                    <div className="text-3xl">{sentGift.gift.emoji}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Icon name="Gift" size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Подарков пока нет</p>
                <p className="text-sm">Будьте первым, кто подарит что-то особенное!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogModal;