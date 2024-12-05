import React from 'react';
import { WeeklyPlan } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface Props {
  weeklyPlans: WeeklyPlan[];
  currentWeek: number;
  onSelectVideo: (videoId: string) => void;
}

export default function WeeklyPlanner({ weeklyPlans, currentWeek, onSelectVideo }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Weekly Schedule</h2>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {weeklyPlans.length} weeks total
          </span>
        </div>
      </div>

      {weeklyPlans.map((week, index) => (
        <div
          key={week.weekNumber}
          className={`p-4 rounded-lg ${
            index === currentWeek
              ? 'bg-blue-50 dark:bg-blue-900'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold dark:text-white">Week {week.weekNumber}</h3>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(week.totalDuration / 60)} hours
            </span>
          </div>

          <div className="space-y-2">
            {week.videos.map((video) => (
              <button
                key={video.id}
                onClick={() => onSelectVideo(video.id)}
                className="w-full text-left p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <p className="text-sm font-medium dark:text-white">{video.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(video.duration / 60)} minutes
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}