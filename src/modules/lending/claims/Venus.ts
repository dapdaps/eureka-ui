import { ethers } from 'ethers';
import { useEffect } from 'react';

const CLAIM_ABI = [
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'holder', type: 'address' }],
    name: 'claimVenus',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const VenusClaim = (props: any) => {
  const { loading, market, dapp, record, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.unitrollerAddress || !account) return;

    const CollateralContract = new ethers.Contract(
      dapp.unitrollerAddress,
      CLAIM_ABI,
      provider.getSigner(),
    );

    CollateralContract.estimateGas
      .claimVenus(account)
      .then((gas) => {
        CollateralContract.claimVenus(account, { gasLimit: gas })
          .then((tx: any) => {
            tx.wait().then((res: any) => {
              onSuccess(res);
            });
          })
          .catch((err: any) => {
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  }, [loading, dapp, account, provider]);

  return null;
};

export default VenusClaim;
