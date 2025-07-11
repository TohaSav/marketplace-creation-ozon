import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function Electronics() {
  const { getProductsByCategory } = useProductStore();
  const products = getProductsByCategory("electronics");

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Электроника</h1>
          <p className="text-gray-600">
            Смартфоны, компьютеры, гаджеты и электроника
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="Smartphone"
            title="Пока нет товаров в категории"
            description="Товары появятся здесь после того, как продавцы их добавят"
            actionText="Стать продавцом"
            actionLink="/seller/register"
          />
        )}
      </div>
    </div>
  );
}
