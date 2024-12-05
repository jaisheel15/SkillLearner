export interface FlashCard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseOutline {
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videos: Video[];
  totalDuration: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  transcript: string | null;
  completed: boolean;
}

export interface VideoTranscript {
  videoId: string;
  transcript: string;
  language: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  author: string;
  upvotes: number;
  dateAdded: Date;
}

export interface Feedback {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export interface Reflection {
  id: string;
  date: Date;
  learnings: string;
  challenges: string;
  goals: string;
}