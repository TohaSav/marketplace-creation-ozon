import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Баннеры для карусели
  const banners = [
    {
      id: 1,
      title: "Черная пятница",
      subtitle: "Скидки до 90% на всё",
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=500&fit=crop",
      color: "from-slate-900 via-purple-900 to-slate-900",
    },
    {
      id: 2,
      title: "Суперцены",
      subtitle: "Топ товары от 99₽",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop",
      color: "from-orange-400 via-red-500 to-pink-600",
    },
    {
      id: 3,
      title: "Новинки техники",
      subtitle: "iPhone 15, MacBook и многое другое",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=500&fit=crop",
      color: "from-blue-500 via-indigo-600 to-purple-700",
    },
    {
      id: 4,
      title: "Быстрая доставка",
      subtitle: "Заказ сегодня — получи завтра",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=500&fit=crop",
      color: "from-green-400 via-emerald-500 to-teal-600",
    },
    {
      id: 5,
      title: "Премиум бренды",
      subtitle: "Оригинальные товары с гарантией",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      color: "from-pink-400 via-purple-500 to-indigo-600",
    },
  ];

  // Категории товаров
  const categories = [
    {
      name: "Электроника",
      icon: "Smartphone",
      color: "bg-blue-500",
      slug: "electronics",
    },
    { name: "Одежда", icon: "Shirt", color: "bg-pink-500", slug: "clothing" },
    { name: "Дом и сад", icon: "Home", color: "bg-green-500", slug: "home" },
    { name: "Спорт", icon: "Dumbbell", color: "bg-orange-500", slug: "sport" },
    {
      name: "Красота",
      icon: "Sparkles",
      color: "bg-purple-500",
      slug: "beauty",
    },
    { name: "Авто", icon: "Car", color: "bg-red-500", slug: "auto" },
    { name: "Книги", icon: "BookOpen", color: "bg-indigo-500", slug: "books" },
    { name: "Игрушки", icon: "Gamepad2", color: "bg-yellow-500", slug: "toys" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <HeroSection banners={banners} />

        <CategoriesSection categories={categories} />

        <ProductsSection
          title="Рекомендуемые товары"
          products={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />

        <BenefitsSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
