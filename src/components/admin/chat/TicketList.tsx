import { SupportTicket } from "@/types/adminChat";
import TicketItem from "./TicketItem";

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
  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">Нет активных тикетов</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              isSelected={selectedTicketId === ticket.id}
              onClick={() => onTicketSelect(ticket.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
