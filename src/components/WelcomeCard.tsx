import React from 'react';
import { useUser } from '../context/UserContext';
import { Rocket, Target, Clock } from 'lucide-react';

export default function WelcomeCard() {
  const { preferences } = useUser();
  const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Good {timeOfDay}, {preferences.name}!
          </h1>
          <p className="text-blue-100">Ready to continue your learning journey?</p>
          
          {preferences.lastVisited.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-blue-100 mb-2">Continue where you left off:</p>
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                <Clock className="w-4 h-4" />
                {preferences.lastVisited[0]}
              </button>
            </div>
          )}
        </div>
        
        <div className="hidden md:block">
          <Rocket className="w-16 h-16 text-white opacity-75" />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm text-blue-100">Daily Goal</p>
              <p className="text-lg font-semibold text-white">2/3 hours completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm text-blue-100">Study Streak</p>
              <p className="text-lg font-semibold text-white">5 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}