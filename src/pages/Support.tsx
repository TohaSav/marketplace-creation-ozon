import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
  status?: "sending" | "sent" | "read";
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Я Анна, ваш помощник по поддержке. Чем могу помочь?",
      sender: "support",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "sent",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "T001",
      subject: "Проблема с заказом #12345",
      status: "open",
      lastMessage: "Заказ не пришел в указанный срок",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 1,
    },
    {
      id: "T002",
      subject: "Вопрос по возврату",
      status: "resolved",
      lastMessage: "Спасибо за помощь!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"chat" | "tickets">("chat");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Имитируем отправку сообщения
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "sent" } : msg,
        ),
      );
    }, 1000);

    // Имитируем ответ поддержки
    setTimeout(
      () => {
        setIsTyping(false);
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getAutoReply(newMessage),
          sender: "support",
          timestamp: new Date(),
          status: "sent",
        };
        setMessages((prev) => [...prev, supportMessage]);

        // Уведомление о новом сообщении
        addNotification(
          "Новое сообщение от поддержки",
          supportMessage.text.slice(0, 50) + "...",
        );
      },
      2000 + Math.random() * 2000,
    );
  };

  const getAutoReply = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("заказ") || msg.includes("доставка")) {
      return "Понял вас! Для проверки статуса заказа укажите, пожалуйста, номер заказа. Я сразу все проверю для вас.";
    }
    if (msg.includes("возврат") || msg.includes("вернуть")) {
      return "Конечно помогу с возвратом! Расскажите подробнее о проблеме с товаром. Мы решим этот вопрос максимально быстро.";
    }
    if (msg.includes("оплата") || msg.includes("деньги")) {
      return "Я помогу разобраться с вопросом по оплате. Опишите, пожалуйста, ситуацию подробнее.";
    }
    return "Спасибо за обращение! Передаю ваш вопрос специалисту. В ближайшее время с вами свяжется наш эксперт.";
  };

  const addNotification = (title: string, message: string) => {
    // Добавляем уведомление в localStorage для страницы уведомлений
    const notifications = JSON.parse(
      localStorage.getItem("notifications") || "[]",
    );
    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type: "support",
      timestamp: new Date().toISOString(),
      read: false,
    };
    notifications.unshift(newNotification);
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications.slice(0, 100)),
    ); // Храним последние 100
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Открыт";
      case "pending":
        return "В ожидании";
      case "resolved":
        return "Решен";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Центр поддержки
          </h1>
          <p className="text-gray-600">Мы здесь, чтобы помочь вам 24/7</p>
        </div>

        {/* Status Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
              <span className="font-medium">
                {isOnline ? "Поддержка онлайн" : "Поддержка оффлайн"}
              </span>
              <span className="text-sm text-gray-500">
                Среднее время ответа: 2 мин
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "chat" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("chat")}
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Чат
              </Button>
              <Button
                variant={activeTab === "tickets" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("tickets")}
              >
                <Icon name="Ticket" size={16} className="mr-2" />
                Тикеты
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "chat" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Chat Messages */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "user" && message.status && (
                          <Icon
                            name={message.status === "sent" ? "Check" : "Clock"}
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
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напишите ваше сообщение..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Ваши обращения</h2>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новое обращение
                </Button>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusText(ticket.status)}
                        </Badge>
                        {ticket.unreadCount > 0 && (
                          <Badge variant="destructive">
                            {ticket.unreadCount} новых
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        #{ticket.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {ticket.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400">
                      {ticket.timestamp.toLocaleString("ru-RU")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Icon
              name="BookOpen"
              className="mx-auto mb-3 text-blue-600"
              size={32}
            />
            <h3 className="font-semibold mb-2">База знаний</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ответы на часто задаваемые вопросы
            </p>
            <Button variant="outline" size="sm">
              Открыть
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Icon
              name="Phone"
              className="mx-auto mb-3 text-green-600"
              size={32}
            />
            <h3 className="font-semibold mb-2">Горячая линия</h3>
            <p className="text-sm text-gray-600 mb-4">
              8 800 555-35-35 (бесплатно)
            </p>
            <Button variant="outline" size="sm">
              Позвонить
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Icon
              name="Mail"
              className="mx-auto mb-3 text-purple-600"
              size={32}
            />
            <h3 className="font-semibold mb-2">Email поддержка</h3>
            <p className="text-sm text-gray-600 mb-4">support@example.com</p>
            <Button variant="outline" size="sm">
              Написать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
