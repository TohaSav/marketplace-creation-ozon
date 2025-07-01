import AdminLayout from "@/components/AdminLayout";
import SellersTab from "@/components/admin-dashboard/SellersTab";

export default function AdminSellers() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Продавцы
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Управление продавцами и их магазинами
            </p>
          </div>
        </div>
        <SellersTab />
      </div>
    </AdminLayout>
  );
}
