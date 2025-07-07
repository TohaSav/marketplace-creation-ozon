const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ЮКасса конфигурация
const YOOKASSA_CONFIG = {
  shopId: process.env.YOOKASSA_SHOP_ID || "YOUR_SHOP_ID",
  secretKey: process.env.YOOKASSA_SECRET_KEY || "YOUR_SECRET_KEY",
  returnUrl:
    process.env.YOOKASSA_RETURN_URL ||
    "https://calibrestore.ru/seller/payment-success",
  apiUrl: "https://api.yookassa.ru/v3",
};

// Создание платежа через ЮКассу
const createYookassaPayment = async (
  amount,
  description,
  tariffId,
  sellerId,
) => {
  const paymentRequest = {
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
      sellerId: sellerId.toString(),
    },
  };

  const idempotenceKey = `${sellerId}-${tariffId}-${Date.now()}`;
  const auth = Buffer.from(
    `${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`,
  ).toString("base64");

  const response = await fetch(`${YOOKASSA_CONFIG.apiUrl}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotence-Key": idempotenceKey,
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(paymentRequest),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Ошибка создания платежа: ${response.status} - ${JSON.stringify(errorData)}`,
    );
  }

  const payment = await response.json();
  return payment;
};

// Проверка статуса платежа
const checkYookassaPayment = async (paymentId) => {
  const auth = Buffer.from(
    `${YOOKASSA_CONFIG.shopId}:${YOOKASSA_CONFIG.secretKey}`,
  ).toString("base64");

  const response = await fetch(
    `${YOOKASSA_CONFIG.apiUrl}/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Ошибка проверки платежа: ${response.status}`);
  }

  const payment = await response.json();
  return payment;
};

// API Routes

// Создание платежа
app.post("/api/payments/create", async (req, res) => {
  try {
    const { amount, description, tariffId, sellerId } = req.body;

    console.log("Создание платежа:", {
      amount,
      description,
      tariffId,
      sellerId,
    });

    if (!amount || !description || !tariffId || !sellerId) {
      return res
        .status(400)
        .json({ error: "Не все обязательные поля заполнены" });
    }

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
    res
      .status(500)
      .json({ error: "Ошибка создания платежа", details: error.message });
  }
});

// Проверка статуса платежа
app.get("/api/payments/verify/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;

    console.log("Проверка статуса платежа:", paymentId);

    const payment = await checkYookassaPayment(paymentId);

    res.json({
      status: payment.status,
      paid: payment.paid,
    });
  } catch (error) {
    console.error("Ошибка проверки платежа:", error);
    res
      .status(500)
      .json({ error: "Ошибка проверки платежа", details: error.message });
  }
});

// Webhook для уведомлений от ЮКассы
app.post("/api/payments/webhook", async (req, res) => {
  try {
    const { event, object } = req.body;

    console.log("Webhook от ЮКассы:", { event, object });

    if (event === "payment.succeeded") {
      const payment = object;

      // Активируем подписку
      if (payment.metadata?.sellerId && payment.metadata?.tariffId) {
        console.log(
          `Активация подписки для продавца ${payment.metadata.sellerId}, тариф ${payment.metadata.tariffId}`,
        );

        // Здесь должна быть логика активации подписки в вашей базе данных
        // Пока просто логируем
        console.log("Подписка активирована!");
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Ошибка обработки webhook:", error);
    res.status(500).json({ error: "Ошибка обработки webhook" });
  }
});

// Информация о тарифах
app.get("/api/tariffs", (req, res) => {
  const tariffs = [
    {
      id: "trial",
      name: "Пробный период",
      price: 0,
      duration: "2 дня",
      features: [
        "Добавление до 5 товаров",
        "Базовая статистика продаж",
        "Доступ к панели управления",
        "Тестирование всех функций",
      ],
    },
    {
      id: "monthly",
      name: "Месячная подписка",
      price: 4200,
      duration: "1 месяц",
      features: [
        "Добавление неограниченного количества товаров",
        "Управление заказами и статистикой",
        "Техническая поддержка",
        "Продвижение товаров в каталоге",
      ],
    },
    {
      id: "yearly",
      name: "Годовая подписка",
      price: 50000,
      duration: "12 месяцев",
      popular: true,
      savings: "Экономия 400 ₽ в месяц",
      features: [
        "Добавление неограниченного количества товаров",
        "Управление заказами и статистикой",
        "Приоритетная техническая поддержка",
        "Продвижение товаров в каталоге",
        "Расширенная аналитика продаж",
        "Персональный менеджер",
      ],
    },
  ];

  res.json(tariffs);
});

// Статус сервера
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    yookassa: {
      configured: !!(YOOKASSA_CONFIG.shopId && YOOKASSA_CONFIG.secretKey),
      shopId: YOOKASSA_CONFIG.shopId
        ? YOOKASSA_CONFIG.shopId.substring(0, 8) + "..."
        : "не настроен",
    },
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🔧 ЮКасса настроена: ${YOOKASSA_CONFIG.shopId ? "Да" : "Нет"}`);
  console.log(`📊 API доступен по адресу: http://localhost:${PORT}/api`);
});

module.exports = app;
