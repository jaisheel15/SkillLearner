import React from 'react';
import { RefreshCw, Video, Book, Trophy } from 'lucide-react';
import { Suggestion } from '../../types';

interface Props {
  suggestions: Suggestion[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function PersonalizedSuggestions({ suggestions, isLoading, onRefresh }: Props) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-white">
          Personalized Suggestions
        </h3>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-start gap-3">
            {suggestion.type === 'video' && <Video className="w-5 h-5 text-blue-500" />}
            {suggestion.type === 'resource' && <Book className="w-5 h-5 text-green-500" />}
            {suggestion.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-500" />}
            
            <div>
              <h4 className="font-medium dark:text-white">{suggestion.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {suggestion.description}
              </p>
              {suggestion.action && (
                <button className="mt-2 text-sm text-purple-500 hover:text-purple-600">
                  {suggestion.action}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}