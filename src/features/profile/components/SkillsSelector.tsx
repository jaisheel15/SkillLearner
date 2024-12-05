import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const availableSkills = [
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
  { id: 'react', name: 'React', icon: '⚛️' },
  { id: 'node', name: 'Node.js', icon: '🟢' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'sql', name: 'SQL', icon: '📊' }
];

export default function SkillsSelector({ selectedSkills, onSkillsChange }: Props) {
  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      onSkillsChange(selectedSkills.filter(id => id !== skillId));
    } else {
      onSkillsChange([...selectedSkills, skillId]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {availableSkills.map((skill) => (
        <button
          key={skill.id}
          onClick={() => toggleSkill(skill.id)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedSkills.includes(skill.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{skill.icon}</span>
              <span className="font-medium">{skill.name}</span>
            </div>
            {selectedSkills.includes(skill.id) && (
              <Check className="w-5 h-5 text-blue-500" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}