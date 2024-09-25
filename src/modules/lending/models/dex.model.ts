import type { Chain } from '@/modules/lending/models/chain.model';

export interface DexProps {
  CHAIN_LIST: Chain[];
  curChain: Chain;
  dexConfig: any;
  wethAddress: string;
  multicallAddress: string;
  multicall: any;
  prices: any;
  onSwitchChain: any;
  switchingChain: boolean;
  addAction: any;
  toast: any;
  chainId: number;
  nativeCurrency: Record<any, any>;
  isChainSupported: boolean;
  account: string;
  from: string;
  onSuccess: any;
  curPool?: any;
}
