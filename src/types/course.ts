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