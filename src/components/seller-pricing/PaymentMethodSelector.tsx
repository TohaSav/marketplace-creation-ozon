import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PaymentMethodSelectorProps {
  paymentMethod: "wallet" | "yukassa";
  setPaymentMethod: (method: "wallet" | "yukassa") => void;
  walletBalance: number;
}

export default function PaymentMethodSelector({ 
  paymentMethod, 
  setPaymentMethod, 
  walletBalance 
}: PaymentMethodSelectorProps) {
  const navigate = useNavigate();

  return (
    <Card className="mb-12 shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon name="CreditCard" size={24} className="text-purple-600" />
          Способ оплаты
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              paymentMethod === "wallet"
                ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg"
                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Icon name="Wallet" size={28} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Личный кошелек 💳</h3>
                <p className="text-gray-600">
                  Баланс: <span className="font-semibold">{walletBalance.toFixed(2)} ₽</span>
                </p>
              </div>
            </div>
            {paymentMethod === "wallet" && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <Icon name="CheckCircle" size={20} />
                <span className="font-semibold">Выбрано</span>
              </div>
            )}
          </div>

          <div
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              paymentMethod === "yukassa"
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
            onClick={() => setPaymentMethod("yukassa")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Icon name="CreditCard" size={28} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ЮКасса</h3>
                <p className="text-gray-600">
                  Карта, СБП, кошельки
                </p>
              </div>
            </div>
            {paymentMethod === "yukassa" && (
              <div className="mt-4 flex items-center gap-2 text-blue-600">
                <Icon name="CheckCircle" size={20} />
                <span className="font-semibold">Выбрано</span>
              </div>
            )}
          </div>
        </div>

        {walletBalance < 50 && paymentMethod === "wallet" && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 text-amber-800 mb-3">
              <Icon name="AlertTriangle" size={20} />
              <span className="font-semibold">
                Недостаточно средств на кошельке
              </span>
            </div>
            <Button
              onClick={() => navigate("/seller/wallet")}
              variant="outline"
              className="border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Пополнить кошелек
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}