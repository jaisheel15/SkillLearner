import React from 'react';
import { Trophy } from 'lucide-react';
import QuizCard from './QuizCard';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizQuestion } from '../../types';
import Confetti from 'react-confetti';

interface Props {
  content?: string; // Make content optional
}

export default function QuizGenerator({ content }: Props) {
  const {
    questions,
    currentIndex,
    answers,
    score,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    isComplete,
    setQuestions
  } = useQuiz();

  // Generate default questions if no content is provided
  React.useEffect(() => {
    if (!questions.length) {
      const defaultQuestions: QuizQuestion[] = [
        {
          id: 'q1',
          question: 'What is React?',
          options: [
            'A JavaScript library for building user interfaces',
            'A database management system',
            'A programming language',
            'An operating system'
          ],
          correctAnswer: 0,
          explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.'
        },
        {
          id: 'q2',
          question: 'What is JSX?',
          options: [
            'A JavaScript extension for SQL',
            'A syntax extension for JavaScript',
            'A new programming language',
            'A database query language'
          ],
          correctAnswer: 1,
          explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
        }
      ];
      setQuestions(defaultQuestions);
    }
  }, []);

  if (questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">
          Loading quiz questions...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const userAnswer = answers.get(currentQuestion.id);
  const quizComplete = isComplete();

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    const showConfetti = percentage >= 80;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        {showConfetti && <Confetti />}
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4 dark:text-white">Quiz Complete!</h3>
        <p className="text-lg mb-2 dark:text-gray-200">
          Your Score: {score}/{questions.length} ({Math.round(percentage)}%)
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {percentage >= 80
            ? 'Excellent work! You\'ve mastered this section!'
            : 'Keep practicing to improve your score!'}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">
          Question {currentIndex + 1} of {questions.length}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Score: {score}/{answers.size}
        </span>
      </div>

      <QuizCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        explanation={currentQuestion.explanation}
        onAnswer={(index) => {
          submitAnswer(currentQuestion.id, index);
          setTimeout(nextQuestion, 1500);
        }}
        userAnswer={userAnswer}
      />
    </div>
  );
}