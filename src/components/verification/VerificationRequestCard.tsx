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
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-full shadow-md">
              <Icon name="Store" size={24} className="text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {request.shopName}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <Icon name="User" size={14} />
                {request.sellerName}
                <span className="text-gray-400">•</span>
                <Icon name="Mail" size={14} />
                {request.sellerEmail}
              </p>
            </div>
          </div>
          <Badge
            className={`${statusBadge.className} px-3 py-1 text-sm font-medium`}
          >
            {statusBadge.text}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Основная информация */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Дата подачи
              </span>
            </div>
            <p className="font-semibold text-gray-900">
              {formatDate(request.submittedAt)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Hash" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                ID магазина
              </span>
            </div>
            <p className="font-semibold font-mono text-gray-900">
              {request.shopId}
            </p>
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
          <div className="flex gap-3 pt-4 border-t">
            <Button
              size="sm"
              onClick={() => onReview(request, "approve")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
              disabled={!allRequirementsMet}
            >
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Одобрить магазин
            </Button>
            <Button
              size="sm"
              onClick={() => onReview(request, "reject")}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex-1"
            >
              <Icon name="XCircle" size={18} className="mr-2" />
              Отклонить заявку
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationRequestCard;
