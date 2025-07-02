export interface AutoReplySettings {
  enabled: boolean;
  message: string;
  delay: number;
}

export interface NotificationSettings {
  sound: boolean;
  desktop: boolean;
  email: boolean;
}

export interface WorkingHoursSettings {
  enabled: boolean;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface ChatLimitSettings {
  maxConcurrentChats: number;
  responseTimeout: number;
}

export interface TemplateSettings {
  greeting: string;
  closing: string;
  unavailable: string;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "auto";
  chatBubbleColor: string;
  showTypingIndicator: boolean;
}

export interface ModerationSettings {
  profanityFilter: boolean;
  autoBlockSpam: boolean;
  requireApproval: boolean;
}

export interface ChatSettings {
  autoReply: AutoReplySettings;
  notifications: NotificationSettings;
  workingHours: WorkingHoursSettings;
  chatLimits: ChatLimitSettings;
  templates: TemplateSettings;
  appearance: AppearanceSettings;
  moderation: ModerationSettings;
}

export type ChatSettingsTab =
  | "general"
  | "autoReply"
  | "notifications"
  | "workingHours"
  | "templates"
  | "appearance"
  | "moderation";

export interface SettingsTab {
  id: ChatSettingsTab;
  label: string;
  icon: string;
}

export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  autoReply: {
    enabled: false,
    message: "Спасибо за обращение! Наш оператор скоро ответит.",
    delay: 30,
  },
  notifications: {
    sound: true,
    desktop: true,
    email: false,
  },
  workingHours: {
    enabled: false,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Europe/Moscow",
  },
  chatLimits: {
    maxConcurrentChats: 10,
    responseTimeout: 300,
  },
  templates: {
    greeting: "Здравствуйте! Как могу помочь?",
    closing: "Спасибо за обращение! Хорошего дня!",
    unavailable: "К сожалению, все операторы заняты. Попробуйте позже.",
  },
  appearance: {
    theme: "light",
    chatBubbleColor: "#3B82F6",
    showTypingIndicator: true,
  },
  moderation: {
    profanityFilter: true,
    autoBlockSpam: true,
    requireApproval: false,
  },
};

export const SETTINGS_TABS: SettingsTab[] = [
  { id: "general", label: "Основные", icon: "Settings" },
  { id: "autoReply", label: "Автоответы", icon: "MessageSquare" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
  { id: "workingHours", label: "Рабочие часы", icon: "Clock" },
  { id: "templates", label: "Шаблоны", icon: "FileText" },
  { id: "appearance", label: "Внешний вид", icon: "Palette" },
  { id: "moderation", label: "Модерация", icon: "Shield" },
];

export const STORAGE_KEY = "admin-chat-settings";
