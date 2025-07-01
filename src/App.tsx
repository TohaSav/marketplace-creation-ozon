import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminChat from "./pages/AdminChat";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

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
              path="/admin/analytics"
              element={
                <AdminProtectedRoute>
                  <AdminAnalytics />
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
              path="/admin/settings"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            {/* Общие страницы */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/how-to-sell" element={<HowToSell />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/bonus-card" element={<BonusCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/support" element={<Support />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Авторизация покупателей */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />

            {/* Кабинет продавца */}
            <Route path="/seller" element={<SellerLogin />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/add-product" element={<AddProduct />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
