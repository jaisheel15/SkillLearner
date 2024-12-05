import React from 'react';
import { Flame, Calendar, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import Confetti from 'react-confetti';

export default function DailyStreak() {
  const { progress } = useProgress();
  const showConfetti = progress.streakDays > 0 && progress.streakDays % 7 === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              {progress.streakDays} Day Streak
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep it going!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-8 rounded-md ${
              i < (progress.streakDays % 7)
                ? 'bg-orange-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Next Milestone
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium dark:text-white">
              {7 - (progress.streakDays % 7)} days to go
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}