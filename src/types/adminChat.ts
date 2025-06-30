export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  userId: string;
  userName: string;
  status: "sent" | "read";
}

export interface ChatUser {
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

export interface SupportTicket {
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

export type AdminChatTab = "chats" | "tickets";

export type TicketStatus = "new" | "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type UserStatus = "active" | "waiting" | "resolved";
