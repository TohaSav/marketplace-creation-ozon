import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

interface LotteryTicket {
  id: string;
  ticketNumber: string;
  sellerId: string;
  date: string;
  prize: number;
  isScratched: boolean;
  scratchedAt?: string;
}

interface ScratchPosition {
  x: number;
  y: number;
}

export default function SellerLuckGame() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [todayTicket, setTodayTicket] = useState<LotteryTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPositions, setScratchedPositions] = useState<
    ScratchPosition[]
  >([]);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadTodayTicket();
  }, []);

  const loadTodayTicket = () => {
    const seller = JSON.parse(localStorage.getItem("seller-token") || "{}");
    if (!seller.id) {
      navigate("/seller");
      return;
    }

    const today = new Date().toDateString();
    const allTickets = JSON.parse(
      localStorage.getItem("lottery-tickets") || "[]",
    );

    // Ищем билет на сегодня
    let ticket = allTickets.find(
      (t: LotteryTicket) =>
        t.sellerId === seller.id && new Date(t.date).toDateString() === today,
    );

    if (!ticket) {
      // Создаем новый билет на сегодня
      ticket = generateNewTicket(seller.id);
      allTickets.push(ticket);
      localStorage.setItem("lottery-tickets", JSON.stringify(allTickets));
    }

    setTodayTicket(ticket);
    setLoading(false);
  };

  const generateNewTicket = (sellerId: string): LotteryTicket => {
    const today = new Date();
    const ticketNumber = generateUniqueTicketNumber();
    const prize = Math.floor(Math.random() * 4); // 0-3 рубля

    return {
      id: `${sellerId}-${Date.now()}`,
      ticketNumber,
      sellerId,
      date: today.toISOString(),
      prize,
      isScratched: false,
    };
  };

  const generateUniqueTicketNumber = (): string => {
    const allTickets = JSON.parse(
      localStorage.getItem("lottery-tickets") || "[]",
    );
    const existingNumbers = allTickets.map(
      (t: LotteryTicket) => t.ticketNumber,
    );

    let ticketNumber;
    do {
      // Генерируем номер формата: LK-YYYYMMDD-XXXXXX
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomPart = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
      ticketNumber = `LK-${date}-${randomPart}`;
    } while (existingNumbers.includes(ticketNumber));

    return ticketNumber;
  };

  const handleScratchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!todayTicket || todayTicket.isScratched) return;

    setIsScratching(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    addScratchPosition(x, y);
  };

  const handleScratchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || !todayTicket || todayTicket.isScratched) return;

    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    addScratchPosition(x, y);
  };

  const handleScratchEnd = () => {
    setIsScratching(false);
  };

  const addScratchPosition = (x: number, y: number) => {
    setScratchedPositions((prev) => {
      const newPositions = [...prev, { x, y }];
      const progress = Math.min(newPositions.length / 50, 1); // 50 точек = 100%
      setScratchProgress(progress);

      if (progress >= 0.7 && todayTicket && !todayTicket.isScratched) {
        // Автоматически открываем билет когда стерто 70%
        completeScratch();
      }

      return newPositions;
    });
  };

  const completeScratch = () => {
    if (!todayTicket || todayTicket.isScratched) return;

    const updatedTicket = {
      ...todayTicket,
      isScratched: true,
      scratchedAt: new Date().toISOString(),
    };

    setTodayTicket(updatedTicket);

    // Обновляем в localStorage
    const allTickets = JSON.parse(
      localStorage.getItem("lottery-tickets") || "[]",
    );
    const updatedTickets = allTickets.map((t: LotteryTicket) =>
      t.id === todayTicket.id ? updatedTicket : t,
    );
    localStorage.setItem("lottery-tickets", JSON.stringify(updatedTickets));

    // Добавляем призовые деньги к балансу продавца
    if (updatedTicket.prize > 0) {
      const seller = JSON.parse(localStorage.getItem("seller-token") || "{}");
      const currentBalance = parseFloat(seller.balance || "0");
      const newBalance = currentBalance + updatedTicket.prize;

      seller.balance = newBalance.toString();
      localStorage.setItem("seller-token", JSON.stringify(seller));

      toast({
        title: "Поздравляем! 🎉",
        description: `Вы выиграли ${updatedTicket.prize} ₽! Деньги добавлены на баланс.`,
      });
    } else {
      toast({
        title: "Удачи в следующий раз! 🍀",
        description: "Возвращайтесь завтра за новым билетом!",
      });
    }
  };

  const getTimeUntilNextTicket = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeLeft = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}ч ${minutes}м`;
  };

  // Проверяем статус продавца
  if (user?.userType === "seller" && user?.status !== "active") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Icon name="Lock" size={64} className="text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Игра недоступна
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-lg mb-6">
              Игра "Удача" доступна только для активных продавцов.
            </p>
            <Button
              onClick={() => navigate("/seller/dashboard")}
              variant="outline"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к кабинету
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка билета...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/seller/dashboard")}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к кабинету
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Игры Удача 🎟️</h1>
        <p className="text-gray-600">
          Получайте ежедневный лотерейный билет и выигрывайте призы!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="Ticket" size={20} />
                  Лотерейный билет
                </span>
                <Badge variant="secondary">
                  {new Date().toLocaleDateString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayTicket && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Номер билета:</p>
                    <p className="text-lg font-mono font-bold text-purple-600">
                      {todayTicket.ticketNumber}
                    </p>
                  </div>

                  <div className="relative mx-auto max-w-sm">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white shadow-lg">
                      <div className="text-center mb-4">
                        <Icon
                          name="Ticket"
                          size={32}
                          className="mx-auto mb-2"
                        />
                        <h3 className="text-xl font-bold">ЛОТЕРЕЙНЫЙ БИЛЕТ</h3>
                        <p className="text-sm opacity-90">
                          {todayTicket.ticketNumber}
                        </p>
                      </div>

                      <div className="relative bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        {!todayTicket.isScratched ? (
                          <div className="relative">
                            <div className="text-center py-8">
                              <Icon
                                name="Gift"
                                size={48}
                                className="mx-auto mb-2 opacity-60"
                              />
                              <p className="text-lg font-semibold opacity-90">
                                Стирайте здесь
                              </p>
                              <p className="text-sm opacity-70">
                                Для раскрытия приза
                              </p>
                            </div>

                            {/* Слой для стирания */}
                            <canvas
                              ref={canvasRef}
                              width={280}
                              height={120}
                              className="absolute inset-0 cursor-crosshair"
                              style={{
                                background:
                                  scratchedPositions.length > 0
                                    ? `radial-gradient(circle at ${scratchedPositions[scratchedPositions.length - 1]?.x}px ${scratchedPositions[scratchedPositions.length - 1]?.y}px, transparent 10px, rgba(255,255,255,0.8) 12px)`
                                    : "rgba(255,255,255,0.8)",
                                borderRadius: "8px",
                              }}
                              onMouseDown={handleScratchStart}
                              onMouseMove={handleScratchMove}
                              onMouseUp={handleScratchEnd}
                              onMouseLeave={handleScratchEnd}
                              onTouchStart={handleScratchStart}
                              onTouchMove={handleScratchMove}
                              onTouchEnd={handleScratchEnd}
                            />

                            {/* Эффект стирания */}
                            {scratchedPositions.map((pos, index) => (
                              <div
                                key={index}
                                className="absolute w-6 h-6 bg-transparent rounded-full pointer-events-none"
                                style={{
                                  left: pos.x - 12,
                                  top: pos.y - 12,
                                  boxShadow: "0 0 0 12px transparent",
                                  background: "transparent",
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-4xl font-bold text-yellow-300 mb-2">
                              {todayTicket.prize > 0
                                ? `${todayTicket.prize} ₽`
                                : "0 ₽"}
                            </div>
                            <p className="text-lg font-semibold">
                              {todayTicket.prize > 0
                                ? "Поздравляем!"
                                : "Удачи в следующий раз!"}
                            </p>
                            <p className="text-sm opacity-70 mt-2">
                              {todayTicket.prize > 0
                                ? "Призовые деньги добавлены на баланс"
                                : "Возвращайтесь завтра за новым билетом"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!todayTicket.isScratched && (
                    <div className="text-center space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Как играть:</strong> Стирайте серую область
                          пальцем или мышкой, чтобы узнать свой приз!
                        </p>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scratchProgress * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Прогресс: {Math.round(scratchProgress * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Правила игры</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-green-600" />
                <span className="text-sm">Один билет в день</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Coins" size={16} className="text-yellow-600" />
                <span className="text-sm">Призы от 0 до 3 рублей</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-blue-600" />
                <span className="text-sm">Обновление в полночь</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Hash" size={16} className="text-purple-600" />
                <span className="text-sm">Уникальные номера</span>
              </div>

              {todayTicket?.isScratched && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Следующий билет через:
                  </h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {getTimeUntilNextTicket()}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Статистика призов:
                </h4>
                <div className="space-y-1 text-sm text-yellow-800">
                  <div className="flex justify-between">
                    <span>0 ₽:</span>
                    <span>40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 ₽:</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 ₽:</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3 ₽:</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
