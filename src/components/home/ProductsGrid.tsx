import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/ui/icon";
import { Product } from "@/types/product.types";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  totalProducts: number;
  sentinelRef: React.RefObject<HTMLDivElement>;
  onAddToCart: (product: Product) => void;
}

export default function ProductsGrid({
  products,
  loading,
  hasMore,
  totalProducts,
  sentinelRef,
  onAddToCart
}: ProductsGridProps) {
  return (
    <div className="mb-12">
      {/* Заголовок с счетчиком товаров */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Все товары
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Package" size={16} />
          <span>{totalProducts} товаров</span>
        </div>
      </div>
      
      {products.length > 0 ? (
        <div>
          {/* Сетка товаров */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* Индикатор загрузки */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center space-x-2">
                <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                <span className="text-gray-600">Загружаем товары...</span>
              </div>
            </div>
          )}

          {/* Sentinel для бесконечной прокрутки */}
          <div ref={sentinelRef} className="h-10 w-full" />

          {/* Сообщение об окончании списка */}
          {!hasMore && !loading && products.length > 12 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-gray-500">
                <Icon name="CheckCircle2" size={16} />
                <span>Все товары загружены</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon="Package"
          title="Пока нет товаров"
          description="Товары появятся здесь после того, как продавцы их добавят"
        />
      )}
    </div>
  );
}