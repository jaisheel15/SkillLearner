import { create } from 'zustand';
import { TimeBlock } from '../../types';

interface ScheduleState {
  blocks: TimeBlock[];
  addBlock: (block: TimeBlock) => void;
  removeBlock: (id: string) => void;
  clearBlocks: () => void;
}

export const useSchedule = create<ScheduleState>((set) => ({
  blocks: [],
  addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
  removeBlock: (id) => set((state) => ({
    blocks: state.blocks.filter((block) => block.id !== id)
  })),
  clearBlocks: () => set({ blocks: [] }),
}));