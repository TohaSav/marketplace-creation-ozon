import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface FormData {
  name: string;
  city: string;
  birthDate: string;
  gender: 'Мужчина' | 'Женщина' | '';
  lookingFor: 'Мужчина' | 'Женщина' | '';
  about: string;
  photo: File | null;
}

const DatingPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    birthDate: '',
    gender: '',
    lookingFor: '',
    about: '',
    photo: null
  });

  // Проверяем авторизацию пользователя
  const isLoggedIn = localStorage.getItem('user') !== null;

  useEffect(() => {
    loadApprovedProfiles();
  }, []);

  const loadApprovedProfiles = () => {
    const savedProfiles = localStorage.getItem('datingProfiles');
    if (savedProfiles) {
      const allProfiles: Profile[] = JSON.parse(savedProfiles);
      setProfiles(allProfiles.filter(profile => profile.isApproved));
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Только зарегистрированные пользователи могут подавать анкеты');
      return;
    }

    setIsSubmitting(true);

    try {
      // Создаем профиль с фото-заглушкой
      const newProfile: Profile = {
        id: Date.now().toString(),
        name: formData.name,
        age: calculateAge(formData.birthDate),
        city: formData.city,
        gender: formData.gender as 'Мужчина' | 'Женщина',
        lookingFor: formData.lookingFor as 'Мужчина' | 'Женщина',
        about: formData.about,
        photo: '/api/placeholder/300/533', // Заглушка для фото 9:16
        isApproved: false,
        createdAt: new Date().toISOString()
      };

      // Сохраняем в localStorage (в реальном проекте это была бы отправка на сервер)
      const savedProfiles = localStorage.getItem('datingProfiles');
      const existingProfiles: Profile[] = savedProfiles ? JSON.parse(savedProfiles) : [];
      existingProfiles.push(newProfile);
      localStorage.setItem('datingProfiles', JSON.stringify(existingProfiles));

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
      
      alert('Анкета отправлена на модерацию. После одобрения она появится на странице.');
    } catch (error) {
      alert('Ошибка при отправке анкеты');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Icon name="Heart" size={64} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Знакомства</h1>
            <p className="text-gray-600 mb-8">
              Для доступа к разделу знакомств необходимо зарегистрироваться
            </p>
            <Button 
              onClick={() => alert('Здесь будет переход на страницу регистрации')}
              className="bg-red-500 hover:bg-red-600"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Icon name="Heart" size={32} className="text-red-500" />
              Знакомства
            </h1>
            <p className="text-gray-600 mt-1">
              Найдите свою вторую половинку
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-red-500 hover:bg-red-600"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Подать анкету
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Создать анкету</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Город *
                    </label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                      placeholder="Введите ваш город"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дата рождения *
                    </label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Пол *
                    </label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => setFormData({...formData, gender: value as 'Мужчина' | 'Женщина'})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите пол" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Мужчина">Мужчина</SelectItem>
                        <SelectItem value="Женщина">Женщина</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ищу *
                    </label>
                    <Select 
                      value={formData.lookingFor} 
                      onValueChange={(value) => setFormData({...formData, lookingFor: value as 'Мужчина' | 'Женщина'})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Кого ищете" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Мужчина">Мужчина</SelectItem>
                        <SelectItem value="Женщина">Женщина</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    О себе *
                  </label>
                  <Textarea
                    value={formData.about}
                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                    required
                    placeholder="Расскажите о себе..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isSubmitting ? 'Отправляется...' : 'Отправить'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div 
                  className="w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-gray-600"
                  style={{ aspectRatio: '9/16' }}
                >
                  <div className="text-center p-4">
                    <Icon name="User" size={48} className="mx-auto mb-4 text-gray-400" />
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-sm">{profile.age} лет</p>
                      <p className="text-sm">{profile.city}</p>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-2">
                  Ищет: {profile.lookingFor}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {profile.about}
                </p>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default DatingPage;