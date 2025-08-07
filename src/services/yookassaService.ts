interface YooKassaConfig {
  shopId: string;
  secretKey: string;
  isProduction: boolean;
}

interface PayoutRequest {
  amount: {
    value: string;
    currency: 'RUB';
  };
  payout_destination_data: {
    type: 'bank_card' | 'sbp';
    card?: {
      number?: string;
    };
    phone?: string;
  };
  description: string;
  metadata?: Record<string, string>;
}

interface PayoutResponse {
  id: string;
  status: 'pending' | 'succeeded' | 'canceled';
  amount: {
    value: string;
    currency: 'RUB';
  };
  description: string;
  created_at: string;
  deal?: {
    id: string;
  };
  payout_destination: {
    type: string;
    card?: {
      last4: string;
      card_type: string;
    };
    phone?: string;
  };
  metadata?: Record<string, string>;
  cancellation_details?: {
    reason: string;
    party: string;
  };
  test: boolean;
}

class YooKassaService {
  private config: YooKassaConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      shopId: process.env.YOOKASSA_SHOP_ID || 'test_shop_id',
      secretKey: process.env.YOOKASSA_SECRET_KEY || 'test_secret_key',
      isProduction: process.env.NODE_ENV === 'production'
    };
    
    this.baseUrl = this.config.isProduction 
      ? 'https://api.yookassa.ru/v3' 
      : 'https://sandbox.yookassa.ru/v3';
  }

  private getAuthHeaders() {
    const credentials = btoa(`${this.config.shopId}:${this.config.secretKey}`);
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'Idempotence-Key': this.generateIdempotenceKey()
    };
  }

  private generateIdempotenceKey(): string {
    return `payout_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  async createPayout(
    sellerId: number,
    amount: number,
    paymentMethod: 'card' | 'sbp',
    accountDetails: string,
    description: string
  ): Promise<PayoutResponse> {
    try {
      // В тестовом режиме возвращаем мокированный ответ
      if (!this.config.isProduction) {
        return this.createMockPayout(sellerId, amount, paymentMethod, accountDetails, description);
      }

      const payoutData: PayoutRequest = {
        amount: {
          value: amount.toFixed(2),
          currency: 'RUB'
        },
        payout_destination_data: this.buildDestinationData(paymentMethod, accountDetails),
        description,
        metadata: {
          seller_id: sellerId.toString(),
          payment_method: paymentMethod
        }
      };

      const response = await fetch(`${this.baseUrl}/payouts`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payoutData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`ЮКасса API ошибка: ${errorData.description || response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Ошибка создания выплаты:', error);
      throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
  }

  private buildDestinationData(paymentMethod: 'card' | 'sbp', accountDetails: string) {
    if (paymentMethod === 'card') {
      return {
        type: 'bank_card' as const,
        card: {
          number: accountDetails // В реальном проекте нужно хранить зашифрованные данные карты
        }
      };
    } else {
      return {
        type: 'sbp' as const,
        phone: accountDetails
      };
    }
  }

  async getPayoutStatus(payoutId: string): Promise<PayoutResponse> {
    try {
      if (!this.config.isProduction) {
        return this.getMockPayoutStatus(payoutId);
      }

      const response = await fetch(`${this.baseUrl}/payouts/${payoutId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${this.config.shopId}:${this.config.secretKey}`)}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка получения статуса: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Ошибка получения статуса выплаты:', error);
      throw error;
    }
  }

  async cancelPayout(payoutId: string): Promise<PayoutResponse> {
    try {
      if (!this.config.isProduction) {
        return this.cancelMockPayout(payoutId);
      }

      const response = await fetch(`${this.baseUrl}/payouts/${payoutId}/cancel`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`Ошибка отмены выплаты: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Ошибка отмены выплаты:', error);
      throw error;
    }
  }

  // Мокированные методы для тестирования
  private createMockPayout(
    sellerId: number,
    amount: number,
    paymentMethod: 'card' | 'sbp',
    accountDetails: string,
    description: string
  ): PayoutResponse {
    return {
      id: `mock_payout_${Date.now()}`,
      status: 'pending',
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB'
      },
      description,
      created_at: new Date().toISOString(),
      payout_destination: {
        type: paymentMethod,
        ...(paymentMethod === 'card' 
          ? { card: { last4: accountDetails.slice(-4), card_type: 'MasterCard' } }
          : { phone: accountDetails }
        )
      },
      metadata: {
        seller_id: sellerId.toString(),
        payment_method: paymentMethod
      },
      test: true
    };
  }

  private getMockPayoutStatus(payoutId: string): PayoutResponse {
    // Симулируем разные статусы в зависимости от времени создания
    const isOld = payoutId.includes('old');
    const isFailed = payoutId.includes('failed');
    
    return {
      id: payoutId,
      status: isFailed ? 'canceled' : (isOld ? 'succeeded' : 'pending'),
      amount: {
        value: '1000.00',
        currency: 'RUB'
      },
      description: 'Выплата продавцу',
      created_at: new Date().toISOString(),
      payout_destination: {
        type: 'bank_card',
        card: {
          last4: '1234',
          card_type: 'MasterCard'
        }
      },
      test: true
    };
  }

  private cancelMockPayout(payoutId: string): PayoutResponse {
    return {
      id: payoutId,
      status: 'canceled',
      amount: {
        value: '1000.00',
        currency: 'RUB'
      },
      description: 'Выплата продавцу (отменена)',
      created_at: new Date().toISOString(),
      payout_destination: {
        type: 'bank_card'
      },
      cancellation_details: {
        reason: 'general_decline',
        party: 'yoo_money'
      },
      test: true
    };
  }

  // Вспомогательные методы
  formatPayoutStatus(status: string): { label: string; color: string } {
    const statusMap = {
      pending: { label: 'В обработке', color: 'yellow' },
      succeeded: { label: 'Выполнено', color: 'green' },
      canceled: { label: 'Отменено', color: 'red' }
    };
    
    return statusMap[status as keyof typeof statusMap] || { label: 'Неизвестно', color: 'gray' };
  }

  validatePayoutAmount(amount: number, minAmount: number = 100): { isValid: boolean; error?: string } {
    if (amount < minAmount) {
      return { isValid: false, error: `Минимальная сумма выплаты: ${minAmount} ₽` };
    }
    
    if (amount > 600000) {
      return { isValid: false, error: 'Максимальная сумма выплаты: 600 000 ₽' };
    }
    
    return { isValid: true };
  }
}

export const yooKassaService = new YooKassaService();
export type { PayoutResponse, PayoutRequest };