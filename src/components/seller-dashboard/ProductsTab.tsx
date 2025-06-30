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
import { Product } from "@/types/seller-dashboard.types";
import ProductRow from "./ProductRow";

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
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Мои товары</CardTitle>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={onAddProduct}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить товар
          </Button>
        </div>
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
