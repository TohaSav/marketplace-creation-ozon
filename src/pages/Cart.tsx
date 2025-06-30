import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getTotalPrice, clearCart } =
    useStore();

  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [walletBalance] = useState(5420.5); // В реальном приложении получать из контекста/API

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

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
            Корзина ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            товаров)
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
                        <div className="font-bold text-lg text-purple-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.price} за шт.
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

          {/* Итого */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Итого по заказу</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>
                      Товары (
                      {cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>К оплате</span>
                    <span className="text-purple-600">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Способы оплаты */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Способ оплаты</h4>
                  <div className="space-y-2">
                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "wallet"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={paymentMethod === "wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <Icon
                        name="Wallet"
                        size={20}
                        className="mr-3 text-purple-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Кошелек Calibre</div>
                        <div className="text-sm text-gray-600">
                          Баланс: {walletBalance.toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                      {walletBalance < getTotalPrice() * 85 && (
                        <Icon
                          name="AlertCircle"
                          size={16}
                          className="text-red-500"
                        />
                      )}
                    </label>

                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "card"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <Icon
                        name="CreditCard"
                        size={20}
                        className="mr-3 text-blue-600"
                      />
                      <div className="font-medium">Банковская карта</div>
                    </label>

                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "sbp"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="sbp"
                        checked={paymentMethod === "sbp"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <Icon
                        name="Smartphone"
                        size={20}
                        className="mr-3 text-green-600"
                      />
                      <div className="font-medium">СБП (Быстрые платежи)</div>
                    </label>
                  </div>
                </div>

                {paymentMethod === "wallet" &&
                  walletBalance < getTotalPrice() * 85 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <Icon
                          name="AlertCircle"
                          size={16}
                          className="text-red-500 mr-2"
                        />
                        <div className="text-sm text-red-700">
                          <div className="font-medium">
                            Недостаточно средств
                          </div>
                          <div>
                            Нужно пополнить на{" "}
                            {(
                              getTotalPrice() * 85 -
                              walletBalance
                            ).toLocaleString("ru-RU")}{" "}
                            ₽
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="mt-2 w-full bg-red-600 hover:bg-red-700"
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        Пополнить кошелек
                      </Button>
                    </div>
                  )}

                <Button
                  className="w-full mb-3"
                  size="lg"
                  disabled={
                    paymentMethod === "wallet" &&
                    walletBalance < getTotalPrice() * 85
                  }
                >
                  {paymentMethod === "wallet" ? (
                    <>
                      <Icon name="Wallet" size={20} className="mr-2" />
                      Оплатить из кошелька
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Оформить заказ
                    </>
                  )}
                </Button>

                <Button variant="outline" className="w-full">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Продолжить покупки
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
