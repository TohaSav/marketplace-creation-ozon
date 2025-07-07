import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  currentCategory: {
    name: string;
    icon: string;
    color: string;
    description: string;
    gradient: string;
  };
  onAddToCart: () => void;
  onAddToFavorites?: () => void;
}

export default function ProductGrid({
  products,
  currentCategory,
  onAddToCart,
  onAddToFavorites,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon
          name={currentCategory.icon as any}
          className="w-24 h-24 text-gray-300 mx-auto mb-6"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Товары в категории "{currentCategory.name}" скоро появятся
        </h3>
        <p className="text-gray-600 mb-8">
          Мы работаем над наполнением этой категории качественными товарами
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl">
            Перейти к другим категориям
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToFavorites={onAddToFavorites}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl"
        >
          Загрузить еще
        </Button>
      </div>
    </>
  );
}
