import React from 'react';
import { Trophy } from 'lucide-react';

interface Props {
  masteredCount: number;
  totalCards: number;
}

export default function FlashcardProgress({ masteredCount, totalCards }: Props) {
  const progress = (masteredCount / totalCards) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-medium dark:text-white">
            {masteredCount} of {totalCards} Mastered
          </span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}