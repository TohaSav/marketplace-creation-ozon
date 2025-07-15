import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData } from '@/types/dating';

interface DatingFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

const DatingForm: React.FC<DatingFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  onCancel
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Создать анкету</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
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
                Кого ищете *
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
              Фотография *
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData({...formData, photo: file});
              }}
              required
              className="cursor-pointer"
            />
            {formData.photo && (
              <div className="mt-2">
                <img 
                  src={URL.createObjectURL(formData.photo)} 
                  alt="Предварительный просмотр"
                  className="w-24 h-32 object-cover rounded-lg border"
                />
                <p className="text-sm text-green-600 mt-1">Фото загружено</p>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Загрузите свою фотографию (JPG, PNG)
            </p>
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
              onClick={onCancel}
            >
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DatingForm;