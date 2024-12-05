import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FocusTimer from './FocusTimer';

interface Props {
  children: React.ReactNode;
}

export default function FocusMode({ children }: Props) {
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [hideControls, setHideControls] = useState(false);

  const handleBreakStart = () => {
    setIsBreakTime(true);
  };

  const handleBreakEnd = () => {
    setIsBreakTime(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-end mb-4 gap-4">
        <button
          onClick={() => setHideControls(!hideControls)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {hideControls ? (
            <>
              <Eye className="w-4 h-4" />
              Show Controls
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Controls
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className={isBreakTime ? 'opacity-50 pointer-events-none' : ''}>
            {children}
          </div>
        </div>
        
        <div className={`space-y-6 ${hideControls ? 'hidden' : ''}`}>
          <FocusTimer
            onBreakStart={handleBreakStart}
            onBreakEnd={handleBreakEnd}
          />
          
          {isBreakTime && (
            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                Time for a break! Step away from the screen and stretch.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}