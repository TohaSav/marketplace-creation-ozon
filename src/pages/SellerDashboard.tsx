import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import CreateStoryModal from "@/components/CreateStoryModal";
import SellerWallet from "@/components/SellerWallet";
import { useSellerDashboard } from "@/hooks/useSellerDashboard";

// Tab Components
import StatsGrid from "@/components/seller-dashboard/StatsGrid";
import ProductsTab from "@/components/seller-dashboard/ProductsTab";
import OrdersTab from "@/components/seller-dashboard/OrdersTab";
import FinancesTab from "@/components/seller-dashboard/FinancesTab";
import StoriesTab from "@/components/seller-dashboard/StoriesTab";
import SettingsTab from "@/components/seller-dashboard/SettingsTab";

export default function SellerDashboard() {
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
