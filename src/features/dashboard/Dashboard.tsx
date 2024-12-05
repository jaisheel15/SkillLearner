import React from 'react';
import ProgressOverview from './components/ProgressOverview';
import UpcomingTasks from './components/UpcomingTasks';
import LearningPath from './components/LearningPath';
import { useProgress } from '../../context/ProgressContext';

export default function Dashboard() {
  const { progress } = useProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Your Learning Journey
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProgressOverview progress={progress} />
          <UpcomingTasks />
        </div>
        <div>
          <LearningPath />
        </div>
      </div>
    </div>
  );
}