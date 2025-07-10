export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Calibre Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Маркетплейс товаров от проверенных продавцов
        </p>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Найти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold">Электроника</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-pink-500 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold">Одежда</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold">Дом и сад</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-4"></div>
            <h3 className="font-semibold">Спорт</h3>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Готовы начать продавать?</h2>
          <p className="mb-6">Присоединяйтесь к тысячам продавцов</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Стать продавцом
          </button>
        </div>
      </div>
    </div>
  );
}
