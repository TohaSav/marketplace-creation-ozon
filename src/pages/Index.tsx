import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB Титановый",
    price: 119999,
    originalPrice: 129999,
    discount: 8,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 1247,
    seller: "Apple Store",
    isVerified: true,
    bonusPercent: 5,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 512GB Черный",
    price: 94999,
    originalPrice: 109999,
    discount: 14,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 892,
    seller: "Samsung Official",
    isVerified: true,
    bonusPercent: 3,
  },
  {
    id: 3,
    title: 'MacBook Air M3 13" 256GB Space Gray',
    price: 109999,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 1543,
    seller: "Apple Store",
    isVerified: true,
    bonusPercent: 7,
  },
  {
    id: 4,
    title: "AirPods Pro 2-го поколения с чехлом MagSafe",
    price: 24999,
    originalPrice: 27999,
    discount: 11,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 2156,
    seller: "Apple Store",
    isVerified: true,
    bonusPercent: 4,
  },
  {
    id: 5,
    title: "Sony PlayStation 5 Slim 1TB",
    price: 54999,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 987,
    seller: "Sony Official",
    isVerified: true,
    bonusPercent: 2,
  },
  {
    id: 6,
    title: "Nike Air Max 270 Black/White",
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 654,
    seller: "Nike Store",
    isVerified: true,
    bonusPercent: 8,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Добро пожаловать в Calibre Store
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Миллионы товаров от проверенных продавцов
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Электроника",
                "Одежда",
                "Дом и сад",
                "Спорт",
                "Красота",
                "Автотовары",
              ].map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Рекомендуем для вас
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Показать ещё товары
          </button>
        </div>
      </div>
    </div>
  );
}
