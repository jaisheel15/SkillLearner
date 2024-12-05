import React from 'react';
import { Achievement } from '../../types';
import { Trophy, Lock, Award } from 'lucide-react';

interface Props {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: Props) {
  const progressPercentage = (achievement.progress / achievement.requiredPoints) * 100;

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${
      achievement.unlocked ? 'border-2 border-yellow-400' : ''
    }`}>
      <div className="absolute top-4 right-4">
        {achievement.unlocked ? (
          <Trophy className="w-6 h-6 text-yellow-400" />
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-full ${
          achievement.unlocked ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <Award className={`w-8 h-8 ${
            achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'
          }`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{achievement.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-medium dark:text-white">
            {achievement.progress}/{achievement.requiredPoints} points
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              achievement.unlocked
                ? 'bg-yellow-400'
                : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}