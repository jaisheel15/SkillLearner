import React, { useState } from 'react';
import { Target, Plus, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Goal } from '../../types';

export default function LearningGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    deadline: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleAddGoal = () => {
    if (!newGoal.title) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      deadline: new Date(newGoal.deadline),
      completed: false,
      createdAt: new Date(),
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', deadline: format(new Date(), 'yyyy-MM-dd') });
    setShowAddGoal(false);
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold dark:text-white">Learning Goals</h2>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showAddGoal ? (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Enter goal title..."
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddGoal(false)}
              className="px-3 py-1 text-gray-600 dark:text-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGoal}
              className="px-3 py-1 bg-green-500 text-white rounded-lg"
            >
              Add Goal
            </button>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <button
              onClick={() => toggleGoal(goal.id)}
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 ${
                goal.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {goal.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-1">
              <p className={`font-medium dark:text-white ${
                goal.completed ? 'line-through text-gray-500' : ''
              }`}>
                {goal.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due: {format(goal.deadline, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}