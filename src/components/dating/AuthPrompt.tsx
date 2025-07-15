import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AuthPrompt: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        <Icon name="Heart" size={64} className="mx-auto text-red-400 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Добро пожаловать в раздел знакомств!
        </h2>
        <p className="text-gray-600 mb-8">
          Для доступа к разделу знакомств необходимо зарегистрироваться
        </p>
        <Button 
          onClick={() => window.location.href = '/register'}
          className="bg-red-500 hover:bg-red-600"
        >
          Зарегистрироваться
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthPrompt;