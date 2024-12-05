import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FlashCard } from '../../../types';

interface FlashcardProgress {
  masteredCards: Set<string>;
  reviewQueue: string[];
  lastReviewDate?: string;
}

interface FlashcardProgressStore extends FlashcardProgress {
  markMastered: (cardId: string) => void;
  markForReview: (cardId: string) => void;
  resetProgress: () => void;
  updateReviewDate: () => void;
}

export const useFlashcardProgress = create<FlashcardProgressStore>()(
  persist(
    (set) => ({
      masteredCards: new Set<string>(),
      reviewQueue: [],
      lastReviewDate: undefined,

      markMastered: (cardId) =>
        set((state) => {
          const newMastered = new Set(state.masteredCards);
          newMastered.add(cardId);
          const newQueue = state.reviewQueue.filter((id) => id !== cardId);
          return { masteredCards: newMastered, reviewQueue: newQueue };
        }),

      markForReview: (cardId) =>
        set((state) => {
          if (!state.reviewQueue.includes(cardId)) {
            return { reviewQueue: [...state.reviewQueue, cardId] };
          }
          return state;
        }),

      resetProgress: () =>
        set({ masteredCards: new Set(), reviewQueue: [], lastReviewDate: undefined }),

      updateReviewDate: () =>
        set({ lastReviewDate: new Date().toISOString() }),
    }),
    {
      name: 'flashcard-progress',
    }
  )
);