import { useState, useEffect } from "react";

interface Banner {
  id: number;
  gradient: string;
}

interface HeroSectionProps {
  banners: Banner[];
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-[300px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 ${banner.gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="inline-block bg-black/20 px-3 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                  Реклама
                </div>
                <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg tracking-wide">
                  Реклама Магазинов
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentBanner
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
