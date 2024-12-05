import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswer: (index: number) => void;
  userAnswer?: number;
}

export default function QuizCard({
  question,
  options,
  correctAnswer,
  explanation,
  onAnswer,
  userAnswer
}: Props) {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index: number) => {
    if (userAnswer === undefined) {
      onAnswer(index);
      setShowExplanation(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold dark:text-white">{question}</h3>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={userAnswer !== undefined}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              userAnswer === undefined
                ? 'hover:bg-gray-50 dark:hover:bg-gray-700'
                : userAnswer === index
                ? index === correctAnswer
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
                : index === correctAnswer
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-gray-50 dark:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex-1 dark:text-white">{option}</span>
              {userAnswer !== undefined && index === correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {userAnswer === index && index !== correctAnswer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-100">{explanation}</p>
        </div>
      )}
    </div>
  );
}