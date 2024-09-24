import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

const CLAIM_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'holders', type: 'address[]' },
      {
        internalType: 'contract OToken[]',
        name: 'oTokens',
        type: 'address[]'
      },
      { internalType: 'bool', name: 'borrowers', type: 'bool' },
      { internalType: 'bool', name: 'suppliers', type: 'bool' }
    ],
    name: 'claimOrb',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const OrbitProtocolClaim = (props: any) => {
  const { loading, market, dapp, record, supplies, onSuccess, onError, account, provider } = props;

  const { REOZO_ADDRESS, KELP_ADDRESS, ORBIT_ADDRESS, MOON_MARKETS, MOON_ADDRESS } = dapp;
  const { pool } = record;

  const { rewardAddress, oTokens } = useMemo(() => {
    let rewardAddress: any;
    let oTokens: any;
    if (pool === 'ORBIT') {
      rewardAddress = ORBIT_ADDRESS;
      oTokens = [
        '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87',
        '0xF9B3B455f5d900f62bC1792A6Ca6e1d47B989389',
        '0x0872b71EFC37CB8DdE22B2118De3d800427fdba0',
        '0x8C415331761063E5D6b1c8E700f996b13603Fc2E'
      ];
    }
    if (pool === 'RENZO') {
      rewardAddress = REOZO_ADDRESS;
      oTokens = [
        '0x795dCD51EaC6eb3123b7a4a1f906992EAA54Cb0e',
        '0x4991b902F397dC16b0BBd21b0057a20b4B357AE2',
        '0xB51b76C73fB24f472E0dd63Bb8195bD2170Bc65d'
      ];
    }
    if (pool === 'MOON') {
      rewardAddress = MOON_ADDRESS;
      oTokens = [
        '0xAFAbd582E82042f4A8574f75c36409abEa916Ac5',
        '0x9bbbA6322Fe5F3968C1F27C8B860727d683194C8',
        '0xD55634a79E571dc4C7CDD2F2C0a5857bf7a8a782',
        '0xfB661cdcfCB62b4ed7bBEf6f70068863E213Cb6B',
        '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A',
        '0x4ADF85E2e760c9211894482DF74BA535BCae50A4',
        '0x3a61f4bF054cdFaC3a3436A21c4463C6D85C2408',
        '0x7732e29e35e8A8b26E7f026c0865C7c2d88CF853'
      ];
    }
    return { rewardAddress, oTokens };
  }, [pool]);

  useEffect(() => {
    if (!loading || !rewardAddress) return;

    const ClaimContract = new ethers.Contract(rewardAddress, CLAIM_ABI, provider.getSigner());

    ClaimContract.claimOrb([account], oTokens, true, true)
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });
  }, [rewardAddress, loading, provider, account, oTokens]);

  return null;
};

export default OrbitProtocolClaim;
