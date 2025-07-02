import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Seller, SellerFormData } from "@/types/seller";

interface EditSellerModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (seller: Seller) => void;
}

const EditSellerModal: React.FC<EditSellerModalProps> = ({
  seller,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<SellerFormData>({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    description: "",
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        shopName: seller.shopName,
        description: seller.description,
      });
    }
  }, [seller]);

  const handleSave = () => {
    if (seller) {
      const updatedSeller: Seller = {
        ...seller,
        ...formData,
      };
      onSave(updatedSeller);
      onClose();
    }
  };

  const handleChange = (field: keyof SellerFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Edit" size={20} />
            Редактирование продавца
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="shopName">Название магазина</Label>
              <Input
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleChange("shopName", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить изменения</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSellerModal;
