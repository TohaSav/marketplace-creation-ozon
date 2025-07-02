import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/ui/icon";
import { useTickets } from "@/hooks/useTickets";
import {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TICKET_STATUS_LABELS,
  TICKET_PRIORITY_LABELS,
  TICKET_CATEGORY_LABELS,
  TICKET_STATUS_COLORS,
  TICKET_PRIORITY_COLORS,
} from "@/types/tickets";

interface AdminTicketListProps {
  onTicketSelect: (ticket: Ticket) => void;
  selectedTicketId?: string;
}

export default function AdminTicketList({
  onTicketSelect,
  selectedTicketId,
}: AdminTicketListProps) {
  const { tickets, loading, filters, setFilters, deleteTicket, updateTicket } =
    useTickets();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value });
  };

  const handleStatusFilter = (status: string) => {
    if (status === "all") {
      setFilters({ ...filters, status: undefined });
    } else {
      setFilters({ ...filters, status: [status as TicketStatus] });
    }
  };

  const handlePriorityFilter = (priority: string) => {
    if (priority === "all") {
      setFilters({ ...filters, priority: undefined });
    } else {
      setFilters({ ...filters, priority: [priority as TicketPriority] });
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    await deleteTicket(ticketId);
  };

  const handleStatusChange = async (
    ticketId: string,
    newStatus: TicketStatus,
  ) => {
    await updateTicket(ticketId, { status: newStatus });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`;
    return `${Math.floor(diffMinutes / 1440)} дн назад`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Фильтры и поиск */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск по теме или описанию..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="open">Открытые</SelectItem>
              <SelectItem value="pending">Ожидание</SelectItem>
              <SelectItem value="resolved">Решенные</SelectItem>
              <SelectItem value="closed">Закрытые</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handlePriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все приоритеты</SelectItem>
              <SelectItem value="urgent">Срочно</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="low">Низкий</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">
            {tickets.filter((t) => t.status === "new").length}
          </div>
          <div className="text-sm text-red-700">Новые</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {tickets.filter((t) => t.status === "open").length}
          </div>
          <div className="text-sm text-blue-700">Открытые</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {tickets.filter((t) => t.status === "pending").length}
          </div>
          <div className="text-sm text-yellow-700">Ожидание</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {tickets.filter((t) => t.status === "resolved").length}
          </div>
          <div className="text-sm text-green-700">Решенные</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">
            {tickets.length}
          </div>
          <div className="text-sm text-gray-700">Всего</div>
        </div>
      </div>

      {/* Таблица тикетов */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Тема</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Приоритет</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Создан</TableHead>
              <TableHead>Активность</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Icon name="Inbox" size={48} className="mb-2" />
                    <p>Тикеты не найдены</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    selectedTicketId === ticket.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onTicketSelect(ticket)}
                >
                  <TableCell className="font-mono text-sm">
                    #{ticket.id.slice(-6)}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate font-medium">{ticket.subject}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {ticket.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.userName}</div>
                      <div className="text-sm text-gray-500">
                        {ticket.userEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={ticket.status}
                      onValueChange={(value) =>
                        handleStatusChange(ticket.id, value as TicketStatus)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <Badge className={TICKET_STATUS_COLORS[ticket.status]}>
                          {TICKET_STATUS_LABELS[ticket.status]}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новый</SelectItem>
                        <SelectItem value="open">Открыт</SelectItem>
                        <SelectItem value="pending">Ожидание</SelectItem>
                        <SelectItem value="resolved">Решен</SelectItem>
                        <SelectItem value="closed">Закрыт</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge className={TICKET_PRIORITY_COLORS[ticket.priority]}>
                      {TICKET_PRIORITY_LABELS[ticket.priority]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {TICKET_CATEGORY_LABELS[ticket.category]}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(ticket.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {getTimeAgo(ticket.lastActivity)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTicketSelect(ticket);
                        }}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить тикет?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Тикет будет удален
                              навсегда.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
