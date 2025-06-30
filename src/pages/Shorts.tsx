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

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export default function Shorts() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState("");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([
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
  ]);

  // Инициализация комментариев
  useEffect(() => {
    const initialComments = {
      "1": [
        {
          id: 1,
          user: "Максим",
          avatar: "/api/placeholder/32/32",
          text: "Согласен, камера супер!",
          time: "2 мин назад",
        },
        {
          id: 2,
          user: "Света",
          avatar: "/api/placeholder/32/32",
          text: "Стоит своих денег?",
          time: "5 мин назад",
        },
      ],
      "2": [
        {
          id: 1,
          user: "Игорь",
          avatar: "/api/placeholder/32/32",
          text: "Тоже думаю купить",
          time: "1 мин назад",
        },
      ],
      "3": [],
    };
    setComments(initialComments);
  }, []);

  const handleLike = (videoId: string) => {
    setVideoReviews((prev) =>
      prev.map((video) => {
        if (video.id === videoId) {
          return {
            ...video,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            isLiked: !video.isLiked,
          };
        }
        return video;
      }),
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const videoId = currentReview.id;
      const comment = {
        id: Date.now(),
        user: "Вы",
        avatar: "/api/placeholder/32/32",
        text: newComment,
        time: "только что",
      };

      setComments((prev) => ({
        ...prev,
        [videoId]: [...(prev[videoId] || []), comment],
      }));
      setNewComment("");
    }
  };

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
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4 sm:p-6">
        <div className="flex items-center justify-between text-white">
          <Link to="/" className="flex items-center">
            <Icon name="ArrowLeft" size={24} className="mr-2" />
            <span className="font-semibold text-lg">Shorts</span>
          </Link>
          <Icon
            name="Search"
            size={24}
            className="hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="relative h-full flex items-center justify-center">
        {/* Видео - адаптивный размер */}
        <div
          className="relative w-full h-full sm:max-w-md sm:h-full lg:max-w-lg xl:max-w-xl bg-gray-900 cursor-pointer mx-auto"
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
              <div className="bg-white/20 rounded-full p-4 sm:p-6">
                <Icon
                  name="Play"
                  size={48}
                  className="text-white sm:w-16 sm:h-16"
                />
              </div>
            </div>
          )}

          {/* Кнопки лайков и комментариев НА видео */}
          <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 flex flex-col space-y-3 sm:space-y-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(currentReview.id);
              }}
              className={`flex flex-col items-center p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-200 transform hover:scale-110 ${
                currentReview.isLiked ? "text-red-500" : ""
              }`}
            >
              <Icon
                name="Heart"
                size={24}
                className={`sm:w-6 sm:h-6 ${currentReview.isLiked ? "fill-current animate-pulse" : ""}`}
              />
              <span className="text-xs sm:text-sm mt-1 font-medium">
                {currentReview.likes}
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(true);
              }}
              className="flex flex-col items-center p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-200 transform hover:scale-110"
            >
              <Icon name="MessageCircle" size={24} className="sm:w-6 sm:h-6" />
              <span className="text-xs sm:text-sm mt-1 font-medium">
                {comments[currentReview.id]?.length || 0}
              </span>
            </button>
          </div>

          {/* Информация о товаре внизу - адаптивная */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 text-white">
            <div className="flex items-center mb-3">
              <img
                src={currentReview.userAvatar}
                alt={currentReview.userName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 border-2 border-white/20"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base">
                  {currentReview.userName}
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={`mr-1 sm:w-4 sm:h-4 ${
                        i < currentReview.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
              {currentReview.text}
            </p>

            <Link
              to={`/product/${currentReview.productId}`}
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/30 transition-all duration-200 hover:scale-[1.02]"
            >
              <img
                src={currentReview.productImage}
                alt={currentReview.productName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg mr-3 object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base">
                  {currentReview.productName}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Посмотреть товар
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>

        {/* Навигация между видео - адаптивная */}
        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
          <button
            className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSwipeUp}
            disabled={currentVideoIndex >= videoReviews.length - 1}
          >
            <Icon name="ChevronUp" size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSwipeDown}
            disabled={currentVideoIndex <= 0}
          >
            <Icon name="ChevronDown" size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Индикатор текущего видео - адаптивный */}
        <div className="absolute top-16 sm:top-20 right-3 sm:right-4 z-10">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm sm:text-base font-medium">
            {currentVideoIndex + 1} / {videoReviews.length}
          </div>
        </div>
      </div>

      {/* Модальное окно комментариев */}
      {showComments && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-96 sm:max-w-md h-2/3 sm:h-auto sm:max-h-[80vh] rounded-t-xl sm:rounded-xl overflow-hidden">
            {/* Заголовок */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Комментарии ({comments[currentReview.id]?.length || 0})
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Список комментариев */}
            <div className="flex-1 overflow-y-auto p-4 max-h-96">
              {comments[currentReview.id]?.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Icon
                    name="MessageCircle"
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>Пока нет комментариев</p>
                  <p className="text-sm">Станьте первым!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments[currentReview.id]?.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="font-semibold text-sm">
                            {comment.user}
                          </p>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {comment.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Поле ввода комментария */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Добавить комментарий..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="rounded-full px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
