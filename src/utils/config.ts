import type { Network, NetworkId } from './types';

//#region add rpc switch
export enum RpcList {
  Default = 'DEFAULT',
  Lava = 'LAVA',
  Beta = 'BETA',
  FastNear = 'FAST_NEAR',
}

export const RPC_LIST: Record<RpcList, { url: string; simpleName: string; }> = {
  DEFAULT: {
    url: 'https://rpc.mainnet.near.org',
    simpleName: 'official rpc',
  },
  LAVA: {
    url: 'https://near.lava.build',
    simpleName: 'lava rpc',
  },
  BETA: {
    url: 'https://beta.rpc.mainnet.near.org',
    simpleName: 'official beta rpc',
  },
  FAST_NEAR: {
    url: 'https://free.rpc.fastnear.com',
    simpleName: 'fastnear rpc',
  },
};

export enum RpcStatus {
  Fast = 'FAST',
  Slow = 'SLOW',
  Stop = 'STOP',
}

export const RPC_TIMEOUT = 8000;

export const RPC_STATUS: Record<RpcStatus, { color: string; lt: number; gte: number; }> = {
  FAST: {
    color: '#57DB64',
    lt: 500,
    gte: 0,
  },
  SLOW: {
    color: '#FFAA27',
    gte: 500,
    lt: 2000,
  },
  STOP: {
    color: '#FF547D',
    gte: 2000,
    lt: RPC_TIMEOUT,
  },
};
//#endregion

export const networks: () => Record<NetworkId, Network> = () => {
  const nodeUrlStorage = window.localStorage.getItem('_DAPDAP_RPC_STORAGE');
  let nodeUrl = 'https://rpc.mainnet.near.org';
  if (nodeUrlStorage) {
    try {
      const storage = JSON.parse(nodeUrlStorage);
      const rpcKey: RpcList = storage.state.selected;
      nodeUrl = RPC_LIST[rpcKey].url;
    } catch (err) {
      console.log('get rpc storage failed: %o', err);
    }
  }
  console.log('%cnodeUrl: %s', 'background: #399918;color: #fff;font-size: 10px;', nodeUrl);
  return {
    mainnet: {
      networkId: 'mainnet',
      viewAccountId: 'near',
      nodeUrl,
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      fastAuth: {
        mpcRecoveryUrl: 'https://mpc-recovery-leader-mainnet-cg7nolnlpa-ue.a.run.app',
        authHelperUrl: 'https://api.kitwallet.app',
        accountIdSuffix: 'near',
        firebase: {
          apiKey: 'AIzaSyDhxTQVeoWdnbpYTocBAABbLULGf6H5khQ',
          authDomain: 'near-fastauth-prod.firebaseapp.com',
          projectId: 'near-fastauth-prod',
          storageBucket: 'near-fastauth-prod.appspot.com',
          messagingSenderId: '829449955812',
          appId: '1:829449955812:web:532436aa35572be60abff1',
          measurementId: 'G-T2PPJ8QRYY',
        },
      },
    },
    testnet: {
      networkId: 'testnet',
      viewAccountId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      fastAuth: {
        mpcRecoveryUrl: 'https://mpc-recovery-7tk2cmmtcq-ue.a.run.app',
        authHelperUrl: 'https://testnet-api.kitwallet.app',
        accountIdSuffix: 'testnet',
        firebase: {
          apiKey: 'AIzaSyDAh6lSSkEbpRekkGYdDM5jazV6IQnIZFU',
          authDomain: 'pagoda-oboarding-dev.firebaseapp.com',
          projectId: 'pagoda-oboarding-dev',
          storageBucket: 'pagoda-oboarding-dev.appspot.com',
          messagingSenderId: '116526963563',
          appId: '1:116526963563:web:053cb0c425bf514007ca2e',
          measurementId: 'G-HF2NBGE60S',
        },
      },
    },
    // localnet: {
    //   // these are defined by https://github.com/kurtosis-tech/near-package
    //   networkId: 'localnet',
    //   viewAccountId: 'test.near',
    //   nodeUrl: 'http://127.0.0.1:8332',
    //   walletUrl: 'http://127.0.0.1:8334',
    //   helperUrl: 'http://127.0.0.1:8330',
    // },
  };
};

export const networkId: NetworkId = (process.env.NEXT_PUBLIC_NETWORK_ID as NetworkId) || 'mainnet';
console.log('%cnetworkId: %s', 'background: #399918;color: #fff;font-size: 10px;', networkId);
export const network = () => networks()[networkId];
export const signInContractId = networkId === 'testnet' ? 'v1.social08.testnet' : 'social.near';
