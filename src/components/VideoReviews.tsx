import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface VideoReview {
  id: string;
  videoUrl: string;
  thumbnail: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

interface VideoReviewsProps {
  productId: string;
  reviews: VideoReview[];
}

export default function VideoReviews({
  productId,
  reviews,
}: VideoReviewsProps) {
  const [selectedReview, setSelectedReview] = useState<VideoReview | null>(
    null,
  );

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Video" size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-4">Пока нет видео отзывов</p>
        <p className="text-sm text-gray-500">
          Станьте первым, кто оставит видео отзыв!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Видео отзывы ({reviews.length})
        </h3>
        <Link
          to="/shorts"
          className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
        >
          Смотреть все
          <Icon name="ExternalLink" size={14} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reviews.slice(0, 8).map((review) => (
          <div
            key={review.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-[9/16]"
            onClick={() => setSelectedReview(review)}
          >
            <img
              src={review.thumbnail}
              alt={`Видео отзыв от ${review.userName}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                <Icon name="Play" size={24} className="text-gray-700" />
              </div>
            </div>

            {/* User info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
              <div className="flex items-center mb-1">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm font-medium truncate">
                  {review.userName}
                </span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={`mr-1 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Likes */}
            <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1 text-white text-xs flex items-center">
              <Icon name="Heart" size={12} className="mr-1" />
              {review.likes}
            </div>
          </div>
        ))}
      </div>

      {/* Modal для просмотра видео */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md h-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setSelectedReview(null)}
            >
              <Icon name="X" size={20} />
            </Button>

            <video
              src={selectedReview.videoUrl}
              poster={selectedReview.thumbnail}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <div className="flex items-center mb-2">
                <img
                  src={selectedReview.userAvatar}
                  alt={selectedReview.userName}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{selectedReview.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={`mr-1 ${
                          i < selectedReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm mb-3">{selectedReview.text}</p>
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Heart" size={16} className="mr-2" />
                  {selectedReview.likes}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Share" size={16} className="mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Кнопка добавить видео отзыв */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
        <Icon
          name="VideoIcon"
          size={32}
          className="mx-auto mb-3 text-gray-400"
        />
        <h4 className="font-semibold text-gray-900 mb-2">
          Добавьте видео отзыв
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Поделитесь своим опытом использования товара в коротком видео
        </p>
        <Button className="bg-green-600 hover:bg-green-700">
          <Icon name="Plus" size={16} className="mr-2" />
          Записать видео отзыв
        </Button>
      </div>
    </div>
  );
}
