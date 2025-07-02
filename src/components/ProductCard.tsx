import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { formatBarcode } from "@/utils/productGenerators";

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
  deliveryInfo?: string;
  inStock?: boolean;
  isHit?: boolean;
  isNew?: boolean;
  fastDelivery?: boolean;
  article?: string;
  barcode?: string;
  showDetails?: boolean;
}

export default function ProductCard({
  id,
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
  deliveryInfo = "Доставка завтра",
  inStock = true,
  isHit = false,
  isNew = false,
  fastDelivery = false,
  article,
  barcode,
  showDetails = false,
}: ProductCardProps) {
  const { addToCart, addToFavorites, removeFavorites, favorites } = useStore();
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name: title,
      price,
      image,
      quantity: 1,
    });
    toast({
      title: "Товар добавлен в корзину",
      description: title,
      duration: 2000,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorites(id);
      toast({
        title: "Удалено из избранного",
        description: title,
        duration: 2000,
      });
    } else {
      addToFavorites({
        id,
        name: title,
        price,
        image,
      });
      toast({
        title: "Добавлено в избранное",
        description: title,
        duration: 2000,
      });
    }
  };
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200 hover:border-indigo-300 bg-white rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 p-3">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isHit && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold">
                ХИТ
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold">
                НОВИНКА
              </Badge>
            )}
            {discount && (
              <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-semibold">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm rounded-full w-8 h-8 p-0"
          >
            <Icon
              name="Heart"
              size={16}
              className={`${
                isFavorite
                  ? "text-red-500 fill-current"
                  : "text-gray-500 hover:text-red-500"
              }`}
            />
          </Button>

          {/* Fast Delivery Badge */}
          {fastDelivery && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs flex items-center gap-1">
                <Icon name="Zap" size={10} />
                Быстро
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {price.toLocaleString()} ₽
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice.toLocaleString()} ₽
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors text-sm">
            {title}
          </h3>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">{seller}</span>
            {isVerified && (
              <Icon name="CheckCircle" size={12} className="text-blue-500" />
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Icon name="Truck" size={12} />
            <span>{deliveryInfo}</span>
          </div>

          {/* Bonus */}
          {bonusPercent && (
            <div className="text-sm text-indigo-600 font-medium">
              +{bonusPercent}% бонусами
            </div>
          )}

          {/* Product Details */}
          {showDetails && (article || barcode) && (
            <div className="border-t pt-3 space-y-2">
              {article && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Icon name="Hash" size={12} />
                  <span className="font-mono">{article}</span>
                </div>
              )}
              {barcode && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Icon name="BarChart3" size={12} />
                  <span className="font-mono">{formatBarcode(barcode)}</span>
                </div>
              )}
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>В
                наличии
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Нет в наличии
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {inStock ? (
              <>
                <Icon name="ShoppingCart" size={16} className="mr-2" />В корзину
              </>
            ) : (
              "Нет в наличии"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
