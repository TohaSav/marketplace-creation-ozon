export default function HeroBanner() {
  return (
    <div className="relative min-h-[400px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center min-h-[400px]">
        <div className="text-center text-white w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Миллионы товаров по отличным ценам
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
            Быстрая доставка • Гарантия качества • Удобные способы оплаты
          </p>
        </div>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  );
}