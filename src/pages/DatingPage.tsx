import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { FormData, Profile } from '@/types/dating';
import { useDatingProfiles } from '@/hooks/useDatingProfiles';
import DatingForm from '@/components/dating/DatingForm';
import ProfileCard from '@/components/dating/ProfileCard';
import ProfileModal from '@/components/dating/ProfileModal';
import ProfileStatus from '@/components/dating/ProfileStatus';
import BalanceIndicator from '@/components/dating/BalanceIndicator';
import AuthPrompt from '@/components/dating/AuthPrompt';

const DatingPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    birthDate: '',
    gender: '',
    lookingFor: '',
    about: '',
    photo: null
  });

  // Используем контекст авторизации
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // Используем хук для работы с профилями
  const { profiles, isSubmitting, userProfile, submitProfile } = useDatingProfiles(user?.id);

  const openProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const closeProfile = () => {
    setSelectedProfile(null);
    setShowProfileModal(false);
  };

  const handleLike = (profile: Profile) => {
    toast({
      title: "Нравится! ❤️",
      description: `Вы проявили интерес к ${profile.name}`,
    });
  };

  const handleDislike = (profile: Profile) => {
    toast({
      title: "Пропуск",
      description: `Вы пропустили ${profile.name}`,
      variant: "destructive",
    });
  };

  const handleSuperLike = (profile: Profile) => {
    if (!user?.balance || user.balance < 10) {
      toast({
        title: "Недостаточно средств",
        description: "Для супер-лайка нужно 10 рублей на балансе",
        variant: "destructive",
      });
      return;
    }

    // Здесь будет логика списания с баланса
    toast({
      title: "Супер-лайк! 🔥",
      description: `Вы отправили супер-лайк ${profile.name} за 10 рублей`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Только зарегистрированные пользователи могут подавать анкеты",
        variant: "destructive",
      });
      return;
    }

    const success = await submitProfile(formData);
    if (success) {
      // Очищаем форму
      setFormData({
        name: '',
        city: '',
        birthDate: '',
        gender: '',
        lookingFor: '',
        about: '',
        photo: null
      });
      setShowForm(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Icon name="Heart" size={32} className="text-red-500" />
              Знакомства
            </h1>
            <p className="text-gray-600 mt-2">
              Найдите свою вторую половинку
            </p>
          </div>
          <AuthPrompt />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Icon name="Heart" size={32} className="text-red-500" />
            Знакомства
          </h1>
          <p className="text-gray-600 mt-2">
            Найдите свою вторую половинку
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <BalanceIndicator balance={user?.balance || 0} />
          </div>

          {!userProfile && (
            <div className="flex justify-center mb-8">
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-red-500 hover:bg-red-600"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                {showForm ? 'Скрыть форму' : 'Создать анкету'}
              </Button>
            </div>
          )}

          {userProfile && (
            <ProfileStatus userProfile={userProfile} />
          )}

          {showForm && (
            <DatingForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onCancel={() => setShowForm(false)}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={openProfile}
                onLike={handleLike}
                onSuperLike={handleSuperLike}
                onDislike={handleDislike}
              />
            ))}
          </div>

          {profiles.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Heart" size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Пока нет одобренных анкет. Будьте первым!
              </p>
            </div>
          )}
        </div>

        <ProfileModal
          profile={selectedProfile}
          isOpen={showProfileModal}
          onClose={closeProfile}
        />
      </div>
    </div>
  );
};

export default DatingPage;