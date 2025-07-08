import { useState, useCallback } from "react";
import {
  yooKassaService,
  type PaymentData,
  type PaymentStatus,
} from "@/services/yookassa";
import { toast } from "@/hooks/use-toast";

export interface UsePaymentOptions {
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
  onStatusChange?: (status: PaymentStatus) => void;
}

export interface PaymentInfo {
  id: string;
  amount: string;
  description: string;
  orderId?: string;
  createdAt: string;
}

export function usePayment(options: UsePaymentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<PaymentInfo | null>(
    null,
  );

  // Создание платежа
  const createPayment = useCallback(
    async (
      amount: string,
      description: string,
      orderId?: string,
      returnUrl?: string,
    ) => {
      if (!amount || parseFloat(amount) <= 0) {
        const error = "Некорректная сумма платежа";
        toast({
          title: "Ошибка",
          description: error,
          variant: "destructive",
        });
        options.onError?.(error);
        return null;
      }

      setIsLoading(true);

      try {
        const paymentData: PaymentData = {
          amount: {
            value: amount,
            currency: "RUB",
          },
          description,
          confirmation: {
            type: "redirect",
            return_url:
              returnUrl || `${window.location.origin}/payment-success`,
          },
          capture: true,
          metadata: orderId ? { order_id: orderId } : undefined,
        };

        const payment = await yooKassaService.createPayment(paymentData);

        // Сохраняем информацию о платеже
        const paymentInfo: PaymentInfo = {
          id: payment.id,
          amount,
          description,
          orderId,
          createdAt: new Date().toISOString(),
        };

        setCurrentPayment(paymentInfo);
        localStorage.setItem("pending_payment", JSON.stringify(paymentInfo));

        options.onSuccess?.(payment.id);

        return payment;
      } catch (error) {
        console.error("Ошибка создания платежа:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Произошла ошибка при создании платежа";

        toast({
          title: "Ошибка платежа",
          description: errorMessage,
          variant: "destructive",
        });

        options.onError?.(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  // Проверка статуса платежа
  const checkPaymentStatus = useCallback(
    async (paymentId: string) => {
      setIsChecking(true);

      try {
        const paymentStatus = await yooKassaService.getPaymentInfo(paymentId);
        options.onStatusChange?.(paymentStatus);
        return paymentStatus;
      } catch (error) {
        console.error("Ошибка проверки статуса платежа:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ошибка проверки статуса платежа";

        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });

        options.onError?.(errorMessage);
        return null;
      } finally {
        setIsChecking(false);
      }
    },
    [options],
  );

  // Подтверждение платежа (capture)
  const capturePayment = useCallback(
    async (paymentId: string, amount?: { value: string; currency: string }) => {
      setIsLoading(true);

      try {
        const payment = await yooKassaService.capturePayment(paymentId, amount);

        toast({
          title: "Успех",
          description: "Платеж успешно подтвержден",
        });

        return payment;
      } catch (error) {
        console.error("Ошибка подтверждения платежа:", error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ошибка подтверждения платежа";

        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });

        options.onError?.(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  // Отмена платежа
  const cancelPayment = useCallback(
    async (paymentId: string) => {
      setIsLoading(true);

      try {
        const payment = await yooKassaService.cancelPayment(paymentId);

        toast({
          title: "Платеж отменен",
          description: "Платеж успешно отменен",
        });

        return payment;
      } catch (error) {
        console.error("Ошибка отмены платежа:", error);

        const errorMessage =
          error instanceof Error ? error.message : "Ошибка отмены платежа";

        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });

        options.onError?.(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  // Создание возврата
  const createRefund = useCallback(
    async (
      paymentId: string,
      amount: { value: string; currency: string },
      description?: string,
    ) => {
      setIsLoading(true);

      try {
        const refund = await yooKassaService.createRefund(
          paymentId,
          amount,
          description,
        );

        toast({
          title: "Возврат создан",
          description: "Возврат успешно создан",
        });

        return refund;
      } catch (error) {
        console.error("Ошибка создания возврата:", error);

        const errorMessage =
          error instanceof Error ? error.message : "Ошибка создания возврата";

        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });

        options.onError?.(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  // Получение информации о текущем платеже из localStorage
  const getPendingPayment = useCallback((): PaymentInfo | null => {
    try {
      const stored = localStorage.getItem("pending_payment");
      if (stored) {
        const paymentInfo = JSON.parse(stored);
        setCurrentPayment(paymentInfo);
        return paymentInfo;
      }
    } catch (error) {
      console.error("Ошибка получения данных платежа:", error);
    }
    return null;
  }, []);

  // Очистка информации о платеже
  const clearPendingPayment = useCallback(() => {
    localStorage.removeItem("pending_payment");
    setCurrentPayment(null);
  }, []);

  return {
    // Состояние
    isLoading,
    isChecking,
    currentPayment,

    // Методы
    createPayment,
    checkPaymentStatus,
    capturePayment,
    cancelPayment,
    createRefund,
    getPendingPayment,
    clearPendingPayment,
  };
}
