import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  front: string;
  back: string;
  isFlipped: boolean;
  isMastered: boolean;
  onClick: () => void;
}

export default function FlashcardCard({
  front,
  back,
  isFlipped,
  isMastered,
  onClick,
}: Props) {
  return (
    <div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div className="text-xl font-semibold dark:text-white">{front}</div>
          {isMastered && (
            <div className="absolute top-4 right-4">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        <div className="absolute w-full h-full backface-hidden bg-blue-50 dark:bg-gray-700 rounded-xl shadow-lg p-6 rotate-y-180">
          <div className="text-lg dark:text-white">{back}</div>
        </div>
      </div>
    </div>
  );
}