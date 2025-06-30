import { ChatUser, ChatMessage, SupportTicket } from "@/types/adminChat";

export const SAMPLE_CHAT_USERS: ChatUser[] = [
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
];

export const SAMPLE_TICKETS: SupportTicket[] = [
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
];

export const SAMPLE_MESSAGES: ChatMessage[] = [
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
];

export const STATUS_COLORS = {
  new: "bg-red-100 text-red-800",
  open: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  active: "bg-green-100 text-green-800",
  waiting: "bg-yellow-100 text-yellow-800",
};

export const PRIORITY_COLORS = {
  urgent: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow-500 text-white",
  low: "bg-green-500 text-white",
};

export const STATUS_LABELS = {
  new: "Новый",
  open: "Открыт",
  pending: "Ожидание",
  resolved: "Решен",
  active: "Активен",
  waiting: "Ожидает",
};

export const PRIORITY_LABELS = {
  urgent: "Срочно",
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};
