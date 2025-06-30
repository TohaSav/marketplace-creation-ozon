import { useState } from "react";
import {
  SaleTransaction,
  WithdrawalMethod,
  WalletBalance,
} from "@/types/seller-wallet.types";
import { MOCK_TRANSACTIONS } from "@/constants/seller-wallet.constants";
import { calculateWithdrawalFee } from "@/utils/seller-wallet.utils";

export interface UseSellerWalletResult {
  balance: WalletBalance;
  transactions: SaleTransaction[];
  showWithdrawal: boolean;
  setShowWithdrawal: (show: boolean) => void;
  handleWithdrawal: (amount: number, method: WithdrawalMethod) => void;
}

export function useSellerWallet(): UseSellerWalletResult {
  const [balance, setBalance] = useState<WalletBalance>({
    available: 850000,
    pending: 125000,
  });

  const [transactions] = useState<SaleTransaction[]>(MOCK_TRANSACTIONS);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  const handleWithdrawal = (amount: number, method: WithdrawalMethod) => {
    const fee = calculateWithdrawalFee(amount, method);
    const totalDeduction = amount + fee;

    if (totalDeduction <= balance.available) {
      setBalance((prev) => ({
        ...prev,
        available: prev.available - totalDeduction,
      }));

      // В реальном приложении здесь будет API вызов для обработки вывода
      console.log(`Вывод ${amount} ₽ через ${method.name}, комиссия: ${fee} ₽`);
    }
  };

  return {
    balance,
    transactions,
    showWithdrawal,
    setShowWithdrawal,
    handleWithdrawal,
  };
}
