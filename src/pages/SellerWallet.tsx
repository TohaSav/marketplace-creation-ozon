import { useAuth } from "@/context/AuthContext";
import { useSellerWalletManager } from "@/hooks/useSellerWalletManager";
import { WalletHeader } from "@/components/seller-wallet/WalletHeader";
import { WalletBalance } from "@/components/seller-wallet/WalletBalance";
import { TransactionHistory } from "@/components/seller-wallet/TransactionHistory";
import { QuickActions } from "@/components/seller-wallet/QuickActions";
import { WalletAccessDenied } from "@/components/seller-wallet/WalletAccessDenied";

export default function SellerWallet() {
  const { user } = useAuth();
  const { balance, transactions, loading, handleDeposit } =
    useSellerWalletManager();

  // Проверяем статус продавца
  if (user?.userType === "seller" && user?.status !== "active") {
    return <WalletAccessDenied />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WalletHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <WalletBalance
            balance={balance}
            loading={loading}
            onDeposit={handleDeposit}
          />
        </div>

        <div className="lg:col-span-2">
          <TransactionHistory transactions={transactions} />
        </div>
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>
    </div>
  );
}
