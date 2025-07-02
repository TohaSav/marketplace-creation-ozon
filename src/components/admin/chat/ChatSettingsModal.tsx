import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface ChatSettings {
  autoReply: {
    enabled: boolean;
    message: string;
    delay: number;
  };
  notifications: {
    sound: boolean;
    desktop: boolean;
    email: boolean;
  };
  workingHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  chatLimits: {
    maxConcurrentChats: number;
    responseTimeout: number;
  };
  templates: {
    greeting: string;
    closing: string;
    unavailable: string;
  };
  appearance: {
    theme: "light" | "dark" | "auto";
    chatBubbleColor: string;
    showTypingIndicator: boolean;
  };
  moderation: {
    profanityFilter: boolean;
    autoBlockSpam: boolean;
    requireApproval: boolean;
  };
}

interface ChatSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultSettings: ChatSettings = {
  autoReply: {
    enabled: false,
    message: "Спасибо за обращение! Наш оператор скоро ответит.",
    delay: 30,
  },
  notifications: {
    sound: true,
    desktop: true,
    email: false,
  },
  workingHours: {
    enabled: false,
    startTime: "09:00",
    endTime: "18:00",
    timezone: "Europe/Moscow",
  },
  chatLimits: {
    maxConcurrentChats: 10,
    responseTimeout: 300,
  },
  templates: {
    greeting: "Здравствуйте! Как могу помочь?",
    closing: "Спасибо за обращение! Хорошего дня!",
    unavailable: "К сожалению, все операторы заняты. Попробуйте позже.",
  },
  appearance: {
    theme: "light",
    chatBubbleColor: "#3B82F6",
    showTypingIndicator: true,
  },
  moderation: {
    profanityFilter: true,
    autoBlockSpam: true,
    requireApproval: false,
  },
};

export default function ChatSettingsModal({
  open,
  onOpenChange,
}: ChatSettingsModalProps) {
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");

  // Загружаем настройки из localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("admin-chat-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Сохраняем настройки
  const saveSettings = () => {
    localStorage.setItem("admin-chat-settings", JSON.stringify(settings));
    toast({
      title: "Настройки сохранены",
      description: "Настройки чата успешно обновлены",
    });
    onOpenChange(false);
  };

  // Сброс к значениям по умолчанию
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("admin-chat-settings");
    toast({
      title: "Настройки сброшены",
      description: "Восстановлены настройки по умолчанию",
    });
  };

  const updateSetting = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".");
      const newSettings = { ...prev };
      let current: any = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const tabs = [
    { id: "general", label: "Основные", icon: "Settings" },
    { id: "autoReply", label: "Автоответы", icon: "MessageSquare" },
    { id: "notifications", label: "Уведомления", icon: "Bell" },
    { id: "workingHours", label: "Рабочие часы", icon: "Clock" },
    { id: "templates", label: "Шаблоны", icon: "FileText" },
    { id: "appearance", label: "Внешний вид", icon: "Palette" },
    { id: "moderation", label: "Модерация", icon: "Shield" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Основные настройки
                </CardTitle>
                <CardDescription>Базовые параметры работы чата</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Максимум одновременных чатов</Label>
                    <Input
                      type="number"
                      value={settings.chatLimits.maxConcurrentChats}
                      onChange={(e) =>
                        updateSetting(
                          "chatLimits.maxConcurrentChats",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Таймаут ответа (сек)</Label>
                    <Input
                      type="number"
                      value={settings.chatLimits.responseTimeout}
                      onChange={(e) =>
                        updateSetting(
                          "chatLimits.responseTimeout",
                          parseInt(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "autoReply":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Автоматические ответы
                </CardTitle>
                <CardDescription>
                  Настройка автоматических сообщений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Включить автоответы</Label>
                    <p className="text-sm text-gray-500">
                      Отправлять автоответ при новом сообщении
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoReply.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting("autoReply.enabled", checked)
                    }
                  />
                </div>

                {settings.autoReply.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label>Сообщение автоответа</Label>
                      <Textarea
                        value={settings.autoReply.message}
                        onChange={(e) =>
                          updateSetting("autoReply.message", e.target.value)
                        }
                        placeholder="Введите сообщение автоответа..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Задержка (секунды)</Label>
                      <Input
                        type="number"
                        value={settings.autoReply.delay}
                        onChange={(e) =>
                          updateSetting(
                            "autoReply.delay",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={20} />
                  Уведомления
                </CardTitle>
                <CardDescription>
                  Настройки уведомлений о новых сообщениях
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Звуковые уведомления</Label>
                    <p className="text-sm text-gray-500">
                      Воспроизводить звук при новом сообщении
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sound}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications.sound", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Уведомления в браузере</Label>
                    <p className="text-sm text-gray-500">
                      Показывать уведомления в браузере
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.desktop}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications.desktop", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-gray-500">
                      Отправлять уведомления на email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      updateSetting("notifications.email", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "workingHours":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Рабочие часы
                </CardTitle>
                <CardDescription>
                  Установите часы работы поддержки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Ограничить рабочими часами</Label>
                    <p className="text-sm text-gray-500">
                      Показывать статус "недоступен" вне рабочих часов
                    </p>
                  </div>
                  <Switch
                    checked={settings.workingHours.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting("workingHours.enabled", checked)
                    }
                  />
                </div>

                {settings.workingHours.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Начало работы</Label>
                        <Input
                          type="time"
                          value={settings.workingHours.startTime}
                          onChange={(e) =>
                            updateSetting(
                              "workingHours.startTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Конец работы</Label>
                        <Input
                          type="time"
                          value={settings.workingHours.endTime}
                          onChange={(e) =>
                            updateSetting(
                              "workingHours.endTime",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Часовой пояс</Label>
                      <Select
                        value={settings.workingHours.timezone}
                        onValueChange={(value) =>
                          updateSetting("workingHours.timezone", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Moscow">
                            Москва (UTC+3)
                          </SelectItem>
                          <SelectItem value="Europe/Kiev">
                            Киев (UTC+2)
                          </SelectItem>
                          <SelectItem value="Asia/Almaty">
                            Алматы (UTC+6)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "templates":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Шаблоны сообщений
                </CardTitle>
                <CardDescription>
                  Настройте стандартные сообщения
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Приветствие</Label>
                  <Textarea
                    value={settings.templates.greeting}
                    onChange={(e) =>
                      updateSetting("templates.greeting", e.target.value)
                    }
                    placeholder="Сообщение при начале чата"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Завершение</Label>
                  <Textarea
                    value={settings.templates.closing}
                    onChange={(e) =>
                      updateSetting("templates.closing", e.target.value)
                    }
                    placeholder="Сообщение при завершении чата"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Недоступность</Label>
                  <Textarea
                    value={settings.templates.unavailable}
                    onChange={(e) =>
                      updateSetting("templates.unavailable", e.target.value)
                    }
                    placeholder="Сообщение когда операторы недоступны"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Palette" size={20} />
                  Внешний вид
                </CardTitle>
                <CardDescription>Настройки отображения чата</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Тема оформления</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value: "light" | "dark" | "auto") =>
                      updateSetting("appearance.theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Светлая</SelectItem>
                      <SelectItem value="dark">Темная</SelectItem>
                      <SelectItem value="auto">Автоматически</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Цвет сообщений</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.appearance.chatBubbleColor}
                      onChange={(e) =>
                        updateSetting(
                          "appearance.chatBubbleColor",
                          e.target.value,
                        )
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.appearance.chatBubbleColor}
                      onChange={(e) =>
                        updateSetting(
                          "appearance.chatBubbleColor",
                          e.target.value,
                        )
                      }
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Индикатор печати</Label>
                    <p className="text-sm text-gray-500">
                      Показывать когда пользователь печатает
                    </p>
                  </div>
                  <Switch
                    checked={settings.appearance.showTypingIndicator}
                    onCheckedChange={(checked) =>
                      updateSetting("appearance.showTypingIndicator", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "moderation":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" size={20} />
                  Модерация
                </CardTitle>
                <CardDescription>
                  Настройки безопасности и модерации
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Фильтр нецензурной лексики</Label>
                    <p className="text-sm text-gray-500">
                      Автоматически блокировать нецензурные слова
                    </p>
                  </div>
                  <Switch
                    checked={settings.moderation.profanityFilter}
                    onCheckedChange={(checked) =>
                      updateSetting("moderation.profanityFilter", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Блокировка спама</Label>
                    <p className="text-sm text-gray-500">
                      Автоматически блокировать спам-сообщения
                    </p>
                  </div>
                  <Switch
                    checked={settings.moderation.autoBlockSpam}
                    onCheckedChange={(checked) =>
                      updateSetting("moderation.autoBlockSpam", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Требовать подтверждение</Label>
                    <p className="text-sm text-gray-500">
                      Требовать подтверждения перед началом чата
                    </p>
                  </div>
                  <Switch
                    checked={settings.moderation.requireApproval}
                    onCheckedChange={(checked) =>
                      updateSetting("moderation.requireApproval", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
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
          {/* Навигация */}
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
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon name={tab.icon as any} size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Контент */}
          <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={resetSettings}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button onClick={saveSettings}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
