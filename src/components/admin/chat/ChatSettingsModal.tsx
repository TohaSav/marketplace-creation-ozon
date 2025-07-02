import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useChatSettings } from "@/hooks/useChatSettings";
import { SETTINGS_TABS } from "@/types/chatSettings";
import SettingsNavigation from "./settings/SettingsNavigation";
import ChatSettingsContent from "./settings/ChatSettingsContent";

interface ChatSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChatSettingsModal({
  open,
  onOpenChange,
}: ChatSettingsModalProps) {
  const {
    settings,
    activeTab,
    setActiveTab,
    updateSetting,
    saveSettings,
    resetSettings,
    isValid,
  } = useChatSettings();

  const handleSave = () => {
    const success = saveSettings();
    if (success) {
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    resetSettings();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Настройки чата поддержки
          </DialogTitle>
          <DialogDescription>
            Настройте параметры работы системы чата поддержки
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-6 h-[600px]">
          {/* Навигация по вкладкам */}
          <SettingsNavigation
            tabs={SETTINGS_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Контент настроек */}
          <ChatSettingsContent
            activeTab={activeTab}
            settings={settings}
            onUpdate={updateSetting}
          />
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={!isValid}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
