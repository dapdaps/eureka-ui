import { ethers } from 'ethers';
import { useEffect } from 'react';

const CLAIM_ABI = [
  {
    inputs: [
      { internalType: "address", name: "holder", type: "address" },
      {
        internalType: "contract PToken[]",
        name: "pTokens",
        type: "address[]",
      },
    ],
    name: "claimWpc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function WePiggyClaim(props: any) {

  const {
    loading,
    market,
    dapp,
    record,
    onSuccess,
    onError,
    account,
    provider
  } = props;

  useEffect(() => {
    if (!loading || !dapp?.rewardAddress || !account) return;

    const RewardContract = new ethers.Contract(
      dapp.rewardAddress,
      CLAIM_ABI,
      provider.getSigner()
    );

    RewardContract.claimWpc()
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          onSuccess(res);
        });
      })
      .catch((err: any) => {
        onError(err);
      });

  }, [loading, dapp, account]);


}