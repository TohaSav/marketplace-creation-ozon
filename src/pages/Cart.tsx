import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useBonusSystem } from "@/hooks/useBonusSystem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import {
  applyWalletDiscount,
  getWalletBalance,
  canPayWithWallet,
  updateWalletBalance,
  saveWalletTransaction,
} from "@/utils/walletDiscount";

export default function Cart() {
  const { user } = useAuth();
  const { earnBonuses } = useBonusSystem();

  // Получаем корзину пользователя из localStorage
  const getUserCart = () => {
    if (!user) return [];
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    return cart;
  };

  const [cart, setCart] = useState(getUserCart());
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");
  const [walletBalance, setWalletBalance] = useState(0);

  // Обновляем корзину при изменении пользователя
  useEffect(() => {
    setCart(getUserCart());
    if (user) {
      setWalletBalance(getWalletBalance(user.id));
    }
  }, [user]);

  const removeFromCart = (productId: string) => {
    if (!user) return;
    const updatedCart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (!user) return;
    const updatedCart = cart.map((item: any) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item,
    );
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const clearCart = () => {
    if (!user) return;
    localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));
    setCart([]);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
  };

  const getPriceWithDiscount = () => {
    const total = getTotalPrice();
    if (paymentMethod === "wallet") {
      return applyWalletDiscount(total);
    }
    return {
      originalAmount: total,
      discountAmount: 0,
      finalAmount: total,
      discountPercent: 0,
    };
  };

  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (!user) {
      alert("Войдите в аккаунт для оформления заказа");
      return;
    }

    const priceInfo = getPriceWithDiscount();
    const finalAmount = priceInfo.finalAmount;
    const orderId = `order_${Date.now()}`;

    // Проверяем возможность оплаты кошельком
    if (
      paymentMethod === "wallet" &&
      !canPayWithWallet(walletBalance, finalAmount)
    ) {
      alert(
        `Недостаточно средств на кошельке. Нужно: ${finalAmount.toLocaleString()} ₽, доступно: ${walletBalance.toLocaleString()} ₽`,
      );
      return;
    }

    // Создаем заказ
    const order = {
      id: orderId,
      date: new Date().toLocaleDateString("ru-RU"),
      status: "processing",
      statusText: "В обработке",
      total: finalAmount,
      originalTotal: priceInfo.originalAmount,
      discount: priceInfo.discountAmount,
      paymentMethod: paymentMethod,
      items: cart.map((item: any) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
    };

    // Сохраняем заказ
    const orders = JSON.parse(
      localStorage.getItem(`orders_${user.id}`) || "[]",
    );
    orders.push(order);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));

    // Обрабатываем оплату кошельком
    if (paymentMethod === "wallet") {
      // Списываем средства с кошелька
      updateWalletBalance(user.id, -finalAmount);

      // Сохраняем транзакцию
      saveWalletTransaction(user.id, {
        id: `txn_${Date.now()}`,
        type: "payment",
        amount: -finalAmount,
        description: `Оплата заказа #${orderId}`,
        status: "completed",
      });

      // Обновляем баланс в состоянии
      setWalletBalance((prev) => prev - finalAmount);
    }

    // Начисляем бонусы
    const bonusResult = earnBonuses(orderId, priceInfo.originalAmount);

    // Очищаем корзину
    localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));
    setCart([]);

    // Показываем уведомление об успешном заказе
    const message =
      paymentMethod === "wallet"
        ? `Заказ оформлен успешно!\n\nНомер заказа: ${orderId}\nОригинальная сумма: ${priceInfo.originalAmount.toLocaleString()} ₽\nСкидка кошелька (5%): -${priceInfo.discountAmount.toLocaleString()} ₽\nК оплате: ${finalAmount.toLocaleString()} ₽\n\nНачислено бонусов: ${bonusResult.bonusAmount} (+${bonusResult.bonusPercentage}%)`
        : `Заказ оформлен успешно!\n\nНомер заказа: ${orderId}\nСумма: ${finalAmount.toLocaleString()} ₽\n\nНачислено бонусов: ${bonusResult.bonusAmount} (+${bonusResult.bonusPercentage}%)`;

    alert(message);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Icon
                  name="Lock"
                  size={48}
                  className="text-gray-400 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Войдите в аккаунт
                </h2>
                <p className="text-gray-600 mb-4">
                  Чтобы просматривать корзину, нужно авторизоваться
                </p>
                <Link to="/login">
                  <Button>Войти в аккаунт</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Корзина</h1>
          <p className="text-gray-600">
            {totalItems > 0
              ? `${totalItems} товаров на сумму ${getTotalPrice().toLocaleString()} ₽`
              : "Ваша корзина пуста"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} />
                Товары в корзине
              </div>
              {cart.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить корзину
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon
                  name="ShoppingCart"
                  size={48}
                  className="text-gray-400 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Корзина пуста
                </h3>
                <p className="text-gray-500 mb-4">
                  Добавьте товары в корзину, чтобы оформить заказ
                </p>
                <Link to="/">
                  <Button>Перейти к покупкам</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Icon
                          name="Image"
                          size={24}
                          className="text-gray-400"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        {item.price} ₽ за шт.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1,
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
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </p>
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
                ))}

                <div className="border-t pt-4 space-y-4">
                  {/* Выбор способа оплаты */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Способ оплаты
                    </h3>
                    <div className="space-y-2">
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "card"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            name="CreditCard"
                            size={20}
                            className="text-gray-600"
                          />
                          <span className="font-medium">Банковская карта</span>
                        </div>
                      </div>

                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "wallet"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("wallet")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon
                              name="Wallet"
                              size={20}
                              className="text-gray-600"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Кошелёк</span>
                                <Badge variant="secondary" className="text-xs">
                                  -5%
                                </Badge>
                              </div>
                              <span className="text-sm text-gray-600">
                                Баланс: {walletBalance.toLocaleString()} ₽
                              </span>
                            </div>
                          </div>
                          {paymentMethod === "wallet" &&
                            !canPayWithWallet(
                              walletBalance,
                              getPriceWithDiscount().finalAmount,
                            ) && (
                              <Badge variant="destructive" className="text-xs">
                                Недостаточно средств
                              </Badge>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Итоговая сумма */}
                  <div className="space-y-2">
                    {paymentMethod === "wallet" &&
                      getPriceWithDiscount().discountAmount > 0 && (
                        <>
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Сумма заказа:</span>
                            <span>
                              {getPriceWithDiscount().originalAmount.toLocaleString()}{" "}
                              ₽
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-green-600">
                            <span>Скидка кошелька (5%):</span>
                            <span>
                              -
                              {getPriceWithDiscount().discountAmount.toLocaleString()}{" "}
                              ₽
                            </span>
                          </div>
                          <div className="border-t pt-2"></div>
                        </>
                      )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">К оплате:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {getPriceWithDiscount().finalAmount.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={
                      paymentMethod === "wallet" &&
                      !canPayWithWallet(
                        walletBalance,
                        getPriceWithDiscount().finalAmount,
                      )
                    }
                  >
                    <Icon
                      name={
                        paymentMethod === "wallet" ? "Wallet" : "CreditCard"
                      }
                      size={20}
                      className="mr-2"
                    />
                    {paymentMethod === "wallet"
                      ? "Оплатить кошельком"
                      : "Оформить заказ"}
                  </Button>

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Продолжить покупки
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
