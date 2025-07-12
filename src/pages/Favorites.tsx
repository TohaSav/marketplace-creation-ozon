import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function Favorites() {
  const { user } = useAuth();

  // Получаем избранные товары пользователя из localStorage
  const getUserFavorites = () => {
    if (!user) return [];
    const favorites = JSON.parse(
      localStorage.getItem(`favorites_${user.id}`) || "[]",
    );
    return favorites;
  };

  const removeFromFavorites = (productId: string) => {
    if (!user) return;
    const favorites = getUserFavorites();
    const updatedFavorites = favorites.filter(
      (item: any) => item.id !== productId,
    );
    localStorage.setItem(
      `favorites_${user.id}`,
      JSON.stringify(updatedFavorites),
    );
    // Обновляем страницу для отображения изменений
    window.location.reload();
  };

  const addToCart = (product: any) => {
    if (!user) return;
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`) || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
  };

  const favorites = getUserFavorites();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Icon
                  name="Lock"
                  size={48}
                  className="text-gray-400 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Войдите в аккаунт
                </h2>
                <p className="text-gray-600 mb-4">
                  Чтобы просматривать избранное, нужно авторизоваться
                </p>
                <Link to="/login">
                  <Button>Войти в аккаунт</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Избранное</h1>
          <p className="text-gray-600">
            Ваши любимые товары ({favorites.length})
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Heart" size={20} />
              Избранные товары
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Icon
                  name="Heart"
                  size={48}
                  className="text-gray-400 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Список избранного пуст
                </h3>
                <p className="text-gray-500 mb-4">
                  Добавляйте товары в избранное, чтобы не потерять их
                </p>
                <Link to="/">
                  <Button>Перейти к покупкам</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favorites.map((product: any) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Icon
                          name="Image"
                          size={32}
                          className="text-gray-400"
                        />
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-blue-600">
                        {product.price} ₽
                      </span>
                      {product.rating && (
                        <div className="flex items-center space-x-1">
                          <Icon
                            name="Star"
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-xs text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(product)}
                        className="flex-1"
                      >
                        <Icon name="ShoppingCart" size={14} className="mr-1" />В
                        корзину
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <Icon name="Heart" size={14} className="fill-current" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
