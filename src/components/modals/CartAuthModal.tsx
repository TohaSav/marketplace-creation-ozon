import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface CartAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
  productName?: string;
}

export default function CartAuthModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  onRegister, 
  productName 
}: CartAuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        await onLogin(formData.email, formData.password);
      } else {
        await onRegister(formData.name, formData.email, formData.password);
      }
      onClose();
      // Сбрасываем форму
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Сбрасываем форму при переключении режимов
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-md mx-auto rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          {isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}
        </DialogTitle>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-3">
              <Icon name="ShoppingCart" size={48} className="mx-auto text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Добавить в корзину
            </h2>
            <p className="text-sm opacity-90">
              {productName && `${productName} ждёт вас в корзине!`}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Info" size={20} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">
                  Нужна регистрация
                </span>
              </div>
              <p className="text-sm text-blue-700">
                Чтобы добавлять товары в корзину, создайте аккаунт или войдите в существующий
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <Label htmlFor="name" className="text-left block mb-2">
                    Ваше имя
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required={!isLoginMode}
                    className="h-12"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-left block mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-left block mb-2">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {/* Кнопки */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      {isLoginMode ? 'Входим...' : 'Регистрируем...'}
                    </>
                  ) : (
                    <>
                      <Icon name={isLoginMode ? "LogIn" : "UserPlus"} size={20} className="mr-2" />
                      {isLoginMode ? 'Войти и добавить' : 'Зарегистрироваться и добавить'}
                    </>
                  )}
                </Button>

                {/* Переключение режимов */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    {isLoginMode ? (
                      <>
                        Нет аккаунта? <span className="underline">Зарегистрируйтесь</span>
                      </>
                    ) : (
                      <>
                        Уже есть аккаунт? <span className="underline">Войдите</span>
                      </>
                    )}
                  </button>
                </div>

                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Отмена
                </Button>
              </div>
            </form>

            {/* Дополнительная информация */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground text-left">
                  <p className="font-medium text-foreground mb-1">Ваши данные в безопасности</p>
                  <p>Мы используем современное шифрование и не передаем данные третьим лицам</p>
                </div>
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="mt-4 flex space-x-2 text-xs">
              <Link 
                to="/privacy" 
                className="text-primary hover:text-primary/80 flex-1"
              >
                Политика конфиденциальности
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/buyer-terms" 
                className="text-primary hover:text-primary/80 flex-1"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}