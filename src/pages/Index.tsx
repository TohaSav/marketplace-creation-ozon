import { useAuth } from "@/context/AuthContext";
import DailyBonusModal from "@/components/modals/DailyBonusModal";
import CartAuthModal from "@/components/modals/CartAuthModal";
import { useDailyBonus } from "@/hooks/useDailyBonus";
import { useCartAuth } from "@/hooks/useCartAuth";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

// Новые компоненты
import HeroBanner from "@/components/home/HeroBanner";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductsGrid from "@/components/home/ProductsGrid";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function Index() {
  const { user, updateUserBalance } = useAuth();
  
  // Система ежедневных бонусов для зарегистрированных пользователей
  const { bonusData, shouldShowModal, setShouldShowModal, claimBonus } = useDailyBonus(
    user?.id?.toString() || '',
    user?.joinDate || ''
  );

  // Система авторизации для корзины
  const { 
    showAuthModal, 
    pendingProduct, 
    handleAddToCart, 
    handleModalLogin, 
    handleModalRegister, 
    handleModalClose 
  } = useCartAuth();

  // Бесконечная прокрутка товаров
  const { 
    products: allProducts, 
    loading, 
    hasMore, 
    loadMoreProducts, 
    totalProducts 
  } = useInfiniteProducts(12);

  // Хук для отслеживания скролла
  const { sentinelRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMoreProducts,
  });

  const handleClaimBonus = async (amount: number) => {
    await claimBonus(amount);
    updateUserBalance(amount);
  };

  return (
    <div className="bg-gradient-light min-h-screen">
      {/* Модальное окно ежедневных бонусов */}
      {user && shouldShowModal && (
        <DailyBonusModal
          isOpen={shouldShowModal}
          onClose={() => setShouldShowModal(false)}
          userProfile={user}
          onClaimBonus={handleClaimBonus}
        />
      )}

      {/* Модальное окно регистрации для корзины */}
      <CartAuthModal
        isOpen={showAuthModal}
        onClose={handleModalClose}
        onLogin={handleModalLogin}
        onRegister={handleModalRegister}
        productName={pendingProduct?.name}
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Section */}
        <CategoriesSection />

        {/* Products Grid */}
        <ProductsGrid
          products={allProducts}
          loading={loading}
          hasMore={hasMore}
          totalProducts={totalProducts}
          sentinelRef={sentinelRef}
          onAddToCart={handleAddToCart}
        />

        {/* Features Section */}
        <FeaturesSection />
      </div>
    </div>
  );
}