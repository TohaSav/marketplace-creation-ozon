import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import SellerModerationModal from "@/components/admin-dashboard/SellerModerationModal";

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  status: "active" | "pending" | "blocked" | "revision" | "resubmitted";
  joinDate: string;
  productsCount: number;
  totalSales: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "blocked":
      return "bg-red-100 text-red-800";
    case "revision":
      return "bg-orange-100 text-orange-800";
    case "resubmitted":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Активен";
    case "pending":
      return "На модерации";
    case "blocked":
      return "Заблокирован";
    case "revision":
      return "На доработке";
    case "resubmitted":
      return "Повторно подано";
    default:
      return "Неизвестно";
  }
};

export default function SellersTab() {
  const { sellers, reloadUsers } = useAuth();
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Перезагружаем данные продавцов при монтировании компонента
  useEffect(() => {
    reloadUsers();
  }, [reloadUsers]);

  // Отображаем только зарегистрированных продавцов
  const allSellers = sellers.map((seller) => ({
    id: seller.id.toString(),
    name: seller.name,
    email: seller.email,
    phone: seller.phone || "",
    shopName: seller.shopName || "Без названия",
    status: seller.status || "pending",
    joinDate: seller.joinDate || new Date().toISOString().split("T")[0],
    productsCount: 0,
    totalSales: 0,
    ...seller, // Передаем все данные продавца
  }));

  // Фильтруем новых продавцов
  const pendingSellers = allSellers.filter(
    (seller) => seller.status === "pending",
  );
  const activeSellers = allSellers.filter(
    (seller) => seller.status !== "pending",
  );

  const handleViewSeller = (seller: any) => {
    setSelectedSeller(seller);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Новые продавцы */}
      {pendingSellers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" size={20} className="text-yellow-600" />
              Новые продавцы ({pendingSellers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Продавец</TableHead>
                  <TableHead>Магазин</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSellers.map((seller) => (
                  <TableRow key={seller.id}>
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
                      <div className="text-sm">
                        <div>{seller.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(seller.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSeller(seller)}
                        className="text-blue-600"
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Проверить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Все продавцы */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Store" size={20} />
            Все продавцы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Продавец</TableHead>
                <TableHead>Магазин</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Товары</TableHead>
                <TableHead>Продажи</TableHead>
                <TableHead>Дата регистрации</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSellers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <Icon
                        name="Store"
                        size={48}
                        className="text-gray-400 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Пока нет продавцов
                      </h3>
                      <p className="text-gray-500">
                        Продавцы будут отображаться здесь после регистрации
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                allSellers.map((seller) => (
                  <TableRow key={seller.id}>
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
                      <div className="text-sm">
                        <div>{seller.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(seller.status)}>
                        {getStatusText(seller.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{seller.productsCount}</TableCell>
                    <TableCell>
                      {seller.totalSales.toLocaleString()} ₽
                    </TableCell>
                    <TableCell>
                      {new Date(seller.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewSeller(seller)}
                        >
                          <Icon name="Eye" size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} />
                        </Button>
                        {seller.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600"
                            onClick={() => handleViewSeller(seller)}
                          >
                            <Icon name="Check" size={14} />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <Icon name="Ban" size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Модальное окно модерации */}
      <SellerModerationModal
        seller={selectedSeller}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSeller(null);
        }}
      />
    </div>
  );
}
