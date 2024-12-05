export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const validateConfig = () => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured');
  }
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }
};