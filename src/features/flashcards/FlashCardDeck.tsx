import React, { useState } from 'react';
import { FlashCard } from '../../types';
import { useFlashcardProgress } from './hooks/useFlashcardProgress';
import FlashcardCard from './components/FlashcardCard';
import FlashcardControls from './components/FlashcardControls';
import FlashcardProgress from './components/FlashcardProgress';

interface Props {
  content?: string; // Make content optional
}

export default function FlashCardDeck({ content }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { masteredCards, markMastered } = useFlashcardProgress();

  // Default flashcards if no content is provided
  const defaultCards: FlashCard[] = [
    {
      id: 'card-1',
      front: 'What is React?',
      back: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components that manage their own state.'
    },
    {
      id: 'card-2',
      front: 'What are React Hooks?',
      back: 'Hooks are functions that allow you to "hook into" React state and lifecycle features from function components. They let you use state and other React features without writing a class component.'
    }
  ];

  const cards = defaultCards;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleMastered = () => {
    const currentCard = cards[currentIndex];
    markMastered(currentCard.id);
    handleNext();
  };

  if (cards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">
          Loading flashcards...
        </p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="space-y-6">
      <FlashcardProgress
        masteredCount={masteredCards.size}
        totalCards={cards.length}
      />

      <FlashcardCard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        isMastered={masteredCards.has(currentCard.id)}
        onClick={handleFlip}
      />

      <FlashcardControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFlip={handleFlip}
        onMastered={handleMastered}
        isFlipped={isFlipped}
        isMastered={masteredCards.has(currentCard.id)}
        currentIndex={currentIndex}
        totalCards={cards.length}
      />
    </div>
  );
}