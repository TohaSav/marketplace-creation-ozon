import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateStoryModal from "@/components/CreateStoryModal";
import SellerWallet from "@/components/SellerWallet";
import { useSellerDashboard } from "@/hooks/useSellerDashboard";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statusSyncManager } from "@/utils/statusSync";
import SubscriptionModal from "@/components/SubscriptionModal";
import SubscriptionStatusCard from "@/components/SubscriptionStatusCard";
import { useSubscription } from "@/hooks/useSubscription";
import PaymentRequiredModal from "@/components/PaymentRequiredModal";

// Tab Components
import StatsGrid from "@/components/seller-dashboard/StatsGrid";
import ProductsTab from "@/components/seller-dashboard/ProductsTab";
import OrdersTab from "@/components/seller-dashboard/OrdersTab";
import AnalyticsTab from "@/components/seller-dashboard/AnalyticsTab";
import FinancesTab from "@/components/seller-dashboard/FinancesTab";
import StoriesTab from "@/components/seller-dashboard/StoriesTab";
import SettingsTab from "@/components/seller-dashboard/SettingsTab";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import SellerStatusAlert from "@/components/SellerStatusAlert";
import RevisionModal from "@/components/RevisionModal";

export default function SellerDashboard() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const { shouldShowSubscriptionModal, activateSubscription } =
    useSubscription();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Проверяем одобрение продавца и перенаправляем на выбор тарифа
  useEffect(() => {
    if (user?.userType === "seller" && user?.status === "active") {
      // Проверяем, был ли продавец только что одобрен
      const approvedData = localStorage.getItem(`seller-approved-${user.id}`);
      if (approvedData) {
        const parsedData = JSON.parse(approvedData);
        if (parsedData.approved) {
          // Удаляем флаг одобрения
          localStorage.removeItem(`seller-approved-${user.id}`);
          // Перенаправляем на страницу тарифов с флагом одобрения
          navigate('/seller/pricing', { state: { fromApproval: true } });
          return;
        }
      }
      
      // Стандартная проверка подписки
      if (shouldShowSubscriptionModal()) {
        setShowSubscriptionModal(true);
      }
    }
  }, [user, shouldShowSubscriptionModal, navigate]);

  // Периодическая проверка истечения подписки
  useEffect(() => {
    if (!user?.subscription) return;

    const checkSubscription = () => {
      if (user.subscription && user.subscription.isActive) {
        const now = new Date();
        const endDate = new Date(user.subscription.endDate);
        
        if (endDate <= now) {
          // Подписка истекла - обновляем пользователя
          const updatedUser = {
            ...user,
            subscription: {
              ...user.subscription,
              isActive: false
            }
          };
          updateUser(updatedUser);
        }
      }
    };

    // Проверяем сразу при загрузке
    checkSubscription();

    // Устанавливаем интервал проверки каждую минуту
    const interval = setInterval(checkSubscription, 60000);

    return () => clearInterval(interval);
  }, [user, updateUser]);

  // Подписываемся на изменения статуса продавца
  useEffect(() => {
    const unsubscribe = statusSyncManager.subscribe((event) => {
      if (event.sellerId === user?.id) {
        // Если продавец удален (статус blocked с соответствующим комментарием)
        if (
          event.newStatus === "blocked" &&
          event.moderationComment === "Продавец удален администратором"
        ) {
          localStorage.removeItem("seller-token");
          alert(
            "Ваш аккаунт был удален администратором. Обратитесь в службу поддержки для получения дополнительной информации.",
          );
          window.location.href = "/";
          return;
        }

        // Обновляем данные в localStorage для синхронизации
        const currentSellerToken = localStorage.getItem("seller-token");
        if (currentSellerToken) {
          try {
            const sellerData = JSON.parse(currentSellerToken);
            const updatedSeller = {
              ...sellerData,
              status: event.newStatus,
              moderationComment: event.moderationComment,
            };
            localStorage.setItem("seller-token", JSON.stringify(updatedSeller));

            // Принудительно обновляем интерфейс
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } catch (error) {
            console.error("Ошибка обновления данных продавца:", error);
          }
        }
      }
    });

    return unsubscribe;
  }, [user?.id]);

  const {
    stats,
    products,
    orders,
    stories,
    isCreateStoryOpen,
    setIsCreateStoryOpen,
    handleCreateStory,
    handleDeleteStory,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleProcessOrder,
    handleMessageCustomer,
    handleEditProfile,
  } = useSellerDashboard();

  // Обработка подписки на тариф
  const handleSubscribe = async (planId: string) => {
    try {
      await activateSubscription(planId);
      setShowSubscriptionModal(false);
    } catch (error) {
      console.error("Ошибка активации подписки:", error);
      throw error;
    }
  };

  // Проверяем есть ли активная подписка у продавца
  const hasActiveSubscription = user?.subscription?.isActive === true && 
    user?.subscription?.endDate && 
    new Date(user.subscription.endDate) > new Date();
  
  // Проверяем статус продавца - блокируем все кроме уведомлений
  if (user?.userType === "seller" && user?.status !== "active") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon name="Clock" size={64} className="text-orange-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Ваш профиль находится на стадии одобрения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Ожидайте, вы получите уведомление о решении.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-6">
                <p className="text-gray-800 font-medium text-lg mb-4">
                  С Уважением, Calibr Store
                </p>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>📋 Ваши данные проверяются администрацией</p>
                  <p>⏱️ Обычно это занимает до 24 часов</p>
                  <p>🔔 Уведомление придет на указанную почту</p>
                </div>
              </div>

              {user?.status === "revision" && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                  <p className="text-red-800 font-medium">
                    ⚠️ Администрация Calibre Store отправила ваш магазин на
                    доработку
                  </p>
                  <div className="mt-3 p-3 bg-white rounded border border-red-200">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Комментарий для доработки:
                    </p>
                    <p className="text-red-600 text-sm">
                      {user.revisionComment ||
                        "Требуется дополнительная информация"}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRevisionModal(true)}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Отправить на повторную проверку
                  </button>
                </div>
              )}

              {user?.status === "resubmitted" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-blue-800 font-medium">
                    🔄 Повторная заявка отправлена
                  </p>
                  <p className="text-blue-700 text-sm mt-2">
                    Ваша заявка находится на повторной проверке администрацией
                  </p>
                </div>
              )}

              {user?.status === "rejected" && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                  <p className="text-red-800 font-medium">
                    ❌ Заявка отклонена
                  </p>
                  <p className="text-red-700 text-sm mt-2">
                    Обратитесь в поддержку для уточнения причин
                  </p>
                </div>
              )}

              {/* Единственная доступная функция - уведомления */}
              <div className="border-t pt-6">
                <a
                  href="/notifications"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Icon name="Bell" size={20} className="mr-2" />
                  Мои уведомления
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Модальное окно оплаты - показывается если нет активной подписки */}
      <PaymentRequiredModal isOpen={!hasActiveSubscription} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Кабинет продавца</h1>
          <p className="text-gray-600 mt-2">
            Управляйте своим магазином и товарами
          </p>
        </div>

        {/* Seller Status Alert */}
        <SellerStatusAlert />

        {/* Stats Cards */}
        <StatsGrid stats={stats} />

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatusCard />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="wallet">Кошелёк</TabsTrigger>
            <TabsTrigger value="finances">Финансы</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductsTab
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrdersTab
              orders={orders}
              onProcessOrder={handleProcessOrder}
              onMessageCustomer={handleMessageCustomer}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="wallet" className="mt-6">
            <SellerWallet />
          </TabsContent>

          <TabsContent value="finances" className="mt-6">
            <FinancesTab stats={stats} />
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <StoriesTab
              stories={stories}
              onCreateStory={() => setIsCreateStoryOpen(true)}
              onDeleteStory={handleDeleteStory}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsTab onEditProfile={handleEditProfile} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Story Modal */}
      <CreateStoryModal
        isOpen={isCreateStoryOpen}
        onClose={() => setIsCreateStoryOpen(false)}
        onSubmit={handleCreateStory}
      />

      {/* Revision Modal */}
      <RevisionModal
        isOpen={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}