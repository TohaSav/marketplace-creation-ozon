import { useState } from "react";

interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  orderId?: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: string;
  confirmation?: {
    type: string;
    confirmation_url?: string;
  };
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  metadata?: Record<string, any>;
}

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (
    paymentData: PaymentData,
  ): Promise<PaymentResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Ошибка создания платежа");
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

  const verifyPayment = async (
    paymentId: string,
  ): Promise<PaymentResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/payments/verify/${paymentId}`);

      if (!response.ok) {
        throw new Error("Ошибка проверки платежа");
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

  const getTariffs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tariffs");

      if (!response.ok) {
        throw new Error("Ошибка получения тарифов");
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

  return {
    createPayment,
    verifyPayment,
    getTariffs,
    isLoading,
    error,
  };
};
