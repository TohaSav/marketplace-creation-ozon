import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MarketplaceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              {children}
            </BrowserRouter>
          </TooltipProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
