import { ethers } from 'ethers';

import useAccount from '@/hooks/useAccount';

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
  const { loading, dapp, onSuccess, onError } = props;

  const { provider } = useAccount();

  if (!loading || !dapp.unitrollerAddress) return null;

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

  return null;
};

export default LayerBankHandlerClaim;
