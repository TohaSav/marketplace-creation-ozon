import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Seller } from "@/types/seller";
import {
  formatCurrency,
  formatDate,
  getStatusBadge,
} from "@/utils/sellerUtils";

interface ViewSellerModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewSellerModal: React.FC<ViewSellerModalProps> = ({
  seller,
  isOpen,
  onClose,
}) => {
  if (!seller) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Eye" size={20} />
            Информация о продавце
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Имя</Label>
              <p className="text-lg font-semibold">{seller.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <p className="text-lg">{seller.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Телефон
              </Label>
              <p className="text-lg">{seller.phone}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Магазин
              </Label>
              <p className="text-lg font-semibold">{seller.shopName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Статус
              </Label>
              <Badge className={getStatusBadge(seller.status).className}>
                {getStatusBadge(seller.status).text}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Рейтинг
              </Label>
              <div className="flex items-center gap-1">
                <Icon
                  name="Star"
                  size={16}
                  className="text-yellow-500 fill-current"
                />
                <span className="text-lg font-semibold">{seller.rating}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">
                {seller.totalOrders}
              </p>
              <p className="text-sm text-blue-600">Заказов</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(seller.revenue)}
              </p>
              <p className="text-sm text-green-600">Выручка</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">
                {formatDate(seller.registrationDate)}
              </p>
              <p className="text-sm text-purple-600">Дата регистрации</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Описание
            </Label>
            <p className="mt-1 text-gray-900">{seller.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSellerModal;
