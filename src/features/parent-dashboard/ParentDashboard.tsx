import React from 'react';
import { UserSquare2, Target, Calendar, BookOpen } from 'lucide-react';
import StudentProgress from './StudentProgress';
import LearningGoals from './LearningGoals';
import StudySchedule from './StudySchedule';
import ActivityFeed from './ActivityFeed';

export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserSquare2 className="w-8 h-8 text-purple-500" />
              <h1 className="text-xl font-bold dark:text-white">Parent Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StudentProgress />
          <LearningGoals />
          <StudySchedule />
        </div>

        <div className="mt-8">
          <ActivityFeed />
        </div>
      </main>
    </div>
  );
}