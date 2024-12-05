import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LearningStyle } from '../../types';

interface Props {
  onComplete: (style: LearningStyle) => void;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    text: "When learning something new, I prefer to:",
    options: [
      { value: 'visual', text: "See diagrams and visual demonstrations" },
      { value: 'auditory', text: "Listen to explanations and discussions" },
      { value: 'kinesthetic', text: "Try it out hands-on" },
      { value: 'reading', text: "Read detailed explanations" }
    ]
  },
  {
    id: 2,
    text: "I remember information best when:",
    options: [
      { value: 'visual', text: "I see it written or drawn" },
      { value: 'auditory', text: "I hear it explained" },
      { value: 'kinesthetic', text: "I perform the task myself" },
      { value: 'reading', text: "I read and take notes" }
    ]
  },
  {
    id: 3,
    text: "When solving problems, I prefer to:",
    options: [
      { value: 'visual', text: "Visualize the solution" },
      { value: 'auditory', text: "Talk through the steps" },
      { value: 'kinesthetic', text: "Use trial and error" },
      { value: 'reading', text: "Follow written instructions" }
    ]
  }
];

export default function LearningStyleQuiz({ onComplete, onClose }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant learning style
      const styles = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const dominantStyle = Object.entries(styles).reduce((a, b) => 
        styles[a[0]] > styles[b[0]] ? a : b
      )[0] as LearningStyle;
      
      onComplete(dominantStyle);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">Learning Style Quiz</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold dark:text-white mb-2">
              {questions[currentQuestion].text}
            </h4>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestion
                      ? 'bg-purple-500'
                      : index < currentQuestion
                      ? 'bg-purple-200'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}