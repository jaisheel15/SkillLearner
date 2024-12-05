import { create } from 'zustand';
import { FlashCard } from '../types';

interface FlashcardState {
  cards: FlashCard[];
  currentIndex: number;
  mastered: Set<string>;
  setCards: (cards: FlashCard[]) => void;
  nextCard: () => void;
  previousCard: () => void;
  markMastered: (cardId: string) => void;
  resetProgress: () => void;
}

export const useFlashcards = create<FlashcardState>((set) => ({
  cards: [],
  currentIndex: 0,
  mastered: new Set(),
  
  setCards: (cards) => set({ 
    cards, 
    currentIndex: 0, 
    mastered: new Set() 
  }),
  
  nextCard: () => set((state) => ({
    currentIndex: (state.currentIndex + 1) % state.cards.length
  })),
  
  previousCard: () => set((state) => ({
    currentIndex: state.currentIndex === 0 
      ? state.cards.length - 1 
      : state.currentIndex - 1
  })),
  
  markMastered: (cardId) => set((state) => {
    const newMastered = new Set(state.mastered);
    newMastered.add(cardId);
    return { mastered: newMastered };
  }),
  
  resetProgress: () => set({ mastered: new Set() })
}));