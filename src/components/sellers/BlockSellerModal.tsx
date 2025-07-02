import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Seller } from "@/types/seller";

interface BlockSellerModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BlockSellerModal: React.FC<BlockSellerModalProps> = ({
  seller,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!seller) return null;

  const isBlocked = seller.status === "blocked";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} className="text-orange-500" />
            {isBlocked ? "Разблокировать" : "Заблокировать"} продавца
          </DialogTitle>
          <DialogDescription>
            {isBlocked
              ? `Вы уверены, что хотите разблокировать продавца ${seller.name}? Продавец снова сможет работать на платформе.`
              : `Вы уверены, что хотите заблокировать продавца ${seller.name}? Продавец не сможет принимать новые заказы.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={onConfirm}
            variant={isBlocked ? "default" : "destructive"}
          >
            {isBlocked ? "Разблокировать" : "Заблокировать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockSellerModal;
