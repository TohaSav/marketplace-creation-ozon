import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Product } from "@/store/productStore";
import { Product as RealProduct } from "@/data/products";

interface ProductCardProps {
  product: Product | RealProduct;
  onAddToCart?: (product: Product | RealProduct) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full flex flex-col">
      {/* Image Section with Badges */}
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
            <img
              src={('image' in product ? product.image : product.images[0]) || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <Icon name="Heart" size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        
        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium">
              Нет в наличии
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-purple-600 transition-colors line-clamp-2 text-sm leading-5 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

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
            ({('reviewCount' in product ? product.reviewCount : product.reviewsCount)})
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-3 mt-auto">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString()} ₽
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString()} ₽
              </span>
            )}
          </div>
          
          {/* Delivery Info */}
          <div className="flex items-center space-x-1 text-xs text-green-600 mb-2">
            <Icon name="Truck" size={12} />
            <span>Доставка завтра</span>
          </div>
        </div>

        {/* Seller */}
        <div className="text-xs text-gray-500 mb-3">
          Продавец: <span className="text-gray-700">{product.sellerName}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              product.inStock
                ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-sm hover:shadow-md"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.inStock ? (
              <div className="flex items-center justify-center space-x-1">
                <Icon name="ShoppingCart" size={16} />
                <span>В корзину</span>
              </div>
            ) : (
              "Нет в наличии"
            )}
          </button>
          
          {/* One-Click Buy Button */}
          {product.inStock && (
            <button className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Icon name="Zap" size={16} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;