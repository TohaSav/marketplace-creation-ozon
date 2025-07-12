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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Чат поддержки</h1>
            <p className="text-gray-600">Управление обращениями клиентов</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button size="sm" onClick={() => setSettingsOpen(true)}>
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="chats" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={16} />
              Чаты
              <Badge variant="secondary">
                {chatUsers.reduce((sum, user) => sum + user.unreadCount, 0)}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Icon name="Ticket" size={16} />
              Тикеты
              <Badge variant="secondary">
                {tickets.filter((t) => t.status === "new").length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab */}
          <TabsContent value="chats" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>Активные чаты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {chatUsers.map((user) => (
                      <div
                        key={user.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {user.lastMessage}
                            </p>
                          </div>
                          {user.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
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
                <CardHeader>
                  <CardTitle>Окно чата</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <Icon
                        name="MessageCircle"
                        size={48}
                        className="mx-auto mb-4 opacity-50"
                      />
                      <p>Выберите чат для начала общения</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Тикеты поддержки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <Badge
                            className={
                              ticket.status === "new"
                                ? "bg-red-100 text-red-800"
                                : ticket.status === "open"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
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
                                ? "bg-orange-500 text-white"
                                : ticket.priority === "medium"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-green-500 text-white"
                            }
                          >
                            {ticket.priority === "high"
                              ? "Высокий"
                              : ticket.priority === "medium"
                                ? "Средний"
                                : "Низкий"}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          #{ticket.id}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        👤 {ticket.userName}
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
