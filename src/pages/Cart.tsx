import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";

export default function Cart() {
  const { user } = useAuth();

  // Получаем корзину пользователя из localStorage
  const getUserCart = () => {
    if (!user) return [];
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    return cart;
  };

  const [cart, setCart] = useState(getUserCart());

  // Обновляем корзину при изменении пользователя
  useEffect(() => {
    setCart(getUserCart());
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

  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (!user) {
      alert("Войдите в аккаунт для оформления заказа");
      return;
    }

    const totalAmount = getTotalPrice();

    // Создаем заказ
    const order = {
      id: `#${Date.now()}`,
      date: new Date().toLocaleDateString("ru-RU"),
      status: "processing",
      statusText: "В обработке",
      total: totalAmount,
      items: cart.map((item: any) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // Сохраняем заказ
    const orders = JSON.parse(
      localStorage.getItem(`orders_${user.id}`) || "[]",
    );
    orders.push(order);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));

    // Очищаем корзину
    clearCart();

    alert("Заказ успешно оформлен!");
    window.location.href = "/orders";
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

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {getTotalPrice().toLocaleString()} ₽
                    </span>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="w-full mt-2">
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
