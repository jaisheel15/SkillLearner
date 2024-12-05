import React, { useState } from 'react';
import { Brain, BookOpen, Target, Lightbulb } from 'lucide-react';
import { useAiTutor } from './useAiTutor';
import { LearningStyle } from '../../types';
import LearningStyleQuiz from './LearningStyleQuiz';
import PersonalizedSuggestions from './PersonalizedSuggestions';

export default function AiTutorPanel() {
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);
  const { 
    learningStyle,
    suggestions,
    isLoading,
    updateLearningStyle,
    requestSuggestions
  } = useAiTutor();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold dark:text-white">AI Learning Assistant</h2>
      </div>

      {!learningStyle ? (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold dark:text-white mb-2">
            Discover Your Learning Style
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Take a quick quiz to get personalized learning recommendations
          </p>
          <button
            onClick={() => setShowStyleQuiz(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Learning Style</p>
              <h3 className="text-lg font-semibold dark:text-white">{learningStyle}</h3>
            </div>
            <button
              onClick={() => setShowStyleQuiz(true)}
              className="text-sm text-purple-500 hover:text-purple-600"
            >
              Retake Quiz
            </button>
          </div>

          <PersonalizedSuggestions 
            suggestions={suggestions}
            isLoading={isLoading}
            onRefresh={() => requestSuggestions()}
          />
        </div>
      )}

      {showStyleQuiz && (
        <LearningStyleQuiz
          onComplete={(style) => {
            updateLearningStyle(style);
            setShowStyleQuiz(false);
          }}
          onClose={() => setShowStyleQuiz(false)}
        />
      )}
    </div>
  );
}