import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  value: number;
  isGolden: boolean;
  speed: number;
  color: string;
}

const BubbleGame: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const bubbleIdRef = useRef(0);
  const lastGoldenBubbleRef = useRef(0);

  const gradients = [
    'linear-gradient(135deg, rgba(255, 105, 180, 0.3) 0%, rgba(255, 20, 147, 0.5) 100%)',
    'linear-gradient(135deg, rgba(64, 224, 208, 0.3) 0%, rgba(0, 191, 255, 0.5) 100%)',
    'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.5) 100%)',
    'linear-gradient(135deg, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.5) 100%)',
    'linear-gradient(135deg, rgba(50, 205, 50, 0.3) 0%, rgba(34, 139, 34, 0.5) 100%)',
    'linear-gradient(135deg, rgba(255, 99, 71, 0.3) 0%, rgba(220, 20, 60, 0.5) 100%)',
  ];

  const goldenGradient = 'linear-gradient(135deg, rgba(255, 215, 0, 0.6) 0%, rgba(255, 140, 0, 0.8) 100%)';

  const createBubble = (isGolden = false): Bubble => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return {} as Bubble;

    const size = isGolden ? 80 + Math.random() * 40 : 40 + Math.random() * 60;
    const x = Math.random() * (gameArea.clientWidth - size);
    const value = isGolden ? 5 : parseFloat((Math.random() * 1.4 + 0.1).toFixed(2));
    const speed = isGolden ? 0.5 + Math.random() * 0.5 : 1 + Math.random() * 2;
    const color = isGolden ? goldenGradient : gradients[Math.floor(Math.random() * gradients.length)];

    return {
      id: bubbleIdRef.current++,
      x,
      y: gameArea.clientHeight,
      size,
      value,
      isGolden,
      speed,
      color,
    };
  };

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === bubbleId);
      if (bubble) {
        setScore(prevScore => prevScore + bubble.value);
      }
      return prev.filter(b => b.id !== bubbleId);
    });
  };

  const updateBubbles = () => {
    setBubbles(prev => prev.map(bubble => ({
      ...bubble,
      y: bubble.y - bubble.speed,
    })).filter(bubble => bubble.y + bubble.size > 0));
  };

  const gameLoop = () => {
    if (!gameActive) return;

    updateBubbles();

    // Создаём новые пузыри
    const now = Date.now();
    const shouldCreateGolden = now - lastGoldenBubbleRef.current > 40000; // 40 секунд

    if (shouldCreateGolden) {
      setBubbles(prev => [...prev, createBubble(true)]);
      lastGoldenBubbleRef.current = now;
    } else if (Math.random() < 0.02) { // 2% шанс создать обычный пузырь
      setBubbles(prev => [...prev, createBubble(false)]);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setBubbles([]);
    lastGoldenBubbleRef.current = Date.now();
    gameLoop();
  };

  const stopGame = () => {
    setGameActive(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🫧 Пузырики</h1>
          <p className="text-gray-600 mb-6">Лопайте пузыри и зарабатывайте деньги!</p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600">
                {score.toFixed(2)} ₽
              </div>
              <div className="text-sm text-gray-500">Заработано</div>
            </div>
            
            <button
              onClick={gameActive ? stopGame : startGame}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                gameActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {gameActive ? 'Остановить' : 'Начать игру'}
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-lg mb-6 max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Правила игры:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Лопайте пузыри чтобы заработать деньги</li>
              <li>• Обычные пузыри: 0.1 - 1.5 рубля</li>
              <li>• Золотые пузыри: 5 рублей (каждые 40 сек)</li>
              <li>• Деньги автоматически зачисляются на счёт</li>
            </ul>
          </div>
        </div>

        <div 
          ref={gameAreaRef}
          className="relative bg-gradient-to-t from-cyan-200 to-blue-200 rounded-3xl overflow-hidden shadow-2xl"
          style={{ height: '600px' }}
        >
          {gameActive && (
            <div className="absolute inset-0">
              {bubbles.map(bubble => (
                <div
                  key={bubble.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{
                    left: bubble.x,
                    bottom: bubble.y,
                    width: bubble.size,
                    height: bubble.size,
                    background: bubble.color,
                    borderRadius: '50%',
                    border: bubble.isGolden ? '3px solid #FFD700' : '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: bubble.isGolden 
                      ? '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                    animation: 'float 3s ease-in-out infinite',
                  }}
                  onClick={() => popBubble(bubble.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-xs font-bold ${bubble.isGolden ? 'text-yellow-900' : 'text-white'} text-center`}>
                      {bubble.isGolden && <Icon name="Star" size={16} className="mx-auto mb-1" />}
                      {bubble.value.toFixed(2)}₽
                    </div>
                  </div>
                  
                  {/* Блики на пузыре */}
                  <div 
                    className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60"
                    style={{ filter: 'blur(1px)' }}
                  />
                  <div 
                    className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full opacity-40"
                    style={{ filter: 'blur(0.5px)' }}
                  />
                </div>
              ))}
            </div>
          )}

          {!gameActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-6xl mb-4">🫧</div>
                <p className="text-xl">Нажмите "Начать игру" чтобы начать!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default BubbleGame;