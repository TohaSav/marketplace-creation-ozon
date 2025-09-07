import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PaymentMethodSelectorProps {
  walletBalance: number;
  paymentMethod: "wallet" | "yukassa";
  setPaymentMethod: (method: "wallet" | "yukassa") => void;
}

export default function PaymentMethodSelector({
  walletBalance,
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  const navigate = useNavigate();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="CreditCard" size={20} />
          Способ оплаты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "wallet"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <div className="flex items-center gap-3">
              <Icon name="Wallet" size={24} className="text-green-600" />
              <div>
                <h3 className="font-semibold">Личный кошелек 💳</h3>
                <p className="text-sm text-gray-600">
                  Баланс: {walletBalance.toFixed(2)} ₽
                </p>
              </div>
            </div>
            {paymentMethod === "wallet" && (
              <div className="mt-2 flex items-center gap-1 text-green-600">
                <Icon name="Check" size={16} />
                <span className="text-sm font-medium">Выбрано</span>
              </div>
            )}
          </div>

          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "yukassa"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("yukassa")}
          >
            <div className="flex items-center gap-3">
              <Icon name="CreditCard" size={24} className="text-blue-600" />
              <div>
                <h3 className="font-semibold">ЮКасса</h3>
                <p className="text-sm text-gray-600">
                  Карта, СБП, кошельки
                </p>
              </div>
            </div>
            {paymentMethod === "yukassa" && (
              <div className="mt-2 flex items-center gap-1 text-blue-600">
                <Icon name="Check" size={16} />
                <span className="text-sm font-medium">Выбрано</span>
              </div>
            )}
          </div>
        </div>

        {walletBalance < 50 && paymentMethod === "wallet" && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">
                Недостаточно средств на кошельке
              </span>
            </div>
            <Button
              onClick={() => navigate("/seller/wallet")}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Icon name="Plus" size={14} className="mr-1" />
              Пополнить кошелек
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}