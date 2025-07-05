import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { statusSyncManager, StatusSyncEvent } from "@/utils/statusSync";
import { useAuth } from "@/context/AuthContext";

export default function SellerStatusAlert() {
  const { user } = useAuth();
  const [currentStatus, setCurrentStatus] = useState(user?.status);
  const [moderationComment, setModerationComment] = useState(
    user?.moderationComment,
  );
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!user || user.userType !== "seller") return;

    // Подписываемся на изменения статуса
    const unsubscribe = statusSyncManager.subscribe(
      (event: StatusSyncEvent) => {
        if (event.sellerId === user.id) {
          setCurrentStatus(event.newStatus);
          setModerationComment(event.moderationComment);
          setShowAlert(true);
        }
      },
    );

    return unsubscribe;
  }, [user?.id]);

  const getAlertConfig = () => {
    switch (currentStatus) {
      case "active":
        return {
          variant: "default" as const,
          icon: "CheckCircle",
          title: "🎉 Поздравляем! Ваш профиль подтвержден",
          description:
            "Теперь вы можете полноценно пользоваться всеми возможностями платформы продавца.",
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800",
        };
      case "revision":
        return {
          variant: "destructive" as const,
          icon: "AlertTriangle",
          title: "📝 Требуется доработка профиля",
          description:
            moderationComment ||
            "Администратор запросил доработку вашего профиля.",
          bgColor: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800",
        };
      case "blocked":
        return {
          variant: "destructive" as const,
          icon: "XCircle",
          title: "🚫 Ваш профиль заблокирован",
          description:
            moderationComment ||
            "Обратитесь в службу поддержки для получения дополнительной информации.",
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-800",
        };
      case "pending":
        return {
          variant: "default" as const,
          icon: "Clock",
          title: "⏳ Ваш профиль на модерации",
          description:
            "Ожидайте, администратор рассмотрит вашу заявку в ближайшее время.",
          bgColor: "bg-blue-50 border-blue-200",
          textColor: "text-blue-800",
        };
      default:
        return null;
    }
  };

  const config = getAlertConfig();

  if (!user || user.userType !== "seller" || !showAlert || !config) {
    return null;
  }

  return (
    <Alert className={`${config.bgColor} ${config.textColor} mb-6`}>
      <Icon name={config.icon as any} size={16} />
      <AlertDescription>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-semibold text-sm mb-1">{config.title}</div>
            <div className="text-sm">{config.description}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlert(false)}
            className="h-6 w-6 p-0 hover:bg-white/20"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
