import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Seller } from "@/types/seller";
import {
  formatCurrency,
  formatDate,
  getStatusBadge,
} from "@/utils/sellerUtils";

interface SellersTableProps {
  sellers: Seller[];
  onView: (seller: Seller) => void;
  onEdit: (seller: Seller) => void;
  onBlock: (seller: Seller) => void;
  onModerate?: (seller: Seller) => void;
}

const SellersTable: React.FC<SellersTableProps> = ({
  sellers,
  onView,
  onEdit,
  onBlock,
  onModerate,
}) => {
  return (
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
                <TableRow
                  key={seller.id}
                  className={`hover:bg-gray-50 ${
                    seller.status === "revision" ? "bg-yellow-50" : ""
                  }`}
                >
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
                  <TableCell>{formatDate(seller.registrationDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {seller.status === "pending" ||
                      seller.status === "revision" ? (
                        onModerate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onModerate(seller)}
                            className="h-8 w-8 p-0 hover:bg-blue-100"
                            title="Проверить"
                          >
                            <Icon
                              name="Shield"
                              size={16}
                              className="text-blue-600"
                            />
                          </Button>
                        )
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(seller)}
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
                            onClick={() => onEdit(seller)}
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
                            onClick={() => onBlock(seller)}
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
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SellersTable;
