import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUserType: (type: 'buyer' | 'seller') => void;
}

const UserTypeModal = ({ isOpen, onClose, onSelectUserType }: UserTypeModalProps) => {
  const [selectedType, setSelectedType] = useState<'buyer' | 'seller' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onSelectUserType(selectedType);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Выберите тип аккаунта
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div
            onClick={() => setSelectedType('buyer')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'buyer'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedType === 'buyer' ? 'bg-blue-500' : 'bg-gray-100'
              }`}>
                <Icon 
                  name="ShoppingBag" 
                  size={20} 
                  className={selectedType === 'buyer' ? 'text-white' : 'text-gray-600'} 
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Покупатель</h3>
                <p className="text-sm text-gray-600">Покупка товаров, заказы, избранное</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedType('seller')}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedType === 'seller'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedType === 'seller' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <Icon 
                  name="Store" 
                  size={20} 
                  className={selectedType === 'seller' ? 'text-white' : 'text-gray-600'} 
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Продавец</h3>
                <p className="text-sm text-gray-600">Продажа товаров, управление магазином</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Отмена
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full"
          >
            Продолжить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeModal;