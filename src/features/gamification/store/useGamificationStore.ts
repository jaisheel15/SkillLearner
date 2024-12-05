import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

interface GameLevel {
  id: number;
  name: string;
  requiredPoints: number;
  unlocked: boolean;
}

interface Forest {
  trees: number;
  nextTreeAt: number; // Minutes until next tree
}

interface GamificationState {
  points: number;
  level: number;
  streak: number;
  lastActivity: Date | null;
  forest: Forest;
  achievements: Achievement[];
  gameLevels: GameLevel[];
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  plantTree: () => void;
  unlockGameLevel: (levelId: number) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      points: 0,
      level: 1,
      streak: 0,
      lastActivity: null,
      forest: {
        trees: 0,
        nextTreeAt: 30, // Minutes until next tree
      },
      achievements: [
        {
          id: 'first-quiz',
          title: 'Quiz Master',
          description: 'Complete your first quiz',
          icon: '🎯',
        },
        {
          id: 'streak-3',
          title: 'Focus Champion',
          description: 'Maintain a 3-day study streak',
          icon: '🔥',
        },
        {
          id: 'forest-starter',
          title: 'Environmental Hero',
          description: 'Plant your first tree',
          icon: '🌱',
        },
      ],
      gameLevels: [
        {
          id: 1,
          name: 'Memory Match',
          requiredPoints: 100,
          unlocked: false,
        },
        {
          id: 2,
          name: 'Word Scramble',
          requiredPoints: 250,
          unlocked: false,
        },
        {
          id: 3,
          name: 'Code Puzzle',
          requiredPoints: 500,
          unlocked: false,
        },
      ],
      addPoints: (points) =>
        set((state) => {
          const newPoints = state.points + points;
          const newLevel = Math.floor(newPoints / 1000) + 1;
          
          // Check for game level unlocks
          const updatedGameLevels = state.gameLevels.map(level => ({
            ...level,
            unlocked: newPoints >= level.requiredPoints
          }));

          return {
            points: newPoints,
            level: newLevel,
            gameLevels: updatedGameLevels,
          };
        }),
      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
          lastActivity: new Date(),
        })),
      resetStreak: () =>
        set({
          streak: 0,
          lastActivity: new Date(),
        }),
      plantTree: () =>
        set((state) => ({
          forest: {
            trees: state.forest.trees + 1,
            nextTreeAt: 30,
          },
        })),
      unlockGameLevel: (levelId) =>
        set((state) => ({
          gameLevels: state.gameLevels.map((level) =>
            level.id === levelId ? { ...level, unlocked: true } : level
          ),
        })),
    }),
    {
      name: 'gamification-storage',
    }
  )
);