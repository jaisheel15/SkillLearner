import React from 'react';
import { Trophy, CheckCircle, Circle } from 'lucide-react';
import { Achievement } from '../../types';

interface Props {
  achievements: Achievement[];
}

export default function MilestoneTracker({ achievements }: Props) {
  const categories = {
    learning: 'Learning Progress',
    engagement: 'Community Engagement',
    milestone: 'Major Milestones'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold dark:text-white">Achievements</h3>
      </div>

      <div className="space-y-6">
        {(Object.entries(categories) as [keyof typeof categories, string][]).map(([category, title]) => (
          <div key={category}>
            <h4 className="text-sm font-medium mb-3 dark:text-white">{title}</h4>
            <div className="space-y-3">
              {achievements
                .filter(a => a.category === category)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-green-50 dark:bg-green-900'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium dark:text-white">
                          {achievement.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${(achievement.progress / achievement.requiredPoints) * 100}%`
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {achievement.progress}/{achievement.requiredPoints} points
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}