import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { useTickets } from "@/hooks/useTickets";
import {
  Ticket,
  TicketMessage,
  TicketStatus,
  TicketPriority,
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY_LABELS,
  TICKET_CATEGORY_LABELS,
  TICKET_STATUS_COLORS,
  TICKET_PRIORITY_COLORS,
} from "@/types/tickets";

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: () => void;
}

export default function TicketDetails({
  ticket,
  onClose,
  onUpdate,
}: TicketDetailsProps) {
  const { getTicketMessages, addMessage, updateTicket } = useTickets();
  const [newReply, setNewReply] = useState("");
  const [isPrivateNote, setIsPrivateNote] = useState(false);
  const [sending, setSending] = useState(false);

  const messages = getTicketMessages(ticket.id);

  const handleSendReply = async () => {
    if (!newReply.trim()) return;

    setSending(true);
    try {
      await addMessage(
        ticket.id,
        newReply,
        "admin",
        "Администратор",
        isPrivateNote,
      );
      setNewReply("");
      setIsPrivateNote(false);
      onUpdate();
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    await updateTicket(ticket.id, { status: newStatus });
    onUpdate();
  };

  const handlePriorityChange = async (newPriority: TicketPriority) => {
    await updateTicket(ticket.id, { priority: newPriority });
    onUpdate();
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h2 className="text-xl font-semibold">{ticket.subject}</h2>
            <p className="text-sm text-gray-500">
              Тикет #{ticket.id.slice(-6)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={TICKET_STATUS_COLORS[ticket.status]}>
            {TICKET_STATUS_LABELS[ticket.status]}
          </Badge>
          <Badge className={TICKET_PRIORITY_COLORS[ticket.priority]}>
            {TICKET_PRIORITY_LABELS[ticket.priority]}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex gap-6 p-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Ticket Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Информация о тикете</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Пользователь
                  </label>
                  <div className="mt-1">
                    <div className="font-medium">{ticket.userName}</div>
                    <div className="text-sm text-gray-500">
                      {ticket.userEmail}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Категория
                  </label>
                  <div className="mt-1 font-medium">
                    {TICKET_CATEGORY_LABELS[ticket.category]}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Создан
                  </label>
                  <div className="mt-1">{formatDateTime(ticket.createdAt)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Обновлен
                  </label>
                  <div className="mt-1">{formatDateTime(ticket.updatedAt)}</div>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Описание
                </label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Переписка</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Icon
                        name="MessageSquare"
                        size={48}
                        className="mx-auto mb-2"
                      />
                      <p>Сообщений пока нет</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "admin"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "admin"
                              ? message.isPrivateNote
                                ? "bg-purple-100 border border-purple-200"
                                : "bg-blue-100 border border-blue-200"
                              : "bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {message.senderName}
                              </span>
                              {message.isPrivateNote && (
                                <Badge variant="outline" className="text-xs">
                                  Приватная заметка
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDateTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              {/* Reply Form */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isPrivateNote}
                      onChange={(e) => setIsPrivateNote(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Приватная заметка</span>
                  </label>
                </div>
                <Textarea
                  placeholder={
                    isPrivateNote
                      ? "Добавить приватную заметку (видна только администраторам)..."
                      : "Написать ответ пользователю..."
                  }
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={handleSendReply}
                  disabled={!newReply.trim() || sending}
                  className="w-full"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} className="mr-2" />
                      {isPrivateNote ? "Добавить заметку" : "Отправить ответ"}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          {/* Status Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Управление</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Статус
                </label>
                <Select
                  value={ticket.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Новый
                      </div>
                    </SelectItem>
                    <SelectItem value="open">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Открыт
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Ожидание
                      </div>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Решен
                      </div>
                    </SelectItem>
                    <SelectItem value="closed">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        Закрыт
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Приоритет
                </label>
                <Select
                  value={ticket.priority}
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Низкий
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Средний
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Высокий
                      </div>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Срочно
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleStatusChange("resolved")}
              >
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Отметить решенным
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleStatusChange("closed")}
              >
                <Icon name="XCircle" size={16} className="mr-2" />
                Закрыть тикет
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handlePriorityChange("urgent")}
              >
                <Icon name="AlertTriangle" size={16} className="mr-2" />
                Высокий приоритет
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
