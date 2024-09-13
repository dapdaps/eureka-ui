import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function RadiantClaim (props: any) {
  const CLAIM_ABI = [
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "claimAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const { loading, market, dapp, onSuccess, onError, account, provider } = props;

  useEffect(() => {
    if (!loading || !dapp.incentiveController || !account) return;

    const CollateralContract = new ethers.Contract(
      dapp.incentiveController,
      CLAIM_ABI,
      provider.getSigner()
    );
    CollateralContract.claimAll(account)
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });
  }, [loading, dapp.incentiveController, account]);


}