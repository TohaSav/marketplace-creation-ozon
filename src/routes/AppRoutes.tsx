import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Модульные группы маршрутов
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import SellerRoutes from "./SellerRoutes";
import AuthRoutes from "./AuthRoutes";

// 404 страница
import NotFound from "@/pages/NotFound";

/**
 * Главный компонент маршрутизации приложения
 *
 * Структура:
 * - AdminRoutes: маршруты админ-панели (/admin/*)
 * - AuthRoutes: авторизация и регистрация (/login, /register)
 * - SellerRoutes: кабинет продавца (/seller/*)
 * - PublicRoutes: общедоступные страницы
 * - 404: обработка несуществующих маршрутов
 */
const AppRoutes = () => {
  try {
    return (
      <Routes>
        {/* Админ-панель */}
        <AdminRoutes />

        {/* Авторизация */}
        <AuthRoutes />

        {/* Кабинет продавца */}
        <SellerRoutes />

        {/* Публичные страницы */}
        <PublicRoutes />

        {/* 404 - должно быть последним */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    );
  } catch (error) {
    console.error("AppRoutes error:", error);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Calibre Store
          </h1>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }
};

export default AppRoutes;
