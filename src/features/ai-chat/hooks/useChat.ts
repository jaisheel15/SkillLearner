import { useState } from 'react';
import { ChatMessage } from '../types';
import { generateAIResponse } from '../../../services/api/gemini';
import { getVideoTranscript } from '../../../services/api/youtube';
import { extractVideoId } from '../../../services/utils/youtube';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string, videoUrl?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        isBot: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // If we have a video URL, get the transcript first
      let contextualContent = content;
      if (videoUrl) {
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
          const transcript = await getVideoTranscript(videoId);
          if (transcript?.transcript) {
            contextualContent = `Context from video transcript:\n${transcript.transcript}\n\nUser question: ${content}`;
          }
        }
      }

      // Generate AI response
      const response = await generateAIResponse(contextualContent, videoUrl);

      // Add bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Unable to get a response. Please try again.';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
}