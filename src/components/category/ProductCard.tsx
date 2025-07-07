import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onAddToFavorites?: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToFavorites,
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300">
      <CardContent className="p-0">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {/* Favorite button */}
          {onAddToFavorites && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onAddToFavorites();
              }}
            >
              <Icon name="Heart" className="w-4 h-4 text-gray-600" />
            </Button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-emerald-600">
              {product.price.toLocaleString()} ₽
            </span>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <Icon name="ShoppingCart" className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  className={`w-4 h-4 ${
                    star <= Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
