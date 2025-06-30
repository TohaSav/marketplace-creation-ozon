import { Badge } from "@/components/ui/badge";

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: "new" | "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  lastActivity: Date;
  assignedTo?: string;
}

interface TicketListProps {
  tickets: SupportTicket[];
  selectedTicketId: string | null;
  onTicketSelect: (ticketId: string) => void;
}

export default function TicketList({
  tickets,
  selectedTicketId,
  onTicketSelect,
}: TicketListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "open":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч назад`;
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedTicketId === ticket.id
                  ? "border-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => onTicketSelect(ticket.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{ticket.subject}</h3>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status === "new"
                      ? "Новый"
                      : ticket.status === "open"
                        ? "Открыт"
                        : ticket.status === "pending"
                          ? "Ожидание"
                          : "Решен"}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority === "urgent"
                      ? "Срочно"
                      : ticket.priority === "high"
                        ? "Высокий"
                        : ticket.priority === "medium"
                          ? "Средний"
                          : "Низкий"}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">#{ticket.id}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>👤 {ticket.userName}</span>
                  <span>📂 {ticket.category}</span>
                  {ticket.assignedTo && <span>👨‍💼 {ticket.assignedTo}</span>}
                </div>
                <span>{formatTime(ticket.lastActivity)}</span>
              </div>
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Нет тикетов для отображения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
