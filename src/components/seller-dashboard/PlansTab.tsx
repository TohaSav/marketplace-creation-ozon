import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  isTrial?: boolean;
  trialDuration?: number;
}

export default function PlansTab() {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [trialActivated, setTrialActivated] = useState(false);
  const [trialExpiry, setTrialExpiry] = useState<Date | null>(null);
  const [shopSuspended, setShopSuspended] = useState(false);

  // Проверяем истечение пробного периода
  useEffect(() => {
    if (trialExpiry && new Date() > trialExpiry) {
      setShopSuspended(true);
      setCurrentPlan('free');
    }
  }, [trialExpiry]);

  const plans: Plan[] = [
    {
      id: 'trial',
      name: 'Пробный тариф',
      description: 'Попробуйте все возможности бесплатно',
      price: 0,
      duration: '2 дня',
      isTrial: true,
      trialDuration: 2,
      features: [
        'Неограниченное количество товаров',
        'Продвижение товаров',
        'Аналитика продаж',
        'Приоритетная поддержка',
        'Настройка магазина',
        'Экспорт данных',
        'Все премиум функции'
      ]
    },
    {
      id: 'free',
      name: 'Бесплатный',
      description: 'Базовые возможности для старта',
      price: 0,
      duration: 'навсегда',
      features: [
        'До 10 товаров',
        'Базовая статистика',
        'Стандартная поддержка'
      ]
    },
    {
      id: 'basic',
      name: 'Базовый',
      description: 'Для небольших магазинов',
      price: 299,
      duration: 'в месяц',
      features: [
        'До 100 товаров',
        'Расширенная аналитика',
        'Продвижение товаров',
        'Приоритетная поддержка'
      ]
    },
    {
      id: 'pro',
      name: 'Профессиональный',
      description: 'Для растущего бизнеса',
      price: 599,
      duration: 'в месяц',
      isPopular: true,
      features: [
        'Неограниченное количество товаров',
        'Полная аналитика',
        'Автопродвижение',
        'Персональный менеджер',
        'Настройка магазина',
        'Экспорт данных'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'trial' && !trialActivated) {
      // Активируем пробный период
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 2);
      
      setTrialActivated(true);
      setTrialExpiry(expiryDate);
      setCurrentPlan('trial');
      setShopSuspended(false);
      
      // Здесь будет логика активации пробного тарифа
      console.log('Пробный тариф активирован до:', expiryDate);
      
    } else if (planId !== 'trial') {
      // Логика активации платного тарифа
      setCurrentPlan(planId);
      setShopSuspended(false);
      console.log('Выбран тариф:', planId);
    }
  };

  const getRemainingTrialTime = () => {
    if (!trialExpiry) return null;
    
    const now = new Date();
    const diff = trialExpiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Истёк';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  };

  if (!user || user.userType !== "seller") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Icon name="CreditCard" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет доступа к тарифам
          </h3>
          <p className="text-gray-500">Тарифы доступны только продавцам</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статус магазина */}
      {shopSuspended && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Icon name="AlertTriangle" size={20} className="text-red-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800 mb-1">
                  Магазин приостановлен
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  Ваш пробный период истёк. Магазин и товары скрыты от покупателей, 
                  но все данные сохранены. Выберите подходящий тариф для продолжения работы.
                </p>
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handlePlanSelect('basic')}
                >
                  Выбрать тариф
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Текущий тариф */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Текущий тариф
            {currentPlan === 'trial' && trialExpiry && (
              <Badge className="bg-blue-100 text-blue-800">
                Пробный • Осталось: {getRemainingTrialTime()}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">
                {plans.find(p => p.id === currentPlan)?.name || 'Неизвестный тариф'}
              </h3>
              <p className="text-gray-600">
                {plans.find(p => p.id === currentPlan)?.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {plans.find(p => p.id === currentPlan)?.price || 0}₽
              </p>
              <p className="text-sm text-gray-600">
                {plans.find(p => p.id === currentPlan)?.duration}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Доступные тарифы */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Доступные тарифы</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.isPopular ? 'border-blue-500 shadow-lg' : ''
              } ${
                currentPlan === plan.id ? 'ring-2 ring-green-500' : ''
              } ${
                plan.id === 'trial' && trialActivated ? 'opacity-50' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Популярный</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600">{plan.description}</p>
                <div className="py-2">
                  <span className="text-3xl font-bold">{plan.price}₽</span>
                  <span className="text-sm text-gray-600">/{plan.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Icon 
                        name="Check" 
                        size={16} 
                        className="text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={currentPlan === plan.id ? "secondary" : "default"}
                  disabled={
                    currentPlan === plan.id || 
                    (plan.id === 'trial' && trialActivated)
                  }
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {currentPlan === plan.id ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Активен
                    </>
                  ) : plan.id === 'trial' && trialActivated ? (
                    'Использован'
                  ) : plan.isTrial ? (
                    'Попробовать бесплатно'
                  ) : plan.price === 0 ? (
                    'Выбрать'
                  ) : (
                    'Подключить'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Информация о пробном периоде */}
      {!trialActivated && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Icon name="Gift" size={20} className="text-blue-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Попробуйте все возможности бесплатно!
                </h3>
                <p className="text-sm text-blue-700">
                  Активируйте пробный тариф и получите доступ ко всем премиум функциям на 2 дня. 
                  После истечения пробного периода магазин будет приостановлен до выбора платного тарифа.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}