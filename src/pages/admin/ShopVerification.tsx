import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface VerificationRequest {
  id: string;
  shopId: string;
  shopName: string;
  sellerName: string;
  sellerEmail: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  requirements: {
    salesCount: number;
    reviewsCount: number;
    monthsOnPlatform: number;
    complaintsCount: number;
    supportRating: number;
  };
  shopStats: {
    totalOrders: number;
    completedOrders: number;
    averageRating: number;
    totalReviews: number;
    joinDate: string;
    lastActivity: string;
  };
}

const ShopVerification: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">(
    "approve",
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Тестовые данные заявок
  const mockRequests: VerificationRequest[] = [
    {
      id: "1",
      shopId: "shop_001",
      shopName: "Electronics World",
      sellerName: "Александр Петров",
      sellerEmail: "alex@electronicsworld.ru",
      submittedAt: "2024-06-28T10:30:00",
      status: "pending",
      requirements: {
        salesCount: 156,
        reviewsCount: 78,
        monthsOnPlatform: 8,
        complaintsCount: 0,
        supportRating: 4.7,
      },
      shopStats: {
        totalOrders: 234,
        completedOrders: 221,
        averageRating: 4.6,
        totalReviews: 78,
        joinDate: "2023-10-15",
        lastActivity: "2024-06-29T14:22:00",
      },
    },
    {
      id: "2",
      shopId: "shop_002",
      shopName: "Fashion Store",
      sellerName: "Мария Иванова",
      sellerEmail: "maria@fashionstore.ru",
      submittedAt: "2024-06-27T15:45:00",
      status: "pending",
      requirements: {
        salesCount: 89,
        reviewsCount: 45,
        monthsOnPlatform: 5,
        complaintsCount: 1,
        supportRating: 4.2,
      },
      shopStats: {
        totalOrders: 145,
        completedOrders: 142,
        averageRating: 4.3,
        totalReviews: 45,
        joinDate: "2024-01-20",
        lastActivity: "2024-06-29T09:15:00",
      },
    },
    {
      id: "3",
      shopId: "shop_003",
      shopName: "Books & More",
      sellerName: "Дмитрий Сидоров",
      sellerEmail: "dmitry@booksmore.ru",
      submittedAt: "2024-06-25T12:20:00",
      status: "approved",
      reviewedAt: "2024-06-26T10:30:00",
      reviewedBy: "admin@calibrestore.ru",
      requirements: {
        salesCount: 245,
        reviewsCount: 125,
        monthsOnPlatform: 12,
        complaintsCount: 0,
        supportRating: 4.9,
      },
      shopStats: {
        totalOrders: 356,
        completedOrders: 345,
        averageRating: 4.8,
        totalReviews: 125,
        joinDate: "2023-06-10",
        lastActivity: "2024-06-29T16:45:00",
      },
    },
    {
      id: "4",
      shopId: "shop_004",
      shopName: "Tech Solutions",
      sellerName: "Анна Козлова",
      sellerEmail: "anna@techsolutions.ru",
      submittedAt: "2024-06-24T09:15:00",
      status: "rejected",
      reviewedAt: "2024-06-25T14:30:00",
      reviewedBy: "admin@calibrestore.ru",
      rejectionReason:
        "Недостаточное количество продаж и отзывов. Магазин работает менее 6 месяцев.",
      requirements: {
        salesCount: 45,
        reviewsCount: 23,
        monthsOnPlatform: 4,
        complaintsCount: 0,
        supportRating: 4.1,
      },
      shopStats: {
        totalOrders: 62,
        completedOrders: 58,
        averageRating: 4.0,
        totalReviews: 23,
        joinDate: "2024-02-15",
        lastActivity: "2024-06-29T11:30:00",
      },
    },
  ];

  useEffect(() => {
    setRequests(mockRequests);
  }, []);

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const approvedRequests = requests.filter((req) => req.status === "approved");
  const rejectedRequests = requests.filter((req) => req.status === "rejected");

  const handleReviewRequest = (
    request: VerificationRequest,
    action: "approve" | "reject",
  ) => {
    setSelectedRequest(request);
    setReviewAction(action);
    setRejectionReason("");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedRequest) return;

    setIsSubmitting(true);

    // Имитация отправки данных
    setTimeout(() => {
      const updatedRequests = requests.map((req) => {
        if (req.id === selectedRequest.id) {
          return {
            ...req,
            status: reviewAction,
            reviewedAt: new Date().toISOString(),
            reviewedBy: "admin@calibrestore.ru",
            rejectionReason:
              reviewAction === "reject" ? rejectionReason : undefined,
          };
        }
        return req;
      });

      setRequests(updatedRequests);
      setIsSubmitting(false);
      setIsReviewModalOpen(false);
      setSelectedRequest(null);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            На рассмотрении
          </Badge>
        );
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Одобрена</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Отклонена</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Неизвестно</Badge>;
    }
  };

  const checkRequirements = (
    requirements: VerificationRequest["requirements"],
  ) => {
    const checks = [
      {
        name: "Продажи",
        value: requirements.salesCount,
        required: 100,
        met: requirements.salesCount >= 100,
      },
      {
        name: "Отзывы",
        value: requirements.reviewsCount,
        required: 50,
        met: requirements.reviewsCount >= 50,
      },
      {
        name: "Месяцы",
        value: requirements.monthsOnPlatform,
        required: 6,
        met: requirements.monthsOnPlatform > 6,
      },
      {
        name: "Жалобы",
        value: requirements.complaintsCount,
        required: 0,
        met: requirements.complaintsCount === 0,
      },
      {
        name: "Поддержка",
        value: requirements.supportRating,
        required: 4.5,
        met: requirements.supportRating >= 4.5,
      },
    ];

    return checks;
  };

  const RequestCard: React.FC<{
    request: VerificationRequest;
    showActions?: boolean;
  }> = ({ request, showActions = false }) => {
    const requirementChecks = checkRequirements(request.requirements);
    const allRequirementsMet = requirementChecks.every((check) => check.met);

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
            {getStatusBadge(request.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Дата подачи:</span>
              <p className="font-medium">
                {new Date(request.submittedAt).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <span className="text-gray-600">ID магазина:</span>
              <p className="font-medium font-mono">{request.shopId}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Соответствие требованиям</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {requirementChecks.map((check, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Icon
                    name={check.met ? "CheckCircle" : "XCircle"}
                    size={16}
                    className={check.met ? "text-green-600" : "text-red-600"}
                  />
                  <span className="text-gray-600">{check.name}:</span>
                  <span
                    className={
                      check.met
                        ? "text-green-700 font-medium"
                        : "text-red-700 font-medium"
                    }
                  >
                    {check.name === "Жалобы"
                      ? check.value === 0
                        ? "Нет"
                        : check.value
                      : check.value}
                    {check.name === "Поддержка" && "/5.0"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2">Статистика магазина</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                Всего заказов:{" "}
                <span className="font-medium">
                  {request.shopStats.totalOrders}
                </span>
              </div>
              <div>
                Выполнено:{" "}
                <span className="font-medium">
                  {request.shopStats.completedOrders}
                </span>
              </div>
              <div>
                Рейтинг:{" "}
                <span className="font-medium">
                  {request.shopStats.averageRating}/5.0
                </span>
              </div>
              <div>
                Отзывы:{" "}
                <span className="font-medium">
                  {request.shopStats.totalReviews}
                </span>
              </div>
            </div>
          </div>

          {request.status === "rejected" && request.rejectionReason && (
            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="font-medium text-red-800 mb-1">
                Причина отклонения
              </h4>
              <p className="text-sm text-red-700">{request.rejectionReason}</p>
            </div>
          )}

          {request.reviewedAt && (
            <div className="text-xs text-gray-500">
              Рассмотрена{" "}
              {new Date(request.reviewedAt).toLocaleDateString("ru-RU")}{" "}
              администратором {request.reviewedBy}
            </div>
          )}

          {showActions && (
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => handleReviewRequest(request, "approve")}
                className="bg-green-600 hover:bg-green-700"
                disabled={!allRequirementsMet}
              >
                <Icon name="CheckCircle" size={16} className="mr-1" />
                Одобрить
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReviewRequest(request, "reject")}
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Верификация магазинов
        </h1>
        <p className="text-gray-600 mt-2">
          Управление заявками на получение статуса верифицированного магазина
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon name="Clock" size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
                <p className="text-sm text-gray-600">На рассмотрении</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedRequests.length}</p>
                <p className="text-sm text-gray-600">Одобрено</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Icon name="XCircle" size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rejectedRequests.length}</p>
                <p className="text-sm text-gray-600">Отклонено</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            На рассмотрении ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Одобренные ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Отклоненные ({rejectedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon
                    name="Inbox"
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Нет заявок на рассмотрении
                  </h3>
                  <p className="text-gray-500">Все заявки обработаны</p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showActions={true}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {approvedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {rejectedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve"
                ? "Одобрить заявку"
                : "Отклонить заявку"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && `Магазин: ${selectedRequest.shopName}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {reviewAction === "reject" && (
              <div>
                <Label htmlFor="reason">Причина отклонения</Label>
                <Textarea
                  id="reason"
                  placeholder="Укажите причину отклонения заявки..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            )}

            {reviewAction === "approve" && (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Icon name="CheckCircle" size={20} />
                  <span className="font-medium">Подтверждение одобрения</span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Магазин получит статус верифицированного и синюю галочку
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={
                isSubmitting ||
                (reviewAction === "reject" && !rejectionReason.trim())
              }
              className={
                reviewAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              variant={reviewAction === "reject" ? "destructive" : "default"}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Обработка...
                </>
              ) : (
                <>
                  <Icon
                    name={
                      reviewAction === "approve" ? "CheckCircle" : "XCircle"
                    }
                    size={16}
                    className="mr-2"
                  />
                  {reviewAction === "approve" ? "Одобрить" : "Отклонить"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopVerification;
