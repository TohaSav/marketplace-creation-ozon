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

  const saveConfig = useCallback((newConfig: YookassaConfig) => {
    const configToSave = {
      ...newConfig,
      isConfigured: !!(newConfig.shopId && newConfig.secretKey),
    };
    setConfig(configToSave);
    localStorage.setItem(YOOKASSA_CONFIG_KEY, JSON.stringify(configToSave));
  }, []);

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

  return {
    config,
    isLoading,
    saveConfig,
    testConnection,
    createPayment,
    capturePayment,
    cancelPayment,
  };
};
