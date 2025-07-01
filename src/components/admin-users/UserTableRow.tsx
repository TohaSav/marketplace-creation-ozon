import Icon from "@/components/ui/icon";
import type { AdminUser } from "@/types/admin-user.types";
import {
  formatDate,
  getStatusColor,
  getStatusText,
} from "@/utils/user-transform.utils";

interface UserTableRowProps {
  user: AdminUser;
  onViewUser: (user: AdminUser) => void;
  onToggleStatus: (userId: number) => void;
}

export default function UserTableRow({
  user,
  onViewUser,
  onToggleStatus,
}: UserTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
        <div className="text-sm text-gray-500">{user.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {user.totalOrders} заказ(ов)
        </div>
        <div className="text-sm text-gray-500">
          {user.totalSpent.toLocaleString()} ₽
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(user.registrationDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            user.status,
          )}`}
        >
          {getStatusText(user.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onViewUser(user)}
            className="text-purple-600 hover:text-purple-900"
            title="Просмотр профиля"
          >
            <Icon name="Eye" size={16} />
          </button>
          <button
            onClick={() => onToggleStatus(user.id)}
            className={`${
              user.status === "active"
                ? "text-red-600 hover:text-red-900"
                : "text-green-600 hover:text-green-900"
            }`}
            title={
              user.status === "active" ? "Заблокировать" : "Разблокировать"
            }
          >
            <Icon
              name={user.status === "active" ? "UserX" : "UserCheck"}
              size={16}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
