import { Badge } from "@/components/ui/badge";
import { SupportTicket } from "@/types/adminChat";
import {
  formatChatTime,
  getStatusColor,
  getPriorityColor,
} from "@/utils/adminChat";
import { STATUS_LABELS, PRIORITY_LABELS } from "@/constants/adminChat";

interface TicketItemProps {
  ticket: SupportTicket;
  isSelected: boolean;
  onClick: () => void;
}

export default function TicketItem({
  ticket,
  isSelected,
  onClick,
}: TicketItemProps) {
  return (
    <div
      className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50 border-blue-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <h3 className="font-medium">{ticket.subject}</h3>
          <Badge className={getStatusColor(ticket.status)}>
            {STATUS_LABELS[ticket.status]}
          </Badge>
          <Badge className={getPriorityColor(ticket.priority)}>
            {PRIORITY_LABELS[ticket.priority]}
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
        <span>{formatChatTime(ticket.lastActivity)}</span>
      </div>
    </div>
  );
}
