import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { statusSyncManager } from "@/utils/statusSync";
import Icon from "@/components/ui/icon";

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RevisionModal({ isOpen, onClose }: RevisionModalProps) {
  const { user } = useAuth();
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Обновляем статус на "resubmitted"
      statusSyncManager.updateStatus({
        sellerId: user.id,
        newStatus: "resubmitted",
        moderationComment: additionalInfo,
      });

      // Обновляем данные в localStorage
      const currentSellerToken = localStorage.getItem("seller-token");
      if (currentSellerToken) {
        const sellerData = JSON.parse(currentSellerToken);
        const updatedSeller = {
          ...sellerData,
          status: "resubmitted",
          additionalInfo: additionalInfo,
        };
        localStorage.setItem("seller-token", JSON.stringify(updatedSeller));

        // Перезагружаем страницу для обновления интерфейса
        window.location.reload();
      }

      onClose();
    } catch (error) {
      console.error("Ошибка при отправке на повторную проверку:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="RefreshCw" size={20} className="text-blue-600" />
            Отправить на повторную проверку
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 font-medium mb-2">
              Комментарий администрации:
            </p>
            <p className="text-yellow-700 text-sm">
              {user?.revisionComment || "Требуется дополнительная информация"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дополнительная информация (необязательно)
            </label>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Опишите, какие изменения вы внесли или добавьте дополнительную информацию..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Отменить
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Отправляется...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
