import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface AdminChatTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  chatUsers: Array<{ unreadCount: number }>;
  tickets: Array<{ status: string }>;
}

export default function AdminChatTabs({
  activeTab,
  onTabChange,
  chatUsers,
  tickets,
}: AdminChatTabsProps) {
  const unreadChatsCount = chatUsers.reduce(
    (sum, user) => sum + user.unreadCount,
    0,
  );
  const newTicketsCount = tickets.filter((t) => t.status === "new").length;

  return (
    <TabsList>
      <TabsTrigger value="chats" className="flex items-center gap-2">
        <Icon name="MessageCircle" size={16} />
        Чаты
        {unreadChatsCount > 0 && (
          <Badge variant="secondary">{unreadChatsCount}</Badge>
        )}
      </TabsTrigger>

      <TabsTrigger value="tickets" className="flex items-center gap-2">
        <Icon name="Ticket" size={16} />
        Тикеты
        {newTicketsCount > 0 && (
          <Badge variant="secondary">{newTicketsCount}</Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
}
