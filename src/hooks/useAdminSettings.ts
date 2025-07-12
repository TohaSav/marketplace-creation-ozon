import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import {
  PlatformSettings,
  SecuritySettings,
  NotificationSettings,
  SystemInfo,
} from "@/types/admin-settings";

const DEFAULT_PLATFORM_SETTINGS: PlatformSettings = {
  siteName: "CalibreStore",
  siteDescription: "Ваша универсальная торговая платформа",
  adminEmail: "admin@calibrestore.ru",
  supportEmail: "support@calibrestore.ru",
  maintenanceMode: false,
  registrationEnabled: true,
  emailVerificationRequired: true,
  moderationRequired: false,
  maxFileUploadSize: 10,
  sessionTimeout: 60,
};

const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  twoFactorRequired: false,
  passwordMinLength: 8,
  maxLoginAttempts: 5,
  lockoutDuration: 15,
  ipWhitelist: [],
  apiRateLimit: 100,
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  emailNotifications: true,
  newUserRegistration: true,
  newSellerApplication: true,
  systemAlerts: true,
  backupNotifications: true,
  errorReports: true,
};

export const useAdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Функции для загрузки настроек из localStorage
  const loadPlatformSettings = useCallback((): PlatformSettings => {
    const saved = localStorage.getItem("admin-platform-settings");
    return saved ? JSON.parse(saved) : DEFAULT_PLATFORM_SETTINGS;
  }, []);

  const loadSecuritySettings = useCallback((): SecuritySettings => {
    const saved = localStorage.getItem("admin-security-settings");
    return saved ? JSON.parse(saved) : DEFAULT_SECURITY_SETTINGS;
  }, []);

  const loadNotificationSettings = useCallback((): NotificationSettings => {
    const saved = localStorage.getItem("admin-notification-settings");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATION_SETTINGS;
  }, []);

  // Функции для сохранения настроек
  const savePlatformSettings = useCallback(
    async (settings: PlatformSettings): Promise<boolean> => {
      setIsLoading(true);
      try {
        localStorage.setItem(
          "admin-platform-settings",
          JSON.stringify(settings),
        );
        toast({
          title: "Настройки сохранены",
          description: "Настройки платформы успешно обновлены",
        });
        return true;
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить настройки",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const saveSecuritySettings = useCallback(
    async (settings: SecuritySettings): Promise<boolean> => {
      setIsLoading(true);
      try {
        localStorage.setItem(
          "admin-security-settings",
          JSON.stringify(settings),
        );
        toast({
          title: "Настройки безопасности сохранены",
          description: "Настройки безопасности успешно обновлены",
        });
        return true;
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить настройки безопасности",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const saveNotificationSettings = useCallback(
    async (settings: NotificationSettings): Promise<boolean> => {
      setIsLoading(true);
      try {
        localStorage.setItem(
          "admin-notification-settings",
          JSON.stringify(settings),
        );
        toast({
          title: "Настройки уведомлений сохранены",
          description: "Настройки уведомлений успешно обновлены",
        });
        return true;
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить настройки уведомлений",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Системная информация
  const getSystemInfo = useCallback((): SystemInfo => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");

    return {
      version: "1.0.0",
      startDate: new Date().toLocaleDateString("ru-RU"),
      usersCount: users.length,
      sellersCount: sellers.length,
    };
  }, []);

  // Функция сброса всех настроек
  const resetToDefaults = useCallback(() => {
    if (
      confirm(
        "Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?",
      )
    ) {
      localStorage.removeItem("admin-platform-settings");
      localStorage.removeItem("admin-security-settings");
      localStorage.removeItem("admin-notification-settings");
      window.location.reload();
    }
  }, []);

  // Функция полной очистки данных
  const clearAllData = useCallback(() => {
    if (confirm("ВНИМАНИЕ! Это удалит ВСЕ данные платформы. Вы уверены?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  return {
    // Состояние
    isLoading,

    // Загрузка настроек
    loadPlatformSettings,
    loadSecuritySettings,
    loadNotificationSettings,

    // Сохранение настроек
    savePlatformSettings,
    saveSecuritySettings,
    saveNotificationSettings,

    // Системные функции
    getSystemInfo,
    resetToDefaults,
    clearAllData,
  };
};
