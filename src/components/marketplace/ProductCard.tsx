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
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Icon name="Image" size={48} className="text-gray-400" />
          </div>
        )}

        {product.stock < 10 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Осталось {product.stock}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            <Icon
              name="Star"
              size={16}
              className="text-yellow-400 fill-yellow-400"
            />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="px-3 py-1 text-sm min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            {product.stock === 0 ? "Нет в наличии" : "В корзину"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
