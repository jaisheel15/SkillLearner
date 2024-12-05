import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function ProgressCard({ label, value, icon: Icon, color, bgColor }: Props) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <div className="text-2xl font-bold dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
}