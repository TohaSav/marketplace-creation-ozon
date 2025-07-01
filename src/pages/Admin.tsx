import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface Shop {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: "active" | "inactive" | "expired";
  verified: boolean;
  daysRemaining: number;
  totalDays: number;
  createdAt: string;
  lastPayment: string;
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "Магазин электроники TechShop",
    owner: "Иван Петров",
    email: "ivan@techshop.ru",
    status: "active",
    verified: true,
    daysRemaining: 25,
    totalDays: 30,
    createdAt: "2024-06-01",
    lastPayment: "2024-06-15",
  },
  {
    id: "2",
    name: "Одежда и аксессуары StylePoint",
    owner: "Мария Сидорова",
    email: "maria@stylepoint.ru",
    status: "expired",
    verified: false,
    daysRemaining: 0,
    totalDays: 15,
    createdAt: "2024-05-20",
    lastPayment: "2024-05-20",
  },
  {
    id: "3",
    name: "Книжный мир BookWorld",
    owner: "Алексей Козлов",
    email: "alex@bookworld.ru",
    status: "inactive",
    verified: true,
    daysRemaining: 5,
    totalDays: 7,
    createdAt: "2024-06-10",
    lastPayment: "Не оплачено",
  },
];

export default function Admin() {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [activationDays, setActivationDays] = useState("30");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "inactive":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен";
      case "expired":
        return "Истёк";
      case "inactive":
        return "Неактивен";
      default:
        return "Неизвестен";
    }
  };

  const handleActivateShop = (shopId: string) => {
    const days = parseInt(activationDays);
    if (days <= 0) {
      toast({
        title: "Ошибка",
        description: "Количество дней должно быть больше 0",
        variant: "destructive",
      });
      return;
    }

    setShops((prev) =>
      prev.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              status: "active",
              daysRemaining: days,
              totalDays: days,
              lastPayment: new Date().toISOString().split("T")[0],
            }
          : shop,
      ),
    );

    toast({
      title: "Успешно",
      description: `Магазин активирован на ${days} дней`,
    });
  };

  const handleVerifyShop = (shopId: string, verified: boolean) => {
    setShops((prev) =>
      prev.map((shop) => (shop.id === shopId ? { ...shop, verified } : shop)),
    );

    toast({
      title: "Успешно",
      description: verified ? "Магазин верифицирован" : "Верификация снята",
    });
  };

  const handleExtendPeriod = (shopId: string, additionalDays: number) => {
    setShops((prev) =>
      prev.map((shop) =>
        shop.id === shopId
          ? {
              ...shop,
              daysRemaining: shop.daysRemaining + additionalDays,
              totalDays: shop.totalDays + additionalDays,
            }
          : shop,
      ),
    );

    toast({
      title: "Успешно",
      description: `Период продлён на ${additionalDays} дней`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">
            Управление магазинами, активация периодов и верификация
          </p>
        </div>

        <Tabs defaultValue="shops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shops">Управление магазинами</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="shops" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Список магазинов */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Store" size={20} />
                      Магазины ({shops.length})
                    </CardTitle>
                    <CardDescription>
                      Список всех зарегистрированных магазинов
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {shops.map((shop) => (
                      <div
                        key={shop.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedShop?.id === shop.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedShop(shop)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {shop.name}
                              {shop.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Icon
                                    name="BadgeCheck"
                                    size={12}
                                    className="mr-1"
                                  />
                                  Верифицирован
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {shop.owner}
                            </p>
                            <p className="text-xs text-gray-500">
                              {shop.email}
                            </p>
                          </div>
                          <Badge className={getStatusColor(shop.status)}>
                            {getStatusText(shop.status)}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Дней: {shop.daysRemaining} / {shop.totalDays}
                          </span>
                          <span className="text-gray-500">
                            Создан: {shop.createdAt}
                          </span>
                        </div>

                        {shop.status === "active" && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(shop.daysRemaining / shop.totalDays) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Панель управления */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Settings" size={20} />
                      Управление
                    </CardTitle>
                    <CardDescription>
                      {selectedShop
                        ? `Настройки для ${selectedShop.name}`
                        : "Выберите магазин для управления"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedShop ? (
                      <>
                        {/* Информация о магазине */}
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">
                              Статус
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={getStatusColor(selectedShop.status)}
                              >
                                {getStatusText(selectedShop.status)}
                              </Badge>
                              {selectedShop.verified && (
                                <Badge variant="secondary">
                                  <Icon
                                    name="BadgeCheck"
                                    size={12}
                                    className="mr-1"
                                  />
                                  Верифицирован
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">
                              Период работы
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {selectedShop.daysRemaining} из{" "}
                              {selectedShop.totalDays} дней
                            </p>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">
                              Последняя оплата
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {selectedShop.lastPayment}
                            </p>
                          </div>
                        </div>

                        <Separator />

                        {/* Активация периода */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Активировать период
                          </Label>
                          <div className="flex gap-2">
                            <Select
                              value={activationDays}
                              onValueChange={setActivationDays}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7 дней</SelectItem>
                                <SelectItem value="14">14 дней</SelectItem>
                                <SelectItem value="30">30 дней</SelectItem>
                                <SelectItem value="60">60 дней</SelectItem>
                                <SelectItem value="90">90 дней</SelectItem>
                                <SelectItem value="365">365 дней</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => handleActivateShop(selectedShop.id)}
                          >
                            <Icon name="Play" size={16} className="mr-2" />
                            Активировать бесплатно
                          </Button>
                        </div>

                        {/* Продление периода */}
                        {selectedShop.status === "active" && (
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Продлить период
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleExtendPeriod(selectedShop.id, 7)
                                }
                              >
                                +7 дней
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleExtendPeriod(selectedShop.id, 30)
                                }
                              >
                                +30 дней
                              </Button>
                            </div>
                          </div>
                        )}

                        <Separator />

                        {/* Верификация */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Верификация магазина
                          </Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {selectedShop.verified
                                ? "Верифицирован"
                                : "Не верифицирован"}
                            </span>
                            <Switch
                              checked={selectedShop.verified}
                              onCheckedChange={(checked) =>
                                handleVerifyShop(selectedShop.id, checked)
                              }
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Верифицированные магазины получают особый значок
                            доверия
                          </p>
                        </div>

                        <Separator />

                        {/* Дополнительные действия */}
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Icon name="Mail" size={16} className="mr-2" />
                            Отправить уведомление
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Icon name="FileText" size={16} className="mr-2" />
                            Просмотреть отчёты
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-12">
                        <Icon
                          name="MousePointer"
                          size={48}
                          className="mx-auto mb-4 opacity-50"
                        />
                        <p>Выберите магазин из списка для управления</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Всего магазинов
                  </CardTitle>
                  <Icon
                    name="Store"
                    size={16}
                    className="text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{shops.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Зарегистрировано на платформе
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Активные
                  </CardTitle>
                  <Icon
                    name="TrendingUp"
                    size={16}
                    className="text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {shops.filter((s) => s.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Работают сейчас
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Верифицированные
                  </CardTitle>
                  <Icon
                    name="BadgeCheck"
                    size={16}
                    className="text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {shops.filter((s) => s.verified).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Прошли проверку
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Истекшие
                  </CardTitle>
                  <Icon
                    name="AlertTriangle"
                    size={16}
                    className="text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {shops.filter((s) => s.status === "expired").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Требуют продления
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
