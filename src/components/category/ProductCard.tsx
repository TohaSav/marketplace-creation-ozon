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
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favorite button */}
          {onAddToFavorites && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToFavorites();
              }}
            >
              <Icon name="Heart" className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
            </Button>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm leading-5 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
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

          {/* Price and Action */}
          <div className="flex items-center justify-between mb-3 mt-auto">
            <span className="text-xl font-bold text-indigo-600">
              {product.price.toLocaleString()} ₽
            </span>
            <Button
              size="sm"
              className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <Icon name="ShoppingCart" className="w-4 h-4" />
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <Icon name="Truck" size={12} />
            <span>Доставка завтра</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}