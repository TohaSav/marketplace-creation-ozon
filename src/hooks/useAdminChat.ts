import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  ChatUser,
  ChatMessage,
  SupportTicket,
  AdminChatTab,
} from "@/types/adminChat";
import {
  SAMPLE_CHAT_USERS,
  SAMPLE_TICKETS,
  SAMPLE_MESSAGES,
} from "@/constants/adminChat";

export const useAdminChat = () => {
  const [activeTab, setActiveTab] = useState<AdminChatTab>("chats");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Данные (в реальном приложении они бы приходили из API)
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [tickets] = useState<SupportTicket[]>(SAMPLE_TICKETS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedUsers = localStorage.getItem("admin-chat-users");
    const savedMessages = localStorage.getItem("admin-chat-messages");

    if (savedUsers) {
      setChatUsers(JSON.parse(savedUsers));
    } else {
      setChatUsers(SAMPLE_CHAT_USERS);
      localStorage.setItem(
        "admin-chat-users",
        JSON.stringify(SAMPLE_CHAT_USERS),
      );
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(SAMPLE_MESSAGES);
      localStorage.setItem(
        "admin-chat-messages",
        JSON.stringify(SAMPLE_MESSAGES),
      );
    }
  }, []);

  // Сохранение пользователей в localStorage
  const saveChatUsers = (users: ChatUser[]) => {
    setChatUsers(users);
    localStorage.setItem("admin-chat-users", JSON.stringify(users));
  };

  // Сохранение сообщений в localStorage
  const saveChatMessages = (msgs: ChatMessage[]) => {
    setMessages(msgs);
    localStorage.setItem("admin-chat-messages", JSON.stringify(msgs));
  };

  // Получить выбранного пользователя
  const selectedUserData = selectedUser
    ? chatUsers.find((u) => u.id === selectedUser)
    : null;

  // Получить выбранный тикет
  const selectedTicketData = selectedTicket
    ? tickets.find((t) => t.id === selectedTicket)
    : null;

  // Получить сообщения для выбранного пользователя
  const filteredMessages = selectedUser
    ? messages.filter((m) => m.userId === selectedUser)
    : [];

  // Отправить сообщение
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

    const updatedMessages = [...messages, adminMessage];
    saveChatMessages(updatedMessages);
    setNewMessage("");

    toast({
      title: "Сообщение отправлено",
      description: `Отправлено пользователю ${selectedUserData?.name}`,
    });
  };

  // Удалить диалог пользователя
  const deleteUserChat = (userId: string) => {
    const updatedUsers = chatUsers.filter((user) => user.id !== userId);
    const updatedMessages = messages.filter(
      (message) => message.userId !== userId,
    );

    saveChatUsers(updatedUsers);
    saveChatMessages(updatedMessages);

    // Если удаляем выбранного пользователя, сбрасываем selection
    if (selectedUser === userId) {
      setSelectedUser(null);
    }

    toast({
      title: "Диалог удален",
      description: "Диалог пользователя успешно удален",
    });
  };

  // Выбрать пользователя
  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    setSelectedTicket(null); // Сбрасываем выбранный тикет
  };

  // Выбрать тикет
  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setSelectedUser(null); // Сбрасываем выбранного пользователя
  };

  // Изменить активную вкладку
  const handleTabChange = (tab: AdminChatTab) => {
    setActiveTab(tab);
    setSelectedUser(null);
    setSelectedTicket(null);
    setNewMessage("");
  };

  return {
    // State
    activeTab,
    selectedUser,
    selectedTicket,
    newMessage,
    searchQuery,

    // Data
    chatUsers,
    tickets,
    messages: filteredMessages,
    selectedUserData,
    selectedTicketData,

    // Actions
    setActiveTab: handleTabChange,
    setSelectedUser: handleUserSelect,
    setSelectedTicket: handleTicketSelect,
    setNewMessage,
    setSearchQuery,
    sendMessage,
    deleteUserChat,

    // Utilities
    toast,
  };
};
