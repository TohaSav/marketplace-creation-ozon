import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { SellerWalletTransaction, PaymentData } from "@/types/sellerWallet";

export const useSellerWalletManager = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<SellerWalletTransaction[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.userType !== "seller") {
      navigate("/seller");
      return;
    }
    loadWalletData();
  }, [user, navigate]);

  const loadWalletData = () => {
    if (!user) return;

    // Загружаем баланс из localStorage
    const sellerData = JSON.parse(localStorage.getItem("seller-token") || "{}");
    setBalance(parseFloat(sellerData.balance || "0"));

    // Загружаем транзакции
    const allTransactions = JSON.parse(
      localStorage.getItem("seller-wallet-transactions") || "[]",
    );
    const sellerTransactions = allTransactions.filter(
      (t: SellerWalletTransaction) => t.sellerId === user.id,
    );
    setTransactions(
      sellerTransactions.sort(
        (a: SellerWalletTransaction, b: SellerWalletTransaction) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };

  const validateDepositAmount = (amount: number): boolean => {
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму для пополнения",
        variant: "destructive",
      });
      return false;
    }

    if (amount < 10) {
      toast({
        title: "Ошибка",
        description: "Минимальная сумма пополнения - 10 рублей",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const createDepositTransaction = (
    amount: number,
  ): SellerWalletTransaction => {
    if (!user) throw new Error("User not found");

    return {
      id: Date.now().toString(),
      sellerId: user.id,
      type: "deposit",
      amount: amount,
      description: `Пополнение кошелька продавца на ${amount} ₽`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
  };

  const createPaymentData = (
    amount: number,
    transaction: SellerWalletTransaction,
  ): PaymentData => {
    return {
      amount: {
        value: amount.toString(),
        currency: "RUB",
      },
      confirmation: {
        type: "redirect",
        return_url: `${window.location.origin}/seller/wallet-success?transaction=${transaction.id}`,
      },
      description: `Пополнение кошелька продавца на ${amount} ₽`,
      metadata: {
        type: "seller_wallet_deposit",
        sellerId: user?.id || "",
        transactionId: transaction.id,
      },
    };
  };

  const handleDeposit = async (depositAmount: string) => {
    if (!user) return;

    const amount = parseFloat(depositAmount);
    if (!validateDepositAmount(amount)) return;

    setLoading(true);

    try {
      const transaction = createDepositTransaction(amount);
      const paymentData = createPaymentData(amount, transaction);

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const payment = await response.json();

      if (payment.confirmation && payment.confirmation.confirmation_url) {
        // Сохраняем транзакцию
        const allTransactions = JSON.parse(
          localStorage.getItem("seller-wallet-transactions") || "[]",
        );
        allTransactions.push(transaction);
        localStorage.setItem(
          "seller-wallet-transactions",
          JSON.stringify(allTransactions),
        );

        // Переходим на страницу оплаты
        window.location.href = payment.confirmation.confirmation_url;
      } else {
        throw new Error("Не удалось создать платеж");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж для пополнения",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    transactions,
    loading,
    handleDeposit,
    refreshWalletData: loadWalletData,
  };
};
