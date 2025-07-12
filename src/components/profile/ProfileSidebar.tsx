import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleCoverUpload = () => {
    // Логика загрузки обложки
    console.log("Загрузка обложки");
  };

  const handleAvatarUpload = () => {
    // Логика загрузки аватара
    console.log("Загрузка аватара");
  };

  return (
    <div className="lg:w-80">
      {/* Профиль пользователя - с обложкой */}
      <Card className="mb-6 overflow-hidden">
        {/* Обложка */}
        <div
          className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative cursor-pointer group"
          onClick={() => setShowCoverUpload(!showCoverUpload)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Icon name="Camera" size={24} className="text-white" />
            </div>
          </div>
          {showCoverUpload && (
            <div className="absolute top-2 right-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCoverUpload();
                }}
              >
                <Icon name="Upload" size={14} className="mr-1" />
                Загрузить
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-6 -mt-8 relative">
          <div className="flex items-start space-x-4 mb-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowAvatarUpload(!showAvatarUpload)}
            >
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded-full">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon name="Camera" size={16} className="text-white" />
                </div>
              </div>
              {showAvatarUpload && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAvatarUpload();
                    }}
                  >
                    <Icon name="Upload" size={12} className="mr-1" />
                    Фото
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-2">
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
