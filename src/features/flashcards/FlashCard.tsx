import React, { useState } from 'react';
import { RotateCw, Check } from 'lucide-react';

interface Props {
  front: string;
  back: string;
  isMastered: boolean;
  onMastered: () => void;
  onFlip: () => void;
}

export default function FlashCard({ front, back, isMastered, onMastered, onFlip }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };

  return (
    <div className="relative w-full h-64 cursor-pointer perspective-1000">
      <div 
        className={`relative w-full h-full duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div className="text-xl font-semibold dark:text-white">{front}</div>
          <div className="flex justify-between items-center">
            {isMastered && (
              <span className="text-green-500 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Mastered
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute w-full h-full backface-hidden bg-blue-50 dark:bg-gray-700 rounded-xl shadow-lg p-6 rotate-y-180 flex flex-col justify-between">
          <div className="text-lg dark:text-white">{back}</div>
          <div className="flex justify-end gap-2">
            {!isMastered && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMastered();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Mark as Mastered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}