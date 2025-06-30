import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { NOTIFICATION_TYPES } from "@/constants/notifications";
import { NotificationFilter } from "@/types/notifications";

interface NotificationTabsProps {
  activeTab: NotificationFilter;
  onTabChange: (tab: NotificationFilter) => void;
  getUnreadCount: (type?: any) => number;
}

export default function NotificationTabs({
  activeTab,
  onTabChange,
  getUnreadCount,
}: NotificationTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
      <TabsTrigger value="all" className="flex items-center gap-2">
        Все
        {getUnreadCount() > 0 && (
          <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
            {getUnreadCount()}
          </Badge>
        )}
      </TabsTrigger>

      {Object.entries(NOTIFICATION_TYPES).map(([key, type]) => {
        const unreadCount = getUnreadCount(key);
        return (
          <TabsTrigger
            key={key}
            value={key}
            className="flex items-center gap-2"
          >
            <Icon
              name={type.icon as any}
              size={16}
              className="hidden sm:block"
            />
            <span className="hidden lg:inline">{type.name}</span>
            <span className="lg:hidden">{type.name.slice(0, 3)}</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}
