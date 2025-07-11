import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Index />
            </Layout>
          }
        />
        <Route
          path="/electronics"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Электроника
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/clothing"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Одежда
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/home-garden"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Дом и сад
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/sport"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Спорт
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Войти как покупатель
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Регистрация покупателя
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/seller"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Стать продавцом
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/how-to-order"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Как заказать
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/delivery"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Доставка
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/returns"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Возврат товаров
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/payment-methods"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Способы оплаты
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/how-to-sell"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Как продавать
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/commissions"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Комиссии
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/trading-rules"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Правила торговли
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/support"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Служба поддержки
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Политика конфиденциальности
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/personal-data"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Обработка данных
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/beauty"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Красота
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/books"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Книги
                  </h1>
                  <p className="text-gray-600 mb-8">Раздел в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Заказы
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/favorites"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Избранное
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Корзина
                  </h1>
                  <p className="text-gray-600 mb-8">Страница в разработке</p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    404 - Страница не найдена
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Запрашиваемая страница не существует
                  </p>
                  <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
