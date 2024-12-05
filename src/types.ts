// ... existing types ...

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

// ... rest of the types ...