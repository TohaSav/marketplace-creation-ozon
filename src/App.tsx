import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import { useEffect } from "react";
import { initializeTestData } from "@/utils/seedData";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminSellers from "./pages/AdminSellers";
import AdminAdvertising from "./pages/AdminAdvertising";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminChat from "./pages/AdminChat";
import AdminPayments from "./pages/AdminPayments";
import AdminDataManagement from "./pages/AdminDataManagement";
import TradingRules from "./pages/TradingRules";
import Commissions from "./pages/Commissions";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PersonalData from "./pages/PersonalData";
import HowToSell from "./pages/HowToSell";
import HowToOrder from "./pages/HowToOrder";
import PaymentMethods from "./pages/PaymentMethods";
import Delivery from "./pages/Delivery";
import Returns from "./pages/Returns";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import BonusCard from "./pages/BonusCard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Shorts from "./pages/Shorts";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import SellerTariffs from "./pages/SellerTariffs";
import SellerAdvertising from "./pages/SellerAdvertising";
import SellerAdvertisingSuccess from "./pages/SellerAdvertisingSuccess";
import SellerLuckGame from "./pages/SellerLuckGame";
import PaymentSuccess from "./pages/PaymentSuccess";
import Game from "./pages/Game";

import ShopVerification from "./pages/admin/ShopVerification";
import Category from "./pages/Category";

const queryClient = new QueryClient();

const App = () => {
  // Инициализируем тестовые данные при загрузке приложения
  useEffect(() => {
    try {
      initializeTestData();
    } catch (error) {
      console.error("Ошибка инициализации данных:", error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MarketplaceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Админка */}
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
                      <AdminAdvertising />
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

                {/* Главная страница */}
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Index />
                    </Layout>
                  }
                />

                {/* Категории */}
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

                {/* Авторизация покупателей */}
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
                  path="/seller/payment-success"
                  element={
                    <Layout>
                      <PaymentSuccess />
                    </Layout>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
