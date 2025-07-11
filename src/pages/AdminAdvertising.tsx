import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Фильтрация баннеров
  const filteredBanners = banners.filter((banner) => {
    const matchesSearch =
      banner.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || banner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Статистика
  const stats = {
    total: banners.length,
    active: banners.filter((b) => b.status === "active").length,
    paused: banners.filter((b) => b.status === "paused").length,
    expired: banners.filter((b) => b.status === "expired").length,
    pending: banners.filter((b) => b.status === "pending_payment").length,
    totalRevenue: banners.reduce((sum, b) => sum + b.price, 0),
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Управление рекламой
            </h1>
            <p className="text-gray-600 mt-2">
              Управляйте рекламными баннерами продавцов на главной странице
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Icon name="Target" size={20} className="mr-2" />
            {stats.total} баннеров
          </Badge>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="BarChart3" size={24} className="text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-900">Всего</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {stats.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Play" size={24} className="text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-900">Активные</p>
                  <p className="text-2xl font-bold text-green-900">
                    {stats.active}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Pause" size={24} className="text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-yellow-900">Пауза</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {stats.paused}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Clock" size={24} className="text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-red-900">Истекшие</p>
                  <p className="text-2xl font-bold text-red-900">
                    {stats.expired}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="DollarSign" size={24} className="text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-900">Доход</p>
                  <p className="text-xl font-bold text-purple-900">
                    {stats.totalRevenue.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Фильтры */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по магазину или продавцу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Фильтр по статусу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="paused">Приостановленные</SelectItem>
                  <SelectItem value="expired">Истекшие</SelectItem>
                  <SelectItem value="pending_payment">
                    Ожидают оплаты
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Список баннеров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanners.length === 0 && banners.length === 0 ? (
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
          ) : filteredBanners.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Icon
                name="Search"
                size={64}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ничего не найдено
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить поисковый запрос или фильтры
              </p>
            </div>
          ) : (
            filteredBanners.map((banner) => (
              <Card
                key={banner.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 border-0 shadow-md"
              >
                <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="Store"
                          size={20}
                          className="text-blue-600"
                        />
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
                    <Badge
                      className={getStatusColor(banner.status)}
                      variant="secondary"
                    >
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
                      onClick={() => setSelectedBanner(banner)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-semibold text-sm">{banner.shopName}</p>
                      <p className="text-xs opacity-90">
                        Нажмите для просмотра
                      </p>
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
                      className={`rounded-lg p-3 ${isExpired(banner.expiresAt) ? "bg-red-50" : "bg-orange-50"}`}
                    >
                      <div
                        className={`flex items-center mb-1 ${isExpired(banner.expiresAt) ? "text-red-600" : "text-orange-600"}`}
                      >
                        <Icon name="Clock" size={14} className="mr-1" />
                        Истекает
                      </div>
                      <p
                        className={`font-semibold ${isExpired(banner.expiresAt) ? "text-red-900" : "text-orange-900"}`}
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
                        onClick={() => pauseBanner(banner.id)}
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
                        onClick={() => resumeBanner(banner.id)}
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
                            Это действие нельзя отменить. Баннер "
                            {banner.shopName}" будет полностью удален из
                            системы.
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
                      {selectedBanner.shopName}
                    </h2>
                    <p className="text-gray-600">Детальный просмотр баннера</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBanner(null)}
                  className="hover:bg-gray-100 rounded-full w-10 h-10 p-0"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={selectedBanner.bannerUrl}
                    alt={selectedBanner.shopName}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={getStatusColor(selectedBanner.status)}
                      variant="secondary"
                    >
                      {getStatusText(selectedBanner.status)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon
                          name="User"
                          size={20}
                          className="mr-2 text-blue-600"
                        />
                        Информация о продавце
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Продавец
                        </label>
                        <p className="text-gray-900">
                          {selectedBanner.sellerName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          ID продавца
                        </label>
                        <p className="text-gray-900 font-mono text-sm">
                          {selectedBanner.sellerId}
                        </p>
                      </div>
                      {selectedBanner.contactInfo && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Контакты
                          </label>
                          <p className="text-gray-900">
                            {selectedBanner.contactInfo}
                          </p>
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
                        <p className="text-gray-900">
                          {selectedBanner.duration} дней
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Стоимость
                        </label>
                        <p className="text-gray-900 font-semibold text-green-600">
                          {selectedBanner.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Создано
                        </label>
                        <p className="text-gray-900">
                          {new Date(selectedBanner.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Истекает
                        </label>
                        <p
                          className={`font-medium ${isExpired(selectedBanner.expiresAt) ? "text-red-600" : "text-gray-900"}`}
                        >
                          {new Date(selectedBanner.expiresAt).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedBanner.description && (
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
                        {selectedBanner.description}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
