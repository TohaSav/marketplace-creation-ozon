import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Product } from "@/types/marketplace";
import { formatPrice } from "@/utils/marketplace";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLoading = false,
}) => {
  const { addToCart } = useMarketplace();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
        <CardContent className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm hover:shadow-xl border-gray-100 hover:border-gray-200 transition-all duration-300 group overflow-hidden h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <Icon name="Image" size={48} className="text-gray-400" />
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <Icon name="Heart" size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
        </button>

        {/* Secure Deal Badge */}
        {product.secureDeal && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <Icon name="Shield" size={12} />
            Безопасная сделка
          </div>
        )}

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && !product.secureDeal && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Осталось {product.stock}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Нет в наличии
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm leading-5 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price and Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            {product.category}
          </Badge>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center space-x-1 text-xs text-green-600 mb-3">
          <Icon name="Truck" size={12} />
          <span>Доставка завтра</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 w-full">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-200"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="px-3 py-1 text-sm min-w-[2.5rem] text-center font-medium">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-200"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 h-8 text-sm font-medium transition-all duration-200 ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white shadow-sm hover:shadow-md"
            }`}
          >
            <Icon name="ShoppingCart" size={14} className="mr-1" />
            {product.stock === 0 ? "Нет в наличии" : "В корзину"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};