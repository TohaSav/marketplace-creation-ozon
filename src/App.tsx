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
};

export default App;
