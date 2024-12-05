import { GoogleGenerativeAI } from '@google/generative-ai';
import { FlashCard } from '../../types';
import { GEMINI_API_KEY } from '../config';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateFlashcards(content: string): Promise<FlashCard[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create 10 comprehensive flashcards from this content. Each flashcard should test key concepts.
    Format as JSON array with objects containing:
    - id (string, use "card-{number}")
    - front (concise question or concept)
    - back (detailed explanation)
    
    Content: ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const cards = JSON.parse(text);
      return Array.isArray(cards) ? cards : [];
    } catch (error) {
      console.error('Failed to parse flashcards:', error);
      return [];
    }
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return [];
  }
}