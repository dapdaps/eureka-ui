import { useState } from 'react';

export function useMultiState<State = Record<any, any>>(initialState: State): [State, UpdateState<State>] {
  const [state, setState] = useState<State>(initialState);

  const updateState = (states: Partial<State>) => {
    setState((prev) => {
      return {
        ...prev,
        ...states,
      };
    });
  };

  return [state, updateState];
}

type UpdateState<State> = (states: Partial<State>) => void;
