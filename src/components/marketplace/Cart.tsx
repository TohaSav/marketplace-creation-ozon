import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import {
  formatPrice,
  calculateCartTotal,
  calculateCartItemCount,
} from "@/utils/marketplace";

export const Cart: React.FC = () => {
  const { state, removeFromCart, updateCartQuantity, clearCart, placeOrder } =
    useMarketplace();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalItems = calculateCartItemCount(state.cart);
  const totalPrice = calculateCartTotal(state.cart);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateCartQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    await placeOrder(state.cart);
    setIsCheckoutOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Cart Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Icon name="ShoppingCart" size={20} />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Корзина</span>
              {state.cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              )}
            </SheetTitle>
            <SheetDescription>
              {totalItems > 0
                ? `${totalItems} товаров на сумму ${formatPrice(totalPrice)}`
                : "Корзина пуста"}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-12rem)] mt-4">
            <div className="space-y-3">
              {state.cart.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-gray-500">
                      <Icon
                        name="ShoppingCart"
                        size={48}
                        className="mx-auto mb-2 opacity-50"
                      />
                      <p>Корзина пуста</p>
                      <p className="text-sm">
                        Добавьте товары для оформления заказа
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                state.cart.map((item) => (
                  <Card key={item.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.parentElement!.innerHTML =
                                '<Icon name="Image" size={24} className="text-gray-400" />';
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 line-clamp-2">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-semibold">
                              {formatPrice(item.price)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Icon name="X" size={14} />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="px-2 py-1 text-xs min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                            </div>
                            <span className="text-sm text-gray-500">
                              = {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>

          {state.cart.length > 0 && (
            <div className="mt-4 space-y-3">
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Итого:</span>
                <span className="text-lg">{formatPrice(totalPrice)}</span>
              </div>

              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Оформить заказ
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Подтверждение заказа</DialogTitle>
                    <DialogDescription>
                      Вы уверены, что хотите оформить заказ на сумму{" "}
                      {formatPrice(totalPrice)}?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Состав заказа:</h4>
                      <div className="space-y-2">
                        {state.cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.product.name} x{item.quantity}
                            </span>
                            <span>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Итого:</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCheckoutOpen(false)}
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleCheckout}
                        disabled={state.isLoading}
                        className="flex-1"
                      >
                        {state.isLoading ? (
                          <>
                            <Icon
                              name="Loader2"
                              size={16}
                              className="mr-2 animate-spin"
                            />
                            Оформление...
                          </>
                        ) : (
                          <>
                            <Icon name="Check" size={16} className="mr-2" />
                            Подтвердить
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
