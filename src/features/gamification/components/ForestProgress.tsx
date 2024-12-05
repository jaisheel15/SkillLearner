import React from 'react';
import { Tree, Trophy } from 'lucide-react';
import { useGamificationStore } from '../store/useGamificationStore';
import { useSpring, animated } from 'react-spring';

export default function ForestProgress() {
  const { forest, points } = useGamificationStore();
  
  const treeAnimation = useSpring({
    scale: forest.trees > 0 ? 1 : 0.5,
    opacity: forest.trees > 0 ? 1 : 0.5,
  });

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Tree className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold dark:text-white">Your Forest</h3>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {points} points
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <animated.div
            key={i}
            style={i < forest.trees ? treeAnimation : {}}
            className={`aspect-square rounded-lg flex items-center justify-center ${
              i < forest.trees
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Tree className="w-6 h-6" />
          </animated.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {forest.trees === 0
            ? "Start focusing to plant your first tree!"
            : `You've planted ${forest.trees} trees in your forest!`}
        </p>
      </div>
    </div>
  );
}