import Icon from "@/components/ui/icon";
import type { AdminUser } from "@/types/admin-user.types";
import {
  formatDate,
  getStatusColor,
  getStatusText,
} from "@/utils/user-transform.utils";

interface UserDetailsModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: (userId: number) => void;
}

export default function UserDetailsModal({
  user,
  isOpen,
  onClose,
  onToggleStatus,
}: UserDetailsModalProps) {
  if (!isOpen || !user) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Профиль пользователя
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Основная информация */}
            <div className="flex items-start space-x-4">
              <img
                className="h-20 w-20 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              <div className="flex-1">
                <h4 className="text-xl font-medium text-gray-900">
                  {user.name}
                </h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      user.status,
                    )}`}
                  >
                    {getStatusText(user.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">
                  Количество заказов
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {user.totalOrders}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">
                  Общая сумма покупок
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {user.totalSpent.toLocaleString()} ₽
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">
                  Дата регистрации
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(user.registrationDate)}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">
                  Последняя активность
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(user.lastActivity)}
                </div>
              </div>
            </div>

            {/* Действия */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  onToggleStatus(user.id);
                  onClose();
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  user.status === "active"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {user.status === "active" ? "Заблокировать" : "Разблокировать"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
