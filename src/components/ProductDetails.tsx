import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, Product } from "@/data/products";
import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useMarketplace();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Товар не найден</h2>
          <p className="text-gray-600 mb-4">Возможно, товар был удален или не существует</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const discountPrice = product.originalPrice && product.originalPrice > product.price 
    ? product.originalPrice - product.price 
    : 0;
  const discountPercent = discountPrice > 0 && product.originalPrice 
    ? Math.round((discountPrice / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder.svg",
      }, quantity);
    }
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-blue-600"
            >
              Главная
            </button>
            <Icon name="ChevronRight" size={16} />
            <button 
              onClick={() => navigate(`/category/${product.category.toLowerCase().replace(' ', '-')}`)}
              className="hover:text-blue-600"
            >
              {product.category}
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-gray-900 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Изображения товара */}
          <div className="space-y-4">
            {/* Основное изображение */}
            <div className="aspect-square bg-white rounded-lg border overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Миниатюры изображений */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? "border-blue-600" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Заголовок и рейтинг */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewsCount} отзывов)
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Просмотров: {product.views}
                </div>
              </div>
            </div>

            {/* Цена */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price.toLocaleString("ru-RU")} ₽
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toLocaleString("ru-RU")} ₽
                    </span>
                    <Badge variant="destructive">
                      -{discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
              {discountPrice > 0 && (
                <p className="text-sm text-green-600">
                  Экономия: {discountPrice.toLocaleString("ru-RU")} ₽
                </p>
              )}

              {/* Secure Deal Info */}
              {product.secureDeal && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={20} className="text-blue-600" />
                    <span className="font-semibold text-blue-900">Безопасная сделка</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Ваши деньги будут удержаны до получения и проверки товара. 
                    Полная защита покупателя от мошенничества.
                  </p>
                </div>
              )}
            </div>

            {/* Статус в наличии */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span className="text-green-600">В наличии ({product.stockCount} шт.)</span>
                </>
              ) : (
                <>
                  <Icon name="XCircle" size={20} className="text-red-600" />
                  <span className="text-red-600">Нет в наличии</span>
                </>
              )}
            </div>

            {/* Описание */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Описание</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Характеристики */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Характеристики</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Количество и кнопка покупки */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Количество:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Heart" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Share2" size={20} />
                </Button>
              </div>
            </div>

            {/* Информация о доставке */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="Truck" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Доставка</h4>
                  <p className="text-sm text-gray-600">{product.deliveryInfo}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="RotateCcw" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Возврат</h4>
                  <p className="text-sm text-gray-600">{product.returnsPolicy}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Гарантия</h4>
                  <p className="text-sm text-gray-600">{product.warranty}</p>
                </div>
              </div>
            </div>

            {/* Продавец */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{product.sellerName}</h4>
                  <p className="text-sm text-gray-600">Продавец</p>
                </div>
              </div>
            </div>

            {/* Теги */}
            {product.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Теги:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;