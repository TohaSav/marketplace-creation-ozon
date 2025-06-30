import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "inactive";
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 119990,
    category: "Смартфоны",
    stock: 15,
    status: "active",
    image: "/api/placeholder/300/300",
    description: "Новейший iPhone с профессиональными возможностями",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 89990,
    category: "Смартфоны",
    stock: 8,
    status: "active",
    image: "/api/placeholder/300/300",
    description: "Мощный смартфон от Samsung",
  },
  {
    id: 3,
    title: "MacBook Air M3",
    price: 149990,
    category: "Ноутбуки",
    stock: 3,
    status: "active",
    image: "/api/placeholder/300/300",
    description: "Легкий и мощный ноутбук",
  },
  {
    id: 4,
    title: "AirPods Pro",
    price: 24990,
    category: "Аудио",
    stock: 0,
    status: "inactive",
    image: "/api/placeholder/300/300",
    description: "Беспроводные наушники с шумоподавлением",
  },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Уверены, что хотите удалить этот товар?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast({
        title: "Товар удален",
        description: "Товар успешно удален из каталога",
      });
    }
  };

  const handleToggleStatus = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product,
      ),
    );
    toast({
      title: "Статус изменен",
      description: "Статус товара успешно обновлен",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600";
    if (stock < 5) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              Управление товарами
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Список всех товаров в вашем маркетплейсе
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={handleAddProduct}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить товар
            </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поиск по названию
              </label>
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Название товара..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Все категории</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Таблица товаров */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Товар
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Цена
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Остаток
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.image}
                            alt={product.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price.toLocaleString()} ₽
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-medium ${getStockColor(product.stock)}`}
                      >
                        {product.stock} шт.
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          product.status,
                        )}`}
                      >
                        {product.status === "active"
                          ? "Активный"
                          : "Неактивный"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`${product.status === "active" ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}`}
                        >
                          <Icon
                            name={
                              product.status === "active" ? "EyeOff" : "Eye"
                            }
                            size={16}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Модальное окно для добавления/редактирования */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingProduct ? "Редактировать товар" : "Добавить товар"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Название товара"
                      defaultValue={editingProduct?.title || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Описание товара"
                      defaultValue={editingProduct?.description || ""}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Цена (₽)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        placeholder="0"
                        defaultValue={editingProduct?.price || ""}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Остаток
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        placeholder="0"
                        defaultValue={editingProduct?.stock || ""}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Категория
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      defaultValue={editingProduct?.category || ""}
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="new">Создать новую...</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                    >
                      {editingProduct ? "Сохранить" : "Добавить"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
