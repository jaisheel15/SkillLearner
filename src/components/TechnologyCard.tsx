import React from 'react';
import { Technology } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  technology: Technology;
  onSelect: (tech: Technology) => void;
}

export default function TechnologyCard({ technology, onSelect }: Props) {
  return (
    <div 
      onClick={() => onSelect(technology)}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <img 
          src={technology.icon} 
          alt={technology.name} 
          className="w-12 h-12 object-contain"
        />
        <ArrowRight className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{technology.name}</h3>
      <p className="text-gray-600">{technology.description}</p>
    </div>
  );
}