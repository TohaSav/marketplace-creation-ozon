import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  userId: string;
  userName: string;
  status: "sent" | "read";
}

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  status: "active" | "waiting" | "resolved";
}

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: "new" | "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  lastActivity: Date;
  messages: ChatMessage[];
  assignedTo?: string;
}

export default function AdminChat() {
  const [activeTab, setActiveTab] = useState<"chats" | "tickets">("chats");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatUsers] = useState<ChatUser[]>([
    {
      id: "1",
      name: "Анна Иванова",
      email: "anna@example.com",
      lastMessage: "Проблема с заказом #12345",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      status: "waiting",
    },
    {
      id: "2",
      name: "Петр Смирнов",
      email: "petr@example.com",
      lastMessage: "Спасибо за помощь!",
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 0,
      isOnline: false,
      status: "resolved",
    },
    {
      id: "3",
      name: "Мария Козлова",
      email: "maria@example.com",
      lastMessage: "Как вернуть товар?",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 1,
      isOnline: true,
      status: "active",
    },
  ]);

  const [tickets] = useState<SupportTicket[]>([
    {
      id: "T001",
      userId: "1",
      userName: "Анна Иванова",
      subject: "Проблема с доставкой заказа",
      status: "new",
      priority: "high",
      category: "Доставка",
      lastActivity: new Date(Date.now() - 10 * 60 * 1000),
      messages: [],
      assignedTo: undefined,
    },
    {
      id: "T002",
      userId: "2",
      userName: "Петр Смирнов",
      subject: "Возврат средств за товар",
      status: "open",
      priority: "medium",
      category: "Возвраты",
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messages: [],
      assignedTo: "Админ 1",
    },
    {
      id: "T003",
      userId: "3",
      userName: "Мария Козлова",
      subject: "Вопрос по оплате",
      status: "pending",
      priority: "low",
      category: "Оплата",
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
      messages: [],
      assignedTo: "Админ 2",
    },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Добрый день! У меня проблема с заказом #12345",
      sender: "user",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      userId: "1",
      userName: "Анна Иванова",
      status: "read",
    },
    {
      id: "2",
      text: "Здравствуйте! Сейчас проверю информацию по вашему заказу.",
      sender: "admin",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      userId: "1",
      userName: "Анна Иванова",
      status: "read",
    },
    {
      id: "3",
      text: "Заказ был отправлен вчера, трек-номер: RF123456789",
      sender: "admin",
      timestamp: new Date(Date.now() - 7 * 60 * 1000),
      userId: "1",
      userName: "Анна Иванова",
      status: "read",
    },
    {
      id: "4",
      text: "Спасибо! А когда примерно доставят?",
      sender: "user",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      userId: "1",
      userName: "Анна Иванова",
      status: "sent",
    },
  ]);

  const selectedUserData = selectedUser
    ? chatUsers.find((u) => u.id === selectedUser)
    : null;
  const selectedTicketData = selectedTicket
    ? tickets.find((t) => t.id === selectedTicket)
    : null;
  const filteredMessages = selectedUser
    ? messages.filter((m) => m.userId === selectedUser)
    : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const adminMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "admin",
      timestamp: new Date(),
      userId: selectedUser,
      userName: selectedUserData?.name || "",
      status: "sent",
    };

    setMessages((prev) => [...prev, adminMessage]);
    setNewMessage("");

    toast({
      title: "Сообщение отправлено",
      description: `Отправлено пользователю ${selectedUserData?.name}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "open":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`;
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
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
            <Button size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "chats" | "tickets")}
        >
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

          <TabsContent value="chats" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
              {/* Chat List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <ScrollArea className="h-full">
                  <div className="divide-y">
                    {chatUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedUser === user.id
                            ? "bg-blue-50 border-r-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => setSelectedUser(user.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                user.isOnline ? "bg-green-500" : "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-sm truncate">
                                {user.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                {user.unreadCount > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs px-1.5 py-0.5"
                                  >
                                    {user.unreadCount}
                                  </Badge>
                                )}
                                <Badge
                                  className={`text-xs px-1.5 py-0.5 ${getStatusColor(user.status)}`}
                                >
                                  {user.status === "active"
                                    ? "Активен"
                                    : user.status === "waiting"
                                      ? "Ожидает"
                                      : "Решен"}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {user.lastMessage}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTime(user.lastMessageTime)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Messages */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col">
                {selectedUserData ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedUserData.avatar} />
                          <AvatarFallback>
                            {selectedUserData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            {selectedUserData.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {selectedUserData.email}
                          </p>
                        </div>
                        <Badge
                          className={getStatusColor(selectedUserData.status)}
                        >
                          {selectedUserData.status === "active"
                            ? "Активен"
                            : selectedUserData.status === "waiting"
                              ? "Ожидает"
                              : "Решен"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Phone" size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MoreVertical" size={16} />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {filteredMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === "admin"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString("ru-RU", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Напишите сообщение..."
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="flex-1"
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Icon
                        name="MessageCircle"
                        size={48}
                        className="mx-auto mb-4 opacity-50"
                      />
                      <p>Выберите чат для начала общения</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status === "new"
                              ? "Новый"
                              : ticket.status === "open"
                                ? "Открыт"
                                : ticket.status === "pending"
                                  ? "Ожидание"
                                  : "Решен"}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority === "urgent"
                              ? "Срочно"
                              : ticket.priority === "high"
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

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>👤 {ticket.userName}</span>
                          <span>📂 {ticket.category}</span>
                          {ticket.assignedTo && (
                            <span>👨‍💼 {ticket.assignedTo}</span>
                          )}
                        </div>
                        <span>{formatTime(ticket.lastActivity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
