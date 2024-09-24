import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function RadiantClaim(props: any) {
  const CLAIM_ABI = [
    {
      inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
      name: 'claimAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];
  const { loading, market, dapp, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.incentiveController || !account) return;

    const CollateralContract = new ethers.Contract(dapp.incentiveController, CLAIM_ABI, provider.getSigner());
    const createTx = (gasLimit: any = 4000000) => {
      CollateralContract.claimAll(account, { gasLimit })
        .then((tx: any) => {
          tx.wait().then((res: any) => {
            onSuccess(res);
          });
        })
        .catch((err: any) => {
          onError(err);
        });
    };
    CollateralContract.estimateGas
      .claimAll(account)
      .then((gas: any) => {
        createTx(gas);
      })
      .catch((err: any) => {
        console.log('RadiantClaim estimateGas failure: %o', err);
        createTx();
      });
  }, [loading, dapp.incentiveController, account]);
}
