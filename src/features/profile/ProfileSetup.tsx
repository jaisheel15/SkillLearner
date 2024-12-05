import React, { useState } from 'react';
import { Code2, Target, BookOpen } from 'lucide-react';
import { UserPreferences } from '../../types';
import SkillsSelector from './components/SkillsSelector';
import GoalsForm from './components/GoalsForm';
import LearningPathSelector from './components/LearningPathSelector';

interface Props {
  onComplete: (preferences: UserPreferences) => void;
}

export default function ProfileSetup({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    weeklyHours: 5,
    difficulty: 'beginner',
    interests: [],
    learningGoals: []
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(preferences as UserPreferences);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className={`flex items-center ${
                number < step ? 'text-green-500' : number === step ? 'text-blue-500' : 'text-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                number < step ? 'border-green-500' : number === step ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {number}
              </div>
              {number < 3 && (
                <div className={`w-full h-1 mx-2 ${
                  number < step ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Select Your Skills</h2>
          </div>
          <SkillsSelector
            selectedSkills={preferences.interests || []}
            onSkillsChange={(skills) => 
              setPreferences({ ...preferences, interests: skills })
            }
          />
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next: Set Your Goals
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Set Your Goals</h2>
          </div>
          <GoalsForm
            goals={preferences.learningGoals || []}
            onGoalsChange={(goals) =>
              setPreferences({ ...preferences, learningGoals: goals })
            }
          />
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next: Choose Learning Path
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Choose Your Learning Path</h2>
          </div>
          <LearningPathSelector
            selectedPath={preferences.difficulty}
            onPathChange={(path) =>
              setPreferences({ ...preferences, difficulty: path })
            }
          />
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Complete Setup
          </button>
        </div>
      )}
    </div>
  );
}