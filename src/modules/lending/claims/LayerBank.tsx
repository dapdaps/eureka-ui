import { ethers } from 'ethers';
import { useEffect } from 'react';

const UNITROLLER_ABI = [
  {
    inputs: [],
    name: 'claimLab',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const LayerBankHandlerClaim = (props: any) => {
  const { loading, dapp, onSuccess, onError, chainId, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.unitrollerAddress) return;

    const CollateralContract = new ethers.Contract(
      dapp.unitrollerAddress,
      UNITROLLER_ABI,
      provider.getSigner()
    );
    CollateralContract.claimLab()
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });
  }, [dapp, chainId, provider, onSuccess, onError, loading]);

  return null;
};

export default LayerBankHandlerClaim;
