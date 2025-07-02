import { ChatSettings, ChatSettingsTab } from "@/types/chatSettings";
import GeneralSettingsTab from "./tabs/GeneralSettingsTab";
import AutoReplySettingsTab from "./tabs/AutoReplySettingsTab";
import NotificationSettingsTab from "./tabs/NotificationSettingsTab";
import WorkingHoursSettingsTab from "./tabs/WorkingHoursSettingsTab";
import TemplateSettingsTab from "./tabs/TemplateSettingsTab";
import AppearanceSettingsTab from "./tabs/AppearanceSettingsTab";
import ModerationSettingsTab from "./tabs/ModerationSettingsTab";

interface ChatSettingsContentProps {
  activeTab: ChatSettingsTab;
  settings: ChatSettings;
  onUpdate: (path: string, value: any) => void;
}

export default function ChatSettingsContent({
  activeTab,
  settings,
  onUpdate,
}: ChatSettingsContentProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralSettingsTab
            settings={settings.chatLimits}
            onUpdate={onUpdate}
          />
        );

      case "autoReply":
        return (
          <AutoReplySettingsTab
            settings={settings.autoReply}
            onUpdate={onUpdate}
          />
        );

      case "notifications":
        return (
          <NotificationSettingsTab
            settings={settings.notifications}
            onUpdate={onUpdate}
          />
        );

      case "workingHours":
        return (
          <WorkingHoursSettingsTab
            settings={settings.workingHours}
            onUpdate={onUpdate}
          />
        );

      case "templates":
        return (
          <TemplateSettingsTab
            settings={settings.templates}
            onUpdate={onUpdate}
          />
        );

      case "appearance":
        return (
          <AppearanceSettingsTab
            settings={settings.appearance}
            onUpdate={onUpdate}
          />
        );

      case "moderation":
        return (
          <ModerationSettingsTab
            settings={settings.moderation}
            onUpdate={onUpdate}
          />
        );

      default:
        return null;
    }
  };

  return <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>;
}
