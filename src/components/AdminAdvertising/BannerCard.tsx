import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  AdvertisingBanner,
  BannerActions,
  BannerStatus,
} from "@/types/advertising";

interface BannerCardProps {
  banner: AdvertisingBanner;
  actions: BannerActions;
}

export default function BannerCard({ banner, actions }: BannerCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-md">
      <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="Store" size={20} className="text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">
                {banner.shopName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <Icon name="User" size={14} className="mr-1" />
                {banner.sellerName}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(banner.status)} variant="secondary">
            {getStatusText(banner.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative group">
          <img
            src={banner.bannerUrl}
            alt={banner.shopName}
            className="w-full h-40 object-cover rounded-lg cursor-pointer transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg"
            onClick={() => actions.onView(banner)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
          <div className="absolute bottom-3 left-3 text-white">
            <p className="font-semibold text-sm">{banner.shopName}</p>
            <p className="text-xs opacity-90">Нажмите для просмотра</p>
          </div>
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Icon name="Eye" size={16} className="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <Icon name="Calendar" size={14} className="mr-1" />
              Длительность
            </div>
            <p className="font-semibold text-gray-900">
              {banner.duration} дней
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center text-green-600 mb-1">
              <Icon name="DollarSign" size={14} className="mr-1" />
              Стоимость
            </div>
            <p className="font-semibold text-green-900">
              {banner.price.toLocaleString()} ₽
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center text-blue-600 mb-1">
              <Icon name="Plus" size={14} className="mr-1" />
              Создано
            </div>
            <p className="font-semibold text-blue-900">
              {new Date(banner.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div
            className={`rounded-lg p-3 ${
              isExpired(banner.expiresAt) ? "bg-red-50" : "bg-orange-50"
            }`}
          >
            <div
              className={`flex items-center mb-1 ${
                isExpired(banner.expiresAt) ? "text-red-600" : "text-orange-600"
              }`}
            >
              <Icon name="Clock" size={14} className="mr-1" />
              Истекает
            </div>
            <p
              className={`font-semibold ${
                isExpired(banner.expiresAt) ? "text-red-900" : "text-orange-900"
              }`}
            >
              {new Date(banner.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {banner.description && (
          <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
            <p className="text-sm text-blue-800 italic">
              <Icon name="Quote" size={14} className="inline mr-1" />"
              {banner.description}"
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {banner.status === "active" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.onPause(banner.id)}
              className="flex-1 hover:bg-yellow-50 hover:border-yellow-300"
            >
              <Icon name="Pause" size={14} className="mr-1" />
              Приостановить
            </Button>
          )}

          {banner.status === "paused" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => actions.onResume(banner.id)}
              className="flex-1 hover:bg-green-50 hover:border-green-300"
            >
              <Icon name="Play" size={14} className="mr-1" />
              Возобновить
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="hover:bg-red-600"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить рекламу?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Баннер "{banner.shopName}" будет
                  полностью удален из системы.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={() => actions.onDelete(banner.id)}>
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
