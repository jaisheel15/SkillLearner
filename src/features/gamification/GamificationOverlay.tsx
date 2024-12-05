import React from 'react';
import AchievementPopup from './components/AchievementPopup';
import GameUnlock from './components/GameUnlock';
import { useGamificationStore } from './store/useGamificationStore';

export default function GamificationOverlay() {
  const [achievement, setAchievement] = React.useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

  const { achievements, points, streak } = useGamificationStore();

  React.useEffect(() => {
    // Check for achievements based on points and streak
    const checkAchievements = () => {
      if (points >= 100 && !achievements.find(a => a.id === 'first-quiz')?.unlockedAt) {
        setAchievement({
          title: 'Quiz Master',
          description: 'Complete your first quiz',
          icon: '🎯'
        });
      } else if (streak >= 3 && !achievements.find(a => a.id === 'streak-3')?.unlockedAt) {
        setAchievement({
          title: 'Focus Champion',
          description: 'Maintain a 3-day study streak',
          icon: '🔥'
        });
      }
    };

    checkAchievements();
  }, [points, streak, achievements]);

  return (
    <>
      {achievement && (
        <AchievementPopup
          {...achievement}
          onClose={() => setAchievement(null)}
        />
      )}
      <GameUnlock />
    </>
  );
}