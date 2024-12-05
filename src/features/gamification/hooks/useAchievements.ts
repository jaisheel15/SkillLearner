import { useEffect } from 'react';
import { useProgress } from '../../../context/ProgressContext';

export function useAchievements() {
  const { progress, unlockAchievement } = useProgress();

  useEffect(() => {
    // Check for achievements based on progress
    const checkAchievements = () => {
      // First video achievement
      if (progress.watchedVideos.length === 1) {
        unlockAchievement('first-video');
      }

      // Study streak achievement
      if (progress.streakDays >= 7) {
        unlockAchievement('study-streak');
      }

      // Course completion achievement
      if (progress.completedCourses.length > 0) {
        unlockAchievement('course-master');
      }
    };

    checkAchievements();
  }, [progress.watchedVideos, progress.streakDays, progress.completedCourses]);

  return null;
}