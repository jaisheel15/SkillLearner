import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import { useGamificationStore } from '../store/useGamificationStore';

export default function GameUnlock() {
  const { gameLevels, points } = useGamificationStore();
  const [showUnlock, setShowUnlock] = React.useState(false);
  const [unlockedGame, setUnlockedGame] = React.useState<string>('');

  const animation = useSpring({
    opacity: showUnlock ? 1 : 0,
    transform: showUnlock ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 20 },
  });

  React.useEffect(() => {
    const newUnlock = gameLevels.find(
      (level) => level.unlocked && level.requiredPoints <= points
    );
    
    if (newUnlock) {
      setUnlockedGame(newUnlock.name);
      setShowUnlock(true);
      const timer = setTimeout(() => setShowUnlock(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [gameLevels, points]);

  if (!showUnlock) return null;

  return (
    <animated.div
      style={animation}
      className="fixed top-4 right-4 bg-purple-500 text-white rounded-lg shadow-lg p-4"
    >
      <div className="flex items-center gap-3">
        <Gamepad2 className="w-6 h-6" />
        <div>
          <h4 className="font-semibold">New Game Unlocked!</h4>
          <p className="text-sm">{unlockedGame} is now available to play</p>
        </div>
      </div>
    </animated.div>
  );
}