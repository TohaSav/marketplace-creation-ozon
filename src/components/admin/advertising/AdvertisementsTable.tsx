import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { Advertisement, ADVERTISING_PLANS } from "@/types/advertising";
import AdStatusBadge from "./AdStatusBadge";
import AdActions from "./AdActions";

interface AdvertisementsTableProps {
  advertisements: Advertisement[];
  onViewDetails: (ad: Advertisement) => void;
  onStatusChange: (
    adId: string,
    newStatus: "active" | "paused" | "rejected",
  ) => void;
  onDelete: (adId: string) => void;
}

export default function AdvertisementsTable({
  advertisements,
  onViewDetails,
  onStatusChange,
  onDelete,
}: AdvertisementsTableProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Рекламные объявления ({advertisements.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Изображение</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Заказчик</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Тариф</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Период</TableHead>
                <TableHead>Статистика</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="text-gray-500">
                      <Icon
                        name="FileText"
                        size={48}
                        className="mx-auto mb-2 opacity-50"
                      />
                      <p>Нет рекламных объявлений</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                advertisements.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ad.title}</p>
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {ad.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{ad.advertiserName}</p>
                      <p className="text-sm text-gray-600">
                        {ad.advertiserEmail}
                      </p>
                    </TableCell>
                    <TableCell>
                      <AdStatusBadge ad={ad} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ADVERTISING_PLANS.find((p) => p.days === ad.duration)
                          ?.name || `${ad.duration} дней`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatCurrency(ad.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>Начало: {formatDate(ad.startDate)}</p>
                        <p>Конец: {formatDate(ad.endDate)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>👁️ {ad.views.toLocaleString()}</p>
                        <p>🖱️ {ad.clicks.toLocaleString()}</p>
                        <p>
                          CTR:{" "}
                          {ad.views > 0
                            ? ((ad.clicks / ad.views) * 100).toFixed(1)
                            : 0}
                          %
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <AdActions
                        ad={ad}
                        onViewDetails={onViewDetails}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
