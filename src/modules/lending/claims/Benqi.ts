import { ethers } from 'ethers';
import { useEffect } from 'react';

const CLAIM_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint8',
        name: 'rewardType',
        type: 'uint8',
      },
      {
        internalType: 'address payable',
        name: 'holder',
        type: 'address',
      },
    ],
    name: 'claimReward',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const BenqiClaim = (props: any) => {
  const { loading, market, dapp, record, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.unitrollerAddress || !account) return;

    const CollateralContract = new ethers.Contract(
      dapp.unitrollerAddress,
      CLAIM_ABI,
      provider.getSigner(),
    );

    CollateralContract.claimReward(record.symbol === 'QI' ? 0 : 1, account)
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });
  }, [loading, dapp, record, account, provider]);

  return null;
};

export default BenqiClaim;
