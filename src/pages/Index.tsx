import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTASection from "@/components/CTASection";

export default function Index() {
  // Баннеры для карусели
  const banners = [
    {
      id: 1,
      gradient: "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900",
    },
    {
      id: 2,
      gradient: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-600",
    },
    {
      id: 3,
      gradient: "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700",
    },
    {
      id: 4,
      gradient: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600",
    },
    {
      id: 5,
      gradient: "bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600",
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
    <div className="container mx-auto px-4 py-8">
      <HeroSection banners={banners} />

      <CategoriesSection categories={categories} />

      <ProductsSection title="Рекомендуемые товары" />

      <BenefitsSection />

      <CTASection />
    </div>
  );
}
