import { GoogleGenerativeAI } from '@google/generative-ai';
import { FlashCard, QuizQuestion, CourseOutline } from '../../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAIResponse(
  question: string,
  videoUrl?: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = question;
    if (videoUrl) {
      prompt = `Context: This question is about the video at ${videoUrl}.\n\nQuestion: ${question}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate response');
  }
}

export async function generateFlashcards(content: string): Promise<FlashCard[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create 5 comprehensive flashcards from this content. Each flashcard should test key concepts.
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

export async function generateQuizQuestions(content: string): Promise<QuizQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create 5 multiple-choice questions based on this content. Format as JSON array with objects containing:
    - id (string, use "question-{number}")
    - question (string)
    - options (array of 4 strings)
    - correctAnswer (number 0-3)
    - explanation (string)
    
    Content: ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const questions = JSON.parse(text);
      return Array.isArray(questions) ? questions : [];
    } catch (error) {
      console.error('Failed to parse quiz questions:', error);
      return [];
    }
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    return [];
  }
}

export async function generateCourseOutline(
  topic: string,
  resources: string[]
): Promise<CourseOutline> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create a detailed course outline for ${topic}. Include:
    1. A comprehensive course description (2-3 sentences)
    2. 5-7 main sections that cover the topic progressively
    3. For each section, include detailed content points

    Use this format:
    {
      "description": "Course overview here",
      "sections": [
        {
          "title": "Section title",
          "content": "Detailed section content"
        }
      ]
    }

    Consider these resources while creating the outline:
    ${resources.join('\n')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse course outline:', error);
      return {
        description: `Complete ${topic} course covering fundamental concepts and practical applications.`,
        sections: [
          {
            title: `Introduction to ${topic}`,
            content: `Learn the basics of ${topic} including core concepts and principles.`,
          },
        ],
      };
    }
  } catch (error) {
    console.error('Error generating course outline:', error);
    return {
      description: `Comprehensive ${topic} course for all skill levels.`,
      sections: [
        {
          title: `Getting Started with ${topic}`,
          content: `Introduction to ${topic} fundamentals.`,
        },
      ],
    };
  }
}