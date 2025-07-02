export type TicketStatus =
  | "new"
  | "open"
  | "pending"
  | "resolved"
  | "closed"
  | "deleted";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory =
  | "general"
  | "technical"
  | "billing"
  | "refund"
  | "product"
  | "delivery"
  | "account"
  | "other";

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdAt: Date;
  updatedAt: Date;
  lastActivity: Date;
  assignedTo?: string;
  attachments?: TicketAttachment[];
  tags?: string[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  content: string;
  sender: "user" | "admin";
  senderName: string;
  timestamp: Date;
  attachments?: TicketAttachment[];
  isPrivateNote?: boolean; // Приватные заметки только для админов
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface CreateTicketData {
  subject: string;
  description: string;
  category: TicketCategory;
  priority?: TicketPriority;
  attachments?: File[];
}

export interface UpdateTicketData {
  subject?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: string;
  tags?: string[];
}

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  assignedTo?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface TicketStats {
  total: number;
  new: number;
  open: number;
  pending: number;
  resolved: number;
  closed: number;
  avgResponseTime: number; // в минутах
  avgResolutionTime: number; // в минутах
}

// Константы для UI
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  new: "Новый",
  open: "Открыт",
  pending: "Ожидание",
  resolved: "Решен",
  closed: "Закрыт",
  deleted: "Удален",
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  urgent: "Срочно",
};

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  general: "Общие вопросы",
  technical: "Технические проблемы",
  billing: "Оплата и счета",
  refund: "Возврат средств",
  product: "Товары и услуги",
  delivery: "Доставка",
  account: "Аккаунт",
  other: "Другое",
};

export const TICKET_STATUS_COLORS: Record<TicketStatus, string> = {
  new: "bg-red-100 text-red-800 border-red-200",
  open: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
  deleted: "bg-red-100 text-red-800 border-red-200",
};

export const TICKET_PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-orange-500 text-white",
  urgent: "bg-red-500 text-white",
};
