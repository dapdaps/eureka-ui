import { create } from 'zustand';

export enum IAction {
  ZerolendAddToV2 = 'zerolendAddToV2'
}

interface IPatchState {
  failedToLoad: boolean;
  hasResolved: boolean;
  currentAction: IAction | null;
  set: (state: Partial<IPatchState>) => void;
}

export const useUrlPatchStore = create<IPatchState>((set) => ({
  failedToLoad: false,
  hasResolved: false,
  currentAction: null,
  set: (state) => set((previousState) => ({ ...previousState, ...state }))
}));
