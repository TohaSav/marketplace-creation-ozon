import { useSellerWallet } from "@/hooks/useSellerWallet";
import BalanceCard from "./seller-wallet/BalanceCard";
import WithdrawalModal from "./seller-wallet/WithdrawalModal";
import TransactionsTable from "./seller-wallet/TransactionsTable";

export default function SellerWallet() {
  const {
    balance,
    transactions,
    showWithdrawal,
    setShowWithdrawal,
    handleWithdrawal,
  } = useSellerWallet();

  return (
    <div className="space-y-6">
      {/* Карточки балансов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard
          type="available"
          amount={balance.available}
          onWithdraw={() => setShowWithdrawal(true)}
        />
        <BalanceCard type="pending" amount={balance.pending} />
      </div>

      {/* Модальное окно вывода средств */}
      <WithdrawalModal
        isOpen={showWithdrawal}
        onClose={() => setShowWithdrawal(false)}
        availableBalance={balance.available}
        onWithdraw={handleWithdrawal}
      />

      {/* Таблица истории транзакций */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
