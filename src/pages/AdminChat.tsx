import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AdminChat() {
  const [activeTab, setActiveTab] = useState("chats");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Простые моковые данные для проверки
  const chatUsers = [
    {
      id: "1",
      name: "Анна Иванова",
      email: "anna@example.com",
      lastMessage: "Проблема с заказом #12345",
      unreadCount: 2,
      status: "waiting",
    },
    {
      id: "2",
      name: "Петр Смирнов",
      email: "petr@example.com",
      lastMessage: "Спасибо за помощь!",
      unreadCount: 0,
      status: "resolved",
    },
  ];

  const tickets = [
    {
      id: "T001",
      subject: "Проблема с доставкой заказа",
      status: "new",
      priority: "high",
      userName: "Анна Иванова",
    },
    {
      id: "T002",
      subject: "Возврат средств за товар",
      status: "open",
      priority: "medium",
      userName: "Петр Смирнов",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              Чат поддержки
            </h1>
            <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
              Управление обращениями клиентов
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Icon name="Download" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline ml-1">Экспорт</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setSettingsOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <Icon name="Settings" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline ml-1">Настройки</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger
              value="chats"
              className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"
            >
              <Icon name="MessageCircle" size={14} className="sm:size-4" />
              <span className="hidden xs:inline">Чаты</span>
              <Badge variant="secondary" className="text-xs">
                {chatUsers.reduce((sum, user) => sum + user.unreadCount, 0)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm"
            >
              <Icon name="Ticket" size={14} className="sm:size-4" />
              <span className="hidden xs:inline">Тикеты</span>
              <Badge variant="secondary" className="text-xs">
                {tickets.filter((t) => t.status === "new").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
              {/* Users List */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">
                    Активные чаты
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 sm:space-y-3">
                    {chatUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-medium truncate">
                              {user.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {user.lastMessage}
                            </p>
                          </div>
                          {user.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="text-xs shrink-0"
                            >
                              {user.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">
                    Окно чата
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                    <div className="text-center px-4">
                      <Icon
                        name="MessageCircle"
                        size={40}
                        className="mx-auto mb-3 sm:mb-4 opacity-50 sm:size-12"
                      />
                      <p className="text-sm sm:text-base">
                        Выберите чат для начала общения
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-3 sm:space-y-4">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">
                  Тикеты поддержки
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-sm sm:text-base font-medium line-clamp-2">
                              {ticket.subject}
                            </h3>
                            <div className="flex gap-2 shrink-0">
                              <Badge
                                className={
                                  ticket.status === "new"
                                    ? "bg-red-100 text-red-800 text-xs"
                                    : ticket.status === "open"
                                      ? "bg-blue-100 text-blue-800 text-xs"
                                      : "bg-gray-100 text-gray-800 text-xs"
                                }
                              >
                                {ticket.status === "new"
                                  ? "Новый"
                                  : ticket.status === "open"
                                    ? "Открыт"
                                    : "Решен"}
                              </Badge>
                              <Badge
                                className={
                                  ticket.priority === "high"
                                    ? "bg-orange-500 text-white text-xs"
                                    : ticket.priority === "medium"
                                      ? "bg-yellow-500 text-white text-xs"
                                      : "bg-green-500 text-white text-xs"
                                }
                              >
                                {ticket.priority === "high"
                                  ? "Высокий"
                                  : ticket.priority === "medium"
                                    ? "Средний"
                                    : "Низкий"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            👤 {ticket.userName}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 shrink-0 self-start">
                          #{ticket.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
