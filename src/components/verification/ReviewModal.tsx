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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { VerificationRequest, ReviewAction } from "@/types/verification";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rejectionReason?: string) => void;
  request: VerificationRequest | null;
  action: ReviewAction;
  isSubmitting: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  request,
  action,
  isSubmitting,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = () => {
    if (action === "reject" && !rejectionReason.trim()) {
      return;
    }
    onSubmit(action === "reject" ? rejectionReason : undefined);
  };

  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "Одобрить заявку" : "Отклонить заявку"}
          </DialogTitle>
          <DialogDescription>
            {request && `Магазин: ${request.shopName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {action === "reject" && (
            <div>
              <Label htmlFor="reason">Причина отклонения</Label>
              <Textarea
                id="reason"
                placeholder="Укажите причину отклонения заявки..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {action === "approve" && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Icon name="CheckCircle" size={20} />
                <span className="font-medium">Подтверждение одобрения</span>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Магазин получит статус верифицированного и синюю галочку
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting || (action === "reject" && !rejectionReason.trim())
            }
            className={
              action === "approve" ? "bg-green-600 hover:bg-green-700" : ""
            }
            variant={action === "reject" ? "destructive" : "default"}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Обработка...
              </>
            ) : (
              <>
                <Icon
                  name={action === "approve" ? "CheckCircle" : "XCircle"}
                  size={16}
                  className="mr-2"
                />
                {action === "approve" ? "Одобрить" : "Отклонить"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
