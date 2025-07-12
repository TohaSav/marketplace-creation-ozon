import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import BasicInfoFields from "./BasicInfoFields";
import GeneratedFields from "./GeneratedFields";
import ImageUpload from "./ImageUpload";
import { ProductFormData } from "@/types/product";

interface ProductFormProps {
  product: ProductFormData;
  loading: boolean;
  onUpdate: (updates: Partial<ProductFormData>) => void;
  onRegenerateArticle: () => void;
  onRegenerateBarcode: () => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  loading,
  onUpdate,
  onRegenerateArticle,
  onRegenerateBarcode,
  onImageChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о товаре</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <BasicInfoFields product={product} onUpdate={onUpdate} />

          <GeneratedFields
            product={product}
            onRegenerateArticle={onRegenerateArticle}
            onRegenerateBarcode={onRegenerateBarcode}
          />

          <ImageUpload image={product.image} onImageChange={onImageChange} />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Добавление...
                </>
              ) : (
                <>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить товар
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
