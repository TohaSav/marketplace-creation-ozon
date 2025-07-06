import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

interface HeroSectionProps {
  banners: Banner[];
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-96 md:h-[500px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}
            />
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
                  {banner.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg"
                >
                  Смотреть товары
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentBanner ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
