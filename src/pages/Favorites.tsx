import { useMarketplace } from "@/contexts/MarketplaceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";

export default function Favorites() {
  const { favorites, removeFromFavorites, addToCart } = useMarketplace();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Icon
              name="Heart"
              size={64}
              className="mx-auto text-gray-300 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Избранное пусто
            </h2>
            <p className="text-gray-600 mb-6">
              Добавьте товары в избранное, чтобы не потерять их
            </p>
            <Button onClick={() => window.history.back()}>
              Вернуться к покупкам
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Избранное ({favorites.length})
          </h1>
          <p className="text-gray-600 mt-2">Ваши любимые товары</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Star"
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm text-gray-600">
                      {product.rating.rate}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => addToCart(product)} className="flex-1">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />В
                    корзину
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromFavorites(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
