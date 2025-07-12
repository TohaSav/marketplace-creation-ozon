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
import { ProductFormData, PRODUCT_CATEGORIES } from "@/types/product";

interface BasicInfoFieldsProps {
  product: ProductFormData;
  onUpdate: (updates: Partial<ProductFormData>) => void;
}

export default function BasicInfoFields({
  product,
  onUpdate,
}: BasicInfoFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Название товара *</Label>
          <Input
            id="title"
            type="text"
            value={product.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Введите название товара"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Цена *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={product.price}
            onChange={(e) => onUpdate({ price: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Категория *</Label>
          <Select
            value={product.category}
            onValueChange={(value) => onUpdate({ category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Количество на складе *</Label>
          <Input
            id="stock"
            type="number"
            value={product.stock}
            onChange={(e) => onUpdate({ stock: e.target.value })}
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание товара *</Label>
        <Textarea
          id="description"
          value={product.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Опишите ваш товар подробно..."
          rows={4}
          required
        />
      </div>
    </>
  );
}
