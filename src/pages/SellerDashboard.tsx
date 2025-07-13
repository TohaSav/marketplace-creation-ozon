import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateStoryModal from "@/components/CreateStoryModal";
import SellerWallet from "@/components/SellerWallet";
import { useSellerDashboard } from "@/hooks/useSellerDashboard";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";
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
  const { user } = useAuth();
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const { shouldShowSubscriptionModal, activateSubscription } =
    useSubscription();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Проверяем необходимость показа модального окна подписки
  useEffect(() => {
    if (user?.userType === "seller" && user?.status === "active") {
      if (shouldShowSubscriptionModal()) {
        setShowSubscriptionModal(true);
      }
    }
  }, [user, shouldShowSubscriptionModal]);

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
  const hasActiveSubscription = user?.subscription?.isActive === true;
  
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

          <TabsContent value="analytics-old" className="mt-6">
            <div className="space-y-6">
              {/* Основные метрики */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Продажи</p>
                        <p className="text-2xl font-bold">₽125,000</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon name="TrendingUp" size={24} className="text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-green-600 font-medium">+27.6% к прошлому периоду</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Просмотры</p>
                        <p className="text-2xl font-bold">15,420</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon name="Eye" size={24} className="text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-purple-600 font-medium">+18.5% к прошлому периоду</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Конверсия</p>
                        <p className="text-2xl font-bold">3.2%</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon name="Target" size={24} className="text-orange-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-orange-600 font-medium">+0.8% к прошлому периоду</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ср. чек</p>
                        <p className="text-2xl font-bold">₽1,437</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="CreditCard" size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-blue-600 font-medium">+12.3% к прошлому периоду</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Топ товары */}
              <Card>
                <CardHeader>
                  <CardTitle>Топ товары за неделю</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "iPhone 15 Pro Max", sales: 45000, units: 15, growth: 12.5 },
                      { name: "Samsung Galaxy S24", sales: 32000, units: 8, growth: -5.2 },
                      { name: "MacBook Air M2", sales: 28000, units: 4, growth: 8.1 },
                      { name: "iPad Air", sales: 20000, units: 10, growth: 15.3 }
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.units} продано</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₽{product.sales.toLocaleString()}</div>
                          <div className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.growth > 0 ? '+' : ''}{product.growth}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

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
}