import { ethers } from 'ethers';
import { useEffect } from 'react';

const CLAIM_ABI = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claim",
    inputs: [
      { type: "address", name: "_user", internalType: "address" },
      { type: "address[]", name: "_tokens", internalType: "address[]" },
    ],
  },
];
export default function LendleClaim (props: any) {

  const { loading, market, dapp, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.incentiveController || !account || !market.allPools) return;
    const CollateralContract = new ethers.Contract(
      dapp.incentiveController,
      CLAIM_ABI,
      provider.getSigner()
    );

    const claimFn = (gasLimit?: any) => {
      CollateralContract.claim(account, market.allPools, {
        gasLimit: gasLimit || 4000000,
      })
        .then((tx: any) => {
          tx.wait().then((res: any) => {
            onSuccess(res);
          });
        })
        .catch((err: any) => {
          onError(err);
        });
    };

    // fix#DAP-800
    CollateralContract.estimateGas.claim(account, market.allPools)
      .then((gas) => {
        claimFn(gas);
      })
      .catch((err) => {
        console.log("Lendle claim estimate gas failed: ", err);
        claimFn();
      });
  }, [loading, dapp, account, market]);
}