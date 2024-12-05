import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, TreePine } from 'lucide-react';
import { useGamificationStore } from '../store/useGamificationStore';
import { useSpring, animated } from 'react-spring';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  
  const { addPoints, plantTree, forest } = useGamificationStore();

  const progressAnimation = useSpring({
    width: `${(totalFocusTime / (forest.nextTreeAt * 60)) * 100}%`,
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
        setTotalFocusTime((time) => {
          const newTime = time + 1;
          // Check if we've reached the time needed for a new tree
          if (newTime >= forest.nextTreeAt * 60) {
            plantTree();
            addPoints(50);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      addPoints(25);
      setIsActive(false);
      setTimeLeft(25 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, forest.nextTreeAt, addPoints, plantTree]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold dark:text-white">Focus Timer</h3>
        </div>
        <div className="flex items-center gap-2">
          <TreePine className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {forest.trees} trees planted
          </span>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-4 dark:text-white">
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-3 rounded-lg ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isActive ? (
            <div className="flex items-center gap-2">
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>Start Focus</span>
            </div>
          )}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Progress to next tree</span>
          <span>
            {Math.floor(totalFocusTime / 60)}/{forest.nextTreeAt} minutes
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <animated.div
            className="h-full bg-green-500 rounded-full"
            style={progressAnimation}
          />
        </div>
      </div>
    </div>
  );
}