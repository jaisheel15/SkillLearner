import { useState } from 'react';
import { Course } from '../types';
import { generateCourse } from '../services/api/courseGenerator';

export function useCourseGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCourseContent = async (topic: string): Promise<Course | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const course = await generateCourse(topic);
      if (!course) {
        throw new Error('Failed to generate course content');
      }
      return course;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate course';
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateCourseContent,
    isGenerating,
    error
  };
}