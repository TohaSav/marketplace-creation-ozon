import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import CreateStoryModal from "@/components/CreateStoryModal";
import SellerWallet from "@/components/SellerWallet";
import { useSellerDashboard } from "@/hooks/useSellerDashboard";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

// Tab Components
import StatsGrid from "@/components/seller-dashboard/StatsGrid";
import ProductsTab from "@/components/seller-dashboard/ProductsTab";
import OrdersTab from "@/components/seller-dashboard/OrdersTab";
import FinancesTab from "@/components/seller-dashboard/FinancesTab";
import StoriesTab from "@/components/seller-dashboard/StoriesTab";
import SettingsTab from "@/components/seller-dashboard/SettingsTab";

export default function SellerDashboard() {
  const { user } = useAuth();
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

  // Проверяем статус продавца - блокируем все кроме уведомлений
  if (user?.userType === "seller" && user?.status !== "active") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                  <p className="text-yellow-800 font-medium">
                    💭 Требуется доработка документов
                  </p>
                  <p className="text-yellow-700 text-sm mt-2">
                    Проверьте уведомления для получения подробной информации
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
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Кабинет продавца</h1>
          <p className="text-gray-600 mt-2">
            Управляйте своим магазином и товарами
          </p>
        </div>

        {/* Stats Cards */}
        <StatsGrid stats={stats} />

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="products">Мои товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
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
    </div>
  );
}
