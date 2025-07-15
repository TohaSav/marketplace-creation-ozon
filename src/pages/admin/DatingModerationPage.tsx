import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

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

const DatingModerationPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = localStorage.getItem('datingProfiles');
    if (savedProfiles) {
      const allProfiles: Profile[] = JSON.parse(savedProfiles);
      
      // Отладочная информация
      console.log('Загружены профили в админке:', allProfiles.map(p => ({
        id: p.id,
        name: p.name,
        hasPhoto: !!p.photo,
        photoLength: p.photo?.length || 0,
        isApproved: p.isApproved
      })));
      
      setProfiles(allProfiles);
      setPendingProfiles(allProfiles.filter(p => !p.isApproved));
      setApprovedProfiles(allProfiles.filter(p => p.isApproved));
    }
  };

  const approveProfile = (profileId: string) => {
    const updatedProfiles = profiles.map(profile => 
      profile.id === profileId 
        ? { ...profile, isApproved: true }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета одобрена",
      description: "Анкета теперь отображается на странице знакомств",
    });
  };

  const rejectProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета отклонена",
      description: "Анкета была удалена из системы",
      variant: "destructive",
    });
  };

  const hideProfile = (profileId: string) => {
    const updatedProfiles = profiles.map(profile => 
      profile.id === profileId 
        ? { ...profile, isApproved: false }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета скрыта",
      description: "Анкета больше не отображается на странице знакомств",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ProfileCard = ({ profile, isPending }: { profile: Profile, isPending: boolean }) => (
    <Card className="overflow-hidden">
      <div className="relative">
        <div 
          className="w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-gray-600 relative"
          style={{ aspectRatio: '9/16', maxHeight: '300px' }}
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
                onClick={() => approveProfile(profile.id)}
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Icon name="Check" size={16} className="mr-1" />
                Одобрить
              </Button>
              <Button 
                onClick={() => rejectProfile(profile.id)}
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
                onClick={() => hideProfile(profile.id)}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <Icon name="EyeOff" size={16} className="mr-1" />
                Скрыть
              </Button>
              <Button 
                onClick={() => rejectProfile(profile.id)}
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Icon name="Heart" size={28} className="text-red-500" />
          Модерация знакомств
        </h1>
        <p className="text-gray-600 mt-1">
          Управление анкетами пользователей
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'pending' ? 'default' : 'outline'}
          onClick={() => setActiveTab('pending')}
          className="flex items-center gap-2"
        >
          <Icon name="Clock" size={16} />
          На модерации ({pendingProfiles.length})
        </Button>
        <Button
          variant={activeTab === 'approved' ? 'default' : 'outline'}
          onClick={() => setActiveTab('approved')}
          className="flex items-center gap-2"
        >
          <Icon name="CheckCircle" size={16} />
          Одобренные ({approvedProfiles.length})
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            // Добавляем тестовый профиль с фото для проверки
            const testProfile: Profile = {
              id: 'test-' + Date.now(),
              name: 'Тестовый пользователь',
              age: 25,
              city: 'Москва',
              gender: 'Мужчина',
              lookingFor: 'Женщина',
              about: 'Тестовый профиль с фото',
              photo: 'https://cdn.poehali.dev/files/868a1cb8-70cc-43bc-ae94-d218f551716e.png',
              isApproved: false,
              createdAt: new Date().toISOString()
            };
            
            const savedProfiles = localStorage.getItem('datingProfiles');
            const existingProfiles: Profile[] = savedProfiles ? JSON.parse(savedProfiles) : [];
            existingProfiles.push(testProfile);
            localStorage.setItem('datingProfiles', JSON.stringify(existingProfiles));
            loadProfiles();
          }}
          className="flex items-center gap-2"
        >
          <Icon name="Plus" size={16} />
          Добавить тестовый профиль
        </Button>
      </div>

      {activeTab === 'pending' && (
        <div>
          {pendingProfiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Clock" size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Нет анкет на модерации</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pendingProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} isPending={true} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'approved' && (
        <div>
          {approvedProfiles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="CheckCircle" size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Нет одобренных анкет</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {approvedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} isPending={false} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatingModerationPage;