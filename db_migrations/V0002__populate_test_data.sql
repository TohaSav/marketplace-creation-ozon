-- Заполнение базы данных тестовыми данными

-- Вставка категорий
INSERT INTO categories (name, slug, description, parent_id, sort_order) VALUES
('Электроника', 'electronics', 'Все виды электронных устройств', NULL, 1),
('Смартфоны', 'smartphones', 'Мобильные телефоны и аксессуары', 1, 1),
('Ноутбуки', 'laptops', 'Портативные компьютеры', 1, 2),
('Одежда', 'clothing', 'Модная одежда для всех', NULL, 2),
('Мужская одежда', 'mens-clothing', 'Одежда для мужчин', 4, 1),
('Женская одежда', 'womens-clothing', 'Одежда для женщин', 4, 2),
('Дом и сад', 'home-garden', 'Товары для дома и сада', NULL, 3),
('Спорт', 'sports', 'Спортивные товары и экипировка', NULL, 4);

-- Вставка тестовых пользователей
INSERT INTO users (email, username, full_name, phone, role, balance, is_verified) VALUES
('admin@marketplace.ru', 'admin', 'Администратор Системы', '+7-999-000-0001', 'admin', 10000.00, true),
('seller1@marketplace.ru', 'techstore', 'Иван Технологов', '+7-999-000-0002', 'seller', 5000.00, true),
('seller2@marketplace.ru', 'fashionshop', 'Анна Модникова', '+7-999-000-0003', 'seller', 3000.00, true),
('customer1@marketplace.ru', 'buyer1', 'Петр Покупателев', '+7-999-000-0004', 'customer', 1500.00, true),
('customer2@marketplace.ru', 'buyer2', 'Мария Заказчикова', '+7-999-000-0005', 'customer', 2000.00, true);

-- Вставка магазинов
INSERT INTO shops (owner_id, name, slug, description, rating, total_reviews, is_verified, is_active, commission_rate) VALUES
(2, 'TechStore', 'techstore', 'Магазин современной электроники и гаджетов', 4.8, 156, true, true, 5.00),
(3, 'Fashion House', 'fashion-house', 'Стильная одежда для современных людей', 4.6, 89, true, true, 7.00);

-- Вставка товаров
INSERT INTO products (shop_id, category_id, name, slug, description, short_description, price, sale_price, sku, stock_quantity, status, rating, total_reviews, is_featured) VALUES
(1, 2, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'Последняя модель iPhone с титановым корпусом и революционной камерой', 'Новейший iPhone с A17 Pro чипом', 119990.00, 109990.00, 'IPHONE15PM-256', 25, 'active', 4.9, 42, true),
(1, 2, 'Samsung Galaxy S24 Ultra', 'samsung-s24-ultra', 'Флагманский смартфон Samsung с S Pen и камерой 200MP', 'Профессиональная съемка в вашем кармане', 99990.00, NULL, 'GALAXY-S24U-512', 18, 'active', 4.7, 31, true),
(1, 3, 'MacBook Pro 16" M3', 'macbook-pro-16-m3', 'Мощный ноутбук для профессионалов с чипом M3', 'Безграничная производительность', 249990.00, 239990.00, 'MBP16-M3-512', 12, 'active', 4.8, 28, true),
(1, 3, 'ASUS ROG Strix G15', 'asus-rog-strix-g15', 'Игровой ноутбук с RTX 4060 и процессором AMD Ryzen 7', 'Игры на максимальных настройках', 89990.00, NULL, 'ASUS-ROG-G15-RTX4060', 8, 'active', 4.5, 15, false),
(2, 5, 'Мужская куртка зимняя', 'mens-winter-jacket', 'Теплая зимняя куртка из качественных материалов', 'Стиль и тепло в одном', 8990.00, 6990.00, 'JACKET-WINTER-M-L', 45, 'active', 4.3, 67, false),
(2, 6, 'Женское платье коктейльное', 'womens-cocktail-dress', 'Элегантное платье для особых случаев', 'Будьте королевой вечера', 12990.00, NULL, 'DRESS-COCKTAIL-W-M', 22, 'active', 4.6, 38, true);

-- Вставка изображений товаров
INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary) VALUES
(1, '/images/products/iphone15-1.jpg', 'iPhone 15 Pro Max основное фото', 0, true),
(1, '/images/products/iphone15-2.jpg', 'iPhone 15 Pro Max вид сзади', 1, false),
(2, '/images/products/samsung-s24-1.jpg', 'Samsung Galaxy S24 Ultra основное фото', 0, true),
(3, '/images/products/macbook-1.jpg', 'MacBook Pro 16 основное фото', 0, true),
(4, '/images/products/asus-rog-1.jpg', 'ASUS ROG Strix основное фото', 0, true),
(5, '/images/products/jacket-1.jpg', 'Мужская куртка основное фото', 0, true),
(6, '/images/products/dress-1.jpg', 'Женское платье основное фото', 0, true);

-- Вставка атрибутов товаров
INSERT INTO product_attributes (product_id, name, value) VALUES
(1, 'Цвет', 'Titanium Blue'),
(1, 'Память', '256GB'),
(1, 'Экран', '6.7 дюймов'),
(2, 'Цвет', 'Phantom Black'),
(2, 'Память', '512GB'),
(2, 'Экран', '6.8 дюймов'),
(3, 'Цвет', 'Space Gray'),
(3, 'Память', '512GB SSD'),
(3, 'Процессор', 'Apple M3'),
(5, 'Размер', 'L'),
(5, 'Цвет', 'Черный'),
(5, 'Материал', 'Полиэстер'),
(6, 'Размер', 'M'),
(6, 'Цвет', 'Красный'),
(6, 'Материал', 'Шелк');

-- Вставка адресов пользователей
INSERT INTO user_addresses (user_id, type, city, street, house, apartment, postal_code, is_default) VALUES
(4, 'delivery', 'Москва', 'ул. Пушкина', '10', '25', '123456', true),
(5, 'delivery', 'Санкт-Петербург', 'Невский проспект', '15', '3', '654321', true);

-- Вставка тестовых заказов
INSERT INTO orders (user_id, order_number, status, payment_status, payment_method, total_amount, shipping_cost, shipping_address, shipping_method, estimated_delivery) VALUES
(4, 'ORD-2024-000001', 'delivered', 'paid', 'card', 109990.00, 500.00, '{"city": "Москва", "street": "ул. Пушкина", "house": "10", "apartment": "25", "postal_code": "123456"}', 'courier', '2024-09-25'),
(5, 'ORD-2024-000002', 'processing', 'paid', 'card', 12990.00, 300.00, '{"city": "Санкт-Петербург", "street": "Невский проспект", "house": "15", "apartment": "3", "postal_code": "654321"}', 'pickup', '2024-09-23');

-- Вставка позиций заказов
INSERT INTO order_items (order_id, product_id, shop_id, quantity, price, total, commission_amount, product_name, product_sku) VALUES
(1, 1, 1, 1, 109990.00, 109990.00, 5499.50, 'iPhone 15 Pro Max', 'IPHONE15PM-256'),
(2, 6, 2, 1, 12990.00, 12990.00, 909.30, 'Женское платье коктейльное', 'DRESS-COCKTAIL-W-M');

-- Вставка отзывов
INSERT INTO reviews (user_id, product_id, order_id, rating, title, comment, is_verified) VALUES
(4, 1, 1, 5, 'Отличный телефон!', 'Камера просто супер, очень доволен покупкой. Быстрая доставка.', true),
(5, 6, 2, 4, 'Красивое платье', 'Качество хорошее, размер подошел. Буду заказывать еще.', true);

-- Вставка купонов
INSERT INTO coupons (code, type, value, minimum_amount, usage_limit, valid_until) VALUES
('WELCOME10', 'percentage', 10.00, 1000.00, 100, '2024-12-31 23:59:59'),
('SAVE500', 'fixed', 500.00, 5000.00, 50, '2024-11-30 23:59:59'),
('NEWUSER', 'percentage', 15.00, 2000.00, 200, '2024-10-31 23:59:59');

-- Вставка уведомлений
INSERT INTO notifications (user_id, type, title, message, is_read) VALUES
(4, 'order_status', 'Заказ доставлен', 'Ваш заказ #ORD-2024-000001 успешно доставлен!', true),
(5, 'order_status', 'Заказ в обработке', 'Ваш заказ #ORD-2024-000002 принят в обработку.', false),
(4, 'promotion', 'Новая акция!', 'Скидка 20% на все смартфоны до конца месяца!', false);

-- Вставка товаров в избранное
INSERT INTO wishlists (user_id, product_id) VALUES
(4, 3),
(4, 2),
(5, 1),
(5, 5);