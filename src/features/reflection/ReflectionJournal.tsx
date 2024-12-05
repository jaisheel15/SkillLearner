import React, { useState } from 'react';
import { Book, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Reflection } from '../../types';

export default function ReflectionJournal() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newReflection, setNewReflection] = useState({
    learnings: '',
    challenges: '',
    goals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReflection.learnings || newReflection.challenges || newReflection.goals) {
      const reflection: Reflection = {
        id: Date.now().toString(),
        date: new Date(),
        ...newReflection
      };
      setReflections([reflection, ...reflections]);
      setNewReflection({ learnings: '', challenges: '', goals: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Learning Journal</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          New Entry
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                What did you learn today?
              </label>
              <textarea
                value={newReflection.learnings}
                onChange={(e) => setNewReflection({ ...newReflection, learnings: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Share your key learnings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                What challenges did you face?
              </label>
              <textarea
                value={newReflection.challenges}
                onChange={(e) => setNewReflection({ ...newReflection, challenges: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Describe any difficulties or obstacles..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Goals for next session
              </label>
              <textarea
                value={newReflection.goals}
                onChange={(e) => setNewReflection({ ...newReflection, goals: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="What do you want to achieve next?"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reflections.map((reflection) => (
          <div
            key={reflection.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {format(reflection.date, 'MMMM d, yyyy')}
              </span>
            </div>

            {reflection.learnings && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Learnings</h4>
                <p className="text-gray-600 dark:text-gray-300">{reflection.learnings}</p>
              </div>
            )}

            {reflection.challenges && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Challenges</h4>
                <p className="text-gray-600 dark:text-gray-300">{reflection.challenges}</p>
              </div>
            )}

            {reflection.goals && (
              <div>
                <h4 className="font-medium mb-2">Goals</h4>
                <p className="text-gray-600 dark:text-gray-300">{reflection.goals}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}