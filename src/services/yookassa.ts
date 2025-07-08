// ЮKassa API Service для обработки платежей
// Документация: https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start

export interface PaymentData {
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  confirmation: {
    type: string;
    return_url: string;
  };
  capture?: boolean;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  confirmation: {
    type: string;
    confirmation_url?: string;
  };
  created_at: string;
  metadata?: Record<string, any>;
}

export interface PaymentStatus {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  metadata?: Record<string, any>;
}

class YooKassaService {
  private shopId: string;
  private secretKey: string;
  private baseUrl = "https://api.yookassa.ru/v3";

  constructor() {
    // В продакшене эти данные должны храниться в переменных окружения
    this.shopId = process.env.VITE_YOOKASSA_SHOP_ID || "";
    this.secretKey = process.env.VITE_YOOKASSA_SECRET_KEY || "";
  }

  private getAuthHeaders(): HeadersInit {
    const credentials = btoa(`${this.shopId}:${this.secretKey}`);
    return {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      "Idempotence-Key": this.generateIdempotenceKey(),
    };
  }

  private generateIdempotenceKey(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Создание платежа
   * @param paymentData - данные для создания платежа
   * @returns Promise с данными созданного платежа
   */
  async createPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка создания платежа:", error);
      throw error;
    }
  }

  /**
   * Получение информации о платеже
   * @param paymentId - ID платежа
   * @returns Promise с информацией о платеже
   */
  async getPaymentInfo(paymentId: string): Promise<PaymentStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка получения информации о платеже:", error);
      throw error;
    }
  }

  /**
   * Подтверждение платежа
   * @param paymentId - ID платежа
   * @param amount - сумма для подтверждения
   * @returns Promise с данными подтвержденного платежа
   */
  async capturePayment(
    paymentId: string,
    amount?: { value: string; currency: string },
  ): Promise<PaymentResponse> {
    try {
      const body = amount ? { amount } : {};

      const response = await fetch(
        `${this.baseUrl}/payments/${paymentId}/capture`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка подтверждения платежа:", error);
      throw error;
    }
  }

  /**
   * Отмена платежа
   * @param paymentId - ID платежа
   * @returns Promise с данными отмененного платежа
   */
  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/payments/${paymentId}/cancel`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({}),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка отмены платежа:", error);
      throw error;
    }
  }

  /**
   * Создание возврата
   * @param paymentId - ID платежа
   * @param amount - сумма возврата
   * @param description - описание возврата
   * @returns Promise с данными возврата
   */
  async createRefund(
    paymentId: string,
    amount: { value: string; currency: string },
    description?: string,
  ): Promise<any> {
    try {
      const body: any = {
        payment_id: paymentId,
        amount,
      };

      if (description) {
        body.description = description;
      }

      const response = await fetch(`${this.baseUrl}/refunds`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка создания возврата:", error);
      throw error;
    }
  }

  /**
   * Проверка подписи webhook'а
   * @param data - данные webhook'а
   * @param signature - подпись из заголовка
   * @returns boolean - валидна ли подпись
   */
  verifyWebhookSignature(data: string, signature: string): boolean {
    // В реальном приложении здесь должна быть проверка HMAC подписи
    // Для демонстрации возвращаем true
    console.log("Проверка webhook подписи:", { data, signature });
    return true;
  }

  /**
   * Обработка webhook уведомления
   * @param webhookData - данные webhook'а
   * @returns обработанные данные
   */
  async handleWebhook(webhookData: any): Promise<any> {
    try {
      const { type, object } = webhookData;

      switch (type) {
        case "payment.succeeded":
          console.log("Платеж успешно завершен:", object);
          // Здесь можно обновить статус заказа в базе данных
          break;

        case "payment.canceled":
          console.log("Платеж отменен:", object);
          // Здесь можно обработать отмену платежа
          break;

        case "payment.waiting_for_capture":
          console.log("Платеж ожидает подтверждения:", object);
          // Здесь можно автоматически подтвердить платеж или уведомить админа
          break;

        case "refund.succeeded":
          console.log("Возврат успешно завершен:", object);
          // Здесь можно обработать успешный возврат
          break;

        default:
          console.log("Неизвестный тип webhook:", type);
      }

      return { status: "success", processed: true };
    } catch (error) {
      console.error("Ошибка обработки webhook:", error);
      throw error;
    }
  }
}

// Экспортируем единственный экземпляр сервиса
export const yooKassaService = new YooKassaService();

// Экспортируем класс для возможности создания дополнительных экземпляров
export default YooKassaService;
