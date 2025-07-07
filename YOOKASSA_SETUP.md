# Настройка ЮКассы для Calibre Store

## Настройка ЮКассы

### 1. Получение данных от ЮКассы

1. Зарегистрируйтесь в [ЮКассе](https://yookassa.ru/)
2. Получите `shopId` и `secretKey` в личном кабинете
3. Настройте URL для уведомлений (webhook)

### 2. Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# ЮКасса
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
YOOKASSA_RETURN_URL=https://calibrestore.ru/seller/payment-success

# Или для разработки
YOOKASSA_RETURN_URL=http://localhost:3000/seller/payment-success
```

### 3. Серверная часть

Необходимо реализовать следующие API эндпоинты:

#### POST `/api/payments/create`

```javascript
// Создание платежа
app.post('/api/payments/create', async (req, res) => {
  try {
    const { amount, description, tariffId, sellerId } = req.body;
    
    const payment = await createYookassaPayment(
      amount,
      description,
      tariffId,
      sellerId
    );
    
    res.json({
      id: payment.id,
      status: payment.status,
      confirmationUrl: payment.confirmation.confirmation_url
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания платежа" });
  }
});
```

#### GET `/api/payments/verify/:paymentId`

```javascript
// Проверка статуса платежа
app.get('/api/payments/verify/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await checkYookassaPayment(paymentId);
    
    res.json({
      status: payment.status,
      paid: payment.paid
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка проверки платежа" });
  }
});
```

#### POST `/api/payments/webhook`

```javascript
// Обработка уведомлений от ЮКассы
app.post('/api/payments/webhook', async (req, res) => {
  try {
    const { event, object } = req.body;
    
    if (event === 'payment.succeeded') {
      const payment = object;
      
      // Активируем подписку
      if (payment.metadata?.sellerId && payment.metadata?.tariffId) {
        await activateSellerSubscription(
          payment.metadata.sellerId,
          payment.metadata.tariffId
        );
      }
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Ошибка обработки webhook" });
  }
});
```

### 4. Подключение к фронтенду

Файл `src/utils/yookassaApi.ts` уже настроен для работы с вашим API.

### 5. Тестирование

1. Используйте тестовые данные ЮКассы для разработки
2. Настройте webhook URL в личном кабинете ЮКассы
3. Протестируйте все сценарии оплаты

### 6. Безопасность

- Никогда не храните секретные ключи в коде
- Используйте HTTPS для всех запросов
- Проверяйте подпись webhook от ЮКассы
- Валидируйте все входящие данные

### 7. Тарифы

Текущие тарифы настроены в `src/utils/yookassaApi.ts`:

- **Пробный период**: 0 ₽ (2 дня)
- **Месячная подписка**: 4200 ₽ (1 месяц)
- **Годовая подписка**: 50000 ₽ (12 месяцев)

### 8. Поддерживаемые функции

- ✅ Создание платежей
- ✅ Проверка статуса платежей
- ✅ Обработка webhook уведомлений
- ✅ Активация подписок
- ✅ Страница успешной оплаты
- ✅ Обработка ошибок

### 9. Дополнительные возможности

- Возвраты платежей
- Рекуррентные платежи
- Отчеты по платежам
- Интеграция с системой лояльности

### 10. Поддержка

При возникновении проблем:

1. Проверьте логи сервера
2. Убедитесь в правильности настройки webhook
3. Свяжитесь с технической поддержкой ЮКассы