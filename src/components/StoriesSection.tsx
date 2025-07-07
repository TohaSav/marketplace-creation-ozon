import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Story } from "@/types/stories";
import { Product } from "@/types/product";
import {
  getActiveStories,
  incrementStoryViews,
  incrementStoryClicks,
} from "@/utils/stories.utils";

interface StoriesSectionProps {
  className?: string;
}

export default function StoriesSection({ className }: StoriesSectionProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const activeStories = getActiveStories();
    setStories(activeStories);
  }, []);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    incrementStoryViews(story.id);

    // Получаем информацию о товаре
    if (story.productId) {
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const foundProduct = allProducts.find(
        (p: Product) => p.id === story.productId,
      );
      setProduct(foundProduct || null);
    }
  };

  const handleGoToProduct = () => {
    if (selectedStory && product) {
      incrementStoryClicks(selectedStory.id);
      window.location.href = `/product/${product.id}`;
    }
  };

  const closeStory = () => {
    setSelectedStory(null);
    setProduct(null);
  };

  if (stories.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Stories от продавцов
        </h2>
        <p className="text-gray-600">
          Актуальные предложения и новинки от наших продавцов
        </p>
      </div>

      {/* Stories Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-24 cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500 p-1">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <img
                  src={story.sellerAvatar || "/placeholder.svg"}
                  alt={story.sellerName}
                  className="w-5 h-5 object-cover rounded-full"
                />
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-700 truncate">
              {story.sellerName}
            </p>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full bg-white rounded-xl overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStory.sellerAvatar || "/placeholder.svg"}
                    alt={selectedStory.sellerName}
                    className="w-10 h-10 object-cover rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      {selectedStory.sellerName}
                    </p>
                    <p className="text-white/70 text-sm">
                      {new Date(selectedStory.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeStory}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
            </div>

            {/* Story Image */}
            <div className="aspect-[9/16] bg-gray-200">
              <img
                src={selectedStory.image || "/placeholder.svg"}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info Overlay */}
            {product && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/90 mb-3 line-clamp-2">
                    {selectedStory.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">
                        ₽{product.price.toLocaleString()}
                      </p>
                      <Badge className="mt-1 bg-white/20 text-white">
                        {product.category}
                      </Badge>
                    </div>
                    <Button
                      onClick={handleGoToProduct}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      Перейти к товару
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="absolute top-16 left-4 right-4">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-5000 ease-linear"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
