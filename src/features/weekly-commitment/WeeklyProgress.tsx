import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface WeeklyProgressProps {
  targetHours: number;
  completedHours: number;
  weekNumber: number;
}

export default function WeeklyProgress({ targetHours, completedHours, weekNumber }: WeeklyProgressProps) {
  const progress = (completedHours / targetHours) * 100;
  const isOnTrack = completedHours >= targetHours;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Week {weekNumber} Progress</h3>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {completedHours}/{targetHours} hours
          </span>
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-200">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-gray-700">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {isOnTrack ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-600 dark:text-green-400">
              On track with your weekly goal!
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-yellow-600 dark:text-yellow-400">
              {targetHours - completedHours} more hours needed this week
            </span>
          </>
        )}
      </div>
    </div>
  );
}