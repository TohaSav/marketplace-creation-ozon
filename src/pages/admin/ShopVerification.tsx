import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { VerificationRequest, ReviewAction } from "@/types/verification";
import { useVerification } from "@/hooks/useVerification";
import VerificationStats from "@/components/verification/VerificationStats";
import VerificationRequestCard from "@/components/verification/VerificationRequestCard";
import ReviewModal from "@/components/verification/ReviewModal";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "@/hooks/use-toast";

const ShopVerification: React.FC = () => {
  const {
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    updateRequestStatus,
    clearAllRequests,
    isLoading,
  } = useVerification();

  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<ReviewAction>("approve");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewRequest = (
    request: VerificationRequest,
    action: ReviewAction,
  ) => {
    setSelectedRequest(request);
    setReviewAction(action);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (rejectionReason?: string) => {
    if (!selectedRequest) return;

    setIsSubmitting(true);

    // Имитация отправки данных
    setTimeout(() => {
      updateRequestStatus(selectedRequest.id, reviewAction, rejectionReason);
      setIsSubmitting(false);
      setIsReviewModalOpen(false);
      setSelectedRequest(null);
    }, 1500);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Icon name="ShieldCheck" size={28} className="text-white" />
              </div>
              Верификация магазинов
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Управление заявками на получение статуса верифицированного
              магазина
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка заявок...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Icon name="ShieldCheck" size={28} className="text-white" />
              </div>
              Верификация магазинов
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Управление заявками на получение статуса верифицированного
              магазина. Подтвержденные магазины получают значо% доверия.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                clearAllRequests();
                toast({
                  title: "Заявки очищены",
                  description: "Все заявки на верификацию удалены",
                  variant: "destructive",
                });
              }}
              className="text-red-600 hover:text-red-700"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Очистить все
            </Button>
          </div>
        </div>

        <VerificationStats
          pendingCount={pendingRequests.length}
          approvedCount={approvedRequests.length}
          rejectedCount={rejectedRequests.length}
        />

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
            <div className="space-y-6">
              {pendingRequests.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-12 text-center">
                    <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Icon
                        name="CheckCircle2"
                        size={40}
                        className="text-green-500"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Отлично! Нет заявок на рассмотрении
                    </h3>
                    <p className="text-gray-500 text-lg">
                      Все заявки обработаны. Новые заявки появятся здесь
                      автоматически.
                    </p>
                    <div className="mt-8 flex justify-center">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 px-4 py-2"
                      >
                        <Icon name="Clock" size={16} className="mr-2" />
                        Ожидание новых заявок...
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="transform transition-all duration-200 hover:scale-[1.02]"
                    >
                      <VerificationRequestCard
                        request={request}
                        onReview={handleReviewRequest}
                        showActions={true}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-6">
              {approvedRequests.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Icon
                      name="Award"
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Пока нет одобренных магазинов
                    </h3>
                    <p className="text-gray-500">
                      Одобренные магазины будут отображаться здесь
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {approvedRequests.map((request) => (
                    <VerificationRequestCard
                      key={request.id}
                      request={request}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-6">
              {rejectedRequests.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Icon
                      name="XCircle"
                      size={48}
                      className="text-gray-400 mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Нет отклонённых заявок
                    </h3>
                    <p className="text-gray-500">
                      Отклонённые заявки автоматически удаляются с платформы
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {rejectedRequests.map((request) => (
                    <VerificationRequestCard
                      key={request.id}
                      request={request}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleSubmitReview}
          request={selectedRequest}
          action={reviewAction}
          isSubmitting={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default ShopVerification;
