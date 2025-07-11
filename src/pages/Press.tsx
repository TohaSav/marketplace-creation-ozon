import { useState } from "react";
import Icon from "@/components/ui/icon";

const Press = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pressReleases = [
    {
      id: 1,
      title: "Запуск новой платформы электронной коммерции",
      date: "2024-03-15",
      content:
        "Сегодня мы рады объявить о запуске нашей новой платформы электронной коммерции, которая предлагает удобные покупки и широкий ассортимент товаров.",
      category: "Новости",
    },
    {
      id: 2,
      title: "Партнерство с ведущими брендами",
      date: "2024-03-10",
      content:
        "Мы заключили партнерские соглашения с крупнейшими брендами в области электроники и модной одежды.",
      category: "Партнерство",
    },
    {
      id: 3,
      title: "Новые возможности для продавцов",
      date: "2024-03-05",
      content:
        "Представляем обновленные инструменты для продавцов, включая улучшенную аналитику и автоматизацию процессов.",
      category: "Обновления",
    },
  ];

  const filteredReleases = pressReleases.filter(
    (release) =>
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Пресс-центр</h1>
        <p className="text-gray-600">
          Последние новости и пресс-релизы нашей компании
        </p>
      </div>

      {/* Поиск */}
      <div className="mb-8">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Поиск новостей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Список пресс-релизов */}
      <div className="space-y-6">
        {filteredReleases.map((release) => (
          <article
            key={release.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {release.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(release.date).toLocaleDateString("ru-RU")}
                </span>
              </div>
              <Icon name="Calendar" size={16} className="text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {release.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">{release.content}</p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                <span>Читать полностью</span>
                <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name="FileText"
            size={48}
            className="mx-auto text-gray-400 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Новости не найдены
          </h3>
          <p className="text-gray-600">Попробуйте изменить критерии поиска</p>
        </div>
      )}
    </div>
  );
};

export default Press;
