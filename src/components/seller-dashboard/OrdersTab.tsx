import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { Order } from "@/types/seller-dashboard.types";
import OrderRow from "./OrderRow";

interface OrdersTabProps {
  orders: Order[];
  onProcessOrder?: (orderId: string) => void;
  onMessageCustomer?: (orderId: string) => void;
}

export default function OrdersTab({
  orders,
  onProcessOrder,
  onMessageCustomer,
}: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Новые заказы</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="ShoppingCart" size={48} className="mx-auto mb-4" />
            <p>Новых заказов пока нет</p>
            <p className="text-sm mt-2">Заказы будут отображаться здесь</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№ Заказа</TableHead>
                <TableHead>Покупатель</TableHead>
                <TableHead>Товар</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onProcess={onProcessOrder}
                  onMessage={onMessageCustomer}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
