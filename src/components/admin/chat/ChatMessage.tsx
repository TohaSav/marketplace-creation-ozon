import Icon from "@/components/ui/icon";
import { ChatMessage as ChatMessageType } from "@/types/adminChat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.sender === "admin"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          {message.sender === "admin" && (
            <Icon
              name={message.status === "read" ? "CheckCheck" : "Check"}
              size={12}
              className="opacity-70"
            />
          )}
        </div>
      </div>
    </div>
  );
}
