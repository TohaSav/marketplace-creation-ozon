import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryFilters from "@/components/category/CategoryFilters";
import ProductGrid from "@/components/category/ProductGrid";
import CategoryFooter from "@/components/category/CategoryFooter";
import CategoryNavigation from "@/components/category/CategoryNavigation";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useProductFilters } from "@/hooks/useProductFilters";

const Category = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Хуки для управления состоянием
  const { cartCount, addToCart } = useCart();
  const { favoritesCount, toggleFavorite } = useFavorites();

  // Получаем данные для текущей категории
  const currentCategory = categories[categorySlug as keyof typeof categories];
  const currentProducts =
    productsByCategory[categorySlug as keyof typeof productsByCategory] || [];

  // Хук для фильтрации и сортировки товаров
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredProducts } =
    useProductFilters(currentProducts);

  // Обработчики событий
  const handleAddToCart = () => {
    // Логика добавления товара в корзину будет реализована позже
  };

  const handleAddToFavorites = () => {
    // Логика добавления товара в избранное будет реализована позже
  };

  // Обработка случая, когда категория не найдена
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Категория не найдена
          </h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <CategoryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentCategory={currentCategory}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
      />

      <CategoryFilters sortBy={sortBy} setSortBy={setSortBy} />

      <CategoryNavigation currentCategorySlug={categorySlug!} />

      <main className="container mx-auto px-4 py-8">
        <ProductGrid
          products={filteredProducts}
          currentCategory={currentCategory}
          onAddToCart={handleAddToCart}
          onAddToFavorites={handleAddToFavorites}
        />
      </main>

      <CategoryFooter />
    </div>
  );
};

export default Category;
