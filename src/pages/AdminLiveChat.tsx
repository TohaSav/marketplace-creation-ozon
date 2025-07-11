import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { useChat } from "@/hooks/useChat";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatRoom {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "active" | "waiting" | "closed";
  messages: ChatMessage[];
}

export default function AdminLiveChat() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: "1",
      userId: "user_123",
      userName: "Анна Иванова",
      userAvatar: "/api/placeholder/40/40",
      lastMessage: "Здравствуйте! У меня проблема с заказом",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      status: "waiting",
      messages: [
        {
          id: "1",
          text: "Здравствуйте! У меня проблема с заказом",
          sender: "user",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          status: "delivered",
        },
        {
          id: "2",
          text: "Заказ #12345 не пришел в указанное время",
          sender: "user",
          timestamp: new Date(Date.now() - 4 * 60 * 1000),
          status: "delivered",
        },
      ],
    },
    {
      id: "2",
      userId: "user_456",
      userName: "Петр Сидоров",
      userAvatar: "/api/placeholder/40/40",
      lastMessage: "Спасибо за помощь!",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      status: "closed",
      messages: [
        {
          id: "1",
          text: "Как вернуть товар?",
          sender: "user",
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          status: "read",
        },
        {
          id: "2",
          text: "Для возврата товара нужно заполнить форму на сайте",
          sender: "admin",
          timestamp: new Date(Date.now() - 40 * 60 * 1000),
          status: "read",
        },
        {
          id: "3",
          text: "Спасибо за помощь!",
          sender: "user",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: "read",
        },
      ],
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading } = useChat();

  const selectedChat = chatRooms.find((chat) => chat.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "admin",
      timestamp: new Date(),
      status: "sent",
    };

    // Добавляем сообщение в чат
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === selectedChatId
          ? {
              ...room,
              messages: [...room.messages, message],
              lastMessage: newMessage,
              lastMessageTime: new Date(),
            }
          : room,
      ),
    );

    setNewMessage("");
    await sendMessage(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60 * 1000) {
      return "только что";
    } else if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))} мин назад`;
    } else if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("ru-RU");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "waiting":
        return "bg-yellow-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активный";
      case "waiting":
        return "Ожидает";
      case "closed":
        return "Закрыт";
      default:
        return status;
    }
  };

  const markAsRead = (chatId: string) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === chatId ? { ...room, unreadCount: 0 } : room,
      ),
    );
  };

  const closeChat = (chatId: string) => {
    setChatRooms((prev) =>
      prev.map((room) =>
        room.id === chatId ? { ...room, status: "closed" } : room,
      ),
    );
  };

  const deleteChat = (chatId: string) => {
    setChatRooms((prev) => prev.filter((room) => room.id !== chatId));
    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Живой чат</h1>
            <p className="text-gray-600">Управление чатами с клиентами</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <Icon name="Circle" size={8} className="mr-1 fill-current" />
              Онлайн
            </Badge>
            <span className="text-sm text-gray-500">
              {chatRooms.filter((room) => room.status === "waiting").length}{" "}
              ожидают ответа
            </span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Чаты</span>
                <Badge variant="secondary">{chatRooms.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-1">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => {
                        setSelectedChatId(room.id);
                        markAsRead(room.id);
                      }}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChatId === room.id
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={room.userAvatar} />
                            <AvatarFallback className="bg-gray-200">
                              {room.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(room.status)}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {room.userName}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTime(room.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {room.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getStatusText(room.status)}
                            </Badge>
                            {room.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {room.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedChat.userAvatar} />
                      <AvatarFallback className="bg-gray-200">
                        {selectedChat.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChat.userName}</h3>
                      <p className="text-sm text-gray-600">
                        ID: {selectedChat.userId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => closeChat(selectedChat.id)}
                    >
                      <Icon name="CheckCircle" size={16} className="mr-1" />
                      Закрыть
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteChat(selectedChat.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "admin"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <div className="flex items-center justify-end space-x-1 mt-1">
                              <span className="text-xs opacity-70">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === "admin" && (
                                <Icon
                                  name={
                                    message.status === "read"
                                      ? "CheckCheck"
                                      : "Check"
                                  }
                                  size={12}
                                  className="opacity-70"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 px-4 py-2 rounded-lg">
                            <div className="flex items-center space-x-1">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">
                                печатает...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                      >
                        <Icon name="Paperclip" size={16} />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Введите сообщение..."
                          className="pr-12"
                          disabled={isLoading}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          <Icon name="Smile" size={16} />
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <Icon
                            name="Loader2"
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Icon name="Send" size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-[500px]">
                <div className="text-center">
                  <Icon
                    name="MessageSquare"
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Выберите чат
                  </h3>
                  <p className="text-gray-600">
                    Выберите чат из списка слева для начала общения
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
