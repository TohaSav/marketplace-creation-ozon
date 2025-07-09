import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products } = useProducts();

  const categoryProducts = products.filter(
    (product) => product.category === categoryId,
  );

  const getCategoryName = (id: string) => {
    const categories = {
      electronics: "Электроника",
      clothing: "Одежда",
      books: "Книги",
      home: "Дом и сад",
      sports: "Спорт",
      beauty: "Красота",
    };
    return categories[id as keyof typeof categories] || id;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к главной
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {getCategoryName(categoryId || "")}
          </h1>
          <p className="text-gray-600 mt-2">
            Найдено товаров: {categoryProducts.length}
          </p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              name="Package"
              size={64}
              className="mx-auto text-gray-400 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Товары не найдены
            </h2>
            <p className="text-gray-500">В этой категории пока нет товаров</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <Icon name="Package" size={48} className="text-gray-400" />
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <Badge variant="secondary">{product.rating} ⭐</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Продавец: {product.seller}</span>
                    <span>{product.location}</span>
                  </div>
                  <Button className="w-full">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />В
                    корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
