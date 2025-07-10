# Анализ несуществующих ссылок в проекте

## Маршруты, определенные в App.tsx:
1. `/` - главная страница (Index)
2. `/category/:categoryId` - страница категории
3. `*` - 404 страница (NotFound)

## Несуществующие ссылки (ведут на 404):

### Из Header.tsx:
- `/shorts` - короткие видео
- `/advertising` - реклама
- `/favorites` - избранное
- `/cart` - корзина
- `/auth` - авторизация (редирект)
- `/profile` - профиль
- `/orders` - заказы
- `/bonus-card` - бонусная карта
- `/wallet` - кошелек
- `/game` - игра
- `/seller/dashboard` - кабинет продавца
- `/seller/add-product` - добавить товар
- `/seller/advertising` - реклама продавца
- `/seller/luck-game` - игры удачи
- `/seller/wallet` - кошелек продавца
- `/notifications` - уведомления
- `/settings` - настройки
- `/login` - вход покупателя
- `/register` - регистрация покупателя
- `/seller` - стать продавцом

### Из Footer.tsx:
- `/how-to-order` - как заказать
- `/delivery` - доставка
- `/returns` - возврат
- `/support` - поддержка
- `/how-to-sell` - как продавать
- `/commissions` - комиссии
- `/seller/tariffs` - тарифы
- `/privacy` - конфиденциальность
- `/personal-data` - персональные данные

### Из CTASection.tsx:
- `/register` - регистрация
- `/seller` - стать продавцом

### Из компонентов категорий:
- `/category/electronics` - электроника
- `/category/clothing` - одежда
- `/category/home-garden` - дом и сад
- `/category/beauty` - красота
- `/category/sport` - спорт
- `/category/auto` - авто
- `/category/books` - книги
- `/category/toys` - игрушки
- `/category/home` - дом
- `/category/sports` - спорт

## Проблема:
В проекте есть две системы маршрутизации:
1. **Основная** - используется в App.tsx (только 3 маршрута)
2. **Альтернативная** - файлы в папке routes/ (множество маршрутов, но не используется)

## Рекомендации:
1. Заменить маршрутизацию в App.tsx на использование AppRoutes.tsx
2. Либо добавить все недостающие маршруты в App.tsx
3. Проверить и исправить несоответствия в названиях категорий (`/category/sport` vs `/category/sports`, `/category/home-garden` vs `/category/home`)

## Общее количество несуществующих ссылок: 37+

Все эти ссылки будут перенаправлять пользователей на страницу 404 (NotFound).