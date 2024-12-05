import { create } from 'zustand';
import { Reflection } from '../../../types';

interface ReflectionStore {
  reflections: Reflection[];
  addReflection: (reflection: Reflection) => void;
  getReflectionsByDate: (date: Date) => Reflection[];
}

export const useReflections = create<ReflectionStore>((set, get) => ({
  reflections: [],
  addReflection: (reflection) =>
    set((state) => ({
      reflections: [reflection, ...state.reflections],
    })),
  getReflectionsByDate: (date) =>
    get().reflections.filter(
      (reflection) =>
        reflection.date.toDateString() === date.toDateString()
    ),
}));