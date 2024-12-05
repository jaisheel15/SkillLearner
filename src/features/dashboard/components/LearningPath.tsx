import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

export default function LearningPath() {
  const milestones = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Master the basics of React development',
      progress: 60,
    },
    {
      id: '2',
      title: 'TypeScript Essentials',
      description: 'Learn type-safe JavaScript development',
      progress: 30,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Learning Path</h2>
        <Compass className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium dark:text-white">{milestone.title}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {milestone.progress}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 px-4 py-2 flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600 font-medium">
        View Full Path
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}