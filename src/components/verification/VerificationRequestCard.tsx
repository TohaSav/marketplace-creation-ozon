import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { VerificationRequest, ReviewAction } from "@/types/verification";
import {
  checkVerificationRequirements,
  getStatusBadgeProps,
} from "@/utils/verificationUtils";
import RequirementsStatus from "./RequirementsStatus";
import ShopStatsDisplay from "./ShopStatsDisplay";

interface VerificationRequestCardProps {
  request: VerificationRequest;
  onReview?: (request: VerificationRequest, action: ReviewAction) => void;
  showActions?: boolean;
}

const VerificationRequestCard: React.FC<VerificationRequestCardProps> = ({
  request,
  onReview,
  showActions = false,
}) => {
  const requirementChecks = checkVerificationRequirements(request.requirements);
  const allRequirementsMet = requirementChecks.every((check) => check.met);
  const statusBadge = getStatusBadgeProps(request.status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{request.shopName}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {request.sellerName} • {request.sellerEmail}
            </p>
          </div>
          <Badge className={statusBadge.className}>{statusBadge.text}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Основная информация */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Дата подачи:</span>
            <p className="font-medium">{formatDate(request.submittedAt)}</p>
          </div>
          <div>
            <span className="text-gray-600">ID магазина:</span>
            <p className="font-medium font-mono">{request.shopId}</p>
          </div>
        </div>

        <Separator />

        {/* Статус требований */}
        <RequirementsStatus requirements={requirementChecks} />

        {/* Статистика магазина */}
        <ShopStatsDisplay stats={request.shopStats} />

        {/* Информация об отклонении */}
        {request.status === "rejected" && request.rejectionReason && (
          <div className="bg-red-50 p-3 rounded-lg">
            <h4 className="font-medium text-red-800 mb-1">
              Причина отклонения
            </h4>
            <p className="text-sm text-red-700">{request.rejectionReason}</p>
          </div>
        )}

        {/* Информация о рассмотрении */}
        {request.reviewedAt && (
          <div className="text-xs text-gray-500">
            Рассмотрена {formatDate(request.reviewedAt)} администратором{" "}
            {request.reviewedBy}
          </div>
        )}

        {/* Действия */}
        {showActions && onReview && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onReview(request, "approve")}
              className="bg-green-600 hover:bg-green-700"
              disabled={!allRequirementsMet}
            >
              <Icon name="CheckCircle" size={16} className="mr-1" />
              Одобрить
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onReview(request, "reject")}
            >
              <Icon name="XCircle" size={16} className="mr-1" />
              Отклонить
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationRequestCard;
