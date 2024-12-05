import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TimeBlock } from '../../../types';

interface Props {
  onSubmit: (block: TimeBlock) => void;
  onClose: () => void;
}

export default function TimeBlockForm({ onSubmit, onClose }: Props) {
  const [block, setBlock] = useState<Partial<TimeBlock>>({
    title: '',
    startTime: '',
    duration: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (block.title && block.startTime && block.duration) {
      onSubmit({
        id: Date.now().toString(),
        ...block as Required<typeof block>,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Study Block</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => setBlock({ ...block, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., React Fundamentals"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              value={block.startTime}
              onChange={(e) => setBlock({ ...block, startTime: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <select
              value={block.duration}
              onChange={(e) => setBlock({ ...block, duration: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value={25}>25 (Pomodoro)</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
              <option value={90}>90 (Ultradian)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}