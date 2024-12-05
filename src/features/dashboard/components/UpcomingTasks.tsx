import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function UpcomingTasks() {
  const tasks = [
    {
      id: '1',
      title: 'Complete React Fundamentals',
      dueDate: new Date(),
      completed: false,
    },
    {
      id: '2',
      title: 'Practice TypeScript Exercises',
      dueDate: new Date(),
      completed: false,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Upcoming Tasks</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-5 h-5 ${
                task.completed ? 'text-green-500' : 'text-gray-400'
              }`} />
              <div>
                <div className="font-medium dark:text-white">{task.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Due {format(task.dueDate, 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}