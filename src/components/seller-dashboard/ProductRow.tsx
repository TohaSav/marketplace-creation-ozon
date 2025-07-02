import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Product } from "@/types/seller-dashboard.types";
import {
  formatCurrency,
  getProductStatusColor,
  getProductStatusText,
} from "@/utils/seller-dashboard.utils";
import { formatBarcode } from "@/utils/productGenerators";

interface ProductRowProps {
  product: Product;
  onEdit?: (productId: number) => void;
  onDelete?: (productId: number) => void;
}

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <div className="font-medium">{product.name}</div>
            {(product as any).article && (
              <div className="text-xs text-gray-500 font-mono">
                {(product as any).article}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>{formatCurrency(product.price)}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.sold}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <Badge className={getProductStatusColor(product.status)}>
            {getProductStatusText(product.status)}
          </Badge>
          {(product as any).barcode && (
            <div className="text-xs text-gray-500 font-mono">
              {formatBarcode((product as any).barcode)}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit?.(product.id)}
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete?.(product.id)}
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
