import React, { createContext, useContext, useState, useEffect } from 'react';
import { Achievement, UserProgress } from '../../types';

interface GamificationContextType {
  progress: UserProgress;
  addPoints: (points: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'footprints',
    requiredPoints: 10,
    unlocked: false,
    progress: 0,
    category: 'learning'
  },
  {
    id: 'week-streak',
    title: 'Consistency is Key',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    requiredPoints: 7,
    unlocked: false,
    progress: 0,
    category: 'engagement'
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: 'brain',
    requiredPoints: 5,
    unlocked: false,
    progress: 0,
    category: 'milestone'
  }
];

const GamificationContext = createContext<GamificationContextType>({
  progress: {
    points: 0,
    level: 1,
    achievements: defaultAchievements,
    completedCourses: [],
    watchedVideos: [],
    streakDays: 0,
    lastLoginDate: new Date().toISOString()
  },
  addPoints: () => {},
  unlockAchievement: () => {},
  updateStreak: () => {}
});

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
      points: 0,
      level: 1,
      achievements: defaultAchievements,
      completedCourses: [],
      watchedVideos: [],
      streakDays: 0,
      lastLoginDate: new Date().toISOString()
    };
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const addPoints = (points: number) => {
    setProgress(prev => ({
      ...prev,
      points: prev.points + points,
      level: Math.floor((prev.points + points) / 1000) + 1
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

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = new Date(progress.lastLoginDate).toISOString().split('T')[0];
    
    if (today !== lastLogin) {
      const isConsecutiveDay = 
        new Date(today).getTime() - new Date(lastLogin).getTime() <= 86400000;

      setProgress(prev => ({
        ...prev,
        streakDays: isConsecutiveDay ? prev.streakDays + 1 : 1,
        lastLoginDate: today
      }));
    }
  };

  return (
    <GamificationContext.Provider value={{ progress, addPoints, unlockAchievement, updateStreak }}>
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => useContext(GamificationContext);