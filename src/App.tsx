import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { initializeProducts } from "@/data/products";
import { initializeSellers } from "@/data/sellers";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Инициализируем данные при первом запуске
    initializeProducts();
    initializeSellers();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;