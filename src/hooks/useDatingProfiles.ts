import { useState, useEffect, useCallback } from 'react';
import { Profile, FormData } from '@/types/dating';
import { toast } from '@/hooks/use-toast';

export const useDatingProfiles = (userId?: string) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [displayedProfiles, setDisplayedProfiles] = useState<Profile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const PROFILES_PER_PAGE = 8;

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const loadProfiles = useCallback(() => {
    const savedProfiles = localStorage.getItem('datingProfiles');
    if (savedProfiles) {
      let allProfiles: Profile[] = JSON.parse(savedProfiles);
      
      // Миграция: добавляем userId к старым профилям
      let hasUpdated = false;
      allProfiles = allProfiles.map(profile => {
        if (!profile.userId) {
          hasUpdated = true;
          return { ...profile, userId: 'legacy-' + profile.id };
        }
        return profile;
      });
      
      // Сохраняем обновленные профили
      if (hasUpdated) {
        localStorage.setItem('datingProfiles', JSON.stringify(allProfiles));
      }
      
      const approvedProfiles = allProfiles.filter(profile => profile.isApproved);
      setProfiles(approvedProfiles);
      
      // Сбрасываем пагинацию при загрузке новых профилей
      setCurrentPage(0);
      setHasMore(true);
      
      // Загружаем первую порцию профилей
      const firstPage = approvedProfiles.slice(0, PROFILES_PER_PAGE);
      setDisplayedProfiles(firstPage);
      setHasMore(approvedProfiles.length > PROFILES_PER_PAGE);
      
      // Находим профиль текущего пользователя
      if (userId) {
        const currentUserProfile = allProfiles.find(profile => profile.userId === userId);
        setUserProfile(currentUserProfile || null);
      }
    }
  }, [userId, PROFILES_PER_PAGE]);

  const loadMoreProfiles = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Имитируем небольшую задержку загрузки
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * PROFILES_PER_PAGE;
      const endIndex = startIndex + PROFILES_PER_PAGE;
      
      const newProfiles = profiles.slice(startIndex, endIndex);
      
      if (newProfiles.length > 0) {
        setDisplayedProfiles(prev => [...prev, ...newProfiles]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < profiles.length);
      } else {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 500);
  }, [profiles, currentPage, isLoading, hasMore, PROFILES_PER_PAGE]);

  const submitProfile = async (formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      // Конвертируем фото в base64 для сохранения
      let photoData = '';
      if (formData.photo) {
        const reader = new FileReader();
        photoData = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string || '');
          reader.readAsDataURL(formData.photo!);
        });
      }

      // Создаем профиль
      const newProfile: Profile = {
        id: Date.now().toString(),
        userId: userId || 'anonymous',
        name: formData.name,
        age: calculateAge(formData.birthDate),
        city: formData.city,
        gender: formData.gender as 'Мужчина' | 'Женщина',
        lookingFor: formData.lookingFor as 'Мужчина' | 'Женщина',
        about: formData.about,
        photo: photoData || '', // Сохраняем base64 фото или пустую строку
        isApproved: false,
        createdAt: new Date().toISOString()
      };

      // Сохраняем в localStorage (в реальном проекте это была бы отправка на сервер)
      const savedProfiles = localStorage.getItem('datingProfiles');
      const existingProfiles: Profile[] = savedProfiles ? JSON.parse(savedProfiles) : [];
      existingProfiles.push(newProfile);
      localStorage.setItem('datingProfiles', JSON.stringify(existingProfiles));

      // Отладочная информация
      console.log('Сохранен профиль с фото:', {
        id: newProfile.id,
        name: newProfile.name,
        hasPhoto: !!newProfile.photo,
        photoLength: newProfile.photo?.length || 0
      });
      
      toast({
        title: "Анкета отправлена!",
        description: "Анкета отправлена на модерацию. После одобрения она появится на странице.",
      });

      // Обновляем профиль пользователя
      setUserProfile(newProfile);

      return true;
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при отправке анкеты",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, [userId]);

  return {
    profiles: displayedProfiles,
    isSubmitting,
    userProfile,
    submitProfile,
    loadProfiles,
    loadMoreProfiles,
    isLoading,
    hasMore
  };
};