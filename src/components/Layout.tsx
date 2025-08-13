import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <MarketplaceProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MarketplaceProvider>
  );
}