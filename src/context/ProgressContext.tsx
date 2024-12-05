import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, Achievement } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  addPoints: (points: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (videoId: string) => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-video',
    title: 'First Steps',
    description: 'Watch your first video',
    icon: 'play',
    requiredPoints: 10,
    unlocked: false,
    progress: 0,
    category: 'learning'
  },
  {
    id: 'study-streak',
    title: 'Consistent Learner',
    description: 'Maintain a 7-day study streak',
    icon: 'flame',
    requiredPoints: 7,
    unlocked: false,
    progress: 0,
    category: 'engagement'
  },
  {
    id: 'course-master',
    title: 'Course Master',
    description: 'Complete an entire course',
    icon: 'trophy',
    requiredPoints: 100,
    unlocked: false,
    progress: 0,
    category: 'milestone'
  }
];

const defaultProgress: UserProgress = {
  points: 0,
  level: 1,
  achievements: defaultAchievements,
  completedCourses: [],
  watchedVideos: [],
  streakDays: 0,
  lastLoginDate: new Date().toISOString()
};

const ProgressContext = createContext<ProgressContextType>({
  progress: defaultProgress,
  addPoints: () => {},
  unlockAchievement: () => {},
  updateProgress: () => {}
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastLoginDate.split('T')[0] !== today) {
      const lastLogin = new Date(progress.lastLoginDate);
      const isConsecutiveDay = 
        new Date(today).getTime() - lastLogin.getTime() <= 86400000;

      setProgress(prev => ({
        ...prev,
        streakDays: isConsecutiveDay ? prev.streakDays + 1 : 1,
        lastLoginDate: today
      }));
    }
  }, []);

  const addPoints = (points: number) => {
    setProgress(prev => ({
      ...prev,
      points: prev.points + points,
      level: Math.floor(prev.points / 1000) + 1
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true }
          : achievement
      )
    }));
  };

  const updateProgress = (videoId: string) => {
    if (!progress.watchedVideos.includes(videoId)) {
      addPoints(10);
      setProgress(prev => ({
        ...prev,
        watchedVideos: [...prev.watchedVideos, videoId]
      }));

      // Check for achievements
      if (progress.watchedVideos.length === 0) {
        unlockAchievement('first-video');
      }
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, addPoints, unlockAchievement, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);