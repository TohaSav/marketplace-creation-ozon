import { Route, Navigate } from "react-router-dom";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

// Админ страницы
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminUsers from "@/pages/AdminUsers";
import AdminSellers from "@/pages/AdminSellers";
import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminChat from "@/pages/AdminChat";
import AdminPayments from "@/pages/AdminPayments";
import AdminDataManagement from "@/pages/AdminDataManagement";

// Специализированные админ страницы
import AdvertisingAdminPage from "@/pages/admin/AdvertisingAdminPage";
import ShopVerification from "@/pages/admin/ShopVerification";
import PaymentSettings from "@/pages/admin/PaymentSettings";

// Конфигурация маршрутов
const adminRoutes = [
  {
    path: "dashboard",
    component: AdminDashboard,
    protected: true,
  },
  {
    path: "products",
    component: AdminProducts,
    protected: true,
  },
  {
    path: "orders",
    component: AdminOrders,
    protected: true,
  },
  {
    path: "users",
    component: AdminUsers,
    protected: true,
  },
  {
    path: "sellers",
    component: AdminSellers,
    protected: true,
  },
  {
    path: "analytics",
    component: AdminAnalytics,
    protected: true,
  },
  {
    path: "payments",
    component: AdminPayments,
    protected: true,
  },
  {
    path: "data",
    component: AdminDataManagement,
    protected: true,
  },
  {
    path: "chat",
    component: AdminChat,
    protected: true,
  },
  {
    path: "verification",
    component: ShopVerification,
    protected: true,
  },
  {
    path: "advertising",
    component: AdvertisingAdminPage,
    protected: true,
  },
  {
    path: "payment-settings",
    component: PaymentSettings,
    protected: true,
  },
  {
    path: "settings",
    component: AdminDashboard, // Временно перенаправляем на dashboard
    protected: true,
  },
];

// Компонент с защищенным маршрутом
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => (
  <AdminProtectedRoute>{children}</AdminProtectedRoute>
);

// Генерация JSX маршрутов
export const AdminRoutes = () => {
  return (
    <>
      {/* Редирект с /admin на /admin/dashboard */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Страница входа (не защищена) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Динамически генерируемые защищенные маршруты */}
      {adminRoutes.map(
        ({ path, component: Component, protected: isProtected }) => (
          <Route
            key={path}
            path={`/admin/${path}`}
            element={
              isProtected ? (
                <ProtectedAdminRoute>
                  <Component />
                </ProtectedAdminRoute>
              ) : (
                <Component />
              )
            }
          />
        ),
      )}
    </>
  );
};

export default AdminRoutes;
