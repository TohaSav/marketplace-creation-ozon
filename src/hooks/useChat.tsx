import { useState } from "react";
import { useChatStore } from "@/store/chatStore";

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    chatRooms,
    currentUserId,
    addMessage,
    markMessageAsRead,
    getMessagesByChatId,
    createChatRoom,
    updateChatRoom,
    deleteChatRoom,
    getChatRoomById,
    getOrCreateUserChat,
    setCurrentUserId,
    setConnectionStatus,
  } = useChatStore();

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
      const messageId = addMessage({
        text: message,
        sender,
        status: "sent",
        chatId: targetChatId,
      });

      // Имитация отправки (можно заменить на реальный API)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Отмечаем как доставленное
      markMessageAsRead(messageId);

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

  const createNewUserChat = (userId: string, userName: string): string => {
    setCurrentUserId(userId);
    return getOrCreateUserChat(userId, userName);
  };

  const getChatMessages = (chatId: string) => {
    return getMessagesByChatId(chatId);
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
