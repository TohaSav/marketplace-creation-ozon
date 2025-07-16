import React, { useState, useEffect, useCallback } from 'react';
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
import GiftModal from '@/components/dating/GiftModal';

const DatingPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState<Profile | null>(null);
  const [walletBalance, setWalletBalance] = useState(0); // Баланс основного кошелька (изначально 0)
  const [datingBalance, setDatingBalance] = useState(0); // Баланс для знакомств (изначально 0)
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
  const { profiles, isSubmitting, userProfile, submitProfile, loadMoreProfiles, isLoading, hasMore } = useDatingProfiles(user?.id);

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
    if (datingBalance < 10) {
      toast({
        title: "Недостаточно средств",
        description: "Для супер-лайка нужно 10 рублей на балансе",
        variant: "destructive",
      });
      return;
    }

    // Списываем с баланса знакомств
    setDatingBalance(prev => prev - 10);
    toast({
      title: "Супер-лайк! 🔥",
      description: `Вы отправили супер-лайк ${profile.name} за 10 рублей`,
    });
  };

  const handleTopUp = (amount: number) => {
    // Переводим средства из кошелька в баланс знакомств
    setWalletBalance(prev => prev - amount);
    setDatingBalance(prev => prev + amount);
  };

  const handleGift = (profile: Profile) => {
    setGiftRecipient(profile);
    setShowGiftModal(true);
  };

  // Обработка скролла для автоматической подгрузки
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    
    if (hasMore) {
      loadMoreProfiles();
    }
  }, [isLoading, hasMore, loadMoreProfiles]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
            <BalanceIndicator 
              balance={datingBalance} 
              walletBalance={walletBalance}
              onTopUp={handleTopUp}
            />
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
                currentUserId={user?.id}
                onGift={handleGift}
              />
            ))}
          </div>

          {profiles.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Icon name="Heart" size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Пока нет одобренных анкет. Будьте первым!
              </p>
            </div>
          )}

          {/* Индикатор загрузки */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mr-3"></div>
                <span className="text-gray-600">Загружаем анкеты...</span>
              </div>
            </div>
          )}

          {/* Сообщение об окончании анкет */}
          {!hasMore && profiles.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Все анкеты загружены! Возвращайтесь позже за новыми знакомствами ❤️
              </p>
            </div>
          )}
        </div>

        <ProfileModal
          profile={selectedProfile}
          isOpen={showProfileModal}
          onClose={closeProfile}
          userBalance={datingBalance}
          onBalanceChange={(amount) => setDatingBalance(prev => prev + amount)}
        />

        <GiftModal
          isOpen={showGiftModal}
          onClose={() => setShowGiftModal(false)}
          recipientName={giftRecipient?.name || ''}
          recipientId={giftRecipient?.id || ''}
          userBalance={datingBalance}
          onSendGift={handleSendGift}
        />
        
        <GiftModal
          isOpen={showGiftModal}
          onClose={() => {
            setShowGiftModal(false);
            setGiftRecipient(null);
          }}
          profile={giftRecipient}
          userBalance={datingBalance}
          onGiftSent={(giftId, cost) => {
            setDatingBalance(prev => prev - cost);
            setShowGiftModal(false);
            setGiftRecipient(null);
          }}
        />
      </div>
    </div>
  );
};

export default DatingPage;