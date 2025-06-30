import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Story {
  id: number;
  sellerName: string;
  sellerAvatar: string;
  isVerified: boolean;
  image: string;
  productName: string;
  price: number;
  discount?: number;
}

const mockStories: Story[] = [
  {
    id: 1,
    sellerName: "Apple Store",
    sellerAvatar: "/placeholder.svg",
    isVerified: true,
    image: "/placeholder.svg",
    productName: "iPhone 15 Pro Max",
    price: 119999,
    discount: 10,
  },
  {
    id: 2,
    sellerName: "Samsung Official",
    sellerAvatar: "/placeholder.svg",
    isVerified: true,
    image: "/placeholder.svg",
    productName: "Galaxy S24 Ultra",
    price: 94999,
    discount: 15,
  },
  {
    id: 3,
    sellerName: "Nike Store",
    sellerAvatar: "/placeholder.svg",
    isVerified: true,
    image: "/placeholder.svg",
    productName: "Air Max 270",
    price: 12999,
    discount: 20,
  },
  {
    id: 4,
    sellerName: "Sony Official",
    sellerAvatar: "/placeholder.svg",
    isVerified: true,
    image: "/placeholder.svg",
    productName: "PlayStation 5",
    price: 54999,
  },
  {
    id: 5,
    sellerName: "Dyson Store",
    sellerAvatar: "/placeholder.svg",
    isVerified: true,
    image: "/placeholder.svg",
    productName: "V15 Detect",
    price: 49999,
    discount: 8,
  },
];

export default function StoriesCarousel() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex space-x-3 px-1">
          {mockStories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative">
                {/* Story Ring */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={story.sellerAvatar}
                      alt={story.sellerName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Verified Badge */}
                {story.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </div>

              {/* Seller Name */}
              <p className="text-xs text-center mt-1 truncate w-16 text-gray-700">
                {story.sellerName.split(" ")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <Dialog
          open={!!selectedStory}
          onOpenChange={() => setSelectedStory(null)}
        >
          <DialogContent className="max-w-md p-0 bg-black rounded-lg overflow-hidden">
            <div className="relative aspect-[9/16] max-h-[80vh]">
              {/* Story Image */}
              <img
                src={selectedStory.image}
                alt={selectedStory.productName}
                className="w-full h-full object-cover"
              />

              {/* Story Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={selectedStory.sellerAvatar}
                    alt={selectedStory.sellerName}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="text-white text-sm font-medium">
                        {selectedStory.sellerName}
                      </span>
                      {selectedStory.isVerified && (
                        <Icon
                          name="CheckCircle"
                          size={14}
                          className="text-blue-400 ml-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-white hover:text-gray-300"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute top-2 left-4 right-4">
                <div className="w-full bg-white/30 rounded-full h-0.5">
                  <div className="bg-white h-0.5 rounded-full w-full"></div>
                </div>
              </div>

              {/* Story Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">
                          {selectedStory.productName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-purple-600">
                            ₽{selectedStory.price.toLocaleString()}
                          </span>
                          {selectedStory.discount && (
                            <Badge className="bg-red-500 text-white text-xs">
                              -{selectedStory.discount}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                        Купить
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
