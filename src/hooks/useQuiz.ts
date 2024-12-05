import { create } from 'zustand';
import { QuizQuestion } from '../types';

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Map<string, number>;
  score: number;
  setQuestions: (questions: QuizQuestion[]) => void;
  submitAnswer: (questionId: string, answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  isComplete: () => boolean;
}

export const useQuiz = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: new Map(),
  score: 0,

  setQuestions: (questions) => set({
    questions,
    currentIndex: 0,
    answers: new Map(),
    score: 0
  }),

  submitAnswer: (questionId, answerIndex) => set((state) => {
    const newAnswers = new Map(state.answers);
    newAnswers.set(questionId, answerIndex);
    
    const question = state.questions.find(q => q.id === questionId);
    const isCorrect = question?.correctAnswer === answerIndex;
    
    return {
      answers: newAnswers,
      score: isCorrect ? state.score + 1 : state.score
    };
  }),

  nextQuestion: () => set((state) => ({
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1)
  })),

  resetQuiz: () => set({
    currentIndex: 0,
    answers: new Map(),
    score: 0
  }),

  isComplete: () => {
    const state = get();
    return state.answers.size === state.questions.length;
  }
}));