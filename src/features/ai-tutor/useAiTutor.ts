import { create } from 'zustand';
import { LearningStyle, Suggestion } from '../../types';
import { generateSuggestions } from '../../services/ai';

interface AiTutorState {
  learningStyle: LearningStyle | null;
  suggestions: Suggestion[];
  isLoading: boolean;
  updateLearningStyle: (style: LearningStyle) => void;
  requestSuggestions: () => Promise<void>;
}

export const useAiTutor = create<AiTutorState>((set, get) => ({
  learningStyle: null,
  suggestions: [],
  isLoading: false,

  updateLearningStyle: (style) => {
    set({ learningStyle: style });
    get().requestSuggestions();
  },

  requestSuggestions: async () => {
    const { learningStyle } = get();
    if (!learningStyle) return;

    set({ isLoading: true });
    try {
      const suggestions = await generateSuggestions(learningStyle);
      set({ suggestions });
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));