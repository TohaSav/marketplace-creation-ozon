import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { statusSyncManager, StatusSyncEvent } from "@/utils/statusSync";

interface SellerStatusBadgeProps {
  sellerId: number;
  status: "active" | "pending" | "blocked" | "revision";
  className?: string;
  showIcon?: boolean;
}

export default function SellerStatusBadge({
  sellerId,
  status: initialStatus,
  className,
  showIcon = true,
}: SellerStatusBadgeProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    // Подписываемся на изменения статуса
    const unsubscribe = statusSyncManager.subscribe(
      (event: StatusSyncEvent) => {
        if (event.sellerId === sellerId) {
          setStatus(event.newStatus);
        }
      },
    );

    return unsubscribe;
  }, [sellerId]);

  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return {
          text: "Подтвержден",
          className: "bg-green-100 text-green-800 border-green-300",
          icon: "CheckCircle",
        };
      case "pending":
        return {
          text: "На модерации",
          className: "bg-yellow-100 text-yellow-800 border-yellow-300",
          icon: "Clock",
        };
      case "blocked":
        return {
          text: "Заблокирован",
          className: "bg-red-100 text-red-800 border-red-300",
          icon: "XCircle",
        };
      case "revision":
        return {
          text: "Доработка",
          className: "bg-orange-100 text-orange-800 border-orange-300",
          icon: "Edit",
        };
      default:
        return {
          text: "Неизвестен",
          className: "bg-gray-100 text-gray-800 border-gray-300",
          icon: "HelpCircle",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} ${className}`}>
      {showIcon && (
        <Icon name={config.icon as any} size={12} className="mr-1" />
      )}
      {config.text}
    </Badge>
  );
}
