import { da } from 'date-fns/locale';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const CLAIM_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "address[]", name: "_tokens", type: "address[]" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default function ValasFinanceClaim (props: any) {
  const { loading, market, dapp, record, supplies, onSuccess, onError, account, provider } = props;

  useEffect(() => {

    if (!loading || !dapp.rewardAddress || !account) return;

    const { markets } = dapp;
    const supplyAddrs = supplies.map((item: any) => item.address);
    const nativeReward: any = Object.values(markets).find(
      (item: any) => item.symbol === "valBNB"
    );
    const vTokenAddrs = Object.values(markets)
      .filter((item: any) => supplyAddrs.includes(item.address))
      .map((item: any) => item.variableDebtTokenAddress);
    const _tokens = [nativeReward.address, ...vTokenAddrs];

    const CollateralContract = new ethers.Contract(
      dapp.rewardAddress,
      CLAIM_ABI,
      provider.getSigner()
    );

    CollateralContract.claim(account, _tokens)
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