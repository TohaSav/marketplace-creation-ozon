import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatUser } from "@/types/adminChat";
import ChatUserItem from "./ChatUserItem";

interface ChatUserListProps {
  users: ChatUser[];
  selectedUserId: string | null;
  searchQuery: string;
  onUserSelect: (userId: string) => void;
  onSearchChange: (query: string) => void;
}

export default function ChatUserList({
  users,
  selectedUserId,
  searchQuery,
  onUserSelect,
  onSearchChange,
}: ChatUserListProps) {
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
            <ChatUserItem
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => onUserSelect(user.id)}
            />
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
