import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Product } from "@/store/productStore";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                className={i < Math.floor(product.rating) ? "fill-current" : ""}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ₽{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₽{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">{product.sellerName}</span>
          {product.inStock ? (
            <span className="text-sm text-green-600 font-medium">
              В наличии
            </span>
          ) : (
            <span className="text-sm text-red-600 font-medium">
              Нет в наличии
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
            product.inStock
              ? "bg-gradient-primary text-white hover:opacity-90 shadow-md"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "В корзину" : "Нет в наличии"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
