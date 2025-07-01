import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import OrderSummary from "@/components/payment/OrderSummary";
import { PaymentMethod } from "@/types/payment";
import { calculateFinalAmount } from "@/utils/paymentUtils";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getTotalPrice, clearCart } =
    useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");
  const [walletBalance] = useState(5420.5); // В реальном приложении получать из контекста/API

  const totalPrice = getTotalPrice();
  const finalAmount = calculateFinalAmount(totalPrice, paymentMethod);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handlePayment = () => {
    // Здесь будет логика обработки платежа
    console.log(`Оплата через ${paymentMethod} на сумму ${finalAmount}`);
  };

  const isWalletSufficient = walletBalance >= finalAmount;
  const canProceed =
    paymentMethod === "yukassa" ||
    (paymentMethod === "wallet" && isWalletSufficient);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Icon
              name="ShoppingCart"
              size={64}
              className="mx-auto text-gray-300 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Корзина пуста
            </h2>
            <p className="text-gray-600 mb-6">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Button onClick={() => window.history.back()}>
              Вернуться к покупкам
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Корзина ({totalItems} товаров)
          </h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-500 hover:text-red-700"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Очистить корзину
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Категория: {item.category}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Icon
                          name="Star"
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="text-sm text-gray-600">
                          {item.rating.rate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg text-blue-600">
                          {(item.price * item.quantity * 85).toLocaleString(
                            "ru-RU",
                          )}{" "}
                          ₽
                        </div>
                        <div className="text-sm text-gray-500">
                          {(item.price * 85).toLocaleString("ru-RU")} ₽ за шт.
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Оформление заказа */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                {/* Итого по заказу */}
                <OrderSummary
                  subtotal={totalPrice * 85}
                  paymentMethod={paymentMethod}
                  itemCount={totalItems}
                />

                {/* Выбор способа оплаты */}
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                  walletBalance={walletBalance}
                  requiredAmount={finalAmount * 85}
                />

                {/* Кнопки */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!canProceed}
                    onClick={handlePayment}
                  >
                    {paymentMethod === "wallet" ? (
                      <>
                        <Icon name="Wallet" size={20} className="mr-2" />
                        Оплатить с личного счёта
                      </>
                    ) : (
                      <>
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Оплатить через ЮКассу
                      </>
                    )}
                  </Button>

                  {paymentMethod === "wallet" && !isWalletSufficient && (
                    <Button
                      variant="outline"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Пополнить личный счёт
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Продолжить покупки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
