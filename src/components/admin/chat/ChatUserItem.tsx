import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatUser } from "@/types/adminChat";
import { formatChatTime, getInitials, getStatusColor } from "@/utils/adminChat";
import { STATUS_LABELS } from "@/constants/adminChat";

interface ChatUserItemProps {
  user: ChatUser;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatUserItem({
  user,
  isSelected,
  onClick,
}: ChatUserItemProps) {
  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              user.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">{user.name}</h3>
            <div className="flex items-center gap-1">
              {user.unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                  {user.unreadCount}
                </Badge>
              )}
              <Badge
                className={`text-xs px-1.5 py-0.5 ${getStatusColor(user.status)}`}
              >
                {STATUS_LABELS[user.status]}
              </Badge>
            </div>
          </div>

          <p className="text-xs text-gray-500 truncate mt-1">
            {user.lastMessage}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatChatTime(user.lastMessageTime)}
          </p>
        </div>
      </div>
    </div>
  );
}
