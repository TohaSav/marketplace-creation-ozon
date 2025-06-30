import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  lastActivity: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "blocked";
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    registrationDate: "2023-10-15T10:30:00Z",
    lastActivity: "2024-01-15T14:20:00Z",
    totalOrders: 5,
    totalSpent: 245000,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    phone: "+7 (999) 765-43-21",
    registrationDate: "2023-11-22T16:45:00Z",
    lastActivity: "2024-01-14T11:15:00Z",
    totalOrders: 3,
    totalSpent: 178000,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Алексей Козлов",
    email: "alex@example.com",
    phone: "+7 (999) 111-22-33",
    registrationDate: "2023-09-05T09:15:00Z",
    lastActivity: "2024-01-13T16:30:00Z",
    totalOrders: 8,
    totalSpent: 435000,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 4,
    name: "Ольга Новикова",
    email: "olga@example.com",
    phone: "+7 (999) 888-77-66",
    registrationDate: "2023-12-01T12:00:00Z",
    lastActivity: "2024-01-12T18:45:00Z",
    totalOrders: 2,
    totalSpent: 89990,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 5,
    name: "Дмитрий Волков",
    email: "dmitry@example.com",
    phone: "+7 (999) 555-44-33",
    registrationDate: "2023-08-18T14:30:00Z",
    lastActivity: "2023-12-25T10:15:00Z",
    totalOrders: 1,
    totalSpent: 12990,
    status: "blocked",
    avatar: "/api/placeholder/40/40",
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user,
      ),
    );
    const user = users.find((u) => u.id === userId);
    const newStatus =
      user?.status === "active" ? "заблокирован" : "разблокирован";
    toast({
      title: "Статус пользователя изменён",
      description: `Пользователь ${user?.name} был ${newStatus}`,
    });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              Управление пользователями
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Просмотр и управление учётными записями пользователей
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="Users" size={24} className="text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Всего пользователей
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="UserCheck" size={24} className="text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Активных
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter((u) => u.status === "active").length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon name="UserX" size={24} className="text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Заблокированных
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter((u) => u.status === "blocked").length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon
                    name="TrendingUp"
                    size={24}
                    className="text-purple-600"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Общая выручка
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users
                        .reduce((sum, user) => sum + user.totalSpent, 0)
                        .toLocaleString()}{" "}
                      ₽
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск
              </label>
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Имя, email или телефон..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Все статусы</option>
                <option value="active">Активные</option>
                <option value="blocked">Заблокированные</option>
              </select>
            </div>
          </div>
        </div>

        {/* Таблица пользователей */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Пользователь
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Контакты
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статистика
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Регистрация
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
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
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id}
                          </div>
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
                        {user.status === "active" ? "Активный" : "Заблокирован"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`${
                            user.status === "active"
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                        >
                          <Icon
                            name={
                              user.status === "active" ? "UserX" : "UserCheck"
                            }
                            size={16}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Модальное окно деталей пользователя */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Профиль пользователя
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Основная информация */}
                  <div className="flex items-start space-x-4">
                    <img
                      className="h-20 w-20 rounded-full"
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-medium text-gray-900">
                        {selectedUser.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedUser.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedUser.phone}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            selectedUser.status,
                          )}`}
                        >
                          {selectedUser.status === "active"
                            ? "Активный"
                            : "Заблокирован"}
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
                        {selectedUser.totalOrders}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">
                        Общая сумма покупок
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedUser.totalSpent.toLocaleString()} ₽
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">
                        Дата регистрации
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {formatDate(selectedUser.registrationDate)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">
                        Последняя активность
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {formatDate(selectedUser.lastActivity)}
                      </div>
                    </div>
                  </div>

                  {/* Действия */}
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      onClick={() => handleToggleUserStatus(selectedUser.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        selectedUser.status === "active"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {selectedUser.status === "active"
                        ? "Заблокировать"
                        : "Разблокировать"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
