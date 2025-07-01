import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserDataManager } from "@/utils/userDataManager";
import { toast } from "@/hooks/use-toast";

export default function AdminDataManagement() {
  const [storageStats, setStorageStats] = useState(
    UserDataManager.getStorageStats(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const refreshStats = () => {
    setStorageStats(UserDataManager.getStorageStats());
  };

  const handleClearAllUsers = async () => {
    if (
      !window.confirm(
        "Вы уверены, что хотите удалить ВСЕХ пользователей и продавцов? Это действие необратимо!",
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      UserDataManager.clearAllUsers();
      refreshStats();
      toast({
        title: "База полностью очищена",
        description: "Все пользователи и продавцы удалены из базы данных",
        variant: "destructive",
      });

      // Перезагружаем страницу для синхронизации с AuthContext
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось очистить базу",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearUsers = async () => {
    if (
      !window.confirm(
        "Вы уверены, что хотите удалить всех покупателей? Это действие необратимо!",
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      UserDataManager.clearUsers();
      refreshStats();
      toast({
        title: "Покупатели удалены",
        description: "Все покупатели удалены из базы данных",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось удалить покупателей",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSellers = async () => {
    if (
      !window.confirm(
        "Вы уверены, что хотите удалить всех продавцов? Это действие необратимо!",
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      UserDataManager.clearSellers();
      refreshStats();
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Управление данными
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Очистка и управление пользовательскими данными в системе
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Button variant="outline" onClick={refreshStats}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить статистику
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Покупатели</CardTitle>
              <Icon name="Users" size={16} className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storageStats.users}</div>
              <p className="text-xs text-muted-foreground">
                зарегистрированных покупателей
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Продавцы</CardTitle>
              <Icon name="Store" size={16} className="text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storageStats.sellers}</div>
              <p className="text-xs text-muted-foreground">
                зарегистрированных продавцов
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего</CardTitle>
              <Icon name="UserCheck" size={16} className="text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storageStats.total}</div>
              <p className="text-xs text-muted-foreground">
                всего пользователей
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Статус</CardTitle>
              <Icon name="Database" size={16} className="text-orange-600" />
            </CardHeader>
            <CardContent>
              <Badge
                variant={storageStats.total > 0 ? "default" : "secondary"}
                className={
                  storageStats.total > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {storageStats.total > 0 ? "Есть данные" : "База пуста"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                состояние базы данных
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Действия по очистке */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Очистка покупателей */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-blue-600" />
                Покупатели
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Удалить всех зарегистрированных покупателей из системы
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Количество: {storageStats.users}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleClearUsers}
                  disabled={isLoading || storageStats.users === 0}
                  className="w-full"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  {isLoading ? "Удаление..." : "Удалить покупателей"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Очистка продавцов */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Store" size={20} className="text-green-600" />
                Продавцы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Удалить всех зарегистрированных продавцов из системы
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Количество: {storageStats.sellers}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleClearSellers}
                  disabled={isLoading || storageStats.sellers === 0}
                  className="w-full"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  {isLoading ? "Удаление..." : "Удалить продавцов"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Полная очистка */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
                Полная очистка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Удалить ВСЕХ пользователей и продавцов из системы
                  </p>
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    ⚠️ Действие необратимо!
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleClearAllUsers}
                  disabled={isLoading || storageStats.total === 0}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Icon name="Skull" size={16} className="mr-2" />
                  {isLoading ? "Удаление..." : "ОЧИСТИТЬ ВСЁ"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Инструкция */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              Информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Хранение данных:</strong> Все пользовательские данные
                хранятся в localStorage браузера.
              </p>
              <p>
                <strong>Ключи хранения:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    "users"
                  </code>{" "}
                  - массив покупателей
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    "sellers"
                  </code>{" "}
                  - массив продавцов
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    "user-token"
                  </code>{" "}
                  - токен текущего покупателя
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    "seller-token"
                  </code>{" "}
                  - токен текущего продавца
                </li>
              </ul>
              <p className="text-yellow-700 bg-yellow-50 p-2 rounded">
                <Icon name="AlertTriangle" size={16} className="inline mr-1" />
                <strong>Внимание:</strong> При удалении данных произойдет
                автоматическая перезагрузка страницы для синхронизации с
                системой авторизации.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
