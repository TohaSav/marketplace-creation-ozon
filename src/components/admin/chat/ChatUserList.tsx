import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  status: "active" | "waiting" | "resolved";
}

interface ChatUserListProps {
  users: ChatUser[];
  selectedUserId: string | null;
  searchQuery: string;
  onUserSelect: (userId: string) => void;
  onSearchChange: (query: string) => void;
  onDeleteUser?: (userId: string) => void;
}

export default function ChatUserList({
  users,
  selectedUserId,
  searchQuery,
  onUserSelect,
  onSearchChange,
  onDeleteUser,
}: ChatUserListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <Input
          placeholder="Поиск пользователей..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <ScrollArea className="h-full">
        <div className="divide-y">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUserId === user.id
                  ? "bg-blue-50 border-r-2 border-blue-500"
                  : ""
              }`}
              onClick={() => onUserSelect(user.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      user.isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm truncate">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {user.unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="text-xs px-1.5 py-0.5"
                        >
                          {user.unreadCount}
                        </Badge>
                      )}
                      <Badge
                        className={`text-xs px-1.5 py-0.5 ${getStatusColor(user.status)}`}
                      >
                        {user.status === "active"
                          ? "Активен"
                          : user.status === "waiting"
                            ? "Ожидает"
                            : "Решен"}
                      </Badge>
                      {onDeleteUser && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-gray-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Icon name="MoreVertical" size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteUser(user.id);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Icon name="Trash2" size={14} className="mr-2" />
                              Удалить диалог
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {user.lastMessage}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTime(user.lastMessageTime)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>Пользователи не найдены</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
