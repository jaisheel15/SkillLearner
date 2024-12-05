import { useState, useEffect } from 'react';
import { FlashCard, QuizQuestion, VideoTranscript } from '../types';
import { generateFlashcards, generateQuizQuestions } from '../services/api/gemini';
import { getVideoTranscript } from '../services/api/youtube';

export function useVideoContent(videoId: string) {
  const [transcript, setTranscript] = useState<VideoTranscript | null>(null);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!videoId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const videoTranscript = await getVideoTranscript(videoId);
        if (!videoTranscript?.transcript) {
          throw new Error('No transcript available for this video');
        }
        
        setTranscript(videoTranscript);
        
        const [cards, questions] = await Promise.all([
          generateFlashcards(videoTranscript.transcript),
          generateQuizQuestions(videoTranscript.transcript)
        ]);
        
        setFlashcards(cards);
        setQuizQuestions(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [videoId]);

  return {
    transcript,
    flashcards,
    quizQuestions,
    isLoading,
    error
  };
}