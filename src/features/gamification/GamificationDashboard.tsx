import React from 'react';
import XPProgress from './XPProgress';
import DailyStreak from './DailyStreak';
import MilestoneTracker from './MilestoneTracker';
import { useProgress } from '../../context/ProgressContext';
import { useAchievements } from './hooks/useAchievements';

export default function GamificationDashboard() {
  const { progress } = useProgress();
  useAchievements(); // Hook to check and update achievements

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <XPProgress />
        <DailyStreak />
      </div>
      <MilestoneTracker achievements={progress.achievements} />
    </div>
  );
}