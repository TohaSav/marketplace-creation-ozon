import Icon from "@/components/ui/icon";

export default function UserTableEmpty() {
  return (
    <tr>
      <td colSpan={6} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center">
          <Icon name="Users" size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Пока нет пользователей
          </h3>
          <p className="text-gray-500">
            Пользователи будут отображаться здесь, когда они зарегистрируются
          </p>
        </div>
      </td>
    </tr>
  );
}
