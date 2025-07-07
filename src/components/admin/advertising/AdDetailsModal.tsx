import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Advertisement, ADVERTISING_PLANS } from "@/types/advertising";
import AdStatusBadge from "./AdStatusBadge";

interface AdDetailsModalProps {
  ad: Advertisement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdDetailsModal({
  ad,
  isOpen,
  onClose,
}: AdDetailsModalProps) {
  if (!ad) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Детали рекламы</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">{ad.title}</h3>
              <p className="text-gray-600">{ad.description}</p>
              <div className="space-y-1">
                <p>
                  <strong>Заказчик:</strong> {ad.advertiserName}
                </p>
                <p>
                  <strong>Email:</strong> {ad.advertiserEmail}
                </p>
                <p>
                  <strong>Тариф:</strong>{" "}
                  {ADVERTISING_PLANS.find((p) => p.days === ad.duration)?.name}
                </p>
                <p>
                  <strong>Цена:</strong> {formatCurrency(ad.price)}
                </p>
                <p>
                  <strong>Статус:</strong> <AdStatusBadge ad={ad} />
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{ad.views}</p>
              <p className="text-sm text-gray-600">Просмотры</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{ad.clicks}</p>
              <p className="text-sm text-gray-600">Клики</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-sm text-gray-600">CTR</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(ad.price)}
              </p>
              <p className="text-sm text-gray-600">Доход</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
