import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RubicCampaignState = {
  checked: { account: string; checked: boolean; round: number }[];
  twitterVisited: { account: string; visited: boolean; id: number }[];
};

type RubicCampaignStore = RubicCampaignState & {
  setChecked: (account: string, checked: boolean, round: number) => void;
  setTwitterVisited: (account: string, visited: boolean, id: number) => void;
  getChecked: (account: string, round: number) => boolean;
  getTwitterVisited: (account: string, id: number) => boolean;
  set: (state: Partial<RubicCampaignState>) => void;
};

export const useRubicCampaignStore = create(
  persist<RubicCampaignStore>(
    (set, get) => ({
      checked: [],
      twitterVisited: [],
      setChecked: (account: string, checked: boolean, round: number) => {
        const _checked = get().checked;
        const curr = _checked.find((it) => {
          return it.account === account && it.round === round;
        });
        if (!curr) {
          _checked.push({
            account: account,
            checked: checked,
            round: round
          });
        } else {
          curr.checked = checked;
        }
        set((prev) => ({ ...prev, checked: _checked }));
      },
      setTwitterVisited: (account: string, visited: boolean, id: number) => {
        const _twitterVisited = get().twitterVisited;
        const curr = _twitterVisited.find((it) => {
          return it.account === account && it.id === id;
        });
        if (!curr) {
          _twitterVisited.push({
            account: account,
            visited: visited,
            id: id
          });
        } else {
          curr.visited = visited;
        }
        set((prev) => ({ ...prev, twitterVisited: _twitterVisited }));
      },
      getChecked: (account: string, round: number) => {
        const _checked = get().checked;
        const curr = _checked.find((it) => {
          return it.account === account && it.round === round;
        });
        return curr?.checked || false;
      },
      getTwitterVisited: (account: string, id: number) => {
        const _twitterVisited = get().twitterVisited;
        const curr = _twitterVisited.find((it) => {
          return it.account === account && it.id === id;
        });
        return curr?.visited || false;
      },
      set: (state) => {
        set((prev) => ({ ...prev, ...state }));
      }
    }),
    {
      name: '_DAPDAP_CAMPAIGN_RUBIC_CHECKED',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ checked: state.checked, twitterVisited: state.twitterVisited }) as any
    }
  )
);
