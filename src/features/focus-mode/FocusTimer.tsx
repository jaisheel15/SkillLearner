import React, { useState, useEffect } from 'react';
import { Timer, Bell, Pause, Play } from 'lucide-react';

interface Props {
  onBreakStart: () => void;
  onBreakEnd: () => void;
}

export default function FocusTimer({ onBreakStart, onBreakEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
        onBreakStart();
      } else {
        setTimeLeft(25 * 60); // Reset to 25 minutes
        setIsBreak(false);
        onBreakEnd();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, onBreakStart, onBreakEnd]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold dark:text-white">
            {isBreak ? 'Break Time' : 'Focus Timer'}
          </h3>
        </div>
        {timeLeft === 0 && <Bell className="w-5 h-5 text-yellow-500 animate-bounce" />}
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold mb-4 dark:text-white">
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {timeLeft === 0 ? 'Start Next Session' : 'Start Focus Time'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}