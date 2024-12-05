import React from 'react';
import { format, subDays } from 'date-fns';

interface Props {
  days: number;
}

export default function StreakCounter({ days }: Props) {
  const today = new Date();
  const streakDays = Array.from({ length: 7 }, (_, i) => ({
    date: subDays(today, 6 - i),
    isActive: i < days % 7,
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Last 7 Days</span>
        <span>{days} Day Streak</span>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {streakDays.map((day) => (
          <div key={day.date.toISOString()} className="space-y-1">
            <div
              className={`h-2 rounded-full ${
                day.isActive
                  ? 'bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
              {format(day.date, 'E')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}