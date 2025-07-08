import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { yooKassaService, type PaymentData } from "@/services/yookassa";
import { toast } from "@/hooks/use-toast";

interface PaymentButtonProps {
  amount: string; // Сумма в рублях (например, "100.00")
  description: string; // Описание платежа
  orderId?: string; // ID заказа для метаданных
  onSuccess?: (paymentId: string) => void; // Колбек при успешном создании платежа
  onError?: (error: string) => void; // Колбек при ошибке
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function PaymentButton({
  amount,
  description,
  orderId,
  onSuccess,
  onError,
  className = "",
  children,
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Некорректная сумма платежа",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const paymentData: PaymentData = {
        amount: {
          value: amount,
          currency: "RUB",
        },
        description: description,
        confirmation: {
          type: "redirect",
          return_url: `${window.location.origin}/payment-success`,
        },
        capture: true, // Автоматическое списание
        metadata: orderId ? { order_id: orderId } : undefined,
      };

      const payment = await yooKassaService.createPayment(paymentData);

      if (payment.confirmation?.confirmation_url) {
        // Сохраняем информацию о платеже в localStorage для обработки после возврата
        localStorage.setItem(
          "pending_payment",
          JSON.stringify({
            id: payment.id,
            amount: payment.amount,
            description: payment.description,
            orderId: orderId,
            createdAt: new Date().toISOString(),
          }),
        );

        // Перенаправляем пользователя на страницу оплаты ЮKassa
        window.location.href = payment.confirmation.confirmation_url;
      } else {
        throw new Error("Не удалось получить URL для оплаты");
      }

      if (onSuccess) {
        onSuccess(payment.id);
      }
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

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`${className}`}
    >
      {isLoading ? (
        <>
          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
          Создание платежа...
        </>
      ) : (
        <>
          {children || (
            <>
              <Icon name="CreditCard" className="mr-2 h-4 w-4" />
              Оплатить {amount} ₽
            </>
          )}
        </>
      )}
    </Button>
  );
}
