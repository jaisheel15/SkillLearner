import React from 'react';
import { X } from 'lucide-react';
import { TimeBlock } from '../../../types';
import { format, parse, addMinutes } from 'date-fns';

interface Props {
  blocks: TimeBlock[];
  onRemoveBlock: (id: string) => void;
}

export default function ScheduleTimeline({ blocks, onRemoveBlock }: Props) {
  const sortedBlocks = [...blocks].sort((a, b) => {
    const timeA = parse(a.startTime, 'HH:mm', new Date());
    const timeB = parse(b.startTime, 'HH:mm', new Date());
    return timeA.getTime() - timeB.getTime();
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="space-y-4">
        {sortedBlocks.map((block) => {
          const startTime = parse(block.startTime, 'HH:mm', new Date());
          const endTime = addMinutes(startTime, block.duration);

          return (
            <div
              key={block.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
                </div>
                <div>
                  <h4 className="font-medium">{block.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {block.duration} minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveBlock(block.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          );
        })}

        {blocks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No study blocks scheduled. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
}