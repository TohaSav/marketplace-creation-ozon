import { useProfile } from "@/hooks/useProfile";
import { PROFILE_TABS } from "@/constants/profile.constants";

// Components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileForm from "@/components/profile/ProfileForm";
import OrdersTab from "@/components/profile/OrdersTab";
import FavoritesTab from "@/components/profile/FavoritesTab";
import NotificationsTab from "@/components/profile/NotificationsTab";
import SettingsTab from "@/components/profile/SettingsTab";
import UnauthorizedProfile from "@/components/profile/UnauthorizedProfile";

export default function Profile() {
  const {
    user,
    displayUser,
    userStats,
    isEditing,
    activeTab,
    setActiveTab,
    toggleEdit,
  } = useProfile();

  // Если пользователь не авторизован, показываем заглушку
  if (!user || !displayUser) {
    return <UnauthorizedProfile />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileForm
            user={displayUser}
            isEditing={isEditing}
            onToggleEdit={toggleEdit}
          />
        );
      case "orders":
        return <OrdersTab userStats={userStats} />;
      case "favorites":
        return <FavoritesTab />;
      case "notifications":
        return <NotificationsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return (
          <ProfileForm
            user={displayUser}
            isEditing={isEditing}
            onToggleEdit={toggleEdit}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProfileHeader user={displayUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar
            user={displayUser}
            tabs={PROFILE_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
