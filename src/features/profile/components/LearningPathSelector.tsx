import React from 'react';
import { BookOpen, Rocket, Brain } from 'lucide-react';

interface Props {
  selectedPath: string;
  onPathChange: (path: 'beginner' | 'intermediate' | 'advanced') => void;
}

const paths = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Perfect for those just starting their coding journey',
    icon: BookOpen,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'For developers with some programming experience',
    icon: Rocket,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Deep dive into complex programming concepts',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

export default function LearningPathSelector({ selectedPath, onPathChange }: Props) {
  return (
    <div className="space-y-4">
      {paths.map((path) => {
        const Icon = path.icon;
        return (
          <button
            key={path.id}
            onClick={() => onPathChange(path.id as 'beginner' | 'intermediate' | 'advanced')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedPath === path.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${path.bgColor}`}>
                <Icon className={`w-6 h-6 ${path.color}`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">{path.title}</h3>
                <p className="text-sm text-gray-600">{path.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}