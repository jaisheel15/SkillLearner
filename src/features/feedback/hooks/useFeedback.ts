import { create } from 'zustand';
import { Feedback } from '../../../types';

interface FeedbackStore {
  feedback: Record<string, Feedback[]>;
  addFeedback: (feedback: Feedback) => void;
  getFeedbackForCourse: (courseId: string) => Feedback[];
}

export const useFeedback = create<FeedbackStore>((set, get) => ({
  feedback: {},
  addFeedback: (feedback) =>
    set((state) => ({
      feedback: {
        ...state.feedback,
        [feedback.courseId]: [
          ...(state.feedback[feedback.courseId] || []),
          feedback,
        ],
      },
    })),
  getFeedbackForCourse: (courseId) => get().feedback[courseId] || [],
}));