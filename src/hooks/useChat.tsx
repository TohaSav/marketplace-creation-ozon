import { useState, useEffect } from "react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  chatId: string;
}

interface ChatRoom {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "active" | "waiting" | "closed";
}

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    const savedRooms = localStorage.getItem("chat-rooms");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedRooms) {
      setChatRooms(JSON.parse(savedRooms));
    }
  }, []);

  // Сохраняем данные в localStorage при изменении
  const saveToStorage = (newMessages: ChatMessage[], newRooms: ChatRoom[]) => {
    localStorage.setItem("chat-messages", JSON.stringify(newMessages));
    localStorage.setItem("chat-rooms", JSON.stringify(newRooms));
  };

  const addMessage = (
    messageData: Omit<ChatMessage, "id" | "timestamp">,
  ): string => {
    const message: ChatMessage = {
      ...messageData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    const newMessages = [...messages, message];
    setMessages(newMessages);

    // Обновляем последнее сообщение в чате
    const chatRoom = chatRooms.find((room) => room.id === message.chatId);
    if (chatRoom) {
      const updatedRooms = chatRooms.map((room) =>
        room.id === message.chatId
          ? {
              ...room,
              lastMessage: message.text,
              lastMessageTime: message.timestamp,
              unreadCount:
                message.sender === "user"
                  ? room.unreadCount + 1
                  : room.unreadCount,
            }
          : room,
      );
      setChatRooms(updatedRooms);
      saveToStorage(newMessages, updatedRooms);
    }

    return message.id;
  };

  const sendMessage = async (
    message: string,
    chatId?: string,
    sender: "user" | "admin" = "admin",
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Определяем чат ID
      let targetChatId = chatId;
      if (!targetChatId && currentUserId) {
        // Создаем или получаем чат для текущего пользователя
        targetChatId = getOrCreateUserChat(currentUserId, "Гость");
      }

      if (!targetChatId) {
        throw new Error("Не удалось определить чат");
      }

      // Добавляем сообщение в хранилище
      addMessage({
        text: message,
        sender,
        status: "sent",
        chatId: targetChatId,
      });

      // Имитация отправки (можно заменить на реальный API)
      await new Promise((resolve) => setTimeout(resolve, 300));

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка отправки сообщения",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendUserMessage = async (message: string): Promise<boolean> => {
    return sendMessage(message, undefined, "user");
  };

  const sendAdminMessage = async (
    message: string,
    chatId: string,
  ): Promise<boolean> => {
    return sendMessage(message, chatId, "admin");
  };

  const createChatRoom = (
    userId: string,
    userName: string,
    userEmail?: string,
  ): string => {
    const chatId = `chat_${userId}_${Date.now()}`;
    const newChatRoom: ChatRoom = {
      id: chatId,
      userId,
      userName,
      userEmail,
      lastMessage: "",
      lastMessageTime: new Date(),
      unreadCount: 0,
      status: "active",
    };

    const newRooms = [...chatRooms, newChatRoom];
    setChatRooms(newRooms);
    saveToStorage(messages, newRooms);

    return chatId;
  };

  const getOrCreateUserChat = (
    userId: string,
    userName: string,
    userEmail?: string,
  ): string => {
    const existingChat = chatRooms.find((room) => room.userId === userId);
    if (existingChat) {
      return existingChat.id;
    }
    return createChatRoom(userId, userName, userEmail);
  };

  const createNewUserChat = (userId: string, userName: string): string => {
    setCurrentUserId(userId);
    return getOrCreateUserChat(userId, userName);
  };

  const getChatMessages = (chatId: string) => {
    return messages.filter((msg) => msg.chatId === chatId);
  };

  const updateChatRoom = (chatId: string, updates: Partial<ChatRoom>) => {
    const updatedRooms = chatRooms.map((room) =>
      room.id === chatId ? { ...room, ...updates } : room,
    );
    setChatRooms(updatedRooms);
    saveToStorage(messages, updatedRooms);
  };

  const deleteChatRoom = (chatId: string) => {
    const updatedRooms = chatRooms.filter((room) => room.id !== chatId);
    const updatedMessages = messages.filter((msg) => msg.chatId !== chatId);
    setChatRooms(updatedRooms);
    setMessages(updatedMessages);
    saveToStorage(updatedMessages, updatedRooms);
  };

  const getChatRoomById = (chatId: string) => {
    return chatRooms.find((room) => room.id === chatId);
  };

  const closeChat = async (chatId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      updateChatRoom(chatId, { status: "closed" });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка закрытия чата");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = async (chatId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      deleteChatRoom(chatId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления чата");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const markChatAsRead = (chatId: string) => {
    updateChatRoom(chatId, { unreadCount: 0 });
  };

  const getActiveChatCount = (): number => {
    return chatRooms.filter((room) => room.status === "active").length;
  };

  const getWaitingChatCount = (): number => {
    return chatRooms.filter((room) => room.status === "waiting").length;
  };

  const getUnreadMessageCount = (): number => {
    return chatRooms.reduce((total, room) => total + room.unreadCount, 0);
  };

  return {
    // Данные
    messages,
    chatRooms,
    currentUserId,

    // Методы для сообщений
    sendMessage,
    sendUserMessage,
    sendAdminMessage,
    getChatMessages,

    // Методы для чатов
    createNewUserChat,
    closeChat,
    deleteChat,
    markChatAsRead,
    getChatRoomById,

    // Статистика
    getActiveChatCount,
    getWaitingChatCount,
    getUnreadMessageCount,

    // Состояние
    isLoading,
    error,
  };
};
