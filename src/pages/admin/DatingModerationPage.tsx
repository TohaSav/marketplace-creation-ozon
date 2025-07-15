import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [selectedProfiles, setSelectedProfiles] = useState<Set<string>>(new Set());

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
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
      selectedProfiles.has(profile.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
    }`}>
      <div className="relative">
        {/* Чекбокс для выбора */}
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={selectedProfiles.has(profile.id)}
            onChange={() => toggleProfileSelection(profile.id)}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
        
        <div 
          className="w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-gray-600 relative cursor-pointer"
          style={{ aspectRatio: '9/16', maxHeight: '300px' }}
          onClick={() => toggleProfileSelection(profile.id)}
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

  // Фильтрация профилей
  const getFilteredProfiles = (profilesList: Profile[]) => {
    return profilesList.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.about.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender === 'all' || profile.gender === filterGender;
      const matchesCity = filterCity === 'all' || profile.city === filterCity;
      
      return matchesSearch && matchesGender && matchesCity;
    });
  };

  // Получение уникальных городов
  const getUniqueCities = () => {
    const cities = profiles.map(p => p.city);
    return Array.from(new Set(cities)).sort();
  };

  // Массовые операции
  const handleBulkApprove = () => {
    const updatedProfiles = profiles.map(profile => 
      selectedProfiles.has(profile.id) 
        ? { ...profile, isApproved: true }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    setSelectedProfiles(new Set());
    
    toast({
      title: "Анкеты одобрены",
      description: `Одобрено ${selectedProfiles.size} анкет`,
    });
  };

  const handleBulkReject = () => {
    const updatedProfiles = profiles.filter(profile => !selectedProfiles.has(profile.id));
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    setSelectedProfiles(new Set());
    
    toast({
      title: "Анкеты отклонены",
      description: `Отклонено ${selectedProfiles.size} анкет`,
      variant: "destructive",
    });
  };

  const toggleProfileSelection = (profileId: string) => {
    const newSelected = new Set(selectedProfiles);
    if (newSelected.has(profileId)) {
      newSelected.delete(profileId);
    } else {
      newSelected.add(profileId);
    }
    setSelectedProfiles(newSelected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      {/* Header с навигацией */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Icon name="ArrowLeft" size={16} />
                Вернуться в админку
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Heart" size={28} className="text-red-500" />
                  Модерация знакомств
                </h1>
                <p className="text-gray-600 text-sm">
                  Управление анкетами пользователей
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Всего: {profiles.length}
              </Badge>
              <Badge variant="outline" className="text-xs text-orange-600">
                На модерации: {pendingProfiles.length}
              </Badge>
              <Badge variant="default" className="text-xs">
                Одобрено: {approvedProfiles.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Фильтры и поиск */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по имени, городу или описанию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все полы</SelectItem>
                    <SelectItem value="Мужчина">Мужчина</SelectItem>
                    <SelectItem value="Женщина">Женщина</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {getUniqueCities().map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Табы и массовые операции */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'pending' ? 'default' : 'outline'}
              onClick={() => setActiveTab('pending')}
              className="flex items-center gap-2"
            >
              <Icon name="Clock" size={16} />
              На модерации ({getFilteredProfiles(pendingProfiles).length})
            </Button>
            <Button
              variant={activeTab === 'approved' ? 'default' : 'outline'}
              onClick={() => setActiveTab('approved')}
              className="flex items-center gap-2"
            >
              <Icon name="CheckCircle" size={16} />
              Одобренные ({getFilteredProfiles(approvedProfiles).length})
            </Button>
          </div>
          
          <div className="flex-1" />
          
          <div className="flex gap-2">
            {selectedProfiles.size > 0 && (
              <>
                <Button
                  onClick={handleBulkApprove}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={activeTab !== 'pending'}
                >
                  <Icon name="Check" size={16} className="mr-1" />
                  Одобрить ({selectedProfiles.size})
                </Button>
                <Button
                  onClick={handleBulkReject}
                  variant="destructive"
                >
                  <Icon name="X" size={16} className="mr-1" />
                  Отклонить ({selectedProfiles.size})
                </Button>
              </>
            )}
            <Button
              variant="outline"
              onClick={() => {
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
              Тестовый профиль
            </Button>
          </div>
        </div>

        {activeTab === 'pending' && (
          <div>
            {getFilteredProfiles(pendingProfiles).length === 0 ? (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Icon name="Clock" size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Нет анкет на модерации</h3>
                  <p className="text-gray-500">Новые анкеты появятся здесь для проверки</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Найдено: {getFilteredProfiles(pendingProfiles).length} из {pendingProfiles.length} анкет
                  </p>
                  {selectedProfiles.size > 0 && (
                    <p className="text-sm text-blue-600 font-medium">
                      Выбрано: {selectedProfiles.size}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProfiles(pendingProfiles).map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} isPending={true} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'approved' && (
          <div>
            {getFilteredProfiles(approvedProfiles).length === 0 ? (
              <Card className="bg-white">
                <CardContent className="p-12 text-center">
                  <Icon name="CheckCircle" size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Нет одобренных анкет</h3>
                  <p className="text-gray-500">Одобренные анкеты появятся здесь</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Найдено: {getFilteredProfiles(approvedProfiles).length} из {approvedProfiles.length} анкет
                  </p>
                  {selectedProfiles.size > 0 && (
                    <p className="text-sm text-blue-600 font-medium">
                      Выбрано: {selectedProfiles.size}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProfiles(approvedProfiles).map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} isPending={false} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default DatingModerationPage;