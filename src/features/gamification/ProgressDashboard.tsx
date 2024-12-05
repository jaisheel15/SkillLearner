import React from 'react';
import { UserProgress, Achievement } from '../../types';
import AchievementCard from './AchievementCard';
import { Star, Flame, Trophy, Award } from 'lucide-react';

interface Props {
  progress: UserProgress;
}

export default function ProgressDashboard({ progress }: Props) {
  const calculateNextLevel = () => {
    const basePoints = 1000;
    const currentLevelPoints = basePoints * progress.level;
    const nextLevelPoints = basePoints * (progress.level + 1);
    const progressToNext = ((progress.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return {
      current: progress.points - currentLevelPoints,
      required: nextLevelPoints - currentLevelPoints,
      percentage: progressToNext,
    };
  };

  const nextLevel = calculateNextLevel();

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Star className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white">Level {progress.level}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{progress.points} total points</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white">{progress.streakDays} Day Streak</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keep it going!</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Trophy className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white">
                {progress.achievements.filter(a => a.unlocked).length} Achievements
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {progress.achievements.length - progress.achievements.filter(a => a.unlocked).length} more to unlock
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Progress to Level {progress.level + 1}</span>
            <span className="font-medium dark:text-white">
              {nextLevel.current}/{nextLevel.required} points
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${nextLevel.percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {progress.achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}