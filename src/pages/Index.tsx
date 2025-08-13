import { Link } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { getProducts } from "@/data/products";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DailyBonusModal from "@/components/modals/DailyBonusModal";
import CartAuthModal from "@/components/modals/CartAuthModal";
import { useDailyBonus } from "@/hooks/useDailyBonus";
import { useCartAuth } from "@/hooks/useCartAuth";

export default function Index() {
  const { getFeaturedProducts } = useProductStore();
  const [realProducts, setRealProducts] = useState([]);
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

  const handleClaimBonus = async (amount: number) => {
    await claimBonus(amount);
    updateUserBalance(amount);
  };

  useEffect(() => {
    const loadedProducts = getProducts();
    const featuredProducts = loadedProducts.filter(p => p.isFeatured || p.isPopular).slice(0, 8);
    setRealProducts(featuredProducts);
  }, []);

  const featuredProducts = realProducts.length > 0 ? realProducts : getFeaturedProducts(8);

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
      {/* Banner Section */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Миллионы товаров по отличным ценам
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Быстрая доставка • Гарантия качества • Удобные способы оплаты
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Products Section - показываем товары на мобильных вместо категорий */}
      <div className="block md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Популярные товары
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="Package"
              title="Пока нет товаров"
              description="Товары появятся здесь после того, как продавцы их добавят"
            />
          )}
        </div>
      </div>

      {/* Categories Section - скрыт на мобильных */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          <Link
            to="/electronics"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-brand-primary/20 group-hover:to-brand-secondary/20 transition-all duration-300">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Электроника</h3>
          </Link>

          <Link
            to="/clothing"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-brand-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-pink-200 group-hover:to-brand-accent/20 transition-all duration-300">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Одежда</h3>
          </Link>

          <Link
            to="/home-garden"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Дом и сад</h3>
          </Link>

          <Link
            to="/sport"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Спорт</h3>
          </Link>

          <Link
            to="/beauty"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Красота</h3>
          </Link>

          <Link
            to="/books"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Книги</h3>
          </Link>
        </div>

        {/* Popular Products Section - только для десктопа */}
        <div className="hidden md:block mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Популярные товары
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="Package"
              title="Пока нет товаров"
              description="Товары появятся здесь после того, как продавцы их добавят"
            />
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Быстрая доставка
            </h3>
            <p className="text-gray-600">
              Доставим ваш заказ в течение 1-3 дней
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Гарантия качества
            </h3>
            <p className="text-gray-600">
              Проверяем каждый товар перед отправкой
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Удобная оплата</h3>
            <p className="text-gray-600">Множество способов оплаты на выбор</p>
          </div>
        </div>
      </div>
    </div>
  );
}