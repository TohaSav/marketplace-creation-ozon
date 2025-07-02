import Icon from "@/components/ui/icon";
import { SettingsTab, ChatSettingsTab } from "@/types/chatSettings";

interface SettingsNavigationProps {
  tabs: SettingsTab[];
  activeTab: ChatSettingsTab;
  onTabChange: (tab: ChatSettingsTab) => void;
}

export default function SettingsNavigation({
  tabs,
  activeTab,
  onTabChange,
}: SettingsNavigationProps) {
  return (
    <div className="w-64 border-r pr-4">
      <div className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
              activeTab === tab.id
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon name={tab.icon as any} size={16} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
