import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface VideoReview {
  id: string;
  videoUrl: string;
  thumbnail: string;
  productId: string;
  productName: string;
  productImage: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export default function Shorts() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videoReviews: VideoReview[] = [
    {
      id: "1",
      videoUrl: "/api/placeholder/400/700",
      thumbnail: "/api/placeholder/400/700",
      productId: "1",
      productName: "iPhone 15 Pro Max",
      productImage: "/api/placeholder/100/100",
      userName: "Анна Петрова",
      userAvatar: "/api/placeholder/40/40",
      rating: 5,
      text: "Отличный телефон! Камера просто огонь 🔥",
      likes: 234,
      isLiked: false,
      createdAt: "2024-06-28",
    },
    {
      id: "2",
      videoUrl: "/api/placeholder/400/700",
      thumbnail: "/api/placeholder/400/700",
      productId: "2",
      productName: "AirPods Pro 2",
      productImage: "/api/placeholder/100/100",
      userName: "Михаил Сидоров",
      userAvatar: "/api/placeholder/40/40",
      rating: 4,
      text: "Звук потрясающий, шумоподавление работает идеально",
      likes: 156,
      isLiked: true,
      createdAt: "2024-06-27",
    },
    {
      id: "3",
      videoUrl: "/api/placeholder/400/700",
      thumbnail: "/api/placeholder/400/700",
      productId: "3",
      productName: "MacBook Air M2",
      productImage: "/api/placeholder/100/100",
      userName: "Елена Козлова",
      userAvatar: "/api/placeholder/40/40",
      rating: 5,
      text: "Идеальный ноутбук для работы и учёбы. Тихий и быстрый!",
      likes: 423,
      isLiked: false,
      createdAt: "2024-06-26",
    },
  ];

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSwipeUp = () => {
    if (currentVideoIndex < videoReviews.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  useEffect(() => {
    // Автоматически останавливаем предыдущие видео при переключении
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  const currentReview = videoReviews[currentVideoIndex];

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Заголовок */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <Link to="/" className="flex items-center">
            <Icon name="ArrowLeft" size={24} className="mr-2" />
            <span className="font-semibold">Shorts</span>
          </Link>
          <Icon name="Search" size={24} />
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative h-full flex items-center justify-center">
        {/* Видео */}
        <div
          className="relative w-full max-w-md h-full bg-gray-900 cursor-pointer"
          onClick={() => handleVideoClick(currentVideoIndex)}
        >
          <video
            ref={(el) => (videoRefs.current[currentVideoIndex] = el)}
            className="w-full h-full object-cover"
            poster={currentReview.thumbnail}
            loop
            playsInline
          >
            <source src={currentReview.videoUrl} type="video/mp4" />
          </video>

          {/* Overlay для паузы */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-white/20 rounded-full p-4">
                <Icon name="Play" size={48} className="text-white" />
              </div>
            </div>
          )}

          {/* Информация о товаре внизу */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <div className="flex items-center mb-3">
              <img
                src={currentReview.userAvatar}
                alt={currentReview.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="font-semibold">{currentReview.userName}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={`mr-1 ${
                        i < currentReview.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm mb-3 line-clamp-2">{currentReview.text}</p>

            <Link
              to={`/product/${currentReview.productId}`}
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/30 transition-colors"
            >
              <img
                src={currentReview.productImage}
                alt={currentReview.productName}
                className="w-12 h-12 rounded-lg mr-3"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {currentReview.productName}
                </p>
                <p className="text-xs text-gray-300">Посмотреть товар</p>
              </div>
              <Icon name="ChevronRight" size={20} />
            </Link>
          </div>
        </div>

        {/* Боковая панель действий */}
        <div className="absolute right-4 bottom-20 flex flex-col space-y-4 z-10">
          <Button
            size="sm"
            variant="ghost"
            className={`rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 p-0 ${
              currentReview.isLiked ? "text-red-500" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <Icon
                name="Heart"
                size={20}
                className={currentReview.isLiked ? "fill-current" : ""}
              />
              <span className="text-xs mt-1">{currentReview.likes}</span>
            </div>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 p-0"
          >
            <Icon name="MessageCircle" size={20} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 p-0"
          >
            <Icon name="Share" size={20} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-12 h-12 p-0"
          >
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>

        {/* Навигация между видео */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-10 h-10 p-0"
            onClick={handleSwipeUp}
            disabled={currentVideoIndex >= videoReviews.length - 1}
          >
            <Icon name="ChevronUp" size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 w-10 h-10 p-0"
            onClick={handleSwipeDown}
            disabled={currentVideoIndex <= 0}
          >
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>

        {/* Индикатор текущего видео */}
        <div className="absolute top-20 right-4 z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {currentVideoIndex + 1} / {videoReviews.length}
          </div>
        </div>
      </div>
    </div>
  );
}
