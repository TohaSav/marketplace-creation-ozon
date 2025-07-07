# Calibre Store Server

Серверная часть для интеграции с ЮКассой.

## Установка

```bash
cd server
npm install
```

## Настройка

1. Скопируйте файл `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Заполните переменные окружения в `.env`:
```env
YOOKASSA_SHOP_ID=ваш_shop_id
YOOKASSA_SECRET_KEY=ваш_secret_key
YOOKASSA_RETURN_URL=https://calibrestore.ru/seller/payment-success
PORT=3001
```

## Запуск

### Разработка
```bash
npm run dev
```

### Продакшн
```bash
npm start
```

## API Эндпоинты

### POST `/api/payments/create`
Создание платежа через ЮКассу

**Запрос:**
```json
{
  "amount": 4200,
  "description": "Подписка Месячная подписка для продавца",
  "tariffId": "monthly",
  "sellerId": 123,
  "returnUrl": "https://calibrestore.ru/seller/payment-success"
}
```

**Ответ:**
```json
{
  "id": "payment_id",
  "status": "pending",
  "confirmationUrl": "https://yookassa.ru/checkout/payments/payment_id"
}
```

### GET `/api/payments/verify/:paymentId`
Проверка статуса платежа

**Ответ:**
```json
{
  "status": "succeeded",
  "paid": true
}
```

### POST `/api/payments/webhook`
Webhook для уведомлений от ЮКассы

### GET `/api/health`
Статус сервера

## Настройка в ЮКассе

1. В личном кабинете ЮКассы настройте URL для уведомлений:
   - Для разработки: `http://localhost:3001/api/payments/webhook`
   - Для продакшна: `https://calibrestore.ru/api/payments/webhook`

2. Включите уведомления для событий:
   - `payment.succeeded`
   - `payment.canceled`

## Безопасность

- Все секретные ключи хранятся в переменных окружения
- API использует базовую аутентификацию для запросов к ЮКассе
- Webhook проверяет подпись от ЮКассы (в будущих версиях)