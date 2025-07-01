import { useSellerWallet } from "@/hooks/useSellerWallet";
import { useAuth } from "@/context/AuthContext";
import BalanceCard from "./seller-wallet/BalanceCard";
import WithdrawalModal from "./seller-wallet/WithdrawalModal";
import TransactionsTable from "./seller-wallet/TransactionsTable";
import { SellerCard } from "@/components/ui/SellerCard";
import { CardTransactions } from "@/components/ui/CardTransactions";

export default function SellerWallet() {
  const { user, allCards } = useAuth();
  const {
    balance,
    transactions,
    showWithdrawal,
    setShowWithdrawal,
    handleWithdrawal,
  } = useSellerWallet();

  // Найдем карту текущего продавца
  const sellerCard = allCards.find((card) => card.sellerId === user?.id);

  return (
    <div className="space-y-6">
      {/* Карта продавца Calibre Store */}
      {sellerCard && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ваша карта Calibre Store</h2>
          <div className="flex justify-center">
            <SellerCard card={sellerCard} showFullNumber={true} />
          </div>
        </div>
      )}

      {/* Карточки балансов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceCard
          type="available"
          amount={sellerCard?.balance || balance.available}
          onWithdraw={() => setShowWithdrawal(true)}
        />
        <BalanceCard type="pending" amount={balance.pending} />
      </div>

      {/* История транзакций карты */}
      {sellerCard && sellerCard.transactions.length > 0 && (
        <CardTransactions transactions={sellerCard.transactions} />
      )}

      {/* Модальное окно вывода средств */}
      <WithdrawalModal
        isOpen={showWithdrawal}
        onClose={() => setShowWithdrawal(false)}
        availableBalance={sellerCard?.balance || balance.available}
        onWithdraw={handleWithdrawal}
      />

      {/* Таблица истории транзакций */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
