import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Advertisement, ADVERTISING_PLANS } from "@/types/advertisement";

export default function AdvertisingAdminPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    expired: 0,
    totalRevenue: 0,
    totalViews: 0,
    totalClicks: 0,
    averageCTR: 0,
  });

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      const storedAds = localStorage.getItem("advertisements");
      if (storedAds) {
        const ads = JSON.parse(storedAds);
        setAdvertisements(ads);
        calculateStats(ads);
      }
    } catch (error) {
      console.error("Error loading advertisements:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ads: Advertisement[]) => {
    const now = new Date();
    const active = ads.filter(
      (ad) => ad.status === "active" && new Date(ad.endDate) > now,
    );
    const pending = ads.filter((ad) => ad.status === "pending");
    const expired = ads.filter(
      (ad) => ad.status === "active" && new Date(ad.endDate) <= now,
    );

    const totalRevenue = ads.reduce((sum, ad) => sum + ad.price, 0);
    const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0);
    const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
    const averageCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

    setStats({
      total: ads.length,
      active: active.length,
      pending: pending.length,
      expired: expired.length,
      totalRevenue,
      totalViews,
      totalClicks,
      averageCTR,
    });
  };

  const handleStatusChange = (
    adId: string,
    newStatus: "active" | "paused" | "rejected",
  ) => {
    const updatedAds = advertisements.map((ad) =>
      ad.id === adId ? { ...ad, status: newStatus } : ad,
    );
    setAdvertisements(updatedAds);
    localStorage.setItem("advertisements", JSON.stringify(updatedAds));
    calculateStats(updatedAds);

    toast({
      title: "Статус обновлен",
      description: `Реклама ${newStatus === "active" ? "активирована" : newStatus === "paused" ? "приостановлена" : "отклонена"}`,
    });
  };

  const handleDelete = (adId: string) => {
    const updatedAds = advertisements.filter((ad) => ad.id !== adId);
    setAdvertisements(updatedAds);
    localStorage.setItem("advertisements", JSON.stringify(updatedAds));
    calculateStats(updatedAds);

    toast({
      title: "Реклама удалена",
      description: "Рекламное объявление было удалено",
    });
  };

  const filteredAds = advertisements.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (ad: Advertisement) => {
    const now = new Date();
    const isExpired = new Date(ad.endDate) <= now;

    if (isExpired && ad.status === "active") {
      return <Badge variant="secondary">Истекла</Badge>;
    }

    switch (ad.status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Активна
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">На модерации</Badge>;
      case "paused":
        return <Badge variant="outline">Приостановлена</Badge>;
      case "rejected":
        return <Badge variant="destructive">Отклонена</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Управление рекламой
          </h1>
          <p className="text-gray-600">
            Модерация и статистика рекламных объявлений
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={loadAdvertisements} variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего объявлений</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Icon name="FileText" size={24} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <Icon name="CheckCircle" size={24} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">На модерации</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Icon name="Clock" size={24} className="text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Истекших</p>
                <p className="text-2xl font-bold text-gray-600">
                  {stats.expired}
                </p>
              </div>
              <Icon name="Calendar" size={24} className="text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общая выручка</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <Icon name="DollarSign" size={24} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Просмотры</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
              <Icon name="Eye" size={24} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Клики</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.totalClicks.toLocaleString()}
                </p>
              </div>
              <Icon name="MousePointer" size={24} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CTR</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.averageCTR.toFixed(2)}%
                </p>
              </div>
              <Icon name="TrendingUp" size={24} className="text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search">Поиск</Label>
              <Input
                id="search"
                placeholder="Поиск по названию или описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">На модерации</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="paused">Приостановленные</SelectItem>
                  <SelectItem value="rejected">Отклоненные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advertisements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Рекламные объявления ({filteredAds.length})</CardTitle>
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
                {filteredAds.length === 0 ? (
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
                  filteredAds.map((ad) => (
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
                      <TableCell>{getStatusBadge(ad)}</TableCell>
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
                        <div className="flex flex-col space-y-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedAd(ad)}
                              >
                                <Icon name="Eye" size={16} className="mr-1" />
                                Просмотр
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Детали рекламы</DialogTitle>
                              </DialogHeader>
                              {selectedAd && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <img
                                        src={selectedAd.image}
                                        alt={selectedAd.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <h3 className="font-bold text-lg">
                                        {selectedAd.title}
                                      </h3>
                                      <p className="text-gray-600">
                                        {selectedAd.description}
                                      </p>
                                      <div className="space-y-1">
                                        <p>
                                          <strong>Заказчик:</strong>{" "}
                                          {selectedAd.advertiserName}
                                        </p>
                                        <p>
                                          <strong>Email:</strong>{" "}
                                          {selectedAd.advertiserEmail}
                                        </p>
                                        <p>
                                          <strong>Тариф:</strong>{" "}
                                          {
                                            ADVERTISING_PLANS.find(
                                              (p) =>
                                                p.days === selectedAd.duration,
                                            )?.name
                                          }
                                        </p>
                                        <p>
                                          <strong>Цена:</strong>{" "}
                                          {formatCurrency(selectedAd.price)}
                                        </p>
                                        <p>
                                          <strong>Статус:</strong>{" "}
                                          {getStatusBadge(selectedAd)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-blue-600">
                                        {selectedAd.views}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Просмотры
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-green-600">
                                        {selectedAd.clicks}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Клики
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-orange-600">
                                        {selectedAd.views > 0
                                          ? (
                                              (selectedAd.clicks /
                                                selectedAd.views) *
                                              100
                                            ).toFixed(1)
                                          : 0}
                                        %
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        CTR
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-purple-600">
                                        {formatCurrency(selectedAd.price)}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Доход
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {ad.status === "pending" && (
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:bg-green-50"
                                onClick={() =>
                                  handleStatusChange(ad.id, "active")
                                }
                              >
                                <Icon name="Check" size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() =>
                                  handleStatusChange(ad.id, "rejected")
                                }
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            </div>
                          )}

                          {ad.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-yellow-600 hover:bg-yellow-50"
                              onClick={() =>
                                handleStatusChange(ad.id, "paused")
                              }
                            >
                              <Icon name="Pause" size={16} className="mr-1" />
                              Пауза
                            </Button>
                          )}

                          {ad.status === "paused" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:bg-green-50"
                              onClick={() =>
                                handleStatusChange(ad.id, "active")
                              }
                            >
                              <Icon name="Play" size={16} className="mr-1" />
                              Запуск
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(ad.id)}
                          >
                            <Icon name="Trash2" size={16} className="mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
