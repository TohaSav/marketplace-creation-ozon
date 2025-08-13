import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DailyBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onClaimBonus: (amount: number) => void;
}

export default function DailyBonusModal({ isOpen, onClose, userProfile, onClaimBonus }: DailyBonusModalProps) {
  const [currentStreak, setCurrentStreak] = useState(1);
  const [todayBonus, setTodayBonus] = useState(2);
  const [canClaim, setCanClaim] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);

  // Система бонусов по дням
  const bonusSchedule = [2, 3, 5, 7, 10, 12, 15]; // 1-7 дни
  const dailyBonusAfter7Days = 1; // После 7 дней

  useEffect(() => {
    if (userProfile) {
      calculateBonusForToday();
    }
  }, [userProfile]);

  const calculateBonusForToday = () => {
    const joinDate = new Date(userProfile.joinDate);
    const today = new Date();
    const daysSinceJoin = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    setCurrentStreak(daysSinceJoin);
    
    // Расчет бонуса
    if (daysSinceJoin <= 7) {
      setTodayBonus(bonusSchedule[daysSinceJoin - 1]);
    } else {
      setTodayBonus(dailyBonusAfter7Days);
    }

    // Проверяем, получал ли уже бонус сегодня
    const lastClaimDate = localStorage.getItem(`lastBonusClaim_${userProfile.id}`);
    const todayString = today.toDateString();
    
    if (lastClaimDate === todayString) {
      setCanClaim(false);
      setIsClaimed(true);
    }
  };

  const handleClaimBonus = () => {
    if (!canClaim) return;

    // Сохраняем дату получения бонуса
    const today = new Date();
    localStorage.setItem(`lastBonusClaim_${userProfile.id}`, today.toDateString());
    
    // Начисляем бонус на кошелек
    onClaimBonus(todayBonus);
    
    setIsClaimed(true);
    setCanClaim(false);

    // Автоматически закрываем через 2 секунды
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getBonusIcon = () => {
    if (currentStreak <= 7) {
      return "Gift";
    }
    return "Coins";
  };

  const getBonusTitle = () => {
    if (currentStreak <= 7) {
      return `День ${currentStreak} из 7`;
    }
    return `День ${currentStreak}`;
  };

  const getBonusDescription = () => {
    if (currentStreak <= 7) {
      return "Получите ежедневный бонус в первые 7 дней!";
    }
    return "Ежедневный бонус для постоянных клиентов";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-md mx-auto rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Ежедневный бонус</DialogTitle>
        
        {/* Header с градиентом */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-white/15 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-3">
              <Icon name={getBonusIcon()} size={48} className="mx-auto text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Ежедневный бонус
            </h2>
            <p className="text-sm opacity-90">
              {getBonusTitle()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-muted-foreground text-sm mb-4">
              {getBonusDescription()}
            </p>
            
            {/* Бонус */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Coins" size={24} className="text-green-600 mr-2" />
                <span className="text-2xl font-bold text-green-600">
                  +{todayBonus} ₽
                </span>
              </div>
              <p className="text-sm text-green-700">
                Бонус поступит на ваш кошелёк
              </p>
            </div>

            {/* Прогресс первых 7 дней */}
            {currentStreak <= 7 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Прогресс недели</span>
                  <span className="text-sm font-medium">{currentStreak}/7</span>
                </div>
                <div className="flex gap-1">
                  {bonusSchedule.map((bonus, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-2 rounded-full ${
                        index < currentStreak 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  {bonusSchedule.map((bonus, index) => (
                    <span key={index}>{bonus}₽</span>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопки */}
            <div className="space-y-3">
              {!isClaimed ? (
                <Button
                  onClick={handleClaimBonus}
                  disabled={!canClaim}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {canClaim ? (
                    <>
                      <Icon name="Gift" size={20} className="mr-2" />
                      Получить {todayBonus} ₽
                    </>
                  ) : (
                    <>
                      <Icon name="Clock" size={20} className="mr-2" />
                      Уже получено сегодня
                    </>
                  )}
                </Button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-center text-green-600 mb-2">
                    <Icon name="CheckCircle2" size={24} className="mr-2" />
                    <span className="font-semibold">Бонус получен!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    +{todayBonus} ₽ зачислено на ваш кошелёк
                  </p>
                </div>
              )}

              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                {isClaimed ? 'Отлично!' : 'Позже'}
              </Button>
            </div>

            {/* Информация о следующем дне */}
            {currentStreak < 7 && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Завтра: <span className="font-medium text-foreground">
                    +{bonusSchedule[currentStreak] || dailyBonusAfter7Days} ₽
                  </span>
                </p>
              </div>
            )}
            
            {currentStreak >= 7 && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-primary">
                  🎉 Вы завершили недельный челлендж! 
                  Теперь каждый день +1 ₽
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}