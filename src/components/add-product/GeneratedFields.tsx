import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ProductFormData } from "@/types/product";
import { formatBarcode } from "@/utils/productGenerators";

interface GeneratedFieldsProps {
  product: ProductFormData;
  onRegenerateArticle: () => void;
  onRegenerateBarcode: () => void;
}

export default function GeneratedFields({
  product,
  onRegenerateArticle,
  onRegenerateBarcode,
}: GeneratedFieldsProps) {
  if (!product.article || !product.barcode) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="Zap" size={20} className="text-blue-600" />
        <h3 className="font-semibold text-blue-900">
          Автоматически сгенерировано
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="article">Артикул товара</Label>
          <div className="flex gap-2">
            <Input
              id="article"
              type="text"
              value={product.article}
              readOnly
              className="bg-gray-50"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRegenerateArticle}
              title="Сгенерировать новый артикул"
            >
              <Icon name="RefreshCcw" size={16} />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode">Штрих-код (EAN-13)</Label>
          <div className="flex gap-2">
            <Input
              id="barcode"
              type="text"
              value={formatBarcode(product.barcode)}
              readOnly
              className="bg-gray-50 font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRegenerateBarcode}
              title="Сгенерировать новый штрих-код"
            >
              <Icon name="RefreshCcw" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
        <Icon name="QrCode" size={24} className="text-green-600" />
        <div>
          <p className="text-sm font-medium">
            QR-код будет создан автоматически
          </p>
          <p className="text-xs text-gray-500">
            Содержит артикул и ссылку на товар
          </p>
        </div>
      </div>
    </div>
  );
}
