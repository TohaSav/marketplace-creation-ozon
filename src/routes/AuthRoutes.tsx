import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Страницы авторизации
import UserLogin from "@/pages/UserLogin";
import UserRegister from "@/pages/UserRegister";
import SellerLogin from "@/pages/SellerLogin";
import BuyerLogin from "@/pages/BuyerLogin";
import BuyerDashboard from "@/pages/BuyerDashboard";

const AuthRoutes = () => {
  try {
    return (
      <>
        {/* Авторизация пользователей */}
        <Route
          path="/login"
          element={
            <Layout>
              <UserLogin />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <UserRegister />
            </Layout>
          }
        />

        {/* Вход покупателей */}
        <Route
          path="/buyer-login"
          element={
            <BuyerLogin />
          }
        />
        
        {/* Кабинет покупателя */}
        <Route
          path="/buyer-dashboard"
          element={
            <BuyerDashboard />
          }
        />

        {/* Вход/регистрация продавцов */}
        <Route
          path="/seller-login"
          element={
            <SellerLogin />
          }
        />
        <Route
          path="/seller"
          element={
            <Layout>
              <SellerLogin />
            </Layout>
          }
        />
      </>
    );
  } catch (error) {
    console.error("AuthRoutes error:", error);
    return null;
  }
};

export default AuthRoutes;