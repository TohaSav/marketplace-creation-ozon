import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { ModerationModalProps } from "@/types/seller";
import {
  formatCurrency,
  formatDate,
  getStatusBadge,
} from "@/utils/sellerUtils";

const ModerationModal: React.FC<ModerationModalProps> = ({
  seller,
  isOpen,
  onClose,
  onApprove,
  onRevision,
  onReject,
}) => {
  const [revisionReason, setRevisionReason] = useState("");
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const handleRevision = () => {
    if (revisionReason.trim()) {
      onRevision(revisionReason);
      setRevisionReason("");
      setShowRevisionForm(false);
      onClose();
    }
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  const handleClose = () => {
    setRevisionReason("");
    setShowRevisionForm(false);
    onClose();
  };

  if (!seller) return null;

  const statusBadge = getStatusBadge(seller.status);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} className="text-blue-600" />
            Модерация продавца
          </DialogTitle>
          <DialogDescription>
            Проверьте информацию о продавце и примите решение о регистрации
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Основная информация */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="User" size={18} />
              Основная информация
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Имя продавца
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {seller.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Статус
                </Label>
                <div className="mt-1">
                  <Badge className={statusBadge.className}>
                    {statusBadge.text}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <p className="text-gray-900">{seller.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Телефон
                </Label>
                <p className="text-gray-900">{seller.phone}</p>
              </div>
            </div>
          </div>

          {/* Информация о магазине */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="Store" size={18} className="text-blue-600" />
              Информация о магазине
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Название магазина
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {seller.shopName}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Описание деятельности
                </Label>
                <p className="text-gray-900 bg-white p-3 rounded border">
                  {seller.description}
                </p>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="BarChart3" size={18} className="text-green-600" />
              Статистика
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3 rounded">
                <p className="text-xl font-bold text-blue-700">
                  {seller.totalOrders}
                </p>
                <p className="text-sm text-gray-600">Заказов</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-xl font-bold text-green-700">
                  {formatCurrency(seller.revenue)}
                </p>
                <p className="text-sm text-gray-600">Выручка</p>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="flex items-center justify-center gap-1">
                  <Icon
                    name="Star"
                    size={16}
                    className="text-yellow-500 fill-current"
                  />
                  <span className="text-xl font-bold text-yellow-700">
                    {seller.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Рейтинг</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-lg font-bold text-purple-700">
                  {formatDate(seller.registrationDate)}
                </p>
                <p className="text-sm text-gray-600">Дата заявки</p>
              </div>
            </div>
          </div>

          {/* Причина доработки */}
          {seller.rejectionReason && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-yellow-800">
                <Icon name="AlertTriangle" size={18} />
                Причина доработки
              </h3>
              <p className="text-gray-900 bg-white p-3 rounded border">
                {seller.rejectionReason}
              </p>
            </div>
          )}

          {/* Форма доработки */}
          {showRevisionForm && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <Label htmlFor="revisionReason" className="text-sm font-medium">
                Укажите, что нужно доработать продавцу:
              </Label>
              <Textarea
                id="revisionReason"
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
                placeholder="Опишите детально, что именно нужно исправить или дополнить..."
                rows={4}
                className="mt-2"
              />
            </div>
          )}
        </div>

        <Separator />

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
          </div>

          <div className="flex gap-2">
            {showRevisionForm ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowRevisionForm(false)}
                >
                  Назад
                </Button>
                <Button
                  onClick={handleRevision}
                  disabled={!revisionReason.trim()}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  Отправить на доработку
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Отклонить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRevisionForm(true)}
                  className="border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  Доработка
                </Button>
                <Button
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  Подтвердить
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModerationModal;
