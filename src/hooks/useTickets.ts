import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Ticket,
  TicketMessage,
  CreateTicketData,
  UpdateTicketData,
  TicketFilters,
  TicketStats,
  TicketStatus,
} from "@/types/tickets";

// Примеры данных (в реальном приложении будут загружаться с сервера)
const SAMPLE_TICKETS: Ticket[] = [
  {
    id: "ticket-1",
    userId: "user-1",
    userName: "Алексей Петров",
    userEmail: "alexey@example.com",
    subject: "Проблема с оплатой заказа",
    description:
      "Не могу оплатить заказ картой, возникает ошибка при обработке платежа",
    status: "new",
    priority: "high",
    category: "billing",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ["payment", "urgent"],
  },
  {
    id: "ticket-2",
    userId: "user-2",
    userName: "Мария Иванова",
    userEmail: "maria@example.com",
    subject: "Вопрос по доставке",
    description: "Когда будет доставлен заказ №12345? Заказывала неделю назад",
    status: "open",
    priority: "medium",
    category: "delivery",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
    assignedTo: "admin",
  },
  {
    id: "ticket-3",
    userId: "user-3",
    userName: "Сергей Козлов",
    userEmail: "sergey@example.com",
    subject: "Возврат товара",
    description: "Товар не подошел по размеру, хочу оформить возврат",
    status: "resolved",
    priority: "low",
    category: "refund",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 дня назад
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    assignedTo: "admin",
  },
];

const SAMPLE_MESSAGES: TicketMessage[] = [
  {
    id: "msg-1",
    ticketId: "ticket-2",
    content:
      "Здравствуйте! Проверил ваш заказ, он находится на складе и будет отправлен сегодня.",
    sender: "admin",
    senderName: "Администратор",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "msg-2",
    ticketId: "ticket-3",
    content:
      "Заявка на возврат оформлена. Курьер заберет товар завтра с 10:00 до 18:00.",
    sender: "admin",
    senderName: "Администратор",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TicketFilters>({});
  const { toast } = useToast();

  // Загрузка данных при инициализации
  useEffect(() => {
    loadTickets();
    loadMessages();
  }, []);

  const loadTickets = useCallback(() => {
    setLoading(true);
    try {
      const savedTickets = localStorage.getItem("support-tickets");
      if (savedTickets) {
        const parsedTickets = JSON.parse(savedTickets).map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
          lastActivity: new Date(t.lastActivity),
        }));
        setTickets(parsedTickets.filter((t: Ticket) => t.status !== "deleted"));
      } else {
        setTickets(SAMPLE_TICKETS);
        localStorage.setItem("support-tickets", JSON.stringify(SAMPLE_TICKETS));
      }
    } catch (error) {
      console.error("Ошибка загрузки тикетов:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить тикеты",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadMessages = useCallback(() => {
    try {
      const savedMessages = localStorage.getItem("support-messages");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(parsedMessages);
      } else {
        setMessages(SAMPLE_MESSAGES);
        localStorage.setItem(
          "support-messages",
          JSON.stringify(SAMPLE_MESSAGES),
        );
      }
    } catch (error) {
      console.error("Ошибка загрузки сообщений:", error);
    }
  }, []);

  const saveTickets = (updatedTickets: Ticket[]) => {
    try {
      localStorage.setItem("support-tickets", JSON.stringify(updatedTickets));
      setTickets(updatedTickets.filter((t) => t.status !== "deleted"));
    } catch (error) {
      console.error("Ошибка сохранения тикетов:", error);
    }
  };

  const saveMessages = (updatedMessages: TicketMessage[]) => {
    try {
      localStorage.setItem("support-messages", JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Ошибка сохранения сообщений:", error);
    }
  };

  // Создание тикета
  const createTicket = useCallback(
    async (
      data: CreateTicketData & {
        userId: string;
        userName: string;
        userEmail: string;
      },
    ) => {
      try {
        const newTicket: Ticket = {
          id: `ticket-${Date.now()}`,
          userId: data.userId,
          userName: data.userName,
          userEmail: data.userEmail,
          subject: data.subject,
          description: data.description,
          status: "new",
          priority: data.priority || "medium",
          category: data.category,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastActivity: new Date(),
        };

        const allTickets = JSON.parse(
          localStorage.getItem("support-tickets") || "[]",
        );
        const updatedTickets = [...allTickets, newTicket];
        saveTickets(updatedTickets);

        toast({
          title: "Тикет создан",
          description: `Тикет #${newTicket.id} успешно создан`,
        });

        return newTicket;
      } catch (error) {
        console.error("Ошибка создания тикета:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось создать тикет",
          variant: "destructive",
        });
        return null;
      }
    },
    [toast],
  );

  // Обновление тикета
  const updateTicket = useCallback(
    async (ticketId: string, data: UpdateTicketData) => {
      try {
        const allTickets = JSON.parse(
          localStorage.getItem("support-tickets") || "[]",
        );
        const updatedTickets = allTickets.map((ticket: Ticket) => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              ...data,
              updatedAt: new Date(),
              lastActivity: new Date(),
            };
          }
          return ticket;
        });

        saveTickets(updatedTickets);

        toast({
          title: "Тикет обновлен",
          description: "Изменения сохранены",
        });

        return true;
      } catch (error) {
        console.error("Ошибка обновления тикета:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить тикет",
          variant: "destructive",
        });
        return false;
      }
    },
    [toast],
  );

  // Удаление тикета (мягкое удаление)
  const deleteTicket = useCallback(
    async (ticketId: string) => {
      try {
        const allTickets = JSON.parse(
          localStorage.getItem("support-tickets") || "[]",
        );
        const updatedTickets = allTickets.map((ticket: Ticket) => {
          if (ticket.id === ticketId) {
            return {
              ...ticket,
              status: "deleted" as TicketStatus,
              updatedAt: new Date(),
            };
          }
          return ticket;
        });

        saveTickets(updatedTickets);

        // Также удаляем сообщения для этого тикета
        const updatedMessages = messages.filter(
          (msg) => msg.ticketId !== ticketId,
        );
        saveMessages(updatedMessages);

        toast({
          title: "Тикет удален",
          description: "Тикет успешно удален",
        });

        return true;
      } catch (error) {
        console.error("Ошибка удаления тикета:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить тикет",
          variant: "destructive",
        });
        return false;
      }
    },
    [messages, toast],
  );

  // Добавление сообщения к тикету
  const addMessage = useCallback(
    async (
      ticketId: string,
      content: string,
      sender: "user" | "admin",
      senderName: string,
      isPrivateNote = false,
    ) => {
      try {
        const newMessage: TicketMessage = {
          id: `msg-${Date.now()}`,
          ticketId,
          content,
          sender,
          senderName,
          timestamp: new Date(),
          isPrivateNote,
        };

        const updatedMessages = [...messages, newMessage];
        saveMessages(updatedMessages);

        // Обновляем активность тикета
        await updateTicket(ticketId, {
          status: sender === "admin" ? "open" : "pending",
        });

        toast({
          title: "Сообщение отправлено",
          description: "Ответ добавлен к тикету",
        });

        return newMessage;
      } catch (error) {
        console.error("Ошибка добавления сообщения:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось отправить сообщение",
          variant: "destructive",
        });
        return null;
      }
    },
    [messages, updateTicket, toast],
  );

  // Получение сообщений для тикета
  const getTicketMessages = useCallback(
    (ticketId: string) => {
      return messages.filter((msg) => msg.ticketId === ticketId);
    },
    [messages],
  );

  // Получение статистики
  const getStats = useCallback((): TicketStats => {
    const allTickets = tickets;
    return {
      total: allTickets.length,
      new: allTickets.filter((t) => t.status === "new").length,
      open: allTickets.filter((t) => t.status === "open").length,
      pending: allTickets.filter((t) => t.status === "pending").length,
      resolved: allTickets.filter((t) => t.status === "resolved").length,
      closed: allTickets.filter((t) => t.status === "closed").length,
      avgResponseTime: 120, // TODO: рассчитать реальное время
      avgResolutionTime: 1440, // TODO: рассчитать реальное время
    };
  }, [tickets]);

  // Фильтрация тикетов
  const filteredTickets = tickets.filter((ticket) => {
    if (
      filters.status &&
      filters.status.length > 0 &&
      !filters.status.includes(ticket.status)
    ) {
      return false;
    }
    if (
      filters.priority &&
      filters.priority.length > 0 &&
      !filters.priority.includes(ticket.priority)
    ) {
      return false;
    }
    if (
      filters.category &&
      filters.category.length > 0 &&
      !filters.category.includes(ticket.category)
    ) {
      return false;
    }
    if (
      filters.search &&
      !ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ticket.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return {
    // Data
    tickets: filteredTickets,
    allTickets: tickets,
    messages,
    loading,
    filters,
    stats: getStats(),

    // Actions
    createTicket,
    updateTicket,
    deleteTicket,
    addMessage,
    getTicketMessages,
    setFilters,
    loadTickets,
    loadMessages,
  };
};
