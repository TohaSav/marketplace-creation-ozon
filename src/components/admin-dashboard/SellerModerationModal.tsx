import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface SellerModerationModalProps {
  seller: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function SellerModerationModal({
  seller,
  isOpen,
  onClose,
}: SellerModerationModalProps) {
  const { updateSellerStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCommentField, setShowCommentField] = useState(false);
  const [comment, setComment] = useState("");

  if (!seller) return null;

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await updateSellerStatus(seller.id, "active");
      toast({
        title: "Продавец одобрен",
        description: `${seller.name} уведомлен об активации профиля`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить продавца",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevision = () => {
    setShowCommentField(true);
  };

  const handleSendRevision = async () => {
    if (!comment.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите комментарий для доработки",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await updateSellerStatus(seller.id, "revision", comment);
      toast({
        title: "Отправлено на доработку",
        description: `${seller.name} уведомлен о необходимых доработках`,
      });
      onClose();
      setShowCommentField(false);
      setComment("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить на доработку",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (
      !window.confirm(`Вы уверены, что хотите отклонить заявку ${seller.name}?`)
    ) {
      return;
    }

    setIsProcessing(true);
    try {
      await updateSellerStatus(seller.id, "rejected");
      toast({
        title: "Заявка отклонена",
        description: `${seller.name} уведомлен об отклонении`,
        variant: "destructive",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отклонить заявку",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserCheck" size={20} />
            Модерация продавца
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Полное имя
              </Label>
              <p className="mt-1 text-sm text-gray-900">{seller.name}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <p className="mt-1 text-sm text-gray-900">{seller.email}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Телефон
              </Label>
              <p className="mt-1 text-sm text-gray-900">
                {seller.phone || "Не указан"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Статус
              </Label>
              <div className="mt-1">
                <Badge
                  className={
                    seller.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : seller.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {seller.status === "pending"
                    ? "На модерации"
                    : seller.status === "active"
                      ? "Активен"
                      : "Отклонен"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Информация о магазине */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Информация о магазине</h3>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Название магазина
              </Label>
              <p className="mt-1 text-sm text-gray-900">
                {seller.shopName || "Без названия"}
              </p>
            </div>

            {seller.shopDescription && (
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Описание магазина
                </Label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {seller.shopDescription}
                </p>
              </div>
            )}

            {seller.businessType && (
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Тип деятельности
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {seller.businessType}
                </p>
              </div>
            )}
          </div>

          {/* Дополнительная информация */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Дополнительная информация</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Дата регистрации
                </Label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(seller.joinDate).toLocaleString()}
                </p>
              </div>

              {seller.city && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Город
                  </Label>
                  <p className="mt-1 text-sm text-gray-900">{seller.city}</p>
                </div>
              )}

              {seller.address && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Адрес
                  </Label>
                  <p className="mt-1 text-sm text-gray-900">{seller.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Поле комментария для доработки */}
          {showCommentField && (
            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий для доработки</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Укажите, что нужно доработать..."
                rows={4}
              />
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            {!showCommentField ? (
              <>
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  Подтвердить
                </Button>

                <Button
                  onClick={handleRevision}
                  disabled={isProcessing}
                  variant="outline"
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  <Icon name="AlertCircle" size={16} className="mr-2" />
                  Доработка
                </Button>

                <Button
                  onClick={handleReject}
                  disabled={isProcessing}
                  variant="destructive"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Отклонить
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="sm:ml-auto"
                >
                  Закрыть
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSendRevision}
                  disabled={isProcessing || !comment.trim()}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>

                <Button
                  onClick={() => {
                    setShowCommentField(false);
                    setComment("");
                  }}
                  variant="outline"
                >
                  Отмена
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
