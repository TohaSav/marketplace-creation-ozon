import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Advertisement } from "@/types/advertising";

interface AdActionsProps {
  ad: Advertisement;
  onViewDetails: (ad: Advertisement) => void;
  onStatusChange: (
    adId: string,
    newStatus: "active" | "paused" | "rejected",
  ) => void;
  onDelete: (adId: string) => void;
}

export default function AdActions({
  ad,
  onViewDetails,
  onStatusChange,
  onDelete,
}: AdActionsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Button variant="outline" size="sm" onClick={() => onViewDetails(ad)}>
        <Icon name="Eye" size={16} className="mr-1" />
        Просмотр
      </Button>

      {ad.status === "pending" && (
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 hover:bg-green-50"
            onClick={() => onStatusChange(ad.id, "active")}
          >
            <Icon name="Check" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-50"
            onClick={() => onStatusChange(ad.id, "rejected")}
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
          onClick={() => onStatusChange(ad.id, "paused")}
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
          onClick={() => onStatusChange(ad.id, "active")}
        >
          <Icon name="Play" size={16} className="mr-1" />
          Запуск
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        className="text-red-600 hover:bg-red-50"
        onClick={() => onDelete(ad.id)}
      >
        <Icon name="Trash2" size={16} className="mr-1" />
        Удалить
      </Button>
    </div>
  );
}
