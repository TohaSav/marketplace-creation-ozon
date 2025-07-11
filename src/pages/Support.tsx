import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/hooks/useChat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Имитация начального сообщения от администратора
    const initialMessage: Message = {
      id: "1",
      text: "Здравствуйте! Как дела? Чем могу помочь? 😊",
      sender: "admin",
      timestamp: new Date(),
      status: "read",
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Имитация отправки сообщения
    await sendMessage(newMessage);

    // Имитация ответа администратора
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const adminResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Спасибо за ваше сообщение! Мы рассмотрим вашу проблему и свяжемся с вами в ближайшее время.",
          sender: "admin",
          timestamp: new Date(),
          status: "read",
        };
        setMessages((prev) => [...prev, adminResponse]);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Icon name="Check" size={14} className="text-gray-400" />;
      case "delivered":
        return <Icon name="CheckCheck" size={14} className="text-gray-400" />;
      case "read":
        return <Icon name="CheckCheck" size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex flex-col">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback className="bg-green-700 text-white">
                  <Icon name="Headphones" size={20} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">Поддержка Calibre Store</h1>
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-300" : "bg-gray-300"}`}
                  />
                  <span className="text-green-100">
                    {isOnline ? "онлайн" : "офлайн"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-green-700"
              >
                <Icon name="Phone" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-green-700"
              >
                <Icon name="Video" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-green-700"
              >
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 text-xs ${
                      message.sender === "user"
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "user" && getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm px-4 py-2 rounded-lg max-w-xs">
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

          {/* Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:bg-gray-100"
              >
                <Icon name="Paperclip" size={16} />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите сообщение..."
                  className="pr-12"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-gray-100"
                >
                  <Icon name="Smile" size={16} />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  <Icon name="Send" size={16} />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon
                  name="MessageSquare"
                  size={16}
                  className="mr-2 text-blue-500"
                />
                Частые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Найдите ответы на самые популярные вопросы
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Mail" size={16} className="mr-2 text-green-500" />
                Написать email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Отправьте подробное описание проблемы
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Icon name="Phone" size={16} className="mr-2 text-purple-500" />
                Заказать звонок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Мы перезвоним вам в удобное время
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
