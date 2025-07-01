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
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  shopStats: {
    salesCount: number;
    reviewsCount: number;
    monthsOnPlatform: number;
    complaintsCount: number;
    supportRating: number;
  };
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  shopStats,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requirements = [
    {
      id: 1,
      text: "Ваш магазин должен иметь не менее 100 продаж",
      current: shopStats.salesCount,
      required: 100,
      met: shopStats.salesCount >= 100,
      icon: "ShoppingCart",
    },
    {
      id: 2,
      text: "Ваш магазин должен иметь не менее 50 отзывов",
      current: shopStats.reviewsCount,
      required: 50,
      met: shopStats.reviewsCount >= 50,
      icon: "MessageSquare",
    },
    {
      id: 3,
      text: "Вашему магазину должно быть больше 6 месяцев на площадке Calibre Store",
      current: shopStats.monthsOnPlatform,
      required: 6,
      met: shopStats.monthsOnPlatform > 6,
      icon: "Calendar",
    },
    {
      id: 4,
      text: "На ваш магазин за последний 4 месяца не было жалоб",
      current: shopStats.complaintsCount,
      required: 0,
      met: shopStats.complaintsCount === 0,
      icon: "Shield",
    },
    {
      id: 5,
      text: "Поддержка вашего магазина работает стабильно",
      current: shopStats.supportRating,
      required: 4.5,
      met: shopStats.supportRating >= 4.5,
      icon: "Headphones",
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Имитация отправки заявки
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CheckCircle" size={24} className="text-blue-600" />
            Верификация магазина
          </DialogTitle>
          <DialogDescription>
            Получите синюю галочку для повышения доверия покупателей
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Преимущества верификации */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Icon name="Star" size={18} />
              Преимущества верифицированного магазина
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={14} />
                Повышение конверсии до 40%
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={14} />
                Увеличение доверия покупателей
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Search" size={14} />
                Приоритет в поиске
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={14} />
                Официальный статус
              </div>
            </div>
          </div>

          <Separator />

          {/* Требования */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Требования для верификации
            </h3>
            <div className="space-y-4">
              {requirements.map((req) => (
                <div
                  key={req.id}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      req.met ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Icon
                      name={req.met ? "CheckCircle" : "XCircle"}
                      size={16}
                      className={req.met ? "text-green-600" : "text-red-600"}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {req.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={req.met ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {req.id === 4
                          ? req.current === 0
                            ? "Нет жалоб"
                            : `${req.current} жалоб`
                          : req.id === 5
                            ? `${req.current}/5.0`
                            : req.id === 3
                              ? `${req.current} мес.`
                              : `${req.current}/${req.required}`}
                      </Badge>
                      <Icon
                        name={req.icon as any}
                        size={14}
                        className="text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Информация о процессе */}
          <Alert>
            <Icon name="Info" size={16} />
            <AlertDescription>
              <strong>Процесс рассмотрения:</strong> Заявка будет рассмотрена в
              течение 3-5 рабочих дней. Вы получите уведомление о статусе
              рассмотрения на email и в личном кабинете.
            </AlertDescription>
          </Alert>

          {!allRequirementsMet && (
            <Alert>
              <Icon name="AlertTriangle" size={16} />
              <AlertDescription>
                Ваш магазин пока не соответствует всем требованиям для
                верификации. Продолжайте развивать магазин и подавайте заявку
                позже.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allRequirementsMet || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Отправляем...
              </>
            ) : (
              <>
                <Icon name="Send" size={16} className="mr-2" />
                Отправить заявку
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
