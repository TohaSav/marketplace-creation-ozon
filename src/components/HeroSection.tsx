import { useState, useEffect } from "react";

interface Banner {
  id: number;
  gradient: string;
}

interface AdvertisingBanner {
  id: number;
  sellerId: string;
  sellerName: string;
  shopName: string;
  bannerUrl: string;
  description: string;
  duration: number;
  contactInfo: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  price: number;
}

interface HeroSectionProps {
  banners: Banner[];
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [advertisingBanners, setAdvertisingBanners] = useState<
    AdvertisingBanner[]
  >([]);

  // Загружаем активные рекламные баннеры
  useEffect(() => {
    const loadAdvertisingBanners = () => {
      const allAdverts = JSON.parse(
        localStorage.getItem("advertising-requests") || "[]",
      );
      const activeAdverts = allAdverts.filter(
        (ad: AdvertisingBanner) =>
          ad.status === "active" && new Date(ad.expiresAt) > new Date(),
      );
      setAdvertisingBanners(activeAdverts);
    };

    loadAdvertisingBanners();
    // Проверяем каждые 10 секунд на новые баннеры
    const interval = setInterval(loadAdvertisingBanners, 10000);
    return () => clearInterval(interval);
  }, []);

  // Объединяем обычные баннеры и рекламные баннеры
  const allBanners = [...banners, ...advertisingBanners];

  useEffect(() => {
    if (allBanners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % allBanners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allBanners.length]);

  if (allBanners.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-[300px]">
        {allBanners.map((banner, index) => {
          const isAdvertising = "shopName" in banner;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              {isAdvertising ? (
                // Рекламный баннер
                <div className="absolute inset-0">
                  <img
                    src={(banner as AdvertisingBanner).bannerUrl}
                    alt={(banner as AdvertisingBanner).shopName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="inline-block bg-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      Реклама
                    </div>
                    <h2 className="text-2xl font-bold">
                      {(banner as AdvertisingBanner).shopName}
                    </h2>
                    {(banner as AdvertisingBanner).description && (
                      <p className="text-sm opacity-90 mt-1">
                        {(banner as AdvertisingBanner).description}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                // Обычный баннер
                <>
                  <div
                    className={`absolute inset-0 ${(banner as Banner).gradient}`}
                  />
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
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {allBanners.map((_, index) => (
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
