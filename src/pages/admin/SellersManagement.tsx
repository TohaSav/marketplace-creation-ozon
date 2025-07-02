import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "@/hooks/use-toast";

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registrationDate: string;
  status: "active" | "blocked" | "pending";
  totalOrders: number;
  revenue: number;
  rating: number;
  description: string;
}

const mockSellers: Seller[] = [
  {
    id: "1",
    name: "Алексей Петров",
    email: "alexey@example.com",
    phone: "+7 (999) 123-45-67",
    shopName: "Электроника Плюс",
    registrationDate: "2024-01-15",
    status: "active",
    totalOrders: 245,
    revenue: 892000,
    rating: 4.8,
    description: "Магазин электроники и гаджетов с широким ассортиментом",
  },
  {
    id: "2",
    name: "Мария Сидорова",
    email: "maria@example.com",
    phone: "+7 (888) 987-65-43",
    shopName: "Модный стиль",
    registrationDate: "2024-02-03",
    status: "active",
    totalOrders: 156,
    revenue: 534000,
    rating: 4.6,
    description: "Женская одежда и аксессуары высокого качества",
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    email: "dmitry@example.com",
    phone: "+7 (777) 555-33-22",
    shopName: "Спорт и здоровье",
    registrationDate: "2024-01-28",
    status: "blocked",
    totalOrders: 89,
    revenue: 267000,
    rating: 3.2,
    description: "Спортивные товары и товары для здоровья",
  },
  {
    id: "4",
    name: "Елена Васильева",
    email: "elena@example.com",
    phone: "+7 (666) 444-11-88",
    shopName: "Детский мир",
    registrationDate: "2024-03-10",
    status: "pending",
    totalOrders: 12,
    revenue: 45000,
    rating: 4.9,
    description: "Детские товары, игрушки и развивающие материалы",
  },
];

const SellersManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Seller | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: Seller["status"]) => {
    switch (status) {
      case "active":
        return { text: "Активен", className: "bg-green-100 text-green-800" };
      case "blocked":
        return { text: "Заблокирован", className: "bg-red-100 text-red-800" };
      case "pending":
        return {
          text: "На модерации",
          className: "bg-yellow-100 text-yellow-800",
        };
      default:
        return { text: "Неизвестно", className: "bg-gray-100 text-gray-800" };
    }
  };

  const handleView = (seller: Seller) => {
    setSelectedSeller(seller);
    setViewModalOpen(true);
  };

  const handleEdit = (seller: Seller) => {
    setSelectedSeller(seller);
    setEditForm({ ...seller });
    setEditModalOpen(true);
  };

  const handleBlock = (seller: Seller) => {
    setSelectedSeller(seller);
    setBlockModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setSellers(sellers.map((s) => (s.id === editForm.id ? editForm : s)));
      setEditModalOpen(false);
      setEditForm(null);
      toast({
        title: "Продавец обновлён",
        description: `Данные продавца ${editForm.name} успешно сохранены`,
      });
    }
  };

  const handleToggleBlock = () => {
    if (selectedSeller) {
      const newStatus =
        selectedSeller.status === "blocked" ? "active" : "blocked";
      setSellers(
        sellers.map((s) =>
          s.id === selectedSeller.id ? { ...s, status: newStatus } : s,
        ),
      );
      setBlockModalOpen(false);
      toast({
        title:
          newStatus === "blocked"
            ? "Продавец заблокирован"
            : "Продавец разблокирован",
        description: `${selectedSeller.name} теперь ${newStatus === "blocked" ? "заблокирован" : "активен"}`,
        variant: newStatus === "blocked" ? "destructive" : "default",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Icon name="Users" size={28} className="text-white" />
              </div>
              Управление продавцами
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Просмотр, редактирование и модерация продавцов на платформе.
              Управляйте статусами и контролируйте качество сервиса.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
            >
              Всего продавцов: {sellers.length}
            </Badge>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Store" size={20} />
              Список продавцов
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Продавец</TableHead>
                  <TableHead>Магазин</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Заказы</TableHead>
                  <TableHead>Выручка</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead className="text-center">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellers.map((seller) => {
                  const statusBadge = getStatusBadge(seller.status);
                  return (
                    <TableRow key={seller.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{seller.name}</div>
                          <div className="text-sm text-gray-500">
                            {seller.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {seller.shopName}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </TableCell>
                      <TableCell>{seller.totalOrders}</TableCell>
                      <TableCell>{formatCurrency(seller.revenue)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Icon
                            name="Star"
                            size={14}
                            className="text-yellow-500 fill-current"
                          />
                          {seller.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(seller.registrationDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(seller)}
                            className="h-8 w-8 p-0 hover:bg-blue-100"
                            title="Просмотр"
                          >
                            <Icon
                              name="Eye"
                              size={16}
                              className="text-blue-600"
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(seller)}
                            className="h-8 w-8 p-0 hover:bg-green-100"
                            title="Редактировать"
                          >
                            <Icon
                              name="Edit"
                              size={16}
                              className="text-green-600"
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBlock(seller)}
                            className="h-8 w-8 p-0 hover:bg-red-100"
                            title={
                              seller.status === "blocked"
                                ? "Разблокировать"
                                : "Заблокировать"
                            }
                          >
                            <Icon
                              name={
                                seller.status === "blocked"
                                  ? "UserCheck"
                                  : "UserX"
                              }
                              size={16}
                              className={
                                seller.status === "blocked"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Модальное окно просмотра */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name="Eye" size={20} />
                Информация о продавце
              </DialogTitle>
            </DialogHeader>
            {selectedSeller && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Имя
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedSeller.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <p className="text-lg">{selectedSeller.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Телефон
                    </Label>
                    <p className="text-lg">{selectedSeller.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Магазин
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedSeller.shopName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Статус
                    </Label>
                    <Badge
                      className={
                        getStatusBadge(selectedSeller.status).className
                      }
                    >
                      {getStatusBadge(selectedSeller.status).text}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Рейтинг
                    </Label>
                    <div className="flex items-center gap-1">
                      <Icon
                        name="Star"
                        size={16}
                        className="text-yellow-500 fill-current"
                      />
                      <span className="text-lg font-semibold">
                        {selectedSeller.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">
                      {selectedSeller.totalOrders}
                    </p>
                    <p className="text-sm text-blue-600">Заказов</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">
                      {formatCurrency(selectedSeller.revenue)}
                    </p>
                    <p className="text-sm text-green-600">Выручка</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-purple-700">
                      {formatDate(selectedSeller.registrationDate)}
                    </p>
                    <p className="text-sm text-purple-600">Дата регистрации</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Описание
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {selectedSeller.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Модальное окно редактирования */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon name="Edit" size={20} />
                Редактирование продавца
              </DialogTitle>
            </DialogHeader>
            {editForm && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopName">Название магазина</Label>
                    <Input
                      id="shopName"
                      value={editForm.shopName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, shopName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveEdit}>Сохранить изменения</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Модальное окно блокировки */}
        <Dialog open={blockModalOpen} onOpenChange={setBlockModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon
                  name="AlertTriangle"
                  size={20}
                  className="text-orange-500"
                />
                {selectedSeller?.status === "blocked"
                  ? "Разблокировать"
                  : "Заблокировать"}{" "}
                продавца
              </DialogTitle>
              <DialogDescription>
                {selectedSeller?.status === "blocked"
                  ? `Вы уверены, что хотите разблокировать продавца ${selectedSeller?.name}? Продавец снова сможет работать на платформе.`
                  : `Вы уверены, что хотите заблокировать продавца ${selectedSeller?.name}? Продавец не сможет принимать новые заказы.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setBlockModalOpen(false)}
              >
                Отмена
              </Button>
              <Button
                onClick={handleToggleBlock}
                variant={
                  selectedSeller?.status === "blocked"
                    ? "default"
                    : "destructive"
                }
              >
                {selectedSeller?.status === "blocked"
                  ? "Разблокировать"
                  : "Заблокировать"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default SellersManagement;
