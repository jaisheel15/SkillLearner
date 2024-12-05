import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

interface Props {
  mode: 'pomodoro' | 'ultradian';
  onModeChange: (mode: 'pomodoro' | 'ultradian') => void;
}

export default function PomodoroTimer({ mode, onModeChange }: Props) {
  const [timeLeft, setTimeLeft] = useState(mode === 'pomodoro' ? 25 * 60 : 90 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? (mode === 'pomodoro' ? 25 * 60 : 90 * 60) : 5 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(mode === 'pomodoro' ? 25 * 60 : 90 * 60);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Focus Timer</h3>
          <p className="text-sm text-gray-600">
            {isBreak ? 'Break Time!' : 'Focus Session'}
          </p>
        </div>
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value as 'pomodoro' | 'ultradian')}
          className="px-3 py-1 border rounded-lg text-sm"
        >
          <option value="pomodoro">Pomodoro (25min)</option>
          <option value="ultradian">Ultradian (90min)</option>
        </select>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isBreak && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Coffee className="w-5 h-5" />
          <span className="text-sm">Take a short break!</span>
        </div>
      )}
    </div>
  );
}