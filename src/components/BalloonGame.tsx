import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import Icon from "./ui/icon";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface Balloon {
  id: number;
  x: number;
  y: number;
  speed: number;
  color: string;
  hasMoney: boolean;
  money?: number;
  isGolden?: boolean;
  text?: string;
}

interface BalloonGameProps {
  onClose: () => void;
  onEarnings: (amount: number) => void;
}

const BalloonGame: React.FC<BalloonGameProps> = ({ onClose, onEarnings }) => {
  const { user, updateUserBalance } = useAuth();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 минуты = 180 секунд
  const [gameActive, setGameActive] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [goldenBalloonActive, setGoldenBalloonActive] = useState(false);

  const colors = [
    "#FF69B4",
    "#87CEEB",
    "#98FB98",
    "#FFB6C1",
    "#DDA0DD",
    "#F0E68C",
  ];

  const createBalloon = useCallback(() => {
    // Каждый 10-й шарик (по счетчику) дает призы 1-3 рубля
    const isEveryTenth = (score + 1) % 10 === 0;
    const hasMoney = isEveryTenth;
    const money = hasMoney ? Math.floor(Math.random() * 3) + 1 : 0; // 1-3 рубля

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 80),
      y: window.innerHeight + 50,
      speed: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      hasMoney,
      money,
      isGolden: false,
    };
  }, [score]);

  const createGoldenBalloon = useCallback(() => {
    const money = Math.floor(Math.random() * 9) + 7; // 7-15 рублей

    return {
      id: Date.now() + Math.random() + 1000,
      x: Math.random() * (window.innerWidth - 120),
      y: window.innerHeight + 50,
      speed: Math.random() * 4 + 3, // Быстрее обычных
      color: "#FFD700", // Золотой цвет
      hasMoney: true,
      money,
      isGolden: true,
      text: "Calibre Store",
    };
  }, []);

  const popBalloon = useCallback(
    (balloonId: number) => {
      setBalloons((prev) => {
        const balloon = prev.find((b) => b.id === balloonId);
        if (balloon) {
          if (balloon.hasMoney) {
            setEarnings((prev) => prev + balloon.money!);

            if (balloon.isGolden) {
              toast({
                title: "🏆 ЗОЛОТОЙ ШАРИК!",
                description: `Calibre Store дарит вам ${balloon.money} рублей!`,
                duration: 3000,
              });
              setGoldenBalloonActive(false);
            } else {
              toast({
                title: "🎉 Поздравляем!",
                description: `Вы выиграли ${balloon.money} рублей!`,
                duration: 2000,
              });
            }
          }

          const newScore = score + 1;
          setScore(newScore);

          // Запуск золотого шарика после каждого 10-го лопнутого
          if (newScore % 10 === 0 && !goldenBalloonActive) {
            setTimeout(() => {
              if (!goldenBalloonActive) {
                setBalloons((current) => [...current, createGoldenBalloon()]);
                setGoldenBalloonActive(true);
              }
            }, 1000);
          }

          // Эффект взрыва
          const element = document.getElementById(`balloon-${balloonId}`);
          if (element) {
            element.style.animation = "pop 0.3s ease-out";
            setTimeout(() => {
              setBalloons((current) =>
                current.filter((b) => b.id !== balloonId),
              );
            }, 300);
          }
        }
        return prev;
      });
    },
    [score, goldenBalloonActive, createGoldenBalloon],
  );

  // Запуск игры
  const startGame = () => {
    setGameStarted(true);
    setGameActive(true);
    setTimeLeft(180);
    setScore(0);
    setEarnings(0);
    setBalloons([]);
    setGoldenBalloonActive(false);
  };

  // Окончание игры и начисление денег
  const endGame = useCallback(() => {
    setGameActive(false);

    // Автоматически начисляем заработанные деньги на баланс
    if (earnings > 0 && user) {
      updateUserBalance(earnings);
      toast({
        title: "💰 Деньги зачислены!",
        description: `${earnings} рублей добавлены на ваш счет`,
        duration: 4000,
      });
    }

    toast({
      title: "Время вышло!",
      description: `Игра окончена! Вы заработали ${earnings} рублей.`,
      duration: 3000,
    });
  }, [earnings, user, updateUserBalance]);

  // Обновление позиций шариков
  useEffect(() => {
    if (!gameActive || !gameStarted) return;

    const interval = setInterval(() => {
      setBalloons((prev) => {
        return prev
          .map((balloon) => ({
            ...balloon,
            y: balloon.y - balloon.speed,
          }))
          .filter((balloon) => balloon.y > -100);
      });
    }, 16);

    return () => clearInterval(interval);
  }, [gameActive, gameStarted]);

  // Создание новых шариков
  useEffect(() => {
    if (!gameActive || !gameStarted) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% шанс создать новый шарик
        setBalloons((prev) => [...prev, createBalloon()]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive, gameStarted, createBalloon]);

  // Таймер игры
  useEffect(() => {
    if (!gameActive || !gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, gameStarted, endGame]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-white z-50 overflow-hidden">
      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes goldenGlow {
          0% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
          100% {
            box-shadow:
              0 0 30px rgba(255, 215, 0, 1),
              0 0 40px rgba(255, 215, 0, 0.6);
          }
        }
        .balloon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Верхняя панель */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <Icon name="X" size={20} />
            Закрыть
          </Button>

          {gameStarted && (
            <div className="flex gap-4 text-sm font-semibold">
              <div className="flex items-center gap-1">
                <Icon name="Target" size={16} />
                {score}
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={16} />
                {earnings}₽
              </div>
              <div className="flex items-center gap-1 text-blue-600">
                <Icon name="Clock" size={16} />
                {formatTime(timeLeft)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Игровая область */}
      <div className="pt-20 h-full relative">
        {!gameStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center space-y-6 max-w-md mx-auto px-4">
              <div className="text-6xl">🎈</div>
              <h2 className="text-3xl font-bold text-gray-800">
                Лопни шарики!
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Лопайте шарики и зарабатывайте! Каждый 10-й шарик содержит 1-3
                рубля. После каждого 10-го появляется золотой шарик Calibre
                Store с призом 7-15 рублей!
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  ⏰ Время игры: 3 минуты
                  <br />
                  🎯 Играть можно раз в сутки
                  <br />
                  💰 Призы автоматически зачисляются на баланс
                </p>
              </div>
              <Button
                onClick={startGame}
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Начать игру
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Шарики */}
            {balloons.map((balloon) => (
              <div
                key={balloon.id}
                id={`balloon-${balloon.id}`}
                className="absolute cursor-pointer balloon"
                style={{
                  left: balloon.x,
                  top: balloon.y,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => popBalloon(balloon.id)}
              >
                <div
                  className={`relative shadow-lg hover:scale-110 transition-transform ${
                    balloon.isGolden ? "w-20 h-24" : "w-16 h-20"
                  } rounded-full`}
                  style={{
                    backgroundColor: balloon.color,
                    boxShadow: balloon.isGolden
                      ? "0 0 20px rgba(255, 215, 0, 0.8)"
                      : undefined,
                    animation: balloon.isGolden
                      ? "goldenGlow 1s ease-in-out infinite alternate"
                      : undefined,
                  }}
                >
                  <div className="absolute top-2 left-4 w-4 h-6 bg-white/30 rounded-full"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-400"></div>

                  {balloon.isGolden && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black text-center px-1">
                        {balloon.text}
                      </div>
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm animate-bounce">
                        👑
                      </div>
                    </>
                  )}

                  {balloon.hasMoney && !balloon.isGolden && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                      💰
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Результат игры */}
            {!gameActive && gameStarted && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-4">Игра окончена!</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-lg">
                      Лопнуто шариков:{" "}
                      <span className="font-bold">{score}</span>
                    </p>
                    <p className="text-lg">
                      Заработано:{" "}
                      <span className="font-bold text-green-600">
                        {earnings} рублей
                      </span>
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg mb-6">
                    <p className="text-sm text-green-800 font-medium">
                      💰 Деньги автоматически зачислены на ваш счет!
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    Возвращайтесь завтра, чтобы сыграть снова!
                  </p>
                  <Button onClick={onClose} className="w-full">
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BalloonGame;
