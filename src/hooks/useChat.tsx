import { useState, useEffect } from "react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  messages: ChatMessage[];
  status: "active" | "waiting" | "closed";
  lastActivity: Date;
}

export const useChat = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Имитация WebSocket подключения
  useEffect(() => {
    // Здесь будет реальное подключение к WebSocket
    console.log("Chat connection established");

    // Имитация получения сообщений
    const interval = setInterval(() => {
      // Имитация новых сообщений от пользователей
      const randomMessages = [
        "Здравствуйте! Нужна помощь с заказом",
        "Как вернуть товар?",
        "Проблема с оплатой",
        "Когда будет доставка?",
        "Спасибо за помощь!",
      ];

      // Случайно добавляем новые сообщения
      if (Math.random() > 0.95) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text: randomMessages[
            Math.floor(Math.random() * randomMessages.length)
          ],
          sender: "user",
          timestamp: new Date(),
          status: "sent",
        };

        // Добавляем в localStorage для демонстрации
        const existingChats = JSON.parse(
          localStorage.getItem("liveChats") || "[]",
        );
        const updatedChats = [...existingChats, newMessage];
        localStorage.setItem("liveChats", JSON.stringify(updatedChats));
      }
    }, 10000); // Каждые 10 секунд

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (
    message: string,
    chatId?: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация отправки сообщения через API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message,
        sender: "admin",
        timestamp: new Date(),
        status: "sent",
      };

      // Сохраняем в localStorage для демонстрации
      const existingChats = JSON.parse(
        localStorage.getItem("liveChats") || "[]",
      );
      const updatedChats = [...existingChats, newMessage];
      localStorage.setItem("liveChats", JSON.stringify(updatedChats));

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

  const createChatSession = async (
    userId: string,
    userName: string,
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const sessionId = Date.now().toString();
      const newSession: ChatSession = {
        id: sessionId,
        userId,
        userName,
        messages: [],
        status: "active",
        lastActivity: new Date(),
      };

      setChatSessions((prev) => [...prev, newSession]);
      return sessionId;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка создания чата");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const closeChatSession = async (sessionId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId ? { ...session, status: "closed" } : session,
        ),
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка закрытия чата");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChatSession = async (sessionId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      setChatSessions((prev) =>
        prev.filter((session) => session.id !== sessionId),
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления чата");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getChatHistory = async (sessionId: string): Promise<ChatMessage[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация получения истории чата
      const session = chatSessions.find((s) => s.id === sessionId);
      return session?.messages || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка получения истории");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (
    sessionId: string,
    messageId: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: session.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, status: "read" } : msg,
                ),
              }
            : session,
        ),
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отметки прочтения");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveChatCount = (): number => {
    return chatSessions.filter((session) => session.status === "active").length;
  };

  const getWaitingChatCount = (): number => {
    return chatSessions.filter((session) => session.status === "waiting")
      .length;
  };

  const getUnreadMessageCount = (): number => {
    return chatSessions.reduce((total, session) => {
      return (
        total +
        session.messages.filter(
          (msg) => msg.sender === "user" && msg.status !== "read",
        ).length
      );
    }, 0);
  };

  return {
    chatSessions,
    sendMessage,
    createChatSession,
    closeChatSession,
    deleteChatSession,
    getChatHistory,
    markAsRead,
    getActiveChatCount,
    getWaitingChatCount,
    getUnreadMessageCount,
    isLoading,
    error,
  };
};
