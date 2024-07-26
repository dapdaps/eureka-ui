import { create } from 'zustand';
import type { Token } from '@/types';
import { ethereum } from '@/config/tokens/ethereum';


type IState = {
    selectedToken: Token
};

type IConfig = IState & {
    set: (state: IState) => void;
  };

export const useSelectedToken = create<IConfig>((set) => ({
    selectedToken: ethereum['frxETH'],
  set: (params: any) => set(() => ({ ...params })),
}));
