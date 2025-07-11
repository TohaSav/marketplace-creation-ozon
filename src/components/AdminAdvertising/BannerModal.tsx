import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { AdvertisingBanner, BannerStatus } from "@/types/advertising";

interface BannerModalProps {
  banner: AdvertisingBanner | null;
  onClose: () => void;
}

export default function BannerModal({ banner, onClose }: BannerModalProps) {
  if (!banner) return null;

  const getStatusColor = (status: BannerStatus) => {
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

  const getStatusText = (status: BannerStatus) => {
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

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="Store" size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {banner.shopName}
              </h2>
              <p className="text-gray-600">Детальный просмотр баннера</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full w-10 h-10 p-0"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={banner.bannerUrl}
              alt={banner.shopName}
              className="w-full h-auto max-h-96 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge
                className={getStatusColor(banner.status)}
                variant="secondary"
              >
                {getStatusText(banner.status)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="User" size={20} className="mr-2 text-blue-600" />
                  Информация о продавце
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Продавец
                  </label>
                  <p className="text-gray-900">{banner.sellerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    ID продавца
                  </label>
                  <p className="text-gray-900 font-mono text-sm">
                    {banner.sellerId}
                  </p>
                </div>
                {banner.contactInfo && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Контакты
                    </label>
                    <p className="text-gray-900">{banner.contactInfo}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon
                    name="Settings"
                    size={20}
                    className="mr-2 text-green-600"
                  />
                  Параметры рекламы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Длительность
                  </label>
                  <p className="text-gray-900">{banner.duration} дней</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Стоимость
                  </label>
                  <p className="text-gray-900 font-semibold text-green-600">
                    {banner.price.toLocaleString()} ₽
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Создано
                  </label>
                  <p className="text-gray-900">
                    {new Date(banner.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Истекает
                  </label>
                  <p
                    className={`font-medium ${
                      isExpired(banner.expiresAt)
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {new Date(banner.expiresAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {banner.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon
                    name="FileText"
                    size={20}
                    className="mr-2 text-purple-600"
                  />
                  Описание
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {banner.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
