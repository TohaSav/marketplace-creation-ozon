import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Wallet from "@/components/Wallet";
import { UserProfile, UserStats, ProfileTab } from "@/types/profile.types";

interface ProfileSidebarProps {
  user: UserProfile & UserStats;
  tabs: ProfileTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ProfileSidebar({
  user,
  tabs,
  activeTab,
  onTabChange,
}: ProfileSidebarProps) {
  return (
    <div className="lg:w-80">
      {/* Профиль пользователя - компактный */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">
                С нами с {user.memberSince}
              </p>
              <Badge
                variant="secondary"
                className="mt-1 bg-green-50 text-green-700"
              >
                {user.level}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">
                {user.ordersCount}
              </div>
              <div className="text-xs text-gray-500">Заказов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">
                {user.bonusPoints > 0 ? user.bonusPoints.toLocaleString() : "0"}
              </div>
              <div className="text-xs text-gray-500">Бонусов</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кошелек */}
      <div className="mb-6">
        <Wallet />
      </div>

      {/* Навигация */}
      <Card>
        <CardContent className="p-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon
                  name={tab.icon as any}
                  size={20}
                  className={`mr-3 ${
                    activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
