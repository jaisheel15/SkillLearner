import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export default function XPProgress() {
  const { progress } = useProgress();
  const nextLevelXP = (progress.level + 1) * 1000;
  const currentLevelXP = progress.level * 1000;
  const xpProgress = ((progress.points - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white">Level {progress.level}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {progress.points} XP Total
            </p>
          </div>
        </div>
        <Star className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Progress to Level {progress.level + 1}</span>
          <span className="font-medium dark:text-white">
            {progress.points - currentLevelXP}/{nextLevelXP - currentLevelXP} XP
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2 dark:text-white">Recent Achievements</h4>
        <div className="grid grid-cols-4 gap-2">
          {progress.achievements
            .filter(a => a.unlocked)
            .slice(0, 4)
            .map((achievement) => (
              <div
                key={achievement.id}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                title={achievement.title}
              >
                <Award className="w-6 h-6 text-yellow-500 mx-auto" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}