import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

interface BubbleGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const BubbleGame: React.FC<BubbleGameProps> = ({ isOpen, onClose }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    'from-blue-400 to-blue-600',
    'from-pink-400 to-pink-600', 
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-cyan-400 to-cyan-600'
  ];

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
      setGameRunning(false);
      setBubbles([]);
      setScore(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isOpen]);

  const createBubble = () => {
    if (!gameAreaRef.current) return null;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const size = Math.random() * 40 + 20;
    
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (rect.width - size),
      y: rect.height + size,
      size,
      speed: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.5
    };
  };

  const updateBubbles = () => {
    setBubbles(prevBubbles => {
      const updated = prevBubbles
        .map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
          x: bubble.x + Math.sin(bubble.y * 0.01) * 0.5
        }))
        .filter(bubble => bubble.y + bubble.size > -50);

      if (Math.random() < 0.03) {
        const newBubble = createBubble();
        if (newBubble) {
          updated.push(newBubble);
        }
      }

      return updated;
    });
  };

  const gameLoop = () => {
    if (gameRunning) {
      updateBubbles();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const startGame = () => {
    setGameRunning(true);
    setScore(0);
    setBubbles([]);
    gameLoop();
  };

  const stopGame = () => {
    setGameRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== bubbleId));
    setScore(prev => prev + 10);
  };

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
              <div className="text-lg font-semibold text-blue-600">
                Очки: {score}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!gameRunning ? (
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
              <Button onClick={onClose} variant="outline" size="sm">
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Игровая область */}
        <div 
          ref={gameAreaRef}
          className={`absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-300 to-blue-500 overflow-hidden ${
            isMobile ? 'pt-20' : 'pt-24'
          }`}
          style={{ 
            background: 'linear-gradient(to bottom, #dbeafe, #93c5fd, #3b82f6)',
            cursor: gameRunning ? 'crosshair' : 'default'
          }}
        >
          
          {/* Пузырики */}
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className={`absolute rounded-full bg-gradient-to-br ${bubble.color} cursor-pointer transition-transform hover:scale-110 shadow-lg animate-pulse`}
              style={{
                left: bubble.x,
                top: bubble.y,
                width: bubble.size,
                height: bubble.size,
                opacity: bubble.opacity,
                animation: 'float 3s ease-in-out infinite'
              }}
              onClick={() => popBubble(bubble.id)}
            >
              <div className="absolute inset-2 rounded-full bg-white/30" />
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/60" />
            </div>
          ))}

          {/* Инструкции */}
          {!gameRunning && bubbles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 mx-4">
                <div className="text-4xl mb-4">🫧</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Лопайте пузырики!
                </h3>
                <p className="text-gray-600 mb-4">
                  {isMobile ? 'Нажимайте на пузырики' : 'Кликайте по пузырикам'} чтобы их лопнуть<br />
                  За каждый пузырик вы получаете 10 очков
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
        {isMobile && gameRunning && (
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default BubbleGame;