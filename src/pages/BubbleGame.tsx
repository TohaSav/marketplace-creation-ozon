import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import BubbleGameComponent from '@/components/games/BubbleGame';

const BubbleGame: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlayGame = () => {
    setIsGameOpen(true);
  };



  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🫧 Пузырики</h1>
            <p className="text-gray-600 mb-6">Веселая игра с лопанием пузыриков!</p>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-6 max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Правила игры:</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Нажимайте на пузырики чтобы их лопнуть</li>
                <li>• За каждый пузырик вы получаете 10 очков</li>
                <li>• Пузырики появляются случайно снизу</li>
                <li>• Попробуйте лопнуть как можно больше!</li>
              </ul>
            </div>

            <Button 
              onClick={handlePlayGame}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              <Icon name="Play" size={20} className="mr-2" />
              {isMobile ? 'Играть в Пузырики' : 'Играть в Пузырики'}
            </Button>
          </div>

          <div className="bg-gradient-to-t from-cyan-200 to-blue-200 rounded-3xl overflow-hidden shadow-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-6xl mb-4">🫧</div>
              <p className="text-xl">Нажмите кнопку выше чтобы начать игру!</p>
            </div>
          </div>
        </div>
      </div>

      <BubbleGameComponent 
        isOpen={isGameOpen} 
        onClose={() => setIsGameOpen(false)} 
      />
    </>
  );
};

export default BubbleGame;