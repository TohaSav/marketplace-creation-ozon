import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
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

interface BubbleGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const BubbleGame: React.FC<BubbleGameProps> = ({ isOpen, onClose }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const bubbleIdRef = useRef(0);
  const lastGoldenBubbleRef = useRef(0);
  const lastBubbleSpawnRef = useRef(0);

  const gradients = [
    'linear-gradient(135deg, rgba(255, 105, 180, 0.8) 0%, rgba(255, 20, 147, 0.9) 100%)',
    'linear-gradient(135deg, rgba(64, 224, 208, 0.8) 0%, rgba(0, 191, 255, 0.9) 100%)',
    'linear-gradient(135deg, rgba(255, 215, 0, 0.8) 0%, rgba(255, 165, 0, 0.9) 100%)',
    'linear-gradient(135deg, rgba(138, 43, 226, 0.8) 0%, rgba(75, 0, 130, 0.9) 100%)',
    'linear-gradient(135deg, rgba(50, 205, 50, 0.8) 0%, rgba(34, 139, 34, 0.9) 100%)',
    'linear-gradient(135deg, rgba(255, 99, 71, 0.8) 0%, rgba(220, 20, 60, 0.9) 100%)',
  ];

  const goldenGradient = 'linear-gradient(135deg, rgba(255, 215, 0, 0.9) 0%, rgba(255, 140, 0, 1) 100%)';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setGameActive(false);
      setBubbles([]);
      setScore(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isOpen]);

  const createBubble = useCallback((isGolden = false): Bubble => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return {} as Bubble;

    const size = isGolden ? 60 + Math.random() * 30 : 30 + Math.random() * 40;
    const x = Math.random() * (gameArea.clientWidth - size);
    const value = isGolden ? 5 : parseFloat((Math.random() * 1.4 + 0.1).toFixed(2));
    const speed = isGolden ? 0.1 + Math.random() * 0.2 : 0.2 + Math.random() * 0.3;
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
  }, [gradients, goldenGradient]);

  const popBubble = useCallback((bubbleId: number) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === bubbleId);
      if (bubble) {
        setScore(prevScore => prevScore + bubble.value);
      }
      return prev.filter(b => b.id !== bubbleId);
    });
  }, []);

  const updateBubbles = useCallback(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    setBubbles(prev => prev.map(bubble => ({
      ...bubble,
      y: bubble.y - bubble.speed,
    })).filter(bubble => bubble.y + bubble.size > 0));
  }, []);

  const gameLoop = useCallback(() => {
    if (!gameActive) return;

    updateBubbles();

    const now = Date.now();
    const shouldCreateGolden = now - lastGoldenBubbleRef.current > 40000;
    const shouldCreateRegular = now - lastBubbleSpawnRef.current > 800;

    if (shouldCreateGolden) {
      setBubbles(prev => [...prev, createBubble(true)]);
      lastGoldenBubbleRef.current = now;
    }

    if (shouldCreateRegular && Math.random() < 0.7) {
      setBubbles(prev => [...prev, createBubble(false)]);
      lastBubbleSpawnRef.current = now;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameActive, updateBubbles, createBubble]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setBubbles([]);
    bubbleIdRef.current = 0;
    lastGoldenBubbleRef.current = Date.now();
    lastBubbleSpawnRef.current = Date.now();
    gameLoop();
  };

  const stopGame = () => {
    setGameActive(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleClose = () => {
    stopGame();
    onClose();
  };

  useEffect(() => {
    if (gameActive) {
      gameLoop();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameActive, gameLoop]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${
      isMobile ? 'p-0' : 'p-4'
    }`}>
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl relative overflow-hidden ${
        isMobile ? 'w-full h-full' : 'w-[90vw] h-[80vh] max-w-4xl'
      }`}>
        
        {/* Заголовок */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">🫧 Пузырики</h2>
              <div className="text-lg font-semibold text-green-600">
                {score.toFixed(2)} ₽
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!gameActive ? (
                <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
                  <Icon name="Play" size={16} className="mr-1" />
                  Играть
                </Button>
              ) : (
                <Button onClick={stopGame} variant="outline">
                  <Icon name="Pause" size={16} className="mr-1" />
                  Пауза
                </Button>
              )}
              <Button onClick={handleClose} variant="outline" size="sm">
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Правила */}
          <div className="mt-2 text-center">
            <div className="inline-block bg-white/70 rounded-lg px-3 py-1">
              <div className="text-xs text-gray-700">
                Обычные: 0.1-1.5₽ • Золотые: 5₽ (каждые 40 сек)
              </div>
            </div>
          </div>
        </div>

        {/* Игровая область */}
        <div 
          ref={gameAreaRef}
          className={`absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-300 to-cyan-400 overflow-hidden ${
            isMobile ? 'pt-24' : 'pt-28'
          }`}
          style={{ 
            cursor: gameActive ? 'crosshair' : 'default'
          }}
        >
          
          {/* Пузырики */}
          {gameActive && bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="absolute cursor-pointer transition-transform hover:scale-110 select-none"
              style={{
                left: bubble.x,
                bottom: bubble.y,
                width: bubble.size,
                height: bubble.size,
                background: bubble.color,
                borderRadius: '50%',
                border: bubble.isGolden ? '3px solid #FFD700' : '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: bubble.isGolden 
                  ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.4)'
                  : '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.4)',
                animation: 'bubble-float 2s ease-in-out infinite',
              }}
              onClick={() => popBubble(bubble.id)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-xs font-bold ${bubble.isGolden ? 'text-yellow-900' : 'text-white'} text-center drop-shadow-sm`}>
                  {bubble.isGolden && <Icon name="Star" size={14} className="mx-auto mb-1" />}
                  <div>{bubble.value.toFixed(2)}₽</div>
                </div>
              </div>
              
              {/* Блики */}
              <div 
                className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full opacity-70"
                style={{ filter: 'blur(0.5px)' }}
              />
              <div 
                className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full opacity-50"
                style={{ filter: 'blur(0.3px)' }}
              />
            </div>
          ))}

          {/* Инструкции */}
          {!gameActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 mx-4">
                <div className="text-4xl mb-4">🫧</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Лопайте пузырики!
                </h3>
                <p className="text-gray-600 mb-4">
                  {isMobile ? 'Нажимайте на пузырики' : 'Кликайте по пузырикам'} чтобы их лопнуть<br />
                  Зарабатывайте деньги за каждый пузырик
                </p>
                <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Play" size={16} className="mr-2" />
                  Начать игру
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Мобильное управление */}
        {isMobile && gameActive && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center">
            <Button 
              onClick={stopGame} 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm"
            >
              <Icon name="Pause" size={16} className="mr-1" />
              Пауза
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bubble-float {
          0%, 100% { transform: translateX(0px) scale(1); }
          25% { transform: translateX(-3px) scale(1.02); }
          75% { transform: translateX(3px) scale(0.98); }
        }
      `}</style>
    </div>
  );
};

export default BubbleGame;