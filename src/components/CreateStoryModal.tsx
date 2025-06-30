import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storyData: any) => void;
}

const mockProducts = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", price: 119999 },
  { id: 2, name: "AirPods Pro 2-го поколения", price: 24999 },
  { id: 3, name: 'MacBook Air M3 13"', price: 109999 },
];

export default function CreateStoryModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateStoryModalProps) {
  const [formData, setFormData] = useState({
    productId: "",
    image: null as File | null,
    description: "",
    discount: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ productId: "", image: null, description: "", discount: "" });
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Создать Story
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label>Выберите товар</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) =>
                setFormData({ ...formData, productId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите товар для Story" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    <div className="flex justify-between items-center w-full">
                      <span className="truncate">{product.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ₽{product.price.toLocaleString()}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Изображение для Story</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <Icon
                    name="Upload"
                    size={32}
                    className="mx-auto text-gray-400 mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Нажмите для загрузки изображения
                  </p>
                  <p className="text-xs text-gray-400">
                    Рекомендуемый размер: 1080x1920 (9:16)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Описание (необязательно)</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о товаре..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <Label htmlFor="discount">Скидка (необязательно)</Label>
            <div className="relative">
              <Input
                id="discount"
                type="number"
                placeholder="Размер скидки"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
                min="0"
                max="90"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                %
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!formData.productId || !formData.image}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать Story
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
