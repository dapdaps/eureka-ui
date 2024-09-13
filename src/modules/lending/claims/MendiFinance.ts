import { ethers } from 'ethers';
import { useEffect } from 'react';

const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'holder', type: 'address' }],
    name: 'claimComp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const MendiFinanceClaim = (props: any) => {
  const { loading, market, dapp, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.unitrollerAddress) return;

    const CollateralContract = new ethers.Contract(
      dapp.unitrollerAddress,
      UNITROLLER_ABI,
      provider.getSigner(),
    );
    CollateralContract.claimComp(account)
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });
  }, [loading, dapp, account, provider]);

  return null;
};

export default MendiFinanceClaim;
