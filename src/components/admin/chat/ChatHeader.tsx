import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { ChatUser } from "@/types/adminChat";
import { getInitials, getStatusColor } from "@/utils/adminChat";
import { STATUS_LABELS } from "@/constants/adminChat";

interface ChatHeaderProps {
  user: ChatUser;
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Badge className={getStatusColor(user.status)}>
          {STATUS_LABELS[user.status]}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Icon name="Phone" size={16} />
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>
    </div>
  );
}
