import React, { useState } from 'react';
import { Clock, Calendar, Plus, X } from 'lucide-react';
import { format, addMinutes, parse } from 'date-fns';
import { useSchedule } from './useSchedule';
import TimeBlockForm from './components/TimeBlockForm';
import ScheduleTimeline from './components/ScheduleTimeline';
import PomodoroTimer from './components/PomodoroTimer';

export default function TimeBlockScheduler() {
  const [showForm, setShowForm] = useState(false);
  const { blocks, addBlock, removeBlock } = useSchedule();
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'ultradian'>('pomodoro');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Study Schedule</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Time Block
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScheduleTimeline blocks={blocks} onRemoveBlock={removeBlock} />
        </div>
        
        <div>
          <PomodoroTimer
            mode={timerMode}
            onModeChange={setTimerMode}
          />
        </div>
      </div>

      {showForm && (
        <TimeBlockForm
          onSubmit={(block) => {
            addBlock(block);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}