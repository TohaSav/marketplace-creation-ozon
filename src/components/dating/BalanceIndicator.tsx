import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TopUpModal from './TopUpModal';

interface BalanceIndicatorProps {
  balance: number;
  walletBalance: number;
  onTopUp: (amount: number) => void;
}

const BalanceIndicator: React.FC<BalanceIndicatorProps> = ({ balance, walletBalance, onTopUp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTopUp = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Wallet" size={20} className="text-green-500" />
          <span className="text-sm font-medium text-gray-700">Баланс:</span>
          <span className="text-lg font-bold text-green-600">{balance} ₽</span>
        </div>
        <Button 
          onClick={handleTopUp}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <Icon name="Plus" size={14} className="mr-1" />
          Пополнить
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <Icon name="Flame" size={14} className="inline mr-1 text-orange-500" />
        Супер-лайк: 10 ₽
      </div>
      
      <TopUpModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        walletBalance={walletBalance}
        datingBalance={balance}
        onTopUp={onTopUp}
      />
    </div>
  );
};

export default BalanceIndicator;