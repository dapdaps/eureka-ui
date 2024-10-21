import { basic as bexBasic, networks as bexNetworks } from '../dapps/bex';

const CHAIN_ID = 80084;

export default {
  chainId: CHAIN_ID,
  dexs: {
    BEX: {
      ...bexBasic,
      ...bexNetworks[CHAIN_ID]
    }
  }
};
