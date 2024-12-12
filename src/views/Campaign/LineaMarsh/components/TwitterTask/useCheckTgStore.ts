import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckTgStore {
  finishedTasks: string[];
  pendingTasks: string[];
  visitedTwitterTasks: string[];
  addTask: (taskId: string) => void;
  hasFinished: (taskId: string) => boolean;
  isPending: (taskId: string) => boolean;
  finishTask: (taskId: string) => void;
  hasTask: (taskId: string) => boolean;
  addTwitterVisit: (taskId: string) => void;
  hasTwitterVisited: (taskId: string) => boolean;
}

export const useCheckTgStore = create<CheckTgStore>()(
  persist(
    (set, get) => ({
      finishedTasks: [],
      pendingTasks: [],
      visitedTwitterTasks: [],
      addTask: (taskId: string) => {
        const { pendingTasks } = get();
        if (!pendingTasks.includes(taskId)) {
          set({ pendingTasks: [...pendingTasks, taskId] });
        }
      },
      hasFinished: (taskId: string) => {
        return get().finishedTasks.includes(taskId);
      },
      isPending: (taskId: string) => {
        return get().pendingTasks.includes(taskId);
      },
      finishTask: (taskId: string) => {
        const { finishedTasks, pendingTasks } = get();
        set({
          finishedTasks: [...finishedTasks, taskId],
          pendingTasks: pendingTasks.filter((id) => id !== taskId)
        });
      },
      hasTask: (taskId: string) => {
        const { finishedTasks, pendingTasks } = get();
        return finishedTasks.includes(taskId) || pendingTasks.includes(taskId);
      },
      addTwitterVisit: (taskId: string) => {
        const { visitedTwitterTasks } = get();
        if (!visitedTwitterTasks.includes(taskId)) {
          set({ visitedTwitterTasks: [...visitedTwitterTasks, taskId] });
        }
      },
      hasTwitterVisited: (taskId: string) => {
        return get().visitedTwitterTasks.includes(taskId);
      }
    }),
    {
      name: '_tg-tasks'
    }
  )
);
