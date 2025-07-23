import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Страницы продавца
import SellerDashboard from "@/pages/SellerDashboard";
import SellerRegister from "@/pages/SellerRegister";
import AddProduct from "@/pages/AddProduct";
import SellerAdvertising from "@/pages/SellerAdvertising";
import SellerAdvertisingSuccess from "@/pages/SellerAdvertisingSuccess";
import SellerLuckGame from "@/pages/SellerLuckGame";
import SellerWallet from "@/pages/SellerWallet";
import SellerWalletSuccess from "@/pages/SellerWalletSuccess";
import SellerTariffs from "@/pages/SellerTariffs";
import SellerPricing from "@/pages/SellerPricing";

const SellerRoutes = () => {
  try {
    return (
      <>
        {/* Регистрация продавца */}
        <Route
          path="/seller/register"
          element={
            <Layout>
              <SellerRegister />
            </Layout>
          }
        />

        {/* Кабинет продавца */}
        <Route
          path="/seller/dashboard"
          element={
            <Layout>
              <SellerDashboard />
            </Layout>
          }
        />

        {/* Добавление товара */}
        <Route
          path="/seller/add-product"
          element={
            <Layout>
              <AddProduct />
            </Layout>
          }
        />

        {/* Реклама */}
        <Route
          path="/seller/advertising"
          element={
            <Layout>
              <SellerAdvertising />
            </Layout>
          }
        />
        <Route
          path="/seller/advertising-success"
          element={
            <Layout>
              <SellerAdvertisingSuccess />
            </Layout>
          }
        />

        {/* Игры и развлечения */}
        <Route
          path="/seller/luck-game"
          element={
            <Layout>
              <SellerLuckGame />
            </Layout>
          }
        />

        {/* Кошелек */}
        <Route
          path="/seller/wallet"
          element={
            <Layout>
              <SellerWallet />
            </Layout>
          }
        />
        <Route
          path="/seller/wallet-success"
          element={
            <Layout>
              <SellerWalletSuccess />
            </Layout>
          }
        />

        {/* Тарифы */}
        <Route
          path="/seller/tariffs"
          element={
            <Layout>
              <SellerTariffs />
            </Layout>
          }
        />

        {/* Выбор тарифного плана */}
        <Route
          path="/seller/pricing"
          element={
            <Layout>
              <SellerPricing />
            </Layout>
          }
        />
      </>
    );
  } catch (error) {
    console.error("SellerRoutes error:", error);
    return null;
  }
};

export default SellerRoutes;