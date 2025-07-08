import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

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
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Index />
                    </Layout>
                  }
                />
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
