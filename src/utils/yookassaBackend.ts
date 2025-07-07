// Пример серверного API для работы с ЮКассой
// Этот код должен быть реализован на вашем сервере

interface YookassaConfig {
  shopId: string;
  secretKey: string;
  returnUrl: string;
  apiUrl: string;
}

interface CreatePaymentRequest {
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    return_url: string;
  };
  capture: boolean;
  description: string;
  metadata?: {
    tariffId: string;
    sellerId: string;
  };
}

interface YookassaPayment {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  created_at: string;
  description: string;
  metadata?: any;
  paid: boolean;
  refundable: boolean;
  test: boolean;
}

// Конфигурация ЮКассы (должна быть в переменных окружения)
const YOOKASSA_CONFIG: YookassaConfig = {
  shopId: process.env.YOOKASSA_SHOP_ID || "YOUR_SHOP_ID",
  secretKey: process.env.YOOKASSA_SECRET_KEY || "YOUR_SECRET_KEY",
  returnUrl:
    process.env.YOOKASSA_RETURN_URL ||
    "https://calibrestore.ru/seller/payment-success",
  apiUrl: "https://api.yookassa.ru/v3",
};

// Создание платежа через ЮКассу API
export const createYookassaPayment = async (
  amount: number,
  description: string,
  tariffId: string,
  sellerId: string,
): Promise<YookassaPayment> => {
  const paymentRequest: CreatePaymentRequest = {
    amount: {
      value: (amount / 100).toFixed(2), // Конвертируем копейки в рубли
      currency: "RUB",
    },
    confirmation: {
      type: "redirect",
      return_url: `${YOOKASSA_CONFIG.returnUrl}?tariff_id=${tariffId}`,
    },
    capture: true,
    description: description,
    metadata: {
      tariffId,
      sellerId,
    },
  };

  const response = await fetch(`${YOOKASSA_CONFIG.apiUrl}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": `${sellerId}-${tariffId}-${Date.now()}`,
      Authorization: `Basic ${Buffer.from(
        `${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`,
      ).toString("base64")}`,
    },
    body: JSON.stringify(paymentRequest),
  });

  if (!response.ok) {
    throw new Error(`Ошибка создания платежа: ${response.status}`);
  }

  const payment: YookassaPayment = await response.json();
  return payment;
};

// Проверка статуса платежа
export const checkYookassaPayment = async (
  paymentId: string,
): Promise<YookassaPayment> => {
  const response = await fetch(
    `${YOOKASSA_CONFIG.apiUrl}/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`,
        ).toString("base64")}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Ошибка проверки платежа: ${response.status}`);
  }

  const payment: YookassaPayment = await response.json();
  return payment;
};

// Обработка webhook от ЮКассы
export const handleYookassaWebhook = async (request: any) => {
  const { event, object } = request.body;

  if (event === "payment.succeeded") {
    const payment = object as YookassaPayment;

    // Активируем подписку пользователя
    if (payment.metadata?.sellerId && payment.metadata?.tariffId) {
      await activateSellerSubscription(
        payment.metadata.sellerId,
        payment.metadata.tariffId,
      );
    }
  }
};

// Активация подписки продавца
const activateSellerSubscription = async (
  sellerId: string,
  tariffId: string,
) => {
  // Здесь должна быть логика сохранения подписки в базе данных
  console.log(`Активация подписки для продавца ${sellerId}, тариф ${tariffId}`);
};

// Пример серверного роута для создания платежа
export const createPaymentRoute = async (req: any, res: any) => {
  try {
    const { amount, description, tariffId, sellerId } = req.body;

    const payment = await createYookassaPayment(
      amount,
      description,
      tariffId,
      sellerId,
    );

    res.json({
      id: payment.id,
      status: payment.status,
      confirmationUrl: payment.confirmation.confirmation_url,
    });
  } catch (error) {
    console.error("Ошибка создания платежа:", error);
    res.status(500).json({ error: "Ошибка создания платежа" });
  }
};

// Пример серверного роута для проверки платежа
export const verifyPaymentRoute = async (req: any, res: any) => {
  try {
    const { paymentId } = req.params;

    const payment = await checkYookassaPayment(paymentId);

    res.json({
      status: payment.status,
      paid: payment.paid,
    });
  } catch (error) {
    console.error("Ошибка проверки платежа:", error);
    res.status(500).json({ error: "Ошибка проверки платежа" });
  }
};

// Пример серверного роута для webhook
export const yookassaWebhookRoute = async (req: any, res: any) => {
  try {
    await handleYookassaWebhook(req);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Ошибка обработки webhook:", error);
    res.status(500).json({ error: "Ошибка обработки webhook" });
  }
};
