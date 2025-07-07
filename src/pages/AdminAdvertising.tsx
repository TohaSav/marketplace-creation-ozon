import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export default function AdminAdvertising() {
  const [banners, setBanners] = useState<AdvertisingBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] =
    useState<AdvertisingBanner | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = () => {
    const allAdverts = JSON.parse(
      localStorage.getItem("advertising-requests") || "[]",
    );
    setBanners(allAdverts);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending_payment":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активна";
      case "paused":
        return "Приостановлена";
      case "expired":
        return "Истекла";
      case "pending_payment":
        return "Ожидает оплаты";
      default:
        return status;
    }
  };

  const pauseBanner = (id: number) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === id ? { ...banner, status: "paused" } : banner,
    );
    setBanners(updatedBanners);
    localStorage.setItem(
      "advertising-requests",
      JSON.stringify(updatedBanners),
    );
    toast({
      title: "Реклама приостановлена",
      description: "Баннер больше не показывается на главной странице",
    });
  };

  const resumeBanner = (id: number) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === id ? { ...banner, status: "active" } : banner,
    );
    setBanners(updatedBanners);
    localStorage.setItem(
      "advertising-requests",
      JSON.stringify(updatedBanners),
    );
    toast({
      title: "Реклама возобновлена",
      description: "Баннер снова показывается на главной странице",
    });
  };

  const deleteBanner = (id: number) => {
    const updatedBanners = banners.filter((banner) => banner.id !== id);
    setBanners(updatedBanners);
    localStorage.setItem(
      "advertising-requests",
      JSON.stringify(updatedBanners),
    );
    toast({
      title: "Реклама удалена",
      description: "Баннер был удален из системы",
      variant: "destructive",
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  // Автоматически помечаем истекшие баннеры
  useEffect(() => {
    const checkExpiredBanners = () => {
      const updatedBanners = banners.map((banner) => {
        if (banner.status === "active" && isExpired(banner.expiresAt)) {
          return { ...banner, status: "expired" };
        }
        return banner;
      });

      const hasExpired = updatedBanners.some(
        (banner, index) =>
          banner.status === "expired" && banners[index].status !== "expired",
      );

      if (hasExpired) {
        setBanners(updatedBanners);
        localStorage.setItem(
          "advertising-requests",
          JSON.stringify(updatedBanners),
        );
      }
    };

    const interval = setInterval(checkExpiredBanners, 60000); // Проверяем каждую минуту
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Управление рекламой
        </h1>
        <p className="text-gray-600">
          Управляйте рекламными баннерами продавцов на главной странице
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Icon
              name="Megaphone"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Нет рекламных баннеров
            </h3>
            <p className="text-gray-600">
              Рекламные баннеры будут отображаться здесь после их создания
              продавцами
            </p>
          </div>
        ) : (
          banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{banner.shopName}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {banner.sellerName}
                    </p>
                  </div>
                  <Badge className={getStatusColor(banner.status)}>
                    {getStatusText(banner.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <img
                    src={banner.bannerUrl}
                    alt={banner.shopName}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedBanner(banner)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    <p className="font-medium">{banner.shopName}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Длительность:</span>
                    <span className="font-medium">{banner.duration} дней</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость:</span>
                    <span className="font-medium">{banner.price} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Создано:</span>
                    <span className="font-medium">
                      {new Date(banner.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Истекает:</span>
                    <span
                      className={`font-medium ${isExpired(banner.expiresAt) ? "text-red-600" : ""}`}
                    >
                      {new Date(banner.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {banner.description && (
                  <p className="text-sm text-gray-600 italic">
                    "{banner.description}"
                  </p>
                )}

                <div className="flex gap-2">
                  {banner.status === "active" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => pauseBanner(banner.id)}
                      className="flex-1"
                    >
                      <Icon name="Pause" size={14} className="mr-1" />
                      Приостановить
                    </Button>
                  )}

                  {banner.status === "paused" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resumeBanner(banner.id)}
                      className="flex-1"
                    >
                      <Icon name="Play" size={14} className="mr-1" />
                      Возобновить
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Icon name="Trash2" size={14} className="mr-1" />
                        Удалить
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить рекламу?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Это действие нельзя отменить. Баннер "
                          {banner.shopName}" будет полностью удален из системы.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteBanner(banner.id)}
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Модальное окно для просмотра баннера */}
      {selectedBanner && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBanner(null)}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedBanner.shopName}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBanner(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <img
              src={selectedBanner.bannerUrl}
              alt={selectedBanner.shopName}
              className="w-full h-auto rounded-lg mb-4"
            />
            <div className="space-y-2 text-sm">
              <p>
                <strong>Продавец:</strong> {selectedBanner.sellerName}
              </p>
              <p>
                <strong>Длительность:</strong> {selectedBanner.duration} дней
              </p>
              <p>
                <strong>Стоимость:</strong> {selectedBanner.price} ₽
              </p>
              <p>
                <strong>Статус:</strong> {getStatusText(selectedBanner.status)}
              </p>
              <p>
                <strong>Создано:</strong>{" "}
                {new Date(selectedBanner.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Истекает:</strong>{" "}
                {new Date(selectedBanner.expiresAt).toLocaleString()}
              </p>
              {selectedBanner.description && (
                <p>
                  <strong>Описание:</strong> {selectedBanner.description}
                </p>
              )}
              {selectedBanner.contactInfo && (
                <p>
                  <strong>Контакты:</strong> {selectedBanner.contactInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
