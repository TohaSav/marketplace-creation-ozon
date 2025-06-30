import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/types/seller-dashboard.types";
import {
  formatCurrency,
  formatDate,
  getOrderStatusColor,
  getOrderStatusText,
} from "@/utils/seller-dashboard.utils";

interface OrderRowProps {
  order: Order;
  onProcess?: (orderId: string) => void;
  onMessage?: (orderId: string) => void;
}

export default function OrderRow({
  order,
  onProcess,
  onMessage,
}: OrderRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">#{order.id}</TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.product}</TableCell>
      <TableCell>{formatCurrency(order.amount)}</TableCell>
      <TableCell>
        <Badge className={getOrderStatusColor(order.status)}>
          {getOrderStatusText(order.status)}
        </Badge>
      </TableCell>
      <TableCell>{formatDate(order.date)}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onProcess?.(order.id)}
          >
            Обработать
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onMessage?.(order.id)}
          >
            <Icon name="MessageCircle" size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
