import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import ScrollToTop from "@/components/ScrollToTop";
import AppRoutes from "@/routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MarketplaceProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </MarketplaceProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("App render error:", error);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Calibre Store
          </h1>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }
};

export default App;
