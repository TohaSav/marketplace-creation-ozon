import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminShops } from "@/hooks/useAdminShops";
import ShopsList from "@/components/admin/ShopsList";
import ShopManagementPanel from "@/components/admin/ShopManagementPanel";
import AdminStats from "@/components/admin/AdminStats";

export default function Admin() {
  const {
    shops,
    selectedShop,
    activationDays,
    stats,
    setActivationDays,
    handleActivateShop,
    handleVerifyShop,
    handleExtendPeriod,
    handleShopSelect,
  } = useAdminShops();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">
            Управление магазинами, активация периодов и верификация
          </p>
        </header>

        <Tabs defaultValue="shops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shops">Управление магазинами</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="shops" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ShopsList
                  shops={shops}
                  selectedShop={selectedShop}
                  onShopSelect={handleShopSelect}
                />
              </div>

              <div>
                <ShopManagementPanel
                  selectedShop={selectedShop}
                  activationDays={activationDays}
                  onActivationDaysChange={setActivationDays}
                  onActivateShop={handleActivateShop}
                  onVerifyShop={handleVerifyShop}
                  onExtendPeriod={handleExtendPeriod}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <AdminStats stats={stats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
