import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Advertisement } from "@/types/advertising";
import { useState } from "react";

interface AdvertisementCardProps {
  advertisement: Advertisement;
}

export default function AdvertisementCard({
  advertisement,
}: AdvertisementCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    // Увеличиваем счетчик кликов
    const ads = JSON.parse(localStorage.getItem("advertisements") || "[]");
    const updatedAds = ads.map((ad: Advertisement) =>
      ad.id === advertisement.id ? { ...ad, clicks: ad.clicks + 1 } : ad,
    );
    localStorage.setItem("advertisements", JSON.stringify(updatedAds));

    // Переходим по ссылке если она есть
    if (advertisement.targetUrl) {
      window.open(advertisement.targetUrl, "_blank");
    }
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Бейдж "Реклама" */}
      <Badge className="absolute top-2 right-2 bg-orange-500 text-white z-10">
        Реклама
      </Badge>

      <CardContent className="p-0">
        <div className="relative">
          {/* Изображение */}
          <div className="w-full h-48 bg-gray-100 overflow-hidden">
            <img
              src={advertisement.image}
              alt={advertisement.title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>

          {/* Контент */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {advertisement.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {advertisement.description}
            </p>

            {/* Статистика */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>👁 {advertisement.views}</span>
                <span>👆 {advertisement.clicks}</span>
              </div>
              <div className="text-xs text-gray-400">
                {advertisement.targetUrl ? "Перейти" : "Реклама"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
