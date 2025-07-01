import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { VerificationRequest, ReviewAction } from "@/types/verification";
import { useVerification } from "@/hooks/useVerification";
import VerificationStats from "@/components/verification/VerificationStats";
import VerificationRequestCard from "@/components/verification/VerificationRequestCard";
import ReviewModal from "@/components/verification/ReviewModal";

const ShopVerification: React.FC = () => {
  const {
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    updateRequestStatus,
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Верификация магазинов
          </h1>
          <p className="text-gray-600 mt-2">
            Управление заявками на получение статуса верифицированного магазина
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

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
                <VerificationRequestCard
                  key={request.id}
                  request={request}
                  onReview={handleReviewRequest}
                  showActions={true}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {approvedRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {rejectedRequests.map((request) => (
              <VerificationRequestCard key={request.id} request={request} />
            ))}
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
  );
};

export default ShopVerification;
