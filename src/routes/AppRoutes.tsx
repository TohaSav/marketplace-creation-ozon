import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

// Страницы
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Category from "@/pages/Category";

// Админ-панель
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminUsers from "@/pages/AdminUsers";
import AdminSellers from "@/pages/AdminSellers";
import AdvertisingAdminPage from "@/pages/admin/AdvertisingAdminPage";
import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminChat from "@/pages/AdminChat";
import AdminPayments from "@/pages/AdminPayments";
import AdminDataManagement from "@/pages/AdminDataManagement";
import ShopVerification from "@/pages/admin/ShopVerification";

// Общие страницы
import TradingRules from "@/pages/TradingRules";
import Commissions from "@/pages/Commissions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import PersonalData from "@/pages/PersonalData";
import HowToSell from "@/pages/HowToSell";
import HowToOrder from "@/pages/HowToOrder";
import PaymentMethods from "@/pages/PaymentMethods";
import Delivery from "@/pages/Delivery";
import Returns from "@/pages/Returns";
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import BonusCard from "@/pages/BonusCard";
import Profile from "@/pages/Profile";
import Orders from "@/pages/Orders";
import Settings from "@/pages/Settings";
import Shorts from "@/pages/Shorts";
import Support from "@/pages/Support";
import Notifications from "@/pages/Notifications";
import Game from "@/pages/Game";
import Wallet from "@/pages/Wallet";
import WalletSuccess from "@/pages/WalletSuccess";

// Авторизация
import UserLogin from "@/pages/UserLogin";
import UserRegister from "@/pages/UserRegister";

// Кабинет продавца
import SellerLogin from "@/pages/SellerLogin";
import SellerDashboard from "@/pages/SellerDashboard";
import AddProduct from "@/pages/AddProduct";
import SellerTariffs from "@/pages/SellerTariffs";
import SellerAdvertising from "@/pages/SellerAdvertising";
import SellerAdvertisingSuccess from "@/pages/SellerAdvertisingSuccess";
import SellerLuckGame from "@/pages/SellerLuckGame";
import SellerWallet from "@/pages/SellerWallet";
import SellerWalletSuccess from "@/pages/SellerWalletSuccess";
import PaymentSuccess from "@/pages/PaymentSuccess";
import AdvertisingPage from "@/pages/AdvertisingPage";
import PaymentPage from "@/pages/PaymentPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Админ-панель */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <AdminUsers />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/sellers"
        element={
          <AdminProtectedRoute>
            <AdminSellers />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminProtectedRoute>
            <AdminAnalytics />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <AdminProtectedRoute>
            <AdminPayments />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/data"
        element={
          <AdminProtectedRoute>
            <AdminDataManagement />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/chat"
        element={
          <AdminProtectedRoute>
            <AdminChat />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/verification"
        element={
          <AdminProtectedRoute>
            <ShopVerification />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/advertising"
        element={
          <AdminProtectedRoute>
            <AdvertisingAdminPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* Главная и категории */}
      <Route
        path="/"
        element={
          <Layout>
            <Index />
          </Layout>
        }
      />
      <Route
        path="/category/:categorySlug"
        element={
          <Layout>
            <Category />
          </Layout>
        }
      />

      {/* Общие страницы */}
      <Route
        path="/privacy"
        element={
          <Layout>
            <PrivacyPolicy />
          </Layout>
        }
      />
      <Route
        path="/personal-data"
        element={
          <Layout>
            <PersonalData />
          </Layout>
        }
      />
      <Route
        path="/how-to-sell"
        element={
          <Layout>
            <HowToSell />
          </Layout>
        }
      />
      <Route
        path="/how-to-order"
        element={
          <Layout>
            <HowToOrder />
          </Layout>
        }
      />
      <Route
        path="/payment-methods"
        element={
          <Layout>
            <PaymentMethods />
          </Layout>
        }
      />
      <Route
        path="/delivery"
        element={
          <Layout>
            <Delivery />
          </Layout>
        }
      />
      <Route
        path="/returns"
        element={
          <Layout>
            <Returns />
          </Layout>
        }
      />
      <Route
        path="/trading-rules"
        element={
          <Layout>
            <TradingRules />
          </Layout>
        }
      />
      <Route
        path="/commissions"
        element={
          <Layout>
            <Commissions />
          </Layout>
        }
      />

      {/* Пользовательские страницы */}
      <Route
        path="/favorites"
        element={
          <Layout>
            <Favorites />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/bonus-card"
        element={
          <Layout>
            <BonusCard />
          </Layout>
        }
      />
      <Route
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />
      <Route
        path="/wallet-success"
        element={
          <Layout>
            <WalletSuccess />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
      <Route
        path="/shorts"
        element={
          <Layout>
            <Shorts />
          </Layout>
        }
      />
      <Route
        path="/support"
        element={
          <Layout>
            <Support />
          </Layout>
        }
      />
      <Route
        path="/notifications"
        element={
          <Layout>
            <Notifications />
          </Layout>
        }
      />
      <Route
        path="/game"
        element={
          <Layout>
            <Game />
          </Layout>
        }
      />
      <Route
        path="/advertising"
        element={
          <Layout>
            <AdvertisingPage />
          </Layout>
        }
      />
      <Route
        path="/payment"
        element={
          <Layout>
            <PaymentPage />
          </Layout>
        }
      />

      {/* Авторизация */}
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

      {/* Кабинет продавца */}
      <Route
        path="/seller"
        element={
          <Layout>
            <SellerLogin />
          </Layout>
        }
      />
      <Route
        path="/seller/dashboard"
        element={
          <Layout>
            <SellerDashboard />
          </Layout>
        }
      />
      <Route
        path="/seller/add-product"
        element={
          <Layout>
            <AddProduct />
          </Layout>
        }
      />
      <Route
        path="/seller/tariffs"
        element={
          <Layout>
            <SellerTariffs />
          </Layout>
        }
      />
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
      <Route
        path="/seller/luck-game"
        element={
          <Layout>
            <SellerLuckGame />
          </Layout>
        }
      />
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
      <Route
        path="/seller/payment-success"
        element={
          <Layout>
            <PaymentSuccess />
          </Layout>
        }
      />

      {/* 404 */}
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
