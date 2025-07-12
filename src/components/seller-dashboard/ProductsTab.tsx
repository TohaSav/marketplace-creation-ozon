import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/seller-dashboard.types";
import ProductRow from "./ProductRow";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "@/hooks/use-toast";

interface ProductsTabProps {
  products: Product[];
  onAddProduct?: () => void;
  onEditProduct?: (productId: number) => void;
  onDeleteProduct?: (productId: number) => void;
}

export default function ProductsTab({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  const { subscriptionStatus, canAddProduct } = useSubscription();

  const handleAddProduct = () => {
    const result = canAddProduct();
    if (!result.allowed) {
      toast({
        title: "Невозможно добавить товар",
        description: result.reason,
        variant: "destructive",
      });
      return;
    }
    onAddProduct?.();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CardTitle>Мои товары</CardTitle>
            {subscriptionStatus && (
              <Badge variant="outline" className="text-xs">
                {subscriptionStatus.productsUsed} /{" "}
                {subscriptionStatus.maxProducts === -1
                  ? "∞"
                  : subscriptionStatus.maxProducts}
              </Badge>
            )}
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleAddProduct}
            disabled={!subscriptionStatus?.canAddProducts}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить товар
          </Button>
        </div>

        {subscriptionStatus && !subscriptionStatus.canAddProducts && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">
                {subscriptionStatus.maxProducts !== -1 &&
                subscriptionStatus.productsUsed >=
                  subscriptionStatus.maxProducts
                  ? `Достигнут лимит товаров (${subscriptionStatus.maxProducts})`
                  : "Подписка неактивна"}
              </span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              Обновите тарифный план для добавления новых товаров
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Package" size={48} className="mx-auto mb-4" />
            <p>У вас пока нет товаров</p>
            <p className="text-sm mt-2">
              Добавьте первый товар для начала продаж
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Товар</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Остаток</TableHead>
                <TableHead>Продано</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
