import React from 'react';
import { Trophy, Flame, BookOpen } from 'lucide-react';
import { UserProgress } from '../../../types';
import ProgressCard from './ProgressCard';
import StreakCounter from './StreakCounter';

interface Props {
  progress: UserProgress;
}

export default function ProgressOverview({ progress }: Props) {
  const stats = [
    {
      label: 'Current Level',
      value: progress.level,
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Day Streak',
      value: progress.streakDays,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      label: 'Courses Completed',
      value: progress.completedCourses.length,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <ProgressCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className="mt-6">
        <StreakCounter days={progress.streakDays} />
      </div>
    </div>
  );
}