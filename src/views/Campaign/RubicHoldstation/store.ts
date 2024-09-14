import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RubicCampaignState = {
  checked: { account: string; checked: boolean; round: number }[];
};

type RubicCampaignStore = RubicCampaignState & {
  setChecked: (account: string, checked: boolean, round: number) => void;
  getChecked: (account: string, round: number) => boolean;
  set: (state: Partial<RubicCampaignState>) => void;
};

export const useRubicCampaignStore = create(
  persist<RubicCampaignStore>(
    (set, get) => ({
      checked: [],
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
      getChecked: (account: string, round: number) => {
        const _checked = get().checked;
        const curr = _checked.find((it) => {
          return it.account === account && it.round === round;
        });
        return curr?.checked || false;
      },
      set: (state) => {
        set((prev) => ({ ...prev, ...state }));
      }
    }),
    {
      name: '_DAPDAP_CAMPAIGN_RUBIC_CHECKED',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ checked: state.checked }) as any
    }
  )
);
