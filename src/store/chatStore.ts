import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  chatId: string;
}

export interface ChatRoom {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "active" | "waiting" | "closed";
}

interface ChatStore {
  // Состояние
  messages: ChatMessage[];
  chatRooms: ChatRoom[];
  currentUserId: string | null;
  isConnected: boolean;

  // Действия для сообщений
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => string;
  markMessageAsRead: (messageId: string) => void;
  getMessagesByChatId: (chatId: string) => ChatMessage[];

  // Действия для чатов
  createChatRoom: (
    userId: string,
    userName: string,
    userEmail?: string,
  ) => string;
  updateChatRoom: (chatId: string, updates: Partial<ChatRoom>) => void;
  deleteChatRoom: (chatId: string) => void;
  getChatRoomById: (chatId: string) => ChatRoom | undefined;
  getOrCreateUserChat: (
    userId: string,
    userName: string,
    userEmail?: string,
  ) => string;

  // Системные действия
  setCurrentUserId: (userId: string) => void;
  setConnectionStatus: (status: boolean) => void;
  clearAllData: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      messages: [],
      chatRooms: [],
      currentUserId: null,
      isConnected: false,

      // Действия для сообщений
      addMessage: (messageData) => {
        const message: ChatMessage = {
          ...messageData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        };

        set((state) => ({
          messages: [...state.messages, message],
        }));

        // Обновляем последнее сообщение в чате
        const chatRoom = get().getChatRoomById(message.chatId);
        if (chatRoom) {
          get().updateChatRoom(message.chatId, {
            lastMessage: message.text,
            lastMessageTime: message.timestamp,
            unreadCount:
              message.sender === "user"
                ? chatRoom.unreadCount + 1
                : chatRoom.unreadCount,
          });
        }

        return message.id;
      },

      markMessageAsRead: (messageId) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, status: "read" } : msg,
          ),
        }));
      },

      getMessagesByChatId: (chatId) => {
        return get().messages.filter((msg) => msg.chatId === chatId);
      },

      // Действия для чатов
      createChatRoom: (userId, userName, userEmail) => {
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

        set((state) => ({
          chatRooms: [...state.chatRooms, newChatRoom],
        }));

        return chatId;
      },

      updateChatRoom: (chatId, updates) => {
        set((state) => ({
          chatRooms: state.chatRooms.map((room) =>
            room.id === chatId ? { ...room, ...updates } : room,
          ),
        }));
      },

      deleteChatRoom: (chatId) => {
        set((state) => ({
          chatRooms: state.chatRooms.filter((room) => room.id !== chatId),
          messages: state.messages.filter((msg) => msg.chatId !== chatId),
        }));
      },

      getChatRoomById: (chatId) => {
        return get().chatRooms.find((room) => room.id === chatId);
      },

      getOrCreateUserChat: (userId, userName, userEmail) => {
        const existingChat = get().chatRooms.find(
          (room) => room.userId === userId,
        );
        if (existingChat) {
          return existingChat.id;
        }
        return get().createChatRoom(userId, userName, userEmail);
      },

      // Системные действия
      setCurrentUserId: (userId) => {
        set({ currentUserId: userId });
      },

      setConnectionStatus: (status) => {
        set({ isConnected: status });
      },

      clearAllData: () => {
        set({
          messages: [],
          chatRooms: [],
          currentUserId: null,
          isConnected: false,
        });
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        messages: state.messages,
        chatRooms: state.chatRooms,
      }),
    },
  ),
);
