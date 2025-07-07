import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sellerId: number;
  shopName: string;
  inStock: boolean;
  discount?: number;
}

interface ProductsSectionProps {
  title: string;
  products?: number[];
}

export default function ProductsSection({
  title,
  products = [],
}: ProductsSectionProps) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Получаем данные из localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const storedSellers = JSON.parse(localStorage.getItem("sellers") || "[]");
    const storedSellerCards = JSON.parse(
      localStorage.getItem("sellerCards") || "[]",
    );

    // Фильтруем товары, показывая только от продавцов с активной подпиской
    const activeProducts = storedProducts.filter((product: Product) => {
      const seller = storedSellers.find((s: any) => s.id === product.sellerId);
      const sellerCard = storedSellerCards.find(
        (c: any) => c.sellerId === product.sellerId,
      );

      // Проверяем, что продавец существует, активен и имеет активную подписку
      if (!seller || seller.status !== "active" || !sellerCard) {
        return false;
      }

      // Проверяем активность подписки
      const subscriptionEndDate = new Date(sellerCard.subscriptionEndDate);
      const now = new Date();

      return subscriptionEndDate > now;
    });

    // Если передан конкретный список товаров, фильтруем по нему
    if (products.length > 0) {
      const filteredProducts = activeProducts.filter((product: Product) =>
        products.includes(product.id),
      );
      setVisibleProducts(filteredProducts.slice(0, 12));
    } else {
      // Показываем первые 12 товаров от активных продавцов
      setVisibleProducts(activeProducts.slice(0, 12));
    }
  }, [products]);

  // Показываем секцию только если есть товары
  if (!visibleProducts || visibleProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white rounded-2xl overflow-hidden hover:scale-105"
          >
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon
                    name="Package"
                    className="w-8 h-8 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                )}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{product.discount}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      Нет в наличии
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.shopName}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-emerald-600">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.discount && (
                      <span className="text-xs text-gray-400 line-through">
                        {Math.round(
                          product.price / (1 - product.discount / 100),
                        ).toLocaleString()}{" "}
                        ₽
                      </span>
                    )}
                  </div>
                  {product.inStock && (
                    <Button
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-8 h-8 p-0 shadow-lg"
                    >
                      <Icon name="Plus" className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
