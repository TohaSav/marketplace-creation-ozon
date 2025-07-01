import { useState } from "react";
import { Story } from "@/types/stories";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface StoriesSectionProps {
  stories: Story[];
}

const mockStories: Story[] = [
  {
    id: "1",
    sellerId: "seller1",
    sellerName: "TechShop",
    sellerAvatar: "/placeholder.svg",
    title: "Скидка 30% на iPhone 15",
    description:
      "Только сегодня! Успейте купить новый iPhone 15 со скидкой 30%. Ограниченное количество товара.",
    image: "/placeholder.svg",
    productId: "iphone15",
    isActive: true,
    createdAt: "2024-07-01T10:00:00Z",
    expiresAt: "2024-07-08T10:00:00Z",
    views: 1250,
    clicks: 89,
  },
  {
    id: "2",
    sellerId: "seller2",
    sellerName: "StylePoint",
    sellerAvatar: "/placeholder.svg",
    title: "Летняя коллекция 2024",
    description:
      "Новая летняя коллекция уже в продаже! Стильная одежда для активного отдыха.",
    image: "/placeholder.svg",
    isActive: true,
    createdAt: "2024-07-01T12:00:00Z",
    expiresAt: "2024-07-31T12:00:00Z",
    views: 890,
    clicks: 56,
  },
  {
    id: "3",
    sellerId: "seller3",
    sellerName: "BookWorld",
    sellerAvatar: "/placeholder.svg",
    title: "Книжная распродажа",
    description:
      "Распродажа книг! Цены снижены до 50%. Большой выбор художественной и технической литературы.",
    image: "/placeholder.svg",
    isActive: true,
    createdAt: "2024-07-01T14:00:00Z",
    expiresAt: "2024-07-07T14:00:00Z",
    views: 567,
    clicks: 34,
  },
];

export default function StoriesSection({
  stories = mockStories,
}: StoriesSectionProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    // В реальном приложении здесь будет счётчик кликов
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  const activeStories = stories.filter((story) => story.isActive);

  if (activeStories.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Stories</h2>
            <Badge variant="secondary" className="text-xs">
              Реклама
            </Badge>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {activeStories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 cursor-pointer group"
                onClick={() => handleStoryClick(story)}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-gradient-to-r from-purple-500 to-pink-500 p-1 group-hover:scale-105 transition-transform">
                    <img
                      src={story.sellerAvatar || "/placeholder.svg"}
                      alt={story.sellerName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={12} className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-center mt-2 max-w-[80px] truncate font-medium">
                  {story.sellerName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full mx-auto">
            <button
              onClick={handleCloseStory}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>

            <Card className="bg-white rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <img
                    src={selectedStory.sellerAvatar || "/placeholder.svg"}
                    alt={selectedStory.sellerName}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {selectedStory.sellerName}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="absolute top-2 left-4 right-4 h-1 bg-white bg-opacity-30 rounded-full">
                  <div className="h-full bg-white rounded-full w-1/2"></div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  {selectedStory.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {selectedStory.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={12} />
                      {selectedStory.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MousePointer" size={12} />
                      {selectedStory.clicks}
                    </span>
                  </div>

                  {selectedStory.productId && (
                    <Button size="sm" className="text-xs">
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Смотреть товар
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
