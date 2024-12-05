import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Check } from 'lucide-react';

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onFlip: () => void;
  onMastered: () => void;
  isFlipped: boolean;
  isMastered: boolean;
  currentIndex: number;
  totalCards: number;
}

export default function FlashcardControls({
  onPrevious,
  onNext,
  onFlip,
  onMastered,
  isFlipped,
  isMastered,
  currentIndex,
  totalCards,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400"
          aria-label="Previous card"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentIndex + 1} / {totalCards}
        </span>
        
        <button
          onClick={onNext}
          className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400"
          aria-label="Next card"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onFlip}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <RotateCw className="w-4 h-4" />
          Flip
        </button>
        
        {!isMastered && !isFlipped && (
          <button
            onClick={onMastered}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Check className="w-4 h-4" />
            Mark as Mastered
          </button>
        )}
      </div>
    </div>
  );
}