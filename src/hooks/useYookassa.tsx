import { useState } from "react";

interface YookassaConfig {
  shopId: string;
  secretKey: string;
  isTestMode: boolean;
}

interface YookassaConfigResponse {
  shopId: string;
  isTestMode: boolean;
  isConfigured: boolean;
}

export const useYookassa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getConfig = async (): Promise<YookassaConfigResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/yookassa/config");

      if (!response.ok) {
        throw new Error("Ошибка получения конфигурации ЮKassa");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async (config: YookassaConfig): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/yookassa/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления конфигурации ЮKassa");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/yookassa/test");

      if (!response.ok) {
        throw new Error("Ошибка тестирования соединения с ЮKassa");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getConfig,
    updateConfig,
    testConnection,
    isLoading,
    error,
  };
};
