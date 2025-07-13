import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Фильтрация товаров
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Получение уникальных категорий
  const categories = [...new Set(products.map(p => p.category))];

  // Массовые операции
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleMassStatusChange = (status: string) => {
    // Логика массового изменения статуса
    toast({
      title: "Статус изменён",
      description: `Статус ${selectedProducts.length} товаров изменён на "${status}"`,
    });
    setSelectedProducts([]);
  };

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
        <div className="flex justify-between items-center mb-4">
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {/* Экспорт в CSV */}}
              className="hidden sm:flex"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleAddProduct}
              disabled={!subscriptionStatus?.canAddProducts}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Поиск по названию или описанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="inactive">Неактивные</SelectItem>
              <SelectItem value="out_of_stock">Нет в наличии</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Массовые операции */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <span className="text-sm font-medium text-blue-800">
              Выбрано: {selectedProducts.length} товаров
            </span>
            <div className="flex gap-2 ml-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMassStatusChange("active")}
              >
                Активировать
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMassStatusChange("inactive")}
              >
                Деактивировать
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedProducts([])}
              >
                Отменить
              </Button>
            </div>
          </div>
        )}

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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Search" size={48} className="mx-auto mb-4" />
            <p>Товары не найдены</p>
            <p className="text-sm mt-2">
              Попробуйте изменить критерии поиска
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{filteredProducts.filter(p => p.status === 'active').length}</div>
                <div className="text-xs text-gray-600">Активные</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{filteredProducts.filter(p => p.stock === 0).length}</div>
                <div className="text-xs text-gray-600">Нет в наличии</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredProducts.reduce((sum, p) => sum + p.sold, 0)}</div>
                <div className="text-xs text-gray-600">Продано</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₽{filteredProducts.reduce((sum, p) => sum + (p.price * p.sold), 0).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Выручка</div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>Товар</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Остаток</TableHead>
                  <TableHead>Продано</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={() => handleSelectProduct(product.id)}
                    onEdit={onEditProduct}
                    onDelete={onDeleteProduct}
                  />
                ))}
              </TableBody>
            </Table>

            {/* Пагинация для больших списков */}
            {filteredProducts.length > 20 && (
              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronLeft" size={16} />
                    Назад
                  </Button>
                  <span className="text-sm text-gray-600">Страница 1 из 1</span>
                  <Button variant="outline" size="sm">
                    Вперёд
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}