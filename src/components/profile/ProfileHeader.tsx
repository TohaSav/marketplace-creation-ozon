import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile, UserStats } from "@/types/profile.types";

interface ProfileHeaderProps {
  user: UserProfile & UserStats;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться в магазин
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Личный кабинет
          </h1>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {user.level}
            </Badge>
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
