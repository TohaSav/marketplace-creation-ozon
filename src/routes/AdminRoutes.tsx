import { Route } from "react-router-dom";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

// Админ страницы
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import AdminSellers from "@/pages/AdminSellers";
import AdminProducts from "@/pages/AdminProducts";
import AdminOrders from "@/pages/AdminOrders";
import AdminPayments from "@/pages/AdminPayments";
import AdminAdvertising from "@/pages/AdminAdvertising";
import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminDataManagement from "@/pages/AdminDataManagement";
import AdminChat from "@/pages/AdminChat";
import AdminLiveChat from "@/pages/AdminLiveChat";

const AdminRoutes = () => {
  try {
    return (
      <>
        {/* Авторизация админа */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Защищенные админ маршруты */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
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
          path="/admin/payments"
          element={
            <AdminProtectedRoute>
              <AdminPayments />
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
          path="/admin/analytics"
          element={
            <AdminProtectedRoute>
              <AdminAnalytics />
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
          path="/admin/live-chat"
          element={
            <AdminProtectedRoute>
              <AdminLiveChat />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminDataManagement />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/verification"
          element={
            <AdminProtectedRoute>
              <AdminSellers />
            </AdminProtectedRoute>
          }
        />
      </>
    );
  } catch (error) {
    console.error("AdminRoutes error:", error);
    return null;
  }
};

export default AdminRoutes;
