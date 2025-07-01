import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface AdminUsersHeaderProps {
  onClearAllUsers: () => void;
}

export default function AdminUsersHeader({
  onClearAllUsers,
}: AdminUsersHeaderProps) {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="sm:flex-auto">
        <h1 className="text-2xl font-semibold text-gray-900">
          Управление пользователями
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Просмотр и управление учётными записями пользователей
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <Button
          variant="destructive"
          onClick={onClearAllUsers}
          className="flex items-center"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Очистить всех пользователей
        </Button>
      </div>
    </div>
  );
}
