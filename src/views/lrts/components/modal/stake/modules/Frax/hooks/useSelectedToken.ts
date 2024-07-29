import { create } from 'zustand';
import type { Token } from '@/types';
import { ethereum } from '@/config/tokens/ethereum';


type IState = {
    token?: Token
    recipient?: string
};

type IConfig = IState & {
    set: (state: IState) => void;
  };

export const useSelectedToken = create<IConfig>((set) => ({
    token: ethereum['frxETH'],
    recipient: '',
  set: (params: any) => set(() => ({ ...params })),
}));
