import { useState, useCallback } from "react";

export interface YookassaConfig {
  shopId: string;
  secretKey: string;
  testMode: boolean;
  webhookUrl: string;
  isConfigured: boolean;
}

export interface YookassaPayment {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  confirmation_url?: string;
  created_at: string;
}

const YOOKASSA_CONFIG_KEY = "yookassa_config";

export const useYookassa = () => {
  const [config, setConfig] = useState<YookassaConfig>(() => {
    const saved = localStorage.getItem(YOOKASSA_CONFIG_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          shopId: "",
          secretKey: "",
          testMode: true,
          webhookUrl: "",
          isConfigured: false,
        };
  });

  const [isLoading, setIsLoading] = useState(false);

  const saveConfig = useCallback(async (newConfig: YookassaConfig) => {
    const configToSave = {
      ...newConfig,
      isConfigured: !!(newConfig.shopId && newConfig.secretKey),
    };
    setConfig(configToSave);
    localStorage.setItem(YOOKASSA_CONFIG_KEY, JSON.stringify(configToSave));

    // Активируем ЮКассу на сайте если все данные заполнены
    if (configToSave.isConfigured) {
      await activateYookassaOnSite(configToSave);
    }
  }, []);

  // Активация ЮКассы на сайте
  const activateYookassaOnSite = async (configData: YookassaConfig) => {
    try {
      // Отправляем конфигурацию на сервер
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://calibrestore.ru"
          : "http://localhost:3001";

      const response = await fetch(`${baseUrl}/api/yookassa/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopId: configData.shopId,
          secretKey: configData.secretKey,
          webhookUrl: configData.webhookUrl,
          testMode: configData.testMode,
        }),
      });

      if (response.ok) {
        // Сохраняем активную конфигурацию для использования на сайте
        localStorage.setItem(
          "yookassa-active",
          JSON.stringify({
            enabled: true,
            shopId: configData.shopId,
            testMode: configData.testMode,
            webhookUrl: configData.webhookUrl,
            activatedAt: new Date().toISOString(),
          }),
        );

        // Обновляем статус в админке
        localStorage.setItem(
          "admin-yookassa-status",
          JSON.stringify({
            active: true,
            configuredAt: new Date().toISOString(),
            testMode: configData.testMode,
            shopId: configData.shopId,
          }),
        );
      }
    } catch (error) {
      console.error("Ошибка активации ЮКассы:", error);
    }
  };

  const testConnection = useCallback(async () => {
    if (!config.shopId || !config.secretKey) {
      throw new Error("Не заполнены обязательные поля");
    }

    setIsLoading(true);
    try {
      // Симуляция тестирования соединения с ЮКассой
      // В реальном приложении здесь будет вызов API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        success: true,
        message: "Подключение к ЮКассе успешно установлено",
      };
    } catch (error) {
      return {
        success: false,
        message: "Ошибка подключения к ЮКассе",
      };
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const createPayment = useCallback(
    async (amount: number, description: string, returnUrl?: string) => {
      if (!config.isConfigured) {
        throw new Error("ЮКасса не настроена");
      }

      setIsLoading(true);
      try {
        // Симуляция создания платежа
        // В реальном приложении здесь будет вызов API ЮКассы
        const payment: YookassaPayment = {
          id: `payment_${Date.now()}`,
          amount,
          currency: "RUB",
          description,
          status: "pending",
          confirmation_url: config.testMode
            ? "https://yoomoney.ru/checkout/payments/v2/contract"
            : undefined,
          created_at: new Date().toISOString(),
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return payment;
      } finally {
        setIsLoading(false);
      }
    },
    [config],
  );

  const capturePayment = useCallback(
    async (paymentId: string) => {
      if (!config.isConfigured) {
        throw new Error("ЮКасса не настроена");
      }

      setIsLoading(true);
      try {
        // Симуляция подтверждения платежа
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          payment_id: paymentId,
          status: "succeeded",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [config],
  );

  const cancelPayment = useCallback(
    async (paymentId: string) => {
      if (!config.isConfigured) {
        throw new Error("ЮКасса не настроена");
      }

      setIsLoading(true);
      try {
        // Симуляция отмены платежа
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
          success: true,
          payment_id: paymentId,
          status: "canceled",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [config],
  );

  const getConfig = useCallback(() => {
    return config;
  }, [config]);

  const updateConfig = useCallback(
    async (newConfig: Partial<YookassaConfig>) => {
      const updatedConfig = {
        ...config,
        ...newConfig,
        isConfigured: !!(newConfig.shopId && newConfig.secretKey),
      };
      await saveConfig(updatedConfig);
    },
    [config, saveConfig],
  );

  return {
    config,
    isLoading,
    getConfig,
    updateConfig,
    saveConfig,
    testConnection,
    createPayment,
    capturePayment,
    cancelPayment,
  };
};
