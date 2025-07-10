import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Страницы авторизации
import UserLogin from "@/pages/UserLogin";
import UserRegister from "@/pages/UserRegister";
import SellerLogin from "@/pages/SellerLogin";

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

        {/* Вход/регистрация продавцов */}
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
