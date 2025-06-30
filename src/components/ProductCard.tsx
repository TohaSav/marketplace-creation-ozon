import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  isVerified?: boolean;
  bonusPercent?: number;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  discount,
  image,
  rating,
  reviews,
  seller,
  isVerified = false,
  bonusPercent,
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-purple-300">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Icon name="Heart" size={16} className="text-gray-600" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({reviews})</span>
          </div>

          {/* Seller */}
          <div className="flex items-center mb-3">
            <span className="text-sm text-gray-600">{seller}</span>
            {isVerified && (
              <Icon
                name="CheckCircle"
                size={14}
                className="text-blue-500 ml-1"
              />
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  ₽{price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₽{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {bonusPercent && (
                <div className="text-sm text-purple-600 font-medium">
                  +{bonusPercent}% бонусами
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Icon name="ShoppingCart" size={16} className="mr-2" />В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
