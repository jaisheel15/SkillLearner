import React, { useState } from 'react';
import { UserPreferences } from '../../types';
import { Target, Book, Lightbulb, Brain } from 'lucide-react';

interface Props {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
  onClose: () => void;
}

export default function LearningPathForm({ preferences, onSave, onClose }: Props) {
  const [formData, setFormData] = useState({
    difficulty: preferences.difficulty,
    interests: preferences.interests.join(', '),
    learningGoals: preferences.learningGoals.join(', '),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...preferences,
      difficulty: formData.difficulty,
      interests: formData.interests.split(',').map(i => i.trim()),
      learningGoals: formData.learningGoals.split(',').map(g => g.trim()),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold dark:text-white">Customize Your Learning Path</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Skill Level
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="beginner">Beginner - Just starting out</option>
            <option value="intermediate">Intermediate - Some experience</option>
            <option value="advanced">Advanced - Looking for challenges</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Interests
          </label>
          <input
            type="text"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            placeholder="e.g., Web Development, Machine Learning, Mobile Apps"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Separate multiple interests with commas
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Book className="w-5 h-5 text-green-500" />
            Learning Goals
          </label>
          <textarea
            value={formData.learningGoals}
            onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
            placeholder="e.g., Build a web app, Learn Python basics, Master data structures"
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Separate multiple goals with commas
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Learning Preferences
          </button>
        </div>
      </form>
    </div>
  );
}