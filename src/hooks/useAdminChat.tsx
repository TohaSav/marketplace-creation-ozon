import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

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

export function useAdminChat() {
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

  return {
    activeTab,
    selectedUser,
    selectedTicket,
    newMessage,
    searchQuery,
    chatUsers,
    tickets,
    messages: filteredMessages,
    selectedUserData,
    messagesEndRef,
    setActiveTab,
    setSelectedUser,
    setSelectedTicket,
    setNewMessage,
    setSearchQuery,
    sendMessage,
  };
}
