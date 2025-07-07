import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Ball {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

interface BallCatchGameProps {
  isSellerView?: boolean;
}

export default function BallCatchGame({
  isSellerView = false,
}: BallCatchGameProps) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Цвета шариков
  const ballColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-indigo-500",
  ];

  // Создание нового шарика
  const createBall = useCallback(() => {
    const newBall: Ball = {
      id: Date.now() + Math.random(),
      x: Math.random() * 300,
      y: -20,
      color: ballColors[Math.floor(Math.random() * ballColors.length)],
      speed: 2 + Math.random() * 3,
    };
    setBalls((prev) => [...prev, newBall]);
  }, []);

  // Движение шариков
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setBalls((prev) =>
        prev
          .map((ball) => ({
            ...ball,
            y: ball.y + ball.speed,
          }))
          .filter((ball) => ball.y < 400),
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Создание новых шариков
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createBall();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive, createBall]);

  // Таймер игры
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  // Конец игры
  useEffect(() => {
    if (timeLeft <= 0 && gameActive) {
      setGameActive(false);
      setGameOver(true);
    }
  }, [timeLeft, gameActive]);

  // Ловля шарика
  const catchBall = (ballId: number) => {
    setBalls((prev) => prev.filter((ball) => ball.id !== ballId));
    setScore((prev) => prev + 10);
  };

  // Старт игры
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setBalls([]);
  };

  // Не показывать игру продавцам
  if (isSellerView) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            🎮 Ловим Шарики!
          </h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Target" className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600">Очки: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-600">
                Время: {timeLeft}с
              </span>
            </div>
          </div>
        </div>

        {/* Игровое поле */}
        <div className="relative w-full h-80 bg-gradient-to-b from-sky-100 to-sky-200 rounded-xl border-2 border-sky-300 overflow-hidden mb-4">
          {balls.map((ball) => (
            <button
              key={ball.id}
              onClick={() => catchBall(ball.id)}
              className={`absolute w-8 h-8 ${ball.color} rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer animate-pulse`}
              style={{
                left: `${ball.x}px`,
                top: `${ball.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {!gameActive && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
              <div className="text-center text-white">
                <Icon name="Play" className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">
                  Нажмите "Играть" чтобы начать!
                </p>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="text-center text-white">
                <Icon
                  name="Trophy"
                  className="w-16 h-16 mx-auto mb-4 text-yellow-400"
                />
                <p className="text-2xl font-bold mb-2">Игра окончена!</p>
                <p className="text-lg">Ваш счет: {score} очков</p>
              </div>
            </div>
          )}
        </div>

        {/* Кнопка управления */}
        <div className="text-center">
          {!gameActive && (
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              <Icon name="Play" className="w-5 h-5 mr-2" />
              {gameOver ? "Играть снова" : "Начать игру"}
            </Button>
          )}
        </div>

        {/* Инструкции */}
        <div className="mt-4 text-center text-sm text-gray-600 bg-white bg-opacity-70 rounded-lg p-3">
          <p>🎯 Кликайте по падающим шарикам чтобы их поймать!</p>
          <p>⏱️ У вас есть 30 секунд. Каждый шарик = 10 очков!</p>
        </div>
      </CardContent>
    </Card>
  );
}
