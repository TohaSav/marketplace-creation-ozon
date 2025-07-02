import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import {
  ChatSettings,
  ChatSettingsTab,
  DEFAULT_CHAT_SETTINGS,
  STORAGE_KEY,
} from "@/types/chatSettings";

export const useChatSettings = () => {
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_CHAT_SETTINGS);
  const [activeTab, setActiveTab] = useState<ChatSettingsTab>("general");

  // Загружаем настройки из localStorage при инициализации
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error("Ошибка загрузки настроек чата:", error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить настройки чата",
          variant: "destructive",
        });
      }
    }
  }, []);

  // Универсальная функция обновления настроек
  const updateSetting = useCallback((path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".");
      const newSettings = { ...prev };
      let current: any = newSettings;

      // Создаем глубокую копию до предпоследнего уровня
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      // Устанавливаем новое значение
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  }, []);

  // Сохранение настроек в localStorage
  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      toast({
        title: "Настройки сохранены",
        description: "Настройки чата успешно обновлены",
      });
      return true;
    } catch (error) {
      console.error("Ошибка сохранения настроек:", error);
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      });
      return false;
    }
  }, [settings]);

  // Сброс к настройкам по умолчанию
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_CHAT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Настройки сброшены",
      description: "Восстановлены настройки по умолчанию",
    });
  }, []);

  // Валидация настроек
  const validateSettings = useCallback((): string[] => {
    const errors: string[] = [];

    if (settings.chatLimits.maxConcurrentChats < 1) {
      errors.push("Максимальное количество чатов должно быть больше 0");
    }

    if (settings.chatLimits.responseTimeout < 30) {
      errors.push("Таймаут ответа не может быть меньше 30 секунд");
    }

    if (settings.autoReply.enabled && !settings.autoReply.message.trim()) {
      errors.push("Сообщение автоответа не может быть пустым");
    }

    if (settings.autoReply.enabled && settings.autoReply.delay < 0) {
      errors.push("Задержка автоответа не может быть отрицательной");
    }

    if (settings.workingHours.enabled) {
      const startTime = settings.workingHours.startTime;
      const endTime = settings.workingHours.endTime;

      if (!startTime || !endTime) {
        errors.push("Необходимо указать время начала и окончания работы");
      } else if (startTime >= endTime) {
        errors.push("Время начала работы должно быть раньше времени окончания");
      }
    }

    return errors;
  }, [settings]);

  // Проверка валидности настроек перед сохранением
  const saveWithValidation = useCallback(() => {
    const errors = validateSettings();

    if (errors.length > 0) {
      toast({
        title: "Ошибка валидации",
        description: errors[0], // Показываем первую ошибку
        variant: "destructive",
      });
      return false;
    }

    return saveSettings();
  }, [validateSettings, saveSettings]);

  return {
    // Состояние
    settings,
    activeTab,

    // Действия
    setActiveTab,
    updateSetting,
    saveSettings: saveWithValidation,
    resetSettings,

    // Утилиты
    validateSettings,
    isValid: validateSettings().length === 0,
  };
};
