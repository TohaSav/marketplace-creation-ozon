import { Badge } from "@/components/ui/badge";
import { Advertisement } from "@/types/advertising";

interface AdStatusBadgeProps {
  ad: Advertisement;
}

export default function AdStatusBadge({ ad }: AdStatusBadgeProps) {
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
}
