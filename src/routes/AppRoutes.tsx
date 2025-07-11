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
  return (
    <Routes>
      {/* Админ-панель */}
      {AdminRoutes()}

      {/* Авторизация */}
      {AuthRoutes()}

      {/* Кабинет продавца */}
      {SellerRoutes()}

      {/* Публичные страницы */}
      {PublicRoutes()}

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
};

export default AppRoutes;
