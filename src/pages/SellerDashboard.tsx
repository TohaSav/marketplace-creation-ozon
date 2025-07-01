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

  // Проверяем статус продавца
  if (user?.userType === "seller" && user?.status === "pending") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Icon name="Clock" size={64} className="text-yellow-500" />
              </div>
              <CardTitle className="text-2xl">
                Дождитесь проверки Администрации Calibre Store
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg mb-6">
                Ваша заявка на продажу товаров находится на рассмотрении.
                Администрация проверит предоставленные данные и одобрит ваш
                аккаунт в течение 24 часов.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Что происходит сейчас:</strong>
                  <br />
                  • Проверка ваших контактных данных
                  <br />
                  • Верификация информации о магазине
                  <br />• Подготовка вашего кабинета продавца
                </p>
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
