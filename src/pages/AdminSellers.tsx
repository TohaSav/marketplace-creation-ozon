import AdminLayout from "@/components/AdminLayout";
import SellersTab from "@/components/admin-dashboard/SellersTab";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function AdminSellers() {
  const { clearAllSellers } = useAuth();

  const handleClearSellers = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите удалить ВСЕХ продавцов? Это действие необратимо!",
      )
    ) {
      try {
        clearAllSellers();
        toast({
          title: "Продавцы удалены",
          description: "Все продавцы удалены из базы данных",
          variant: "destructive",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description:
            error instanceof Error
              ? error.message
              : "Не удалось удалить продавцов",
          variant: "destructive",
        });
      }
    }
  };

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
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Button
              variant="destructive"
              onClick={handleClearSellers}
              className="flex items-center"
            >
              <Icon name="Trash2" size={16} className="mr-2" />
              Очистить всех продавцов
            </Button>
          </div>
        </div>
        <SellersTab />
      </div>
    </AdminLayout>
  );
}
